const request = require("supertest");
const jwt = require("jsonwebtoken");
const { connect, disconnect } = require("./setup");
const app = require("../app");
const User = require("../models/User");

const account = {
  username: "authuser",
  email: "authuser@example.com",
  password: "correct-horse",
};

beforeAll(connect);
afterAll(disconnect);

describe("Auth API", () => {
  let token;

  it("registers a user and returns a JWT", async () => {
    const res = await request(app).post("/auth/register").send(account);

    expect(res.statusCode).toBe(201);
    expect(res.body.data.token).toBeTruthy();
    expect(res.body.data.user.username).toBe(account.username);
    expect(res.body.data.user.password).toBeUndefined();
    token = res.body.data.token;
  });

  it("stores the password as a bcrypt hash, not plaintext", async () => {
    const user = await User.findOne({ username: account.username }).select(
      "+password"
    );

    expect(user.password).not.toBe(account.password);
    expect(user.password).toMatch(/^\$2[aby]\$12\$/);
  });

  it("rejects a duplicate username or email", async () => {
    const res = await request(app).post("/auth/register").send(account);
    expect(res.statusCode).toBe(409);
  });

  it("rejects a password shorter than 8 characters", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({ username: "shortpw", email: "short@example.com", password: "abc" });
    expect(res.statusCode).toBe(400);
  });

  it("rejects query operators in place of credentials", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ identifier: { $ne: null }, password: { $ne: null } });
    expect(res.statusCode).toBe(400);
  });

  it("logs in with username or email", async () => {
    for (const identifier of [account.username, account.email]) {
      const res = await request(app)
        .post("/auth/login")
        .send({ identifier, password: account.password });
      expect(res.statusCode).toBe(200);
      expect(res.body.data.token).toBeTruthy();
    }
  });

  it("gives the same error for a wrong password and an unknown user", async () => {
    const wrongPassword = await request(app)
      .post("/auth/login")
      .send({ identifier: account.username, password: "wrong-password" });
    const unknownUser = await request(app)
      .post("/auth/login")
      .send({ identifier: "nobody", password: "wrong-password" });

    expect(wrongPassword.statusCode).toBe(401);
    expect(unknownUser.statusCode).toBe(401);
    expect(wrongPassword.body.message).toBe(unknownUser.body.message);
  });

  it("returns the current user for a valid token", async () => {
    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.username).toBe(account.username);
  });

  it("rejects requests without a token", async () => {
    const res = await request(app).get("/auth/me");
    expect(res.statusCode).toBe(401);
  });

  it("rejects a token signed with a different secret", async () => {
    const user = await User.findOne({ username: account.username });
    const forged = jwt.sign({ sub: user._id.toString() }, "attacker-secret");

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${forged}`);
    expect(res.statusCode).toBe(401);
  });

  it("rejects an unsigned token (alg: none)", async () => {
    const user = await User.findOne({ username: account.username });
    const unsigned = jwt.sign({ sub: user._id.toString() }, null, {
      algorithm: "none",
    });

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${unsigned}`);
    expect(res.statusCode).toBe(401);
  });

  it("rejects an expired token", async () => {
    const user = await User.findOne({ username: account.username });
    const expired = jwt.sign(
      { sub: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: -10 }
    );

    const res = await request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${expired}`);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Token expired");
  });
});

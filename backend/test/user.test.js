const request = require("supertest");
const mongoose = require("mongoose");
const { connect, disconnect } = require("./setup");
const app = require("../app");
const User = require("../models/User");
const Song = require("../models/Song");

let token;
let otherUserId;
let testSongId;

const login = async (identifier, password) => {
  const res = await request(app)
    .post("/auth/login")
    .send({ identifier, password });
  return res.body.data.token;
};

beforeAll(async () => {
  await connect();

  await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: "testpassword",
    firstName: "Test",
    lastName: "User",
    preferences: {
      favoriteGenres: ["Pop"],
      favoriteLanguages: ["English"],
    },
  });

  // A second account, to check one user cannot touch another's data
  const other = await User.create({
    username: "otheruser",
    email: "otheruser@example.com",
    password: "otherpassword",
  });
  otherUserId = other._id.toString();

  const song = await Song.create({
    title: "Test Song",
    artist: new mongoose.Types.ObjectId(),
    genre: "Pop",
    language: "English",
    duration: 200,
    albumCover: "https://via.placeholder.com/300x300?text=Test",
    album: "Test Album",
    playCount: 1000,
  });
  testSongId = song._id.toString();

  token = await login("testuser", "testpassword");
});

afterAll(disconnect);

describe("User API", () => {
  it("requires a token for user routes", async () => {
    for (const path of ["/user", "/user/info", "/user/songs"]) {
      const res = await request(app).get(path);
      expect(res.statusCode).toBe(401);
    }
    const res = await request(app).put("/songs").send({ songId: testSongId });
    expect(res.statusCode).toBe(401);
  });

  it("should edit the logged-in user's profile", async () => {
    const res = await request(app)
      .put("/user/info")
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "updateduser", email: "updated@example.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.username).toBe("updateduser");
    expect(res.body.data.password).toBeUndefined();
  });

  it("ignores ?username= and never edits another user", async () => {
    await request(app)
      .put("/user/info?username=otheruser")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "hijacked@example.com" });

    const other = await User.findById(otherUserId);
    expect(other.email).toBe("otheruser@example.com");
  });

  it("hashes a password changed through the profile", async () => {
    await request(app)
      .put("/user/info")
      .set("Authorization", `Bearer ${token}`)
      .send({ password: "newpassword123" });

    const user = await User.findOne({ username: "updateduser" }).select(
      "+password"
    );
    expect(user.password).toMatch(/^\$2[aby]\$/);
    expect(await login("updateduser", "newpassword123")).toBeTruthy();
  });

  it("likes a song for the logged-in user and lists it", async () => {
    const like = await request(app)
      .put("/songs")
      .set("Authorization", `Bearer ${token}`)
      .send({ songId: testSongId });
    expect(like.statusCode).toBe(200);

    const res = await request(app)
      .get("/user/songs")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.map((s) => s._id)).toContain(testSongId);

    const other = await User.findById(otherUserId);
    expect(other.likedSongs).toHaveLength(0);
  });

  it("lists users without emails or password hashes", async () => {
    const res = await request(app)
      .get("/user")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    for (const user of res.body.data) {
      expect(user.email).toBeUndefined();
      expect(user.password).toBeUndefined();
    }
  });
});

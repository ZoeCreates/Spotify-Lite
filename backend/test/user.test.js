const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/User");
const Song = require("../models/Song");

let testUserId;
let testSongId;

beforeAll(async () => {
  // 连接测试数据库
  await mongoose.connect("mongodb://localhost:27017/spotify-lite-test");

  // 清空测试数据
  await User.deleteMany({});
  await Song.deleteMany({});

  // 创建测试用户
  const user = await User.create({
    username: "testuser",
    email: "testuser@example.com",
    password: "testpassword",
    firstName: "Test",
    lastName: "User",
    likedSongs: [],
    followedArtists: [],
    preferences: {
      favoriteGenres: ["Pop"],
      favoriteLanguages: ["English"],
    },
  });
  testUserId = user._id.toString();

  // 创建测试歌曲
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
});

afterAll(async () => {
  await User.deleteMany({});
  await Song.deleteMany({});
  await mongoose.connection.close();
});

describe("User API", () => {
  it("should edit user profile", async () => {
    const res = await request(app)
      .put("/user/info?username=testuser")
      .send({ username: "updateduser", email: "updated@example.com" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data.username).toBe("updateduser");
  });

  it("should view user profile after update", async () => {
    const user = await User.findById(testUserId);
    expect(user).toBeTruthy();
    expect(user.username).toBe("updateduser");
  });

  it("should view all songs liked by user", async () => {
    const res = await request(app).get("/user/songs?username=updateduser");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it("should use first available user when no username specified", async () => {
    const res = await request(app).get("/user/songs");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});

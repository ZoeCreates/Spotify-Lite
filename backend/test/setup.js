const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

process.env.JWT_SECRET = "test-secret";

let mongo;

// Each test file gets its own in-memory MongoDB, so no local database is needed
const connect = async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
};

const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongo.stop();
};

module.exports = { connect, disconnect };

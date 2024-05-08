import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { sign } from "jsonwebtoken";

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.NODE_ENV = "test";
  process.env.JWT_KEY = "test_key";
  process.env.JWT_EXPIRATION = "15m";

  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }

  jest.clearAllMocks();
  jest.resetAllMocks();
  jest.restoreAllMocks();
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@email.com",
  };

  const token = sign(payload, process.env.JWT_KEY!);

  return `Bearer ${token}`;
};

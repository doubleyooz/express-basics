import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";

dotenv.config({ path: ".env.test" });

async function removeAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    await collection.deleteMany({});
  }
}

async function dropAllCollections() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const collectionName of collections) {
    const collection = mongoose.connection.collections[collectionName];
    try {
      await collection.drop();
    } catch (error: any) {
      // Sometimes this error happens, but you can safely ignore it
      if (error.message === "ns not found") return;
      // This error occurs when you use it.todo. You can
      // safely ignore this error too
      if (error.message.includes("a background operation is currently running"))
        return;
      console.log(error.message);
    }
  }
}

function setupDB(databaseName: string) {
  // Connect to Mongoose
  beforeAll(async () => {
    const mongoms = await MongoMemoryServer.create();
    const uri = mongoms.getUri();

    const options = {
      dbName: databaseName,
    };

    await mongoose.connect(uri, options);
  });

  // Cleans up database between each test
  afterEach(async () => {
    // await removeAllCollections();
  });

  // Disconnect Mongoose
  afterAll(async () => {
    await dropAllCollections();
    await mongoose.connection.close();
  });
}

setupDB("test");

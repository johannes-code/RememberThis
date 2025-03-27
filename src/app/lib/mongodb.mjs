import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const COLLECTION = "score";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!COLLECTION) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
  }

  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();

    const db = client.db(COLLECTION);

    cachedClient = client;
    cachedDb = db;

    return { client, db };
  } catch (error) {
    console.error("Connection error:", error);
    throw new Error(`Failed to connect to MongoDB: ${error.message}`);
  }
}

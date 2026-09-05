import { MongoClient, ServerApiVersion } from "mongodb";

// Cached across hot-reloads in dev and across invocations in serverless so we
// don't open a fresh connection pool on every request/reload. Connection is
// created lazily (only when a request handler actually calls this) rather
// than at module load, so `next build`'s static analysis never needs a live
// database to succeed.
const globalForMongo = globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> };

export function getMongoClient(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error("MONGODB_URI is not set. Add it to .env.local (see .env.local.example).");
    }
    const client = new MongoClient(uri, {
      serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
    });
    globalForMongo._mongoClientPromise = client.connect();
  }
  return globalForMongo._mongoClientPromise;
}

import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy backend/.env.example to backend/.env and fill it in.");
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

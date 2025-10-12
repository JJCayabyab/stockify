import { sql } from "./db.js";

const testConnection = async () => {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("✅ Database connected successfully at:", result[0].now);
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

testConnection();
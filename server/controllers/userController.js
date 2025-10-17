import { sql } from "../config/db.js";

export const userCount = async (req, res) => {
  try {
    const result = await sql`SELECT COUNT(*) AS total FROM users`;
    const totalUsers = result[0].total;

    res.status(200).json({ totalUsers });
  } catch (error) {
    console.error("Error fetching user count:", error);
    res.status(500).json({ message: "Failed to get user count" });
  }
};

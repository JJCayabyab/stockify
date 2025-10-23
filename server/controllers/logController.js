import { sql } from "../config/db.js";

export const getLogs = async (req, res) => {
  const role = req.user.role;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized: Admin access required" });
  }

  try {
    const logs = await sql`
      SELECT * 
      FROM inventory_logs
      ORDER BY created_at DESC;
    `;

    return res.status(200).json({ logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const getLogsCount = async (req, res) => {
  try {
    const logCount = await sql`
      SELECT COUNT(*)::int as log_count
      FROM inventory_logs
    `;

    res.status(200).json({ logsCount: logCount[0].log_count });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

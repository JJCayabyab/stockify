import { sql } from "../config/db.js";

export const userCount = async (req, res) => {
  try {
    const result = await sql`
      SELECT 
      COUNT(*)::int AS total_users,
      COUNT(*) FILTER (WHERE role = 'admin')::int AS total_admins,
      COUNT(*) FILTER (WHERE role = 'staff')::int AS total_staff
      FROM users;
    `;

    const { total_users, total_admins, total_staff } = result[0];

    res.status(200).json({
      totalUsers: total_users,
      totalAdmins: total_admins,
      totalStaff: total_staff,
    });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    res.status(500).json({ message: "Failed to get user counts" });
  }
};

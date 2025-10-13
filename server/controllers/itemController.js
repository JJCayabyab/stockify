import { sql } from "../config/db.js";

export const createItem = async (req, res) => {
  const userId = req.user.id; // data comes from authenticateToken middleware
  try {
    const { name, category, quantity, supplier, price, created_by } = req.body;

    if (!name || !category || quantity == null || !supplier || price == null) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newItem = await sql`
    INSERT INTO items (name, category, quantity, supplier, price, created_by)
    VALUES (${name}, ${category}, ${quantity}, ${supplier}, ${price}, ${userId})
    RETURNING *;
    `;

    res.status(201).json({
      message: "Item created successfully",
      item: newItem[0],
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await sql`SELECT * FROM items`;
    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

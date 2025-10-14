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

    await sql`INSERT INTO inventory_logs (item_id, user_id, log_type,item_name)
    VALUES (${newItem[0].id},${userId},'add',${name})`;
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
    const items = await sql`
    SELECT 
      items.id AS item_id,
      items.name,
      items.category,
      items.quantity,
      items.supplier,
      items.price,
      items.created_by,
      users.name AS created_by_name
    FROM items
    JOIN users ON items.created_by = users.id
    WHERE items.deleted = false;
`;
    res.status(200).json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteItem = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.id;
  const role = req.user.role;

  if (role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  try {
    const item =
      await sql`SELECT * FROM items WHERE id=${itemId} AND deleted = FALSE `;

    if (item.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const log = await sql`
      INSERT INTO inventory_logs (item_id, user_id, log_type,item_name)
      VALUES (${itemId}, ${userId}, 'remove',${item[0].name});
    `;

    await sql`UPDATE items 
      SET deleted = TRUE, 
      deleted_at = CURRENT_TIMESTAMP,
      updated_at = CURRENT_TIMESTAMP
      WHERE id = ${itemId}`;
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateItem = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.id;
  const { name, category, quantity, supplier, price } = req.body;

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  try {
    
  } catch (error) {
    
  }
};

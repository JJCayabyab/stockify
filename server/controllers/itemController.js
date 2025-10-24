import { sql } from "../config/db.js";

export const createItem = async (req, res) => {
  const userId = req.user.id; // data comes from authenticateToken middleware
  const role = req.user.role;
  const performedBy = req.user.name; // name of the one who created the item
  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized: Admin access required" });
  }
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

    const log =
      await sql`INSERT INTO inventory_logs (item_id, user_id, log_type,item_name,performed_by)
        VALUES (${newItem[0].id},${userId},'add',${name},${performedBy})
        RETURNING *`;
    res.status(201).json({
      message: "Item created successfully",
      item: newItem[0],
    });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//add multiple items for testing purposes
export const createItems = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  const performedBy = req.user.name;

  if (role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized: Admin access required" });
  }

  let items = req.body.items;

  if (!Array.isArray(items)) {
    items = [items];
  }

  // Validate fields
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (
      !item.name ||
      !item.category ||
      item.quantity == null ||
      !item.supplier ||
      item.price == null
    ) {
      return res.status(400).json({
        success: false,
        message: `Item at index ${i} is missing required field`,
      });
    }
  }

  try {
    const results = [];

    for (const item of items) {
      const inserted = await sql`
        INSERT INTO items (name, category, quantity, supplier, price, created_by)
        VALUES (${item.name}, ${item.category}, ${item.quantity}, ${item.supplier}, ${item.price}, ${userId})
        RETURNING *
      `;

      const newItem = inserted[0];
      results.push(newItem);

      // Log the addition
      await sql`
        INSERT INTO inventory_logs (item_id, user_id, log_type, item_name, performed_by)
        VALUES (${newItem.id}, ${userId}, 'add', ${newItem.name}, ${performedBy})
      `;
    }

    return res.status(201).json({
      success: true,
      message: `Successfully created ${results.length} item(s)`,
      data: results,
    });
  } catch (error) {
    console.error("Error inserting items:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create items",
      error: error.message,
    });
  }
};



export const getItems = async (req, res) => {
  try {
    const items = await sql`
    SELECT 
      items.id AS id,
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
  const performedBy = req.user.name;

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
      INSERT INTO inventory_logs (item_id, user_id, log_type,item_name,performed_by)
      VALUES (${itemId}, ${userId}, 'remove',${item[0].name},${performedBy});
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
  const performedBy = req.user.name;
  const { name, category, quantity, supplier, price } = req.body;

  if (req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Unauthorized: Admin access required" });
  }

  if (!name && !category && !quantity && !supplier && !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const currentItem =
      await sql`SELECT * FROM items WHERE id=${itemId} AND deleted = FALSE`;

    if (currentItem.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const updatedItem = {
      name: name ? name : currentItem[0].name,
      category: category ? category : currentItem[0].category,
      quantity: quantity ? quantity : currentItem[0].quantity,
      supplier: supplier ? supplier : currentItem[0].supplier,
      price: price ? price : currentItem[0].price,
    };

    const finalUpdatedItem = await sql`
      UPDATE items
      SET name = ${updatedItem.name},
          category = ${updatedItem.category},
          quantity = ${updatedItem.quantity},
          supplier = ${updatedItem.supplier},
          price = ${updatedItem.price}
      WHERE id = ${itemId} AND deleted = false
      RETURNING *`;

    const log = await sql`
      INSERT INTO inventory_logs (item_id, user_id, log_type, item_name, performed_by)
      VALUES (${itemId}, ${userId}, 'update',${updatedItem.name},${performedBy})
      RETURNING *`;
    res.status(200).json({
      message: "Item updated successfully",
      item: finalUpdatedItem[0],
      log: log[0],
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const itemCount = async (req, res) => {
  try {
    const itemCount = await sql`
      SELECT COUNT(*)::int as item_count FROM items
      WHERE deleted = false`;

    const itemsByCategory = await sql`
      SELECT category,
      COUNT(*)::int as count
      FROM items
      WHERE deleted = false
      GROUP BY category
      ORDER BY count DESC`;

    const lowStock = await sql `
      SELECT COUNT(*)::int AS low_stock_items
      FROM items
      WHERE quantity < 15 AND deleted=false` 

    res.status(200).json({
      totalCount: itemCount[0].item_count, 
      byCategory: itemsByCategory,
      lowStockItems:lowStock[0].low_stock_items
    });
    
  } catch (error) {
    console.error("Error fetching itemCount:", error);
    res.status(500).json({ message: "Server error" });
  }
};

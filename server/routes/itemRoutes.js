import express from "express";
import { createItem, getItems,deleteItem,updateItem,itemCount,createItems } from "../controllers/itemController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const itemRouter = express.Router();

itemRouter.get("/", authenticateToken, getItems);
itemRouter.post("/", authenticateToken, createItem);
itemRouter.delete("/:id", authenticateToken, deleteItem);
itemRouter.patch("/:id", authenticateToken, updateItem);
itemRouter.get("/count", authenticateToken, itemCount);

itemRouter.post("/multipleCreate", authenticateToken, createItems);

export default itemRouter;

import express from "express";
import { createItem, getItems,deleteItem } from "../controllers/itemController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const itemRouter = express.Router();


itemRouter.get("/", authenticateToken, getItems);
itemRouter.post("/", authenticateToken, createItem);
itemRouter.delete("/:id", authenticateToken, deleteItem);

export default itemRouter;

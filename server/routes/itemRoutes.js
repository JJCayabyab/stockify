import express from "express";
import { createItem, getItems } from "../controllers/itemController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const itemRouter = express.Router();


itemRouter.get("/", authenticateToken, getItems);
itemRouter.post("/", authenticateToken, createItem);

export default itemRouter;

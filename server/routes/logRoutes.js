import express from "express";
import { getLogs } from "../controllers/logController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const logRouter = express.Router();


logRouter.get("/", authenticateToken, getLogs);

export default logRouter;

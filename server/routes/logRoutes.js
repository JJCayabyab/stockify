import express from "express";
import { getLogs, getLogsCount } from "../controllers/logController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const logRouter = express.Router();

logRouter.get("/", authenticateToken, getLogs);
logRouter.get("/count", authenticateToken, getLogsCount);

export default logRouter;

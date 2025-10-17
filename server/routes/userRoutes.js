import express from "express";

import { userCount } from "../controllers/userController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
const userRouter = express.Router();


userRouter.get("/count", authenticateToken, userCount);

export default userRouter;

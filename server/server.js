import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import dotenv from "dotenv";

import authRouter from "./routes/authRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import logRouter from "./routes/logRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

const allowedOrigins = [
  "https://stockify-app.netlify.app",
  "http://localhost:5173",
  "https://stockify-theta-two.vercel.app",

];

//  Handle CORS manually 
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/logs", logRouter);
app.use("/api/users", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

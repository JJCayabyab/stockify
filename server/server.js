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

const corsOptions = {
  origin: ["https://stockify-app.netlify.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); 

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/auth", authRouter);
app.use("/api/items", itemRouter);
app.use("/api/logs", logRouter);
app.use("/api/users", userRouter);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

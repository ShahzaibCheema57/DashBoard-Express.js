// server.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import homeRouter from "./routes/todo.route";
import { connectDB } from "./database/config";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root and health should never depend on DB
app.get("/", (_req, res) => {
  res.send("✅ Server is live. Visit /home for the dashboard data.");
});
app.get("/health", (_req, res) => res.send("OK"));

// Connect to DB only for routes that need it
app.use("/api/todo", async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    next(err);
  }
}, homeRouter);

export default app;

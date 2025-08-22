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

// ✅ Root route
app.get("/", (_req, res) => {
  res.send("✅ Server is live. Visit /home for the dashboard data.");
});

// Health route
app.get("/health", (_req, res) => res.send("OK"));

// Register routes
app.use("/api/todo", homeRouter);

// ✅ Connect DB before handling requests
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });

// 👉 IMPORTANT: Do NOT use app.listen here (Vercel handles it)
export default app;

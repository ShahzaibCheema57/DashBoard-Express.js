// server.ts

// existing imports...
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

const PORT = Number(process.env.PORT) || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
export default app;
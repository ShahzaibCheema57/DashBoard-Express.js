"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// existing imports...
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const config_1 = require("./database/config");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ✅ Root route
app.get("/", (_req, res) => {
    res.send("✅ Server is live. Visit /home for the dashboard data.");
});
// Health route
app.get("/health", (_req, res) => res.send("OK"));
// Register routes
app.use("/api/todo", todo_route_1.default);
const PORT = Number(process.env.PORT) || 5001;
(0, config_1.connectDB)().catch(err => console.error("DB error:", err));
exports.default = app;
//# sourceMappingURL=server.js.map
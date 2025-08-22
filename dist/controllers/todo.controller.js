"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTodo = addTodo;
exports.getAllTodos = getAllTodos;
exports.getOneTodo = getOneTodo;
exports.editTodo = editTodo;
exports.deleteTodo = deleteTodo;
const uuid_1 = require("uuid");
const todo_model_1 = require("../models/todo.model");
/**
 * CREATE  (POST /)
 * Body: { text: string, note?: string, dateKey: "yyyy-MM-dd", done?: boolean, id?: string }
 */
async function addTodo(req, res) {
    try {
        const { text, note, dateKey, done, id } = req.body;
        if (!text || !dateKey) {
            return res
                .status(400)
                .json({ status: "fail", message: "text and dateKey are required" });
        }
        const todo = await todo_model_1.TodoModel.create({
            id: id || (0, uuid_1.v4)(),
            text: String(text).trim(),
            note: typeof note === "string" ? note : "",
            done: typeof done === "boolean" ? done : false,
            dateKey: String(dateKey)
            // createdAt defaults in schema
        });
        return res.status(201).json({ status: "success", data: todo });
    }
    catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}
/**
 * READ ALL  (GET /)
 * Optional query: ?dateKey=YYYY-MM-DD
 */
async function getAllTodos(req, res) {
    try {
        const { dateKey } = req.query;
        const filter = {};
        if (dateKey)
            filter.dateKey = String(dateKey);
        const todos = await todo_model_1.TodoModel.find(filter).sort({ createdAt: -1 });
        return res.status(200).json({
            statusCode: 200,
            message: "Todos fetched successfully",
            data: todos,
        });
    }
    catch (err) {
        return res.status(500).json({
            statusCode: 500,
            message: "Internal Server Error",
            error: err.message,
        });
    }
}
/**
 * READ ONE  (GET /:id)
 */
async function getOneTodo(req, res) {
    try {
        const { id } = req.params;
        const todo = await todo_model_1.TodoModel.findOne({ id });
        if (!todo) {
            return res.status(404).json({ status: "fail", message: "Todo not found" });
        }
        return res.json({ status: "success", data: todo });
    }
    catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}
/**
 * UPDATE  (PUT /:id)
 * Body can include any of: { text?: string, note?: string, done?: boolean, dateKey?: string }
 */
async function editTodo(req, res) {
    try {
        const { id } = req.params;
        const { text, note, done, dateKey } = req.body;
        const updates = {};
        if (typeof text === "string")
            updates.text = text.trim();
        if (typeof note === "string")
            updates.note = note;
        if (typeof done === "boolean")
            updates.done = done;
        if (typeof dateKey === "string")
            updates.dateKey = dateKey;
        if (Object.keys(updates).length === 0) {
            return res
                .status(400)
                .json({ status: "fail", message: "No valid fields provided to update" });
        }
        const updated = await todo_model_1.TodoModel.findOneAndUpdate({ id }, updates, { new: true });
        if (!updated) {
            return res.status(404).json({ status: "fail", message: "Todo not found" });
        }
        return res.json({ status: "success", data: updated });
    }
    catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}
/**
 * DELETE  (DELETE /:id)
 */
async function deleteTodo(req, res) {
    try {
        const { id } = req.params;
        const deleted = await todo_model_1.TodoModel.findOneAndDelete({ id });
        if (!deleted) {
            return res.status(404).json({ status: "fail", message: "Todo not found" });
        }
        return res.json({ status: "success", data: deleted });
    }
    catch (err) {
        return res.status(500).json({ status: "error", message: err.message });
    }
}
//# sourceMappingURL=todo.controller.js.map
// controllers/todo.controller.ts
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoModel } from "../models/todo.model";

/**
 * CREATE  (POST /)
 * Body: { text: string, note?: string, dateKey: "yyyy-MM-dd", done?: boolean, id?: string }
 */
export async function addTodo(req: Request, res: Response) {
  try {
    const { text, note, dateKey, done, id } = req.body;

    if (!text || !dateKey) {
      return res
        .status(400)
        .json({ status: "fail", message: "text and dateKey are required" });
    }

    const todo = await TodoModel.create({
      id: id || uuidv4(),
      text: String(text).trim(),
      note: typeof note === "string" ? note : "",
      done: typeof done === "boolean" ? done : false,
      dateKey: String(dateKey)
      // createdAt defaults in schema
    });

    return res.status(201).json({ status: "success", data: todo });
  } catch (err: any) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

/**
 * READ ALL  (GET /)
 * Optional query: ?dateKey=YYYY-MM-DD
 */
export async function getAllTodos(req: Request, res: Response) {
  try {
    const { dateKey } = req.query;
    const filter: any = {};
    if (dateKey) filter.dateKey = String(dateKey);

    const todos = await TodoModel.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      statusCode: 200,
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (err: any) {
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
export async function getOneTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const todo = await TodoModel.findOne({ id });
    if (!todo) {
      return res.status(404).json({ status: "fail", message: "Todo not found" });
    }
    return res.json({ status: "success", data: todo });
  } catch (err: any) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

/**
 * UPDATE  (PUT /:id)
 * Body can include any of: { text?: string, note?: string, done?: boolean, dateKey?: string }
 */
export async function editTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { text, note, done, dateKey } = req.body;

    const updates: any = {};
    if (typeof text === "string") updates.text = text.trim();
    if (typeof note === "string") updates.note = note;
    if (typeof done === "boolean") updates.done = done;
    if (typeof dateKey === "string") updates.dateKey = dateKey;

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ status: "fail", message: "No valid fields provided to update" });
    }

    const updated = await TodoModel.findOneAndUpdate({ id }, updates, { new: true });
    if (!updated) {
      return res.status(404).json({ status: "fail", message: "Todo not found" });
    }

    return res.json({ status: "success", data: updated });
  } catch (err: any) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

/**
 * DELETE  (DELETE /:id)
 */
export async function deleteTodo(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deleted = await TodoModel.findOneAndDelete({ id });
    if (!deleted) {
      return res.status(404).json({ status: "fail", message: "Todo not found" });
    }
    return res.json({ status: "success", data: deleted });
  } catch (err: any) {
    return res.status(500).json({ status: "error", message: err.message });
  }
}

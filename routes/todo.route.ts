// routes/todo.route.ts
import { Router } from "express";
import {
  addTodo,
  getAllTodos,
  getOneTodo,
  editTodo,
  deleteTodo,
} from "../controllers/todo.controller";

const router = Router();

// CREATE
router.post("/", addTodo);

// READ ALL
router.get("/", getAllTodos);

// READ ONE
router.get("/:id", getOneTodo);

// UPDATE
router.put("/:id", editTodo);

// DELETE
router.delete("/:id", deleteTodo);

export default router;

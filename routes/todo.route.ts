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
router.post("/add", addTodo);

// READ ALL
router.get("/get-all", getAllTodos);

// READ ONE
router.get("/get-one/:id", getOneTodo);

// UPDATE
router.put("/update/:id", editTodo);

// DELETE
router.delete("/delete/:id", deleteTodo);

export default router;

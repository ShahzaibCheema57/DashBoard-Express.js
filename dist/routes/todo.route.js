"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/todo.route.ts
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const router = (0, express_1.Router)();
// CREATE
router.post("/", todo_controller_1.addTodo);
// READ ALL
router.get("/", todo_controller_1.getAllTodos);
// READ ONE
router.get("/:id", todo_controller_1.getOneTodo);
// UPDATE
router.put("/:id", todo_controller_1.editTodo);
// DELETE
router.delete("/:id", todo_controller_1.deleteTodo);
exports.default = router;
//# sourceMappingURL=todo.route.js.map
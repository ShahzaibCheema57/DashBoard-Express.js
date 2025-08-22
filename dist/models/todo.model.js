"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModel = void 0;
// models/todo.model.ts
const mongoose_1 = require("mongoose");
const TodoSchema = new mongoose_1.Schema({
    id: { type: String, required: true, unique: true }, // e.g. "ea92a516-7985-4856-9b59-77fac77f949a"
    text: { type: String, required: true, trim: true }, // e.g. "wefewfer34"
    note: { type: String, default: "" }, // e.g. "q3r32"
    done: { type: Boolean, default: false }, // e.g. false
    createdAt: { type: Date, default: Date.now }, // e.g. "2025-08-22T17:05:36.653Z"
    dateKey: { type: String, required: true } // e.g. "2025-08-22"
}, {
    versionKey: false // disables __v field
});
exports.TodoModel = (0, mongoose_1.model)("Todo", TodoSchema);
//# sourceMappingURL=todo.model.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// api/index.ts
const server_1 = __importDefault(require("../server"));
// Vercel needs a default export that handles requests
exports.default = server_1.default;
//# sourceMappingURL=index.js.map
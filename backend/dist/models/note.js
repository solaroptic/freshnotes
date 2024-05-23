"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String },
    deadline: { type: Number, default: 1 },
    importance: { type: Number, default: 1 },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Note", noteSchema);

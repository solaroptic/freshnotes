"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    // here, select false means that when we query for a user, we wont get the email back
    password: { type: String, required: true, select: false },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("User", userSchema);

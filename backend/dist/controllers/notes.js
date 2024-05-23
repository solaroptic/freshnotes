"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
// import { updateNote } from "./notes";
const http_errors_1 = __importDefault(require("http-errors"));
const note_1 = __importDefault(require("../models/note"));
const mongoose_1 = __importDefault(require("mongoose"));
const assertIsDefined_1 = require("../utils/assertIsDefined");
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        const notes = yield note_1.default.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //notesId matches the routing /:noteId
    const { noteId } = req.params;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(400, "Invalid Note Id");
        }
        const note = yield note_1.default.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(404, "Note not found");
        }
        if (!note.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "Can't access other user's notes");
        }
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNote = getNote;
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = req.body.title;
    const text = req.body.text;
    const deadline = req.body.deadline;
    const importance = req.body.importance;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!title) {
            throw (0, http_errors_1.default)(400, "note must have title");
        }
        //create returns a promise
        const newNote = yield note_1.default.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
            deadline: deadline,
            importance: importance,
        });
        res.status(201).json(newNote);
        // 201 is new resource created
        //body>>raw>>json not text to post object for postman
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const newTitle = req.body.title;
    const newText = req.body.text;
    const newDeadline = req.body.deadline;
    const newImportance = req.body.importance;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(400, "Invalid Note Id");
        }
        if (!newTitle) {
            throw (0, http_errors_1.default)(400, "note must have title");
        }
        if (!newDeadline || !newImportance) {
            throw (0, http_errors_1.default)(400, "note should have urgency rating");
        }
        //create returns a promise
        const note = yield note_1.default.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(404, "note not found");
        }
        if (!note.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "Can't access other user's notes");
        }
        note.title = newTitle;
        note.text = newText;
        note.deadline = newDeadline;
        note.importance = newImportance;
        const updatedNote = yield note.save();
        res.status(200).json(updatedNote);
        // 201 is new resource created
        //body>>raw>>json not text to post object for postman
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const noteId = req.params.noteId;
    const authenticatedUserId = req.session.userId;
    try {
        (0, assertIsDefined_1.assertIsDefined)(authenticatedUserId);
        if (!mongoose_1.default.isValidObjectId(noteId)) {
            throw (0, http_errors_1.default)(400, "Invalid Note Id");
        }
        const note = yield note_1.default.findById(noteId).exec();
        if (!note) {
            throw (0, http_errors_1.default)(404, "Note not found");
        }
        if (!note.userId.equals(authenticatedUserId)) {
            throw (0, http_errors_1.default)(401, "Can't access other user's notes");
        }
        yield note.deleteOne();
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;

// import { updateNote } from "./notes";
import createHttpError from "http-errors";
import { RequestHandler } from "express";
import NoteModel from "../models/note";
import mongoose from "mongoose";
import { assertIsDefined } from "../utils/assertIsDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};
export const getNote: RequestHandler = async (req, res, next) => {
  //notesId matches the routing /:noteId
  const { noteId } = req.params;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }

    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Can't access other user's notes");
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface createNoteBody {
  title?: string;
  text?: string;
  deadline?: number;
  importance?: number;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  createNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const deadline = req.body.deadline;
  const importance = req.body.importance;
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "note must have title");
    }
    //create returns a promise
    const newNote = await NoteModel.create({
      userId: authenticatedUserId,
      title: title,
      text: text,
      deadline: deadline,
      importance: importance,
    });
    res.status(201).json(newNote);
    // 201 is new resource created
    //body>>raw>>json not text to post object for postman
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}
interface UpdateNoteBody {
  title?: string;
  text?: string;
  deadline?: number;
  importance?: number;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const newDeadline = req.body.deadline;
  const newImportance = req.body.importance;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }

    if (!newTitle) {
      throw createHttpError(400, "note must have title");
    }
    if (!newDeadline || !newImportance) {
      throw createHttpError(400, "note should have urgency rating");
    }

    //create returns a promise
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "note not found");
    }
    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Can't access other user's notes");
    }

    note.title = newTitle;
    note.text = newText;
    note.deadline = newDeadline;
    note.importance = newImportance;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
    // 201 is new resource created
    //body>>raw>>json not text to post object for postman
  } catch (error) {
    next(error);
  }
};
export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid Note Id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }
    if (!note.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Can't access other user's notes");
    }

    await note.deleteOne();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

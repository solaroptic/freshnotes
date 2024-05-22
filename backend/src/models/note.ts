import { InferSchemaType, model, Schema } from "mongoose";

const noteSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    // userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    text: { type: String },
    deadline: { type: Number, default: 1 },
    importance: { type: Number, default: 1 },
  },
  { timestamps: true }
);
//special TS jazz
type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("Note", noteSchema);

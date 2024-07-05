import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, select: false },
    // here, select false means that when we query for a user, we wont get the email back
    password: { type: String, required: true, select: false },
  },
  { timestamps: true }
);
//special TS jazz
type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);

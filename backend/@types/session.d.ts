import mongoose from "mongoose";

declare module "express-session" {
  interface SessionData {
    userId: mongoose.Types.ObjectId;
  }
}
// what this does is it extends the SessionData interface from the express-session module, adding a userId property of type mongoose.Types.ObjectId

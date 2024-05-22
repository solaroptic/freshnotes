import app from "./app";
import env from "./utils/validateEnv";
import mongoose from "mongoose";

const port = env.PORT || 5000;
console.log("🎟", env.PORT);

mongoose
  .connect(env.MONGO_CONNECTION)
  .then(() => {
    console.log("Mongoose Connected");
    app.listen(port, () => {
      console.log("Server exploding out of " + port);
    });
  })
  .catch(console.error);

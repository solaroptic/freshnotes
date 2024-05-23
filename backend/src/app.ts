import cors from "cors";
import "dotenv/config"; //autocalls config
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import morgan from "morgan";
//npm i --save-dev @types/morgan
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./utils/validateEnv";
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";
import path from "path";

const app = express();

if (env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get(/^(?!\/api).\*/, (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"))
  );
  // app.get("*", (req, res) =>
  //   res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"))
  // );
} else {
  app.get("/", (req, res) => res.send("server is ready"));
}

app.use(
  cors({
    origin: env.CLIENT_ORIGIN,
    credentials: true,
  })
);

app.use(morgan("dev"));
//dev

app.use(express.json());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 14 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION,
    }),
  })
);

app.use("/api/users", userRoutes);
// app.use("/api/notes", notesRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);
//use middleware here for all notes routes

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
  //goes to my server log
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unknown error has occured";
  let statusCode = 500;
  // if (error instanceof Error) errorMessage = error.message;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;

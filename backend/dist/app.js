"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
require("dotenv/config"); //autocalls config
const express_1 = __importDefault(require("express"));
const notes_1 = __importDefault(require("./routes/notes"));
const users_1 = __importDefault(require("./routes/users"));
const morgan_1 = __importDefault(require("morgan"));
//npm i --save-dev @types/morgan
const http_errors_1 = __importStar(require("http-errors"));
const express_session_1 = __importDefault(require("express-session"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const auth_1 = require("./middleware/auth");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
if (validateEnv_1.default.NODE_ENV === "production") {
    const __dirname = path_1.default.resolve();
    app.use(express_1.default.static(path_1.default.join(__dirname, "../client/dist")));
    app.get(/^(?!\/api).\*/, (req, res) => res.sendFile(path_1.default.resolve(__dirname, "..", "client", "dist", "index.html")));
    // app.get("*", (req, res) =>
    //   res.sendFile(path.resolve(__dirname, "..", "client", "dist", "index.html"))
    // );
}
else {
    app.get("/", (req, res) => res.send("server is ready"));
}
app.use((0, cors_1.default)({
    origin: validateEnv_1.default.CLIENT_ORIGIN,
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
//dev
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: validateEnv_1.default.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 14 * 60 * 60 * 1000,
    },
    rolling: true,
    store: connect_mongo_1.default.create({
        mongoUrl: validateEnv_1.default.MONGO_CONNECTION,
    }),
}));
app.use("/api/users", users_1.default);
// app.use("/api/notes", notesRoutes);
app.use("/api/notes", auth_1.requiresAuth, notes_1.default);
//use middleware here for all notes routes
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404, "Endpoint not found"));
    //goes to my server log
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "An unknown error has occured";
    let statusCode = 500;
    // if (error instanceof Error) errorMessage = error.message;
    if ((0, http_errors_1.isHttpError)(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
exports.default = app;

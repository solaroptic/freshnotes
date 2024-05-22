import { cleanEnv } from "envalid";
import { port, str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  MONGO_CONNECTION: str(),
  PORT: port(),
  SESSION_SECRET: str(),
  NODE_ENV: str(),
  CLIENT_ORIGIN: str(),
});

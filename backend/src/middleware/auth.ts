import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const requiresAuth: RequestHandler = (req, res, next) => {
  if (req.session.userId) {
    next();
  } else {
    next(createHttpError(401, "unauthorized"));
  }
};
// here we are checking if the session has a userId, if it does, we call next() to move on to the next middleware, if it doesn't, we call next() with an error to stop the request and return an error to the client
//RequestHandler is a type from express that defines the function signature of a middleware, it takes 4 arguments, the first 3 are the same as the normal express middleware, the 4th is the type of the response object, in this case we don't care about the response object so we use unknown

// export const requiresAuth: RequestHandler = async (req, res, next) => {
//   if (!req.session.userId) {
//     return next(createHttpError(401, "unauthorized"));
//   }
//   next();
// };

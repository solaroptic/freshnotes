import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/user";
import bcrypt from "bcrypt";

export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
  try {
    // if (!authenticatedUserId) {
    //   throw createHttpError(401, "User not authenticated");
    // }
    //middleware already checks for auth, so we can just get the user
    const user = await UserModel.findById(req.session.userId)
      .select("+email")
      .exec();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

interface SignUpBody {
  username?: string;
  email?: string;
  password?: string;
}

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const passwordRaw = req.body.password;
  try {
    if (!username || !email || !passwordRaw) {
      throw createHttpError(400, "parameters missing");
    }
    //username check
    const existingUsername = await UserModel.findOne({
      username: username,
    }).exec();

    if (existingUsername) {
      throw createHttpError(409, "username already exists");
    }
    //email check
    const existingEmail = await UserModel.findOne({
      email: email,
    }).exec();

    if (existingEmail) {
      throw createHttpError(409, "email already exists");
    }

    //pass hashhhhhhhhhh
    const passwordHashed = await bcrypt.hash(passwordRaw, 10);

    const newUser = await UserModel.create({
      username: username,
      email: email,
      password: passwordHashed,
    });
    req.session.userId = newUser._id;
    await req.session.save();

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

interface LoginBody {
  username?: string;
  password?: string;
}

export const login: RequestHandler<
  unknown,
  unknown,
  LoginBody,
  unknown
> = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    if (!username || !password) {
      throw createHttpError(400, "Parameters missing");
    }
    const user = await UserModel.findOne({ username: username })
      .select("+password +email")
      .exec();
    //select and + because we took pass and email out of responses in model, here, we put back in
    if (!user) {
      throw createHttpError(401, "Invalid credentials💂");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw createHttpError(401, "Invalid credentials");
    }

    req.session.userId = user._id;
    await req.session.save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};
export const logout: RequestHandler = (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(200);
      //sendStatus here because were not returning a body
    }
  });
};

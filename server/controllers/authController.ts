import User from "../db/models/user";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import {
  ResponseType,
  ErrorResponse,
  SuccessResponse,
} from "../utils/response";
import jwt from "jsonwebtoken";
import ENV from "../utils/env";
import { SignInParams, SignInResponse, SignUpParams, UserType } from "./types";

class AuthController {
  //signup
  static signup = async (
    req: Request<{}, {}, SignUpParams>,
    res: Response<ResponseType<UserType>>
  ) => {
    try {
      if (!req.body.userName || !req.body.email || !req.body.password) {
        throw new Error("Invalid parameters");
      }

      const userexists = await User.findOne({ email: req.body.email });
      if (userexists) {
        throw new Error("User already exist with this email");
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
      });

      const user = await newUser.save();
      res.status(200).json(
        SuccessResponse({
          userName: user.userName,
          email: user.email,
          id: user.id as string,
        })
      );
    } catch (error: any) {
      if (error?.message) {
        res.status(500).json(ErrorResponse(error.message));
      } else {
        res.status(500).json(ErrorResponse("Something went wrong"));
      }
    }
  };

  static signin = async (
    req: Request<{}, {}, SignInParams>,
    res: Response<ResponseType<SignInResponse>>
  ) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        throw new Error("User not found");
      } else {
        const validpassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validpassword) {
          throw new Error("Invalid username or password");
        }

        const userData = {
          userName: user.userName,
          email: user.email,
          id: user.id as string,
        };

        const token = jwt.sign(userData, ENV.JWT_SECRET!, {
          expiresIn: "1d",
        });

        res.status(200).json(SuccessResponse({ ...userData, token }));
      }
    } catch (error: any) {
      if (error?.message) {
        res.status(500).json(ErrorResponse(error.message));
      } else {
        res.status(500).json(ErrorResponse("Something went wrong"));
      }
    }
  };

  static getProfile = async (req: Request, res: Response) => {
    res.status(200).json(SuccessResponse(res.locals.user));
  };

  static authChecker = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.headers["session_id"];
    if (!token) return res.status(401).send(ErrorResponse("Session Expired"));

    jwt.verify(token as string, ENV.JWT_SECRET!, (err: any, decoded: any) => {
      if (err) return res.status(401).send(ErrorResponse("Session Expired"));
      res.locals.user = decoded;
      next();
    });
  };
}

export default AuthController;

import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import { ErrorHandler } from "../errors/errors";
import { userRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.validated as User;
  const user: User = await userRepository.retrieve({ email: userData.email });

  if (user) {
    throw new ErrorHandler(409, "Email already registered");
  }

  return next();
};

export default verifyUserExists;

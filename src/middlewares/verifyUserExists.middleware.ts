import { NextFunction, Request, Response } from "express";
import { Company, User } from "../entities";
import { ErrorHandler } from "../errors/errors";
import { userRepository, companyRepository } from "../repositories";

const verifyUserExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.validated as User;
  const user: User = await userRepository.retrieve({ email: userData.email });
  const company: Company = await companyRepository.retrieve({
    email: userData.email,
  });

  if (user || company) {
    throw new ErrorHandler(409, "Email already registered");
  }

  return next();
};

export default verifyUserExists;

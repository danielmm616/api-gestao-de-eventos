import { Request } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../entities";
import { ErrorHandler } from "../errors/errors";
import { userRepository } from "../repositories";
import { serializedCreateUserSchema } from "../schemas/user/create.schema";
import dotenv from "dotenv";
import { serializedUsersSchema } from "../schemas";

dotenv.config();

class UserService {
  register = async ({ validated }: Request) => {
    const user: User = await userRepository.save(validated as User);

    return await serializedCreateUserSchema.validate(user, {
      stripUnknown: true,
    });
  };

  login = async (req: Request) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userRepository.retrieve({ email });

    if (!user) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const matchPwd = await user.comparePwd(password);

    if (!matchPwd) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const token = sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  };

  getById = async (id: string) => {
    const user = await userRepository.retrieve({ id });
    return await serializedCreateUserSchema.validate(user, {
      stripUnknown: true,
    });
  };

  getAll = async () => {
    const users = await userRepository.getAll();
    return await serializedUsersSchema.validate(users, {
      stripUnknown: true,
    });
  };
}

export default new UserService();

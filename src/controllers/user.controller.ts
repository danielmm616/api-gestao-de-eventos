import { Request, Response } from "express";
import { User } from "../entities";
import { userService } from "../services";

class UserController {
  register = async (req: Request, res: Response) => {
    const user = await userService.register(req);

    return res.status(201).json(user);
  };

  login = async (req: Request, res: Response) => {
    const token = await userService.login(req);

    return res.status(200).json({ token });
  };

  getById = async (req: Request, res: Response) => {
    const user = await userService.getById(req.params.id);

    return res.status(200).json(user);
  };

  getAll = async (req: Request, res: Response) => {
    const users = await userService.getAll();

    return res.status(200).json(users);
  };
}

export default new UserController();

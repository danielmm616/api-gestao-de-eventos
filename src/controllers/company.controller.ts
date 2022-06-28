import { Request, Response } from "express";
import { companyService } from "../services";

class CompanyController {
  register = async (req: Request, res: Response) => {
    const user = await companyService.register(req);

    return res.status(201).json(user);
  };

  login = async (req: Request, res: Response) => {
    const token = await companyService.login(req);

    return res.status(200).json({ token });
  };

  getById = async (req: Request, res: Response) => {
    const user = await companyService.getById(req.params.id);

    return res.status(200).json(user);
  };

  getAll = async (req: Request, res: Response) => {
    const users = await companyService.getAll();

    return res.status(200).json(users);
  };
}

export default new CompanyController();

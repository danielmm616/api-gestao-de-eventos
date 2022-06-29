import { Request, Response } from "express";
import { ratingService } from "../services";

class RatingController {
  create = async (req: Request, res: Response) => {
    const rating = await ratingService.create(req);

    return res.status(201).json(rating);
  };

  getAll = async (req: Request, res: Response) => {
    const ratings = await ratingService.getAll(req);

    return res.status(200).json(ratings);
  };

  delete = async (req: Request, res: Response) => {
    const rating = await ratingService.delete(req);

    return res.status(204).json(rating);
  };

  update = async (req: Request, res: Response) => {
    const rating = await ratingService.update(req);

    return res.status(200).json(rating);
  };
}

export default new RatingController();

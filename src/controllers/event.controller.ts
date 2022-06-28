import { Request, Response } from "express";
import { eventService } from "../services";

class EventController {
  create = async (req: Request, res: Response) => {
    const event = await eventService.create(req);

    return res.status(201).json(event);
  };

  getAll = async (req: Request, res: Response) => {
    const events = await eventService.getAll();

    return res.status(200).json(events);
  };

  getById = async (req: Request, res: Response) => {
    const event = await eventService.getById(req.params.id);

    return res.status(200).json(event);
  };

  delete = async (req: Request, res: Response) => {
    await eventService.delete(req.params.id, req);

    return res.status(204).json();
  };

  closeEvent = async (req: Request, res: Response) => {
    await eventService.closeEvent(req.params.id, req);

    return res.status(204).json();
  };
}

export default new EventController();

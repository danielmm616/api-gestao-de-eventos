import { Request, Response } from "express";
import { orderService } from "../services";

class OrderController {
  create = async (req: Request, res: Response) => {
    const order = await orderService.create(req);

    return res.status(201).json(order);
  };

  getAll = async (req: Request, res: Response) => {
    const orders = await orderService.getAll(req);

    return res.status(200).json(orders);
  };

  cancel = async (req: Request, res: Response) => {
    const order = await orderService.cancel(req);

    return res.status(200).json(order);
  };

  pay = async (req: Request, res: Response) => {
    const order = await orderService.pay(req);

    return res.status(200).json(order);
  };
}

export default new OrderController();

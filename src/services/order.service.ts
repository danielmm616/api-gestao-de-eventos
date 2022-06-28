import { Request } from "express";
import { Order, User, Invoice } from "../entities";
import { ErrorHandler } from "../errors/errors";
import {
  eventRepository,
  orderRepository,
  userRepository,
  invoiceRepository,
} from "../repositories";
import { serializedOrdersSchema } from "../schemas";

class OrderService {
  create = async (req: Request) => {
    const user = await userRepository.retrieve({ id: req.decoded.id });
    const event = await eventRepository.retrieve({ id: req.params.eventId });
    const quantity = req.body.quantity;

    if (!event) {
      throw new ErrorHandler(404, "Event not found");
    }

    const order = {
      user: user,
      event: event,
      quantity: quantity,
      price: event.price,
    };

    const newOrder = await orderRepository.save(order as Order);

    return newOrder;
  };

  getAll = async (req: Request) => {
    const orders = (await orderRepository.getAll()).filter(
      (order) => order.user.id === req.decoded.id
    );

    return await serializedOrdersSchema.validate(orders, {
      stripUnknown: true,
    });
  };

  cancel = async (req: Request) => {
    const order = await orderRepository.retrieve({ id: req.params.id });
    const user = await userRepository.retrieve({ id: req.decoded.id });

    if (user.id !== order.user.id) {
      throw new ErrorHandler(401, "You must be the user to cancel an order");
    }

    if (!order) {
      throw new ErrorHandler(404, "Order not found");
    }

    if (order.invoice) {
      throw new ErrorHandler(400, "Order has been paid");
    }

    await orderRepository.delete(order.id);
    return order;
  };

  pay = async (req: Request) => {
    const order = await orderRepository.retrieve({ id: req.params.id });
    const user = await userRepository.retrieve({ id: req.decoded.id });

    if (order.invoice) {
      throw new ErrorHandler(409, "Order already paid");
    }

    if (user.id !== order.user.id) {
      throw new ErrorHandler(401, "You must be the user to pay an order");
    }

    if (!order) {
      throw new ErrorHandler(404, "Order not found");
    }

    const invoice = {
      event: order.event,
      purchaseDate: new Date(),
      totalPrice: order.price * order.quantity,
    };

    const newInvoice = await invoiceRepository.save(invoice as Invoice);

    order.invoice = newInvoice;

    await orderRepository.save(order as Order);

    return newInvoice;
  };
}

export default new OrderService();

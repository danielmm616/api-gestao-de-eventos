import { Router } from "express";

// controller
import { orderController } from "../controllers";

// middleware
import { validateSchema, validateToken } from "../middlewares";
import { createOrderSchema } from "../schemas";

// routes
const orderRoute = Router();

orderRoute.post(
  "/:eventId/create",
  validateSchema(createOrderSchema),
  validateToken,
  orderController.create
);
orderRoute.get("/", validateToken, orderController.getAll);
orderRoute.delete("/:id", validateToken, orderController.cancel);
orderRoute.put("/:id/pay", validateToken, orderController.pay);

export default orderRoute;

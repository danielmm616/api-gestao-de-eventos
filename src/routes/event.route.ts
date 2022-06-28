import { Router } from "express";

// controller
import { eventController } from "../controllers";

// middleware
import { validateSchema, validateToken } from "../middlewares";
import { createEventSchema } from "../schemas";

//routes
const eventRoute = Router();

eventRoute.post(
  "/create",
  validateSchema(createEventSchema),
  validateToken,
  eventController.create
);
eventRoute.get("/", validateToken, eventController.getAll);
eventRoute.get("/:id", validateToken, eventController.getById);
eventRoute.delete("/:id", validateToken, eventController.delete);
eventRoute.put("/:id/close", validateToken, eventController.closeEvent);

export default eventRoute;

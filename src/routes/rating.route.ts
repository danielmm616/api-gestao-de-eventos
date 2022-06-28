import { Router } from "express";

// controller
import { ratingController } from "../controllers";

// middleware
import { validateSchema, validateToken } from "../middlewares";
import { createRatingSchema, ratingUpdateSchema } from "../schemas";

// routes
const ratingRoute = Router();

ratingRoute.post(
  "/:eventId",
  validateSchema(createRatingSchema),
  validateToken,
  ratingController.create
);
ratingRoute.get("/:eventId", validateToken, ratingController.getAll);
ratingRoute.patch(
  "/:id",
  validateSchema(ratingUpdateSchema),
  validateToken,
  ratingController.update
);
ratingRoute.delete("/:id", validateToken, ratingController.delete);

export default ratingRoute;

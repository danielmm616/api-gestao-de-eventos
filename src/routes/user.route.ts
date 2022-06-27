import { Router } from "express";

// controller
import { userController } from "../controllers";

// middleware
import {
  validateSchema,
  verifyUserExists,
  getUserOr404,
  validateToken,
} from "../middlewares";
import { createUserSchema, loginUserSchema } from "../schemas";

const userRoute = Router();

userRoute.post(
  "/register",
  validateSchema(createUserSchema),
  verifyUserExists,
  userController.register
);
userRoute.post("/login", validateSchema(loginUserSchema), userController.login);
userRoute.get("/:id", validateToken, getUserOr404, userController.getById);
userRoute.get("/", validateToken, userController.getAll);

export default userRoute;

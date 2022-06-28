import { Router } from "express";

// controller
import { companyController } from "../controllers";

// middleware
import {
  validateSchema,
  verifyUserExists,
  validateToken,
} from "../middlewares";
import { createCompanySchema, loginCompanySchema } from "../schemas";

//routes
const companyRoute = Router();

companyRoute.post(
  "/register",
  validateSchema(createCompanySchema),
  verifyUserExists,
  companyController.register
);
companyRoute.post(
  "/login",
  validateSchema(loginCompanySchema),
  companyController.login
);
companyRoute.get("/:id", validateToken, companyController.getById);
companyRoute.get("/", validateToken, companyController.getAll);

export default companyRoute;

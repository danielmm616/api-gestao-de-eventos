import { Express } from "express";
import companyRoute from "./company.route";
import userRoute from "./user.route";

const registerRouters = (app: Express) => {
  app.use("/api/users", userRoute);
  app.use("/api/companies", companyRoute);
};

export default registerRouters;

import { Express } from "express";
import companyRoute from "./company.route";
import eventRoute from "./event.route";
import orderRoute from "./order.route";
import ratingRoute from "./rating.route";
import userRoute from "./user.route";

const registerRouters = (app: Express) => {
  app.use("/api/users", userRoute);
  app.use("/api/companies", companyRoute);
  app.use("/api/events", eventRoute);
  app.use("/api/orders", orderRoute);
  app.use("/api/ratings", ratingRoute);
};

export default registerRouters;

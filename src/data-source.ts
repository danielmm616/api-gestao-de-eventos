import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const AppDataSource = {
  docker: new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
  }),
  test: new DataSource({
    type: "sqlite",
    database: ":memory:",
    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    synchronize: true,
  }),
};

export default AppDataSource[process.env.NODE_ENV];

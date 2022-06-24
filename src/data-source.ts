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
  production: new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    logging: false,
    synchronize: true,
    ssl: { rejectUnauthorized: false },
    entities: [path.join(__dirname, "./entities/**/*.{js,ts}")],
    migrations: [path.join(__dirname, "./migrations/**/*.{js,ts}")],
  }),
};

export default AppDataSource[process.env.NODE_ENV];

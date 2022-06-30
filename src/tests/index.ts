import AppDataSource from "../data-source";
import { DataSource } from "typeorm";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { faker } from "@faker-js/faker";

config();

export class Connection {
  connection: DataSource;

  connect = async () => {
    await AppDataSource.initialize()
      .then((res) => (this.connection = res))
      .catch((err) => console.log("Error during db connection", err));
  };

  disconnect = async () => {
    await this.connection.destroy();
  };
}

const connection = new Connection();

const generateUser = () => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.datatype.string(4).toLowerCase(),
    bio: faker.lorem.sentence(),
  };
};

const generateCompany = () => {
  return {
    name: faker.company.companyName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.datatype.string(4).toLowerCase(),
    bio: faker.lorem.sentence(),
  };
};

const generateEvent = () => {
  return {
    name: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    price: 50.0,
    date: faker.date.future(),
    location: faker.address.city(),
    time: "14:00",
  };
};

const generateRating = () => {
  return {
    stars: 2,
    title: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
  };
};

const generateToken = (user): string => {
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY as string, {
    expiresIn: process.env.EXPIRES_IN,
  });

  return token;
};

export {
  connection,
  generateUser,
  generateCompany,
  generateToken,
  generateEvent,
  generateRating,
};

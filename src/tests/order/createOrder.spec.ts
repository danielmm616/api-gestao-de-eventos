import {
  connection,
  generateCompany,
  generateEvent,
  generateToken,
  generateUser,
} from "..";
import { Company, Event, User } from "../../entities";
import supertest from "supertest";
import app from "../../app";
import {
  companyRepository,
  eventRepository,
  userRepository,
} from "../../repositories";

describe("Create Order", () => {
  let event: Event;
  let company: Company;
  let user: User;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
    company = await companyRepository.save({ ...generateCompany() });
    event = await eventRepository.save({ ...generateEvent() });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.disconnect();
  });

  it("Should create a new order | Status code: 201", async () => {
    const response = await supertest(app)
      .post(`/api/orders/${event.id}/create`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ quantity: 2 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not create a new order with a non-existent event | Status code: 404", async () => {
    const newEvent = await eventRepository.save({ ...generateEvent() });

    const response = await supertest(app)
      .post(`/api/orders/4fsa64f56/create`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ quantity: 2 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Event not found");
  });
});

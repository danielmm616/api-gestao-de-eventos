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

describe("Get Orders", () => {
  let company: Company;
  let event: Event;
  let user: User;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
    company = await companyRepository.save({ ...generateCompany() });
    event = await eventRepository.save({ ...generateEvent() });

    await supertest(app)
      .post(`/api/orders/${event.id}/create`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ quantity: 2 });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should get all user orders | Status code: 200", async () => {
    const newEvent = await eventRepository.save({ ...generateEvent() });

    await supertest(app)
      .post(`/api/orders/${newEvent.id}/create`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ quantity: 2 });

    const response = await supertest(app)
      .get(`/api/orders`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should not get orders if user dont have any order | Status code: 404", async () => {
    const newUser = await userRepository.save({ ...generateUser() });

    const response = await supertest(app)
      .get(`/api/orders`)
      .set("Authorization", `Bearer ${generateToken(newUser)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("You dont have any orders");
  });
});

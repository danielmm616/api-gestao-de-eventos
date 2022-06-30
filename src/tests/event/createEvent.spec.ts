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

describe("Create Event", () => {
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
    await connection.disconnect();
  });

  it("Should create a new event | Status code: 201", async () => {
    const response = await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${generateToken(company)}`)
      .send({ ...generateEvent() });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.active).toBe(true);
  });

  it("Should not create a new event with invalid token | Status code: 401", async () => {
    const response = await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${generateToken(company)}123`)
      .send({ ...generateEvent() });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("invalid signature");
  });

  it("Should not create a new event with missing token | Status code: 401", async () => {
    const response = await supertest(app)
      .post("/api/events/create")
      .send({ ...generateEvent() });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing authorization token.");
  });

  it("Should not create a new event with jwt malformed | Status code: 401", async () => {
    const response = await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer asf64sa5123`)
      .send({ ...generateEvent() });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("jwt malformed");
  });

  it("Should not create a new event being a user", async () => {
    const response = await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ ...generateEvent() });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be a company to create an event"
    );
  });
});

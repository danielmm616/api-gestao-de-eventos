import {
  connection,
  generateCompany,
  generateEvent,
  generateToken,
  generateUser,
  generateRating,
} from "..";
import { Company, Event, User, Rating } from "../../entities";
import supertest from "supertest";
import app from "../../app";
import {
  companyRepository,
  eventRepository,
  userRepository,
  ratingRepository,
} from "../../repositories";

describe("Create Rating", () => {
  let event: Event;
  let company: Company;
  let user: User;
  let rating: Rating;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
    company = await companyRepository.save({ ...generateCompany() });
    event = await eventRepository.save({ ...generateEvent() });
    rating = await ratingRepository.save({ ...generateRating() });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.disconnect();
  });

  it("Should create a new rating | Status code: 201", async () => {
    const response = await supertest(app)
      .post(`/api/ratings/${event.id}`)
      .set("Authorization", `Bearer ${generateToken(company)}`)
      .send({ ...generateRating() });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not create a new rating with a non-existent event | Status code: 404", async () => {
    const newEvent = await eventRepository.save({ ...generateEvent() });

    const response = await supertest(app)
      .post(`/api/ratings/${newEvent.id}131`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ ...generateRating() });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Event not found");
  });

  it("Should not create a new rating with invalid token | Status code: 401", async () => {
    const response = await supertest(app)
      .post(`/api/ratings/${event.id}`)
      .set("Authorization", `Bearer ${generateToken(company)}123`)
      .send({ ...generateRating() });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("invalid signature");
  });

  it("Should not create a new rating with missing token | Status code: 401", async () => {
    const response = await supertest(app)
      .post(`/api/ratings/${event.id}`)
      .send({ ...generateRating() });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing authorization token.");
  });

  it("Should not create a new rating with jwt malformed | Status code: 401", async () => {
    const response = await supertest(app)
      .post(`/api/ratings/${event.id}`)
      .set("Authorization", `Bearer asf64sa5123`)
      .send({ ...generateRating() });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("jwt malformed");
  });
});

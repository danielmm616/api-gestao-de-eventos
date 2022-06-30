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

describe("Get Ratings", () => {
  let event: Event;
  let company: Company;
  let user: User;
  let rating: Rating;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
    company = await companyRepository.save({ ...generateCompany() });
    event = await eventRepository.save({ ...generateEvent() });

    await supertest(app)
      .post(`/api/ratings/${event.id}`)
      .set("Authorization", `Bearer ${generateToken(company)}`)
      .send({ ...generateRating() });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should get all ratings | Status code: 200", async () => {
    const newEvent = await eventRepository.save({ ...generateEvent() });

    await supertest(app)
      .post(`/api/ratings/${newEvent.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ ...generateRating() });

    const response = await supertest(app)
      .get(`/api/ratings/${newEvent.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should not get all ratings with a non-existent event | Status code: 404", async () => {
    const response = await supertest(app)
      .get(`/api/ratings/465465dasda4131`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("No ratings found");
  });
});

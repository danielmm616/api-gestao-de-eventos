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

describe("Update Ratings", () => {
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

  it("Should update a rating | Status code: 200", async () => {
    const comment = await supertest(app)
      .post(`/api/ratings/${event.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ ...generateRating() });

    const response = await supertest(app)
      .patch(`/api/ratings/${comment.body.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ stars: 5 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.stars).toBe(5);
  });

  it("Should not update a rating with a non-existent rating | Status code: 404", async () => {
    const response = await supertest(app)
      .patch(`/api/ratings/${rating.id + 1}`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ stars: 5 });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Rating not found");
  });

  it("Should not update a rating that is not yours", async () => {
    const newUser = await userRepository.save({ ...generateUser() });
    const newEvent = await eventRepository.save({ ...generateEvent() });
    const anotherUser = await userRepository.save({ ...generateUser() });

    const comment = await supertest(app)
      .post(`/api/ratings/${newEvent.id}`)
      .set("Authorization", `Bearer ${generateToken(newUser)}`)
      .send({ ...generateRating() });

    const response = await supertest(app)
      .patch(`/api/ratings/${comment.body.id}`)
      .set("Authorization", `Bearer ${generateToken(anotherUser)}`)
      .send({ stars: 5 });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be the user to update a rating"
    );
  });
});

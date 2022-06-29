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

describe("Delete Ratings", () => {
  let event: Event;
  let company: Company;
  let user: User;
  let rating: Partial<Rating> = generateRating();

  beforeAll(async () => {
    await connection.connect();

    event = await eventRepository.save({ ...generateEvent() });
    user = await userRepository.save({ ...generateUser() });

    await supertest(app)
      .post(`/api/ratings/${event.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ ...rating });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.disconnect();
  });

  it("Should not delete a rating with a non-existent rating | Status code: 404", async () => {
    const response = await supertest(app)
      .delete(`/api/ratings/${rating.id + 1}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Rating not found");
  });

  it("Should not delete a rating that is not yours | Status code: 401", async () => {
    const findRate = await ratingRepository.retrieve({ ...rating });
    const anotherUser = await userRepository.save({ ...generateUser() });

    const response = await supertest(app)
      .delete(`/api/ratings/${findRate.id}`)
      .set("Authorization", `Bearer ${generateToken(anotherUser)}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be the user to delete a rating"
    );
  });

  it("Should delete a rating | Status code: 204", async () => {
    const findRate = await ratingRepository.retrieve({ ...rating });

    const response = await supertest(app)
      .delete(`/api/ratings/${findRate.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(204);
  });
});

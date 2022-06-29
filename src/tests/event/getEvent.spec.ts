import {
  connection,
  generateUser,
  generateToken,
  generateEvent,
} from "../../tests";
import supertest from "supertest";
import app from "../../app";
import { userRepository, eventRepository } from "../../repositories";
import { User, Event } from "../../entities";

describe("Get Events", () => {
  let user: User;
  let event: Event;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
    event = await eventRepository.save({ ...generateEvent() });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should get all events | Status code: 200", async () => {
    const response = await supertest(app)
      .get("/api/events")
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should get an event by id | Status code: 200", async () => {
    const response = await supertest(app)
      .get(`/api/events/${event.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not get a non-existent event| Status code: 404", async () => {
    const response = await supertest(app)
      .get(`/api/events/d4as6465`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Event not found");
  });

  it("Should not get an event missing token | Status code: 401", async () => {
    const response = await supertest(app).get(`/api/events/${event.id + 1}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing authorization token.");
  });

  it("Should not get an event with invalid token | Status code: 401", async () => {
    const response = await supertest(app)
      .get(`/api/events/${event.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}123`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("invalid signature");
  });

  it("Should not get an event with jwt malformed | Status code: 401", async () => {
    const response = await supertest(app)
      .get(`/api/events/${event.id}`)
      .set("Authorization", `Bearer 41646asd6s44as`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("jwt malformed");
  });
});

import {
  connection,
  generateToken,
  generateEvent,
  generateCompany,
  generateUser,
} from "../../tests";
import supertest from "supertest";
import app from "../../app";
import {
  companyRepository,
  eventRepository,
  userRepository,
} from "../../repositories";
import { Company, Event, User } from "../../entities";

describe("Delete Events", () => {
  let company: Company;
  let event: Partial<Event> = generateEvent();
  let user: User;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
    company = await companyRepository.save({ ...generateCompany() });

    await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${generateToken(company)}`)
      .send({ ...event });
  });

  afterAll(async () => {
    await connection.clear();
    await connection.disconnect();
  });

  it("Should not delete an event being a user | Status code: 401", async () => {
    let findedEvent = await eventRepository.retrieve({ ...event });

    const response = await supertest(app)
      .delete(`/api/events/${findedEvent.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    findedEvent = await eventRepository.retrieve({ ...event });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be a company to delete an event"
    );
  });

  it("Should not delete an event not yours | Status code: 401", async () => {
    let findedEvent = await eventRepository.retrieve({ ...event });
    const notOwnerCompany = await companyRepository.save({
      ...generateCompany(),
    });

    const response = await supertest(app)
      .delete(`/api/events/${findedEvent.id}`)
      .set("Authorization", `Bearer ${generateToken(notOwnerCompany)}`);

    findedEvent = await eventRepository.retrieve({ ...event });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be the company to delete an event"
    );
  });

  it("Should delete an event | Status code: 204", async () => {
    let findedEvent = await eventRepository.retrieve({ name: event.name });

    const response = await supertest(app)
      .delete(`/api/events/${findedEvent.id}`)
      .set("Authorization", `Bearer ${generateToken(company)}`);

    findedEvent = await eventRepository.retrieve({ name: event.name });

    expect(response.status).toBe(204);
    expect(findedEvent).toBe(null);
  });

  it("Should not delete a non-existent event | Status code: 404", async () => {
    const response = await supertest(app)
      .delete(`/api/events/d4as6465`)
      .set("Authorization", `Bearer ${generateToken(company)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Event not found");
  });

  it("Should not delete an event missing token | Status code: 401", async () => {
    const response = await supertest(app).delete(`/api/events/${event.id + 1}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing authorization token.");
  });
});

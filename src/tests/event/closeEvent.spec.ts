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

describe("Close Events", () => {
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
    await connection.disconnect();
  });

  it("Should close an event | Status code: 204", async () => {
    let findedEvent = await eventRepository.retrieve({ name: event.name });

    const response = await supertest(app)
      .put(`/api/events/${findedEvent.id}/close`)
      .set("Authorization", `Bearer ${generateToken(company)}`);

    findedEvent = await eventRepository.retrieve({ name: event.name });

    expect(response.status).toBe(204);
    expect(findedEvent.active).toBe(false);
  });

  it("Should not close a non-existent event | Status code: 404", async () => {
    const response = await supertest(app)
      .put(`/api/events/165165fds/close`)
      .set("Authorization", `Bearer ${generateToken(company)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Event not found");
  });

  it("Should not close an event not yours | Status code: 401", async () => {
    let findedEvent = await eventRepository.retrieve({ name: event.name });
    const notOwnerCompany = await companyRepository.save({
      ...generateCompany(),
    });

    const response = await supertest(app)
      .put(`/api/events/${findedEvent.id}/close`)
      .set("Authorization", `Bearer ${generateToken(notOwnerCompany)}`);

    findedEvent = await eventRepository.retrieve({ name: event.name });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be the company to close an event"
    );
  });

  it("Should not close an event being a user | Status code: 401", async () => {
    let findedEvent = await eventRepository.retrieve({ name: event.name });
    const notOwnerUser = await userRepository.save({
      ...generateUser(),
    });

    const response = await supertest(app)
      .put(`/api/events/${findedEvent.id}/close`)
      .set("Authorization", `Bearer ${generateToken(notOwnerUser)}`);

    findedEvent = await eventRepository.retrieve({ name: event.name });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be a company to close an event"
    );
  });
});

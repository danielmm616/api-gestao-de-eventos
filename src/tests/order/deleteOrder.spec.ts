import {
  connection,
  generateCompany,
  generateEvent,
  generateToken,
  generateUser,
} from "..";
import { Company, Event, Order, User } from "../../entities";
import supertest from "supertest";
import app from "../../app";
import {
  companyRepository,
  eventRepository,
  orderRepository,
  userRepository,
} from "../../repositories";

describe("Delete Order", () => {
  beforeAll(async () => {
    await connection.connect();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should not delete a non-existent order | Status code: 404", async () => {
    const user = await userRepository.save({ ...generateUser() });

    const response = await supertest(app)
      .delete(`/api/orders/das45d4a56`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Order not found");
  });

  it("Should not delete an order that is not yours | Status code: 401", async () => {
    const user = await userRepository.save({ ...generateUser() });
    const company = await companyRepository.save({ ...generateCompany() });
    const anotherUser = await userRepository.save({ ...generateUser() });
    const event = await eventRepository.save({ ...generateEvent() });
    const newEvent = await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${generateToken(company)}`)
      .send(event);

    const order = await supertest(app)
      .post(`/api/orders/${newEvent.body.id}/create`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ quantity: 2 });

    const response = await supertest(app)
      .delete(`/api/orders/${order.body.id}`)
      .set("Authorization", `Bearer ${generateToken(anotherUser)}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
      "You must be the user to cancel an order"
    );
  });

  it("Should not delete an order already paid | Status code: 400", async () => {
    const genericUser = await supertest(app)
      .post("/api/users/create")
      .send(generateUser());
    const company = await supertest(app)
      .post("/api/users/create")
      .send(generateCompany());
    const event = await eventRepository.save({ ...generateEvent() });
    const newEvent = await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${generateToken(company.body)}`)
      .send(event);

    const order = await supertest(app)
      .post(`/api/orders/${newEvent.body.id}/create`)
      .set("Authorization", `Bearer ${generateToken(genericUser.body)}`)
      .send({ quantity: 2 });

    await supertest(app)
      .put(`/api/orders/${order.body.id}/pay`)
      .set("Authorization", `Bearer ${generateToken(genericUser.body)}`);

    const response = await supertest(app)
      .delete(`/api/orders/${order.body.id}`)
      .set("Authorization", `Bearer ${generateToken(genericUser.body)}`);

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe("Order has been paid");
  });

  it("Should delete an order | Status code: 200", async () => {
    const user = await userRepository.save({ ...generateUser() });
    const company = await companyRepository.save({ ...generateCompany() });
    const newEvent = await supertest(app)
      .post("/api/events/create")
      .set("Authorization", `Bearer ${generateToken(company)}`)
      .send(generateEvent());

    const order = await supertest(app)
      .post(`/api/orders/${newEvent.body.id}/create`)
      .set("Authorization", `Bearer ${generateToken(user)}`)
      .send({ quantity: 2 });

    const response = await supertest(app)
      .delete(`/api/orders/${order.body.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});

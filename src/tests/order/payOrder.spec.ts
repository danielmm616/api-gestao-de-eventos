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

describe("Pay Order", () => {
  let company: Company;
  let event: Event;
  let user: User;
  let order: Order;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
    company = await companyRepository.save({ ...generateCompany() });
    event = await eventRepository.save({
      ...generateEvent(),
      company: company,
      users: [],
      invoices: [],
      ratings: [],
      orders: [],
    });

    order = await orderRepository.save({
      user: user,
      event: event,
      quantity: 2,
      price: 25,
      invoice: null,
    });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should not pay order if order is not found | Status code: 404", async () => {
    const response = await supertest(app)
      .put(`/api/orders/${order.id + 1235}/pay`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Order not found");
  });

  it("Should not pay order if is not your order", async () => {
    const newUser = await userRepository.save({ ...generateUser() });

    const response = await supertest(app)
      .put(`/api/orders/${order.id}/pay`)
      .set("Authorization", `Bearer ${generateToken(newUser)}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("You must be the user to pay an order");
  });

  it("Should pay order | Status code: 200", async () => {
    const response = await supertest(app)
      .put(`/api/orders/${order.id}/pay`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("purchaseDate");
    expect(response.body).toHaveProperty("totalPrice");
  });

  it("Should not pay order if is already paid | Status code: 400", async () => {
    const response = await supertest(app)
      .put(`/api/orders/${order.id}/pay`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(409);
    expect(response.body.message).toBe("Order already paid");
  });

  it("Should not pay order if is a company", async () => {
    const newCompany = await companyRepository.save({ ...generateCompany() });

    const response = await supertest(app)
      .put(`/api/orders/${order.id}/pay`)
      .set("Authorization", `Bearer ${generateToken(newCompany)}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Internal server error");
  });
});

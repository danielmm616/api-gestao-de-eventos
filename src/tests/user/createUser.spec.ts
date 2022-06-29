import { connection, generateUser, generateToken } from "../../tests";
import supertest from "supertest";
import app from "../../app";
import { userRepository } from "../../repositories";
import { User } from "../../entities";

describe("Create User", () => {
  let user: User;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should create a new user | Status code: 201", async () => {
    const response = await supertest(app)
      .post("/api/users/register")
      .send({ ...generateUser() });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not create a user with an existing email | Status code: 409", async () => {
    const response = await supertest(app)
      .post("/api/users/register")
      .send(user);

    const response2 = await supertest(app)
      .post("/api/users/register")
      .send(user);

    expect(response2.status).toBe(409);
    expect(response2.body.message).toBe("Email already registered");
  });

  it("Should not create a user with an invalid email | Status code: 400", async () => {
    const response = await supertest(app).post("/api/users/register").send({
      name: "Test",
      email: "test",
      password: "test",
      bio: "test",
    });

    expect(response.status).toBe(400);
    expect(response.body.error[0]).toBe("email must be a valid email");
  });

  it("Should not create a user missing password | Status code: 400", async () => {
    const response = await supertest(app).post("/api/users/register").send({
      name: "Test",
      email: "teste@mail.com",
      bio: "test",
    });

    expect(response.status).toBe(400);
    expect(response.body.error[0]).toBe("password is a required field");
  });
});

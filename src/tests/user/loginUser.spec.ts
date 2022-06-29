import { connection, generateUser, generateToken } from "../../tests";
import supertest from "supertest";
import app from "../../app";
import { userRepository } from "../../repositories";
import { User } from "../../entities";

describe("Login User", () => {
  const user: Partial<User> = generateUser();

  beforeAll(async () => {
    await connection.connect();

    await supertest(app).post("/api/users/register").send(user);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should login user | Status code: 200", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: user.email.toLowerCase(),
      password: user.password.toLowerCase(),
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not login a user with wrong password | Status code: 401", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: user.email,
      password: `465456465465s`,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid credentials");
  });

  it("Should not login a user with wrong email | Status code: 200", async () => {
    const response = await supertest(app).post("/api/users/login").send({
      email: `dan@mail.com`,
      password: user.password,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid credentials");
  });
});

import { connection, generateUser, generateToken } from "../../tests";
import supertest from "supertest";
import app from "../../app";
import { userRepository } from "../../repositories";
import { User } from "../../entities";

describe("Get Users", () => {
  let user: User;

  beforeAll(async () => {
    await connection.connect();

    user = await userRepository.save({ ...generateUser() });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should get all users | Status code: 200", async () => {
    const response = await supertest(app)
      .get("/api/users")
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should get a user by id | Status code: 200", async () => {
    const response = await supertest(app)
      .get(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not get a non-existent user| Status code: 404", async () => {
    const response = await supertest(app)
      .get(`/api/users/${user.id + 1}`)
      .set("Authorization", `Bearer ${generateToken(user)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found");
  });

  it("Should not get a user missing token | Status code: 401", async () => {
    const response = await supertest(app).get(`/api/users/${user.id + 1}`);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing authorization token.");
  });

  it("Should not get a user with invalid token | Status code: 401", async () => {
    const response = await supertest(app)
      .get(`/api/users/${user.id}`)
      .set("Authorization", `Bearer ${generateToken(user)}123`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("invalid signature");
  });

  it("Should not get a user with jwt malformed | Status code: 401", async () => {
    const response = await supertest(app)
      .get(`/api/users/${user.id}`)
      .set("Authorization", `Bearer 41646asd6s44as`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("jwt malformed");
  });
});

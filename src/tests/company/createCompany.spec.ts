import { connection, generateCompany, generateToken } from "../../tests";
import supertest from "supertest";
import app from "../../app";
import { companyRepository } from "../../repositories";
import { Company } from "../../entities";

describe("Create Company", () => {
  let company: Company;

  beforeAll(async () => {
    await connection.connect();

    company = await companyRepository.save({ ...generateCompany() });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should create a new company | Status code: 201", async () => {
    const response = await supertest(app)
      .post("/api/companies/register")
      .send({ ...generateCompany() });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not create a company with an existing email | Status code: 409", async () => {
    const response = await supertest(app)
      .post("/api/companies/register")
      .send(company);

    const response2 = await supertest(app)
      .post("/api/companies/register")
      .send(company);

    expect(response2.status).toBe(409);
    expect(response2.body.message).toBe("Email already registered");
  });

  it("Should not create a company with an invalid email | Status code: 400", async () => {
    const response = await supertest(app).post("/api/companies/register").send({
      name: "Test",
      email: "test",
      password: "test",
      bio: "test",
    });

    expect(response.status).toBe(400);
    expect(response.body.error[0]).toBe("email must be a valid email");
  });

  it("Should not create a company missing password | Status code: 400", async () => {
    const response = await supertest(app).post("/api/companies/register").send({
      name: "Test",
      email: "teste@mail.com",
      bio: "test",
    });

    expect(response.status).toBe(400);
    expect(response.body.error[0]).toBe("password is a required field");
  });
});

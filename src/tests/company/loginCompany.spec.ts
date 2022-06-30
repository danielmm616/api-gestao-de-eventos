import { connection, generateCompany, generateToken } from "../../tests";
import supertest from "supertest";
import app from "../../app";
import { companyRepository } from "../../repositories";
import { Company } from "../../entities";

describe("Login Company", () => {
  let company: Partial<Company> = generateCompany();

  beforeAll(async () => {
    await connection.connect();

    await supertest(app).post("/api/companies/register").send(company);
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should login company | Status code: 200", async () => {
    const response = await supertest(app).post("/api/companies/login").send({
      email: company.email.toLowerCase(),
      password: company.password.toLowerCase(),
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not login a company with wrong password | Status code: 401", async () => {
    const response = await supertest(app).post("/api/companies/login").send({
      email: company.email,
      password: `465456465465s`,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid credentials");
  });

  it("Should not login a company with wrong email | Status code: 200", async () => {
    const response = await supertest(app).post("/api/companies/login").send({
      email: `dan@mail.com`,
      password: company.password,
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toEqual("Invalid credentials");
  });
});

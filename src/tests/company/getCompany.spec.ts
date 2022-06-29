import { connection, generateCompany, generateToken } from "../../tests";
import supertest from "supertest";
import app from "../../app";
import { companyRepository } from "../../repositories";
import { Company } from "../../entities";

describe("Get companies", () => {
  let company: Company;

  beforeAll(async () => {
    await connection.connect();

    company = await companyRepository.save({ ...generateCompany() });
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("Should get all companies | Status code: 200", async () => {
    const response = await supertest(app)
      .get("/api/companies")
      .set("Authorization", `Bearer ${generateToken(company)}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("Should get a company by id | Status code: 200", async () => {
    const response = await supertest(app)
      .get(`/api/companies/${company.id}`)
      .set("Authorization", `Bearer ${generateToken(company)}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not get a non-existent company| Status code: 404", async () => {
    const response = await supertest(app)
      .get(`/api/companies/${company.id + 1}`)
      .set("Authorization", `Bearer ${generateToken(company)}`);

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Company not found");
  });

  it("Should not get a company missing token | Status code: 401", async () => {
    const response = await supertest(app).get(
      `/api/companies/${company.id + 1}`
    );

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Missing authorization token.");
  });

  it("Should not get a company with invalid token | Status code: 401", async () => {
    const response = await supertest(app)
      .get(`/api/companies/${company.id}`)
      .set("Authorization", `Bearer ${generateToken(company)}123`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("invalid signature");
  });

  it("Should not get a company with jwt malformed | Status code: 401", async () => {
    const response = await supertest(app)
      .get(`/api/companies/${company.id}`)
      .set("Authorization", `Bearer 41646asd6s44as`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("jwt malformed");
  });
});

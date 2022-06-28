import { Request } from "express";
import { sign } from "jsonwebtoken";
import { Company } from "../entities";
import { ErrorHandler } from "../errors/errors";
import { companyRepository } from "../repositories";

import dotenv from "dotenv";
import { serializedCreateCompanySchema } from "../schemas";
import serializedCompanySchema from "../schemas/company/get.schema";

dotenv.config();

class CompanyService {
  register = async ({ validated }: Request) => {
    const company: Company = await companyRepository.save(validated as Company);

    return await serializedCreateCompanySchema.validate(company, {
      stripUnknown: true,
    });
  };

  login = async (req: Request) => {
    const email = req.body.email;
    const password = req.body.password;

    const company = await companyRepository.retrieve({ email });

    if (!company) {
      throw new ErrorHandler(404, "Invalid credentials");
    }

    const matchPwd = await company.comparePwd(password);

    if (!matchPwd) {
      throw new ErrorHandler(401, "Invalid credentials");
    }

    const token = sign({ id: company.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.EXPIRES_IN,
    });

    return token;
  };

  getById = async (id: string) => {
    const company = await companyRepository.retrieve({ id });

    if (!company) {
      throw new ErrorHandler(404, "Company not found");
    }

    return await serializedCreateCompanySchema.validate(company, {
      stripUnknown: true,
    });
  };

  getAll = async () => {
    const companies = await companyRepository.getAll();
    return serializedCompanySchema.validate(companies, {
      stripUnknown: true,
    });
  };
}

export default new CompanyService();

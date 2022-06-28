import * as yup from "yup";
import { hashSync } from "bcrypt";

const createCompanySchema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().optional(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
});

const companyUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  bio: yup.string().optional(),
  email: yup.string().email().lowercase().optional(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .optional(),
});

const serializedCreateCompanySchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  bio: yup.string().required(),
  email: yup.string().email().required(),
  employees: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().optional(),
      name: yup.string().optional(),
      bio: yup.string().optional(),
      email: yup.string().email().optional(),
    })
  ),
  events: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().optional(),
      eventName: yup.string().optional(),
      description: yup.string().optional(),
      price: yup.number().optional(),
      date: yup.date().optional(),
      time: yup.string().optional(),
      location: yup.string().optional(),
    })
  ),
});

export {
  createCompanySchema,
  serializedCreateCompanySchema,
  companyUpdateSchema,
};

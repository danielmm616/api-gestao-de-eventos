import * as yup from "yup";
import { hashSync } from "bcrypt";

const createEventSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().optional(),
  price: yup.number().required(),
  date: yup.date().required(),
  time: yup.string().required(),
  location: yup.string().required(),
  partnerCompanies: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().optional(),
    })
  ),
});

const serializedCreateEventSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  date: yup.date().required(),
  time: yup.string().required(),
  location: yup.string().required(),
  active: yup.boolean().required(),
  company: yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    bio: yup.string().required(),
    email: yup.string().email().required(),
  }),
  users: yup.array().optional(),
  invoices: yup.array().optional(),
});

export { createEventSchema, serializedCreateEventSchema };

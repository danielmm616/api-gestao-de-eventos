import * as yup from "yup";
import { hashSync } from "bcrypt";

const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  bio: yup.string().optional(),
  email: yup.string().email().lowercase().required(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .required(),
});

const userUpdateSchema = yup.object().shape({
  name: yup.string().optional(),
  bio: yup.string().optional(),
  email: yup.string().email().lowercase().optional(),
  password: yup
    .string()
    .transform((pwd: string) => hashSync(pwd, 8))
    .optional(),
});

const serializedCreateUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  bio: yup.string().required(),
  email: yup.string().email().required(),
});

export { createUserSchema, serializedCreateUserSchema, userUpdateSchema };

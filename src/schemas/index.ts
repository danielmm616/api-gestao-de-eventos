import {
  createUserSchema,
  serializedCreateUserSchema,
  userUpdateSchema,
} from "./user/create.schema";
import loginUserSchema from "./user/login.schema";
import serializedUsersSchema from "./user/get.schema";
import {
  createCompanySchema,
  serializedCreateCompanySchema,
  companyUpdateSchema,
} from "./company/create.schema";
import serializedCompanySchema from "./company/get.schema";
import loginCompanySchema from "./company/login.schema";

export {
  createUserSchema,
  serializedCreateUserSchema,
  userUpdateSchema,
  loginUserSchema,
  serializedUsersSchema,
  createCompanySchema,
  serializedCreateCompanySchema,
  companyUpdateSchema,
  loginCompanySchema,
  serializedCompanySchema,
};

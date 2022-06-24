import * as yup from "yup";

const serializedCompanySchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  bio: yup.string().required(),
  email: yup.string().email().required(),
  employees: yup.array().of(
    yup.object().shape({
      id: yup.string().uuid().required(),
      name: yup.string().required(),
      bio: yup.string().required(),
      email: yup.string().email().required(),
    })
  ),
});

export default serializedCompanySchema;

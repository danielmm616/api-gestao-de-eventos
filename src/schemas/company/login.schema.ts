import * as yup from "yup";

const loginCompanySchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default loginCompanySchema;

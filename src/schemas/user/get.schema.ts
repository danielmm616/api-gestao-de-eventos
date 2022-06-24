import * as yup from "yup";

const serializedUserSchema = yup.object().shape({
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  bio: yup.string().required(),
  email: yup.string().email().required(),
});

export default serializedUserSchema;

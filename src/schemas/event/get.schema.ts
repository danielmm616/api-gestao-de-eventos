import * as yup from "yup";

const serializedEventSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().uuid().required(),
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    date: yup.date().required(),
    time: yup.string().required(),
    location: yup.string().required(),
    active: yup.boolean().required(),
  })
);

export default serializedEventSchema;

import * as yup from "yup";

const serializedOrdersSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().uuid().required(),
    quantity: yup.number().required(),
    price: yup.number().required(),
    user: yup.object().shape({
      id: yup.string().uuid().required(),
      name: yup.string().required(),
    }),
    event: yup.object().shape({
      id: yup.string().uuid().required(),
      name: yup.string().required(),
      description: yup.string().required(),
      date: yup.date().required(),
      time: yup.string().required(),
      location: yup.string().required(),
      active: yup.boolean().required(),
      company: yup.object().shape({
        id: yup.string().uuid().required(),
        name: yup.string().required(),
      }),
    }),
    invoice: yup.object().shape({
      id: yup.string().uuid().optional(),
      purchaseDate: yup.date().optional(),
      totalPrice: yup.number().optional(),
    }),
  })
);

export default serializedOrdersSchema;

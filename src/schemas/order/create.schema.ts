import * as yup from "yup";

const createOrderSchema = yup.object().shape({
  quantity: yup.number().required().max(5).min(1),
});

export default createOrderSchema;

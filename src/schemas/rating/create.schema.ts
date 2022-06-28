import * as yup from "yup";

const createRatingSchema = yup.object().shape({
  stars: yup.number().required().max(5).min(1),
  title: yup.string().required(),
  description: yup.string().required(),
});

const ratingUpdateSchema = yup.object().shape({
  stars: yup.number().required().max(5).min(1).optional(),
  title: yup.string().optional(),
  description: yup.string().optional(),
});

export { createRatingSchema, ratingUpdateSchema };

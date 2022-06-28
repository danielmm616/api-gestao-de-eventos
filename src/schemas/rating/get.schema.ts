import * as yup from "yup";

const serializedRatingSchema = yup.array().of(
  yup.object().shape({
    id: yup.string().uuid().optional(),
    stars: yup.number().optional().max(5).min(1),
    title: yup.string().optional(),
    description: yup.string().optional(),
    user: yup.object().shape({
      id: yup.string().uuid().optional(),
      name: yup.string().optional(),
      bio: yup.string().optional(),
    }),
  })
);

export default serializedRatingSchema;

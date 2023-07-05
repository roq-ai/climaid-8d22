import * as yup from 'yup';

export const publicUserValidationSchema = yup.object().shape({
  donation: yup.number().integer(),
  carbon_emission: yup.number().integer(),
  user_id: yup.string().nullable(),
});

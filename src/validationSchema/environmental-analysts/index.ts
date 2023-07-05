import * as yup from 'yup';

export const environmentalAnalystValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  company_id: yup.string().nullable(),
});

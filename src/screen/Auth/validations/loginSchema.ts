import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('Invalid email address')
    .min(11, 'Must be at least 11 characters long')
    .max(30, 'Must be at least 30 characters')
    .required('Email is required'),
  password: Yup
    .string()
    .min(5, 'Must be at least 5 characters long')
    .max(20, 'Must be at least 20 characters')
    .required('Password is required'),
});
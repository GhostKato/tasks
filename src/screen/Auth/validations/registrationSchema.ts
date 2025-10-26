import * as Yup from 'yup';

export const RegistrationSchema = () =>
  Yup.object({
    email: Yup.string()
      .email('Invalid Email')
      .min(11, 'Must be at least 11 characters long')
      .max(30, 'Must be at least 30 characters')
      .required('Email is empty'),
    password: Yup.string()
      .matches(new RegExp(/^.{8,100}$/), {
        message: 'Password must be mor then 8 symbols',
      })
      .required('Password is empty'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password')],
      'Passwords must match',
    ),
  });
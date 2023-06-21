import { string as YupString, object } from 'yup';

export default function LoginFormValidator() {
  return object({
    email: YupString()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: YupString()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });
}

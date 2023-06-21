import { API_BASE_URL } from 'constants/environment';

import axios, { AxiosResponse } from 'axios';

export const SignUp = async (
  userProperties: IUserSignUpProps,
): Promise<AxiosResponse> => {
  return await axios.post(`${API_BASE_URL}/api/users/register`, {
    ...userProperties,
  });
};

export const SignIn = async (
  loginBody: IUserSignInProps,
): Promise<AxiosResponse> => {
  return await axios.post(`${API_BASE_URL}/api/users/login`, loginBody);
};

export const SignOut = async (): Promise<void> => {
  localStorage.removeItem('token');
  localStorage.removeItem('expiryTime');
  return;
};

import { useMutation } from 'react-query';
import { LoginResponse } from 'types/login';

export type LoginData = {
  email: string;
  password: string;
}

const login = async (params: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json()
  return data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginData>(login);
};
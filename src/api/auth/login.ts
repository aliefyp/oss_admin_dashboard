import { useMutation } from 'react-query';

export type LoginData = {
  email: string;
  password: string;
}

const login = async (params: LoginData) => {
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
  return useMutation<LoginData, Error, LoginData>(login);
};
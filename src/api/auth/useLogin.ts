import { useMutation } from 'react-query';
import { Response } from 'types/auth/login';

export type Params = {
  email: string;
  password: string;
}

const login = async (params: Params): Promise<Response> => {
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

const useLogin = () => {
  return useMutation<Response, Error, Params>(login);
};

export default useLogin;
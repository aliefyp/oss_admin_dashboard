import { useMutation } from 'react-query';
import { Response } from 'types/auth/refresh-token';

export type Params = {
  accessToken: string;
  refreshToken: string;
}

export const refreshToken = async (params: Params): Promise<Response> => {
  const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/auth/refresh-token`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json()
  return data;
};

const useRefreshToken = () => {
  return useMutation<Response, Error, Params>(refreshToken);
};

export default useRefreshToken;
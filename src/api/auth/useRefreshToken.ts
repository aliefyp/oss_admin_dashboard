import { EP_REFRESH_TOKEN } from 'constants/endpoints';
import { useMutation } from 'react-query';
import { Response } from 'types/auth/refresh-token';
import useFetcher from 'usecase/useFetcher';

export type Params = {
  accessToken: string;
  refreshToken: string;
}

export const refreshToken = async (params: Params): Promise<Response> => {
  const response = await fetch(EP_REFRESH_TOKEN, {
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
  const fetcher = useFetcher();

  const mutate = (params: Params) => {
    return fetcher('POST', `${EP_REFRESH_TOKEN}`, {
      body: JSON.stringify(params),
    });
  }
  return useMutation<Response, Error, Params>(mutate);
};

export default useRefreshToken;
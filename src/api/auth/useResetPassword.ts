import { EP_RESET_PASSWORD } from 'constants/endpoints';
import { useMutation } from 'react-query';
import { Response } from 'types/auth/login';
import useFetcher from 'usecase/useFetcher';

export type Params = {
  activationToken: string;
  password: string;
}

const useResetPassword = () => {
  const fetcher = useFetcher();

  const mutate = (params: Params) => {
    return fetcher('POST', `${EP_RESET_PASSWORD}`, {
      body: JSON.stringify(params),
    });
  }

  return useMutation<Response, Error, Params>(mutate);
};

export default useResetPassword;
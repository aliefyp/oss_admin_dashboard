import { EP_FORGET_PASSWORD } from 'constants/endpoints';
import { useMutation } from 'react-query';
import { Response } from 'types/auth/login';
import useFetcher from 'usecase/useFetcher';

export type Params = {
  email: string;
}

const useForgetPassword = () => {
  const fetcher = useFetcher();

  const mutate = (params: Params) => {
    return fetcher('POST', `${EP_FORGET_PASSWORD}`, {
      body: JSON.stringify(params),
    });
  }

  return useMutation<Response, Error, Params>(mutate);
};

export default useForgetPassword;
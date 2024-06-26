import { EP_LOGIN } from 'constants/endpoints';
import { useMutation } from 'react-query';
import { Response } from 'types/auth/login';
import useFetcher from 'usecase/useFetcher';

export type Params = {
  email: string;
  password: string;
}

const useLogin = () => {
  const fetcher = useFetcher();

  const mutate = (params: Params) => {
    return fetcher('POST', `${EP_LOGIN}`, {
      body: JSON.stringify(params),
    });
  }

  return useMutation<Response, Error, Params>(mutate);
};

export default useLogin;
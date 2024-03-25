import { useQuery } from 'react-query';
import { Response } from 'types/appoinment/appoinments';
import { EP_APPOINMENTS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

interface Params {
  pageNumber: number;
  pageSize: number;
}

const useAppoinments = (params: Params) => {
  const fetcher = useFetcher();
  const queryParams = new URLSearchParams(params as unknown as Record<string, string>);
  return useQuery<Response, Error>('appoinments', () => fetcher('GET', `${EP_APPOINMENTS}`), {
    refetchOnMount: true,
  });
};

export default useAppoinments;
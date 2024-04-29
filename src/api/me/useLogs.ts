import { useQuery } from 'react-query';
import { Response } from 'types/me/logs';
import { EP_LOGS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useLogs = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['logs'], 
    queryFn: () => fetcher('GET', EP_LOGS),
    refetchOnMount: true,
  });
};

export default useLogs;
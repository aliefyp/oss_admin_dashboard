import { useQuery } from 'react-query';
import { Response } from 'types/options';
import { EP_OPTIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useOptionApplicationStatus = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['options-application-status'], 
    queryFn: () => fetcher('GET', `${EP_OPTIONS}/application-status`),
  });
};

export default useOptionApplicationStatus;
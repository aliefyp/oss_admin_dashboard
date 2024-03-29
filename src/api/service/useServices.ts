import { useQuery } from 'react-query';
import { Response } from 'types/service/services';
import { EP_SERVICES } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useServices = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>('service-type', () => fetcher('GET', EP_SERVICES));
};

export default useServices;
import { useQuery } from 'react-query';
import { Response } from 'types/service/service-type';
import { EP_SERVICES_TYPE } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useServicesType = () => {
  const fetcher = useFetcher('GET', EP_SERVICES_TYPE);
  return useQuery<Response, Error>('service-type', fetcher);
};

export default useServicesType;
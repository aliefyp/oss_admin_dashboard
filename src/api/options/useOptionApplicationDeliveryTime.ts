import { useQuery } from 'react-query';
import { Response } from 'types/options';
import { EP_OPTIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useOptionApplicationDeliveryTime = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['options-application-delivery-time'], 
    queryFn: () => fetcher('GET', `${EP_OPTIONS}/application-delivery-time`),
  });
};

export default useOptionApplicationDeliveryTime;
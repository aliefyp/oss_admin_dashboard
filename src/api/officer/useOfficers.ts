import { useQuery } from 'react-query';
import { Response } from 'types/officer/officers';
import { EP_OFFICERS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';
import { useLocation } from 'react-router-dom';

const useOfficers = () => {
  const fetcher = useFetcher();
  const location = useLocation();
  return useQuery<Response, Error>({
    queryKey: ['officers', location.search], 
    queryFn: () => fetcher('GET', `${EP_OFFICERS}${location.search}`),
    refetchOnMount: true,
    enabled: location.search !== '',
  });
};

export default useOfficers;
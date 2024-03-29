import { useQuery } from 'react-query';
import { Response } from 'types/application/applications';
import { EP_APPLICATIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';
import { useLocation } from 'react-router-dom';

const useApplications = () => {
  const fetcher = useFetcher();
  const location = useLocation();
  return useQuery<Response, Error>({
    queryKey: ['applications', location.search], 
    queryFn: () => fetcher('GET', `${EP_APPLICATIONS}?${location.search}`),
    refetchOnMount: true,
    enabled: location.search !== '',
  });
};

export default useApplications;
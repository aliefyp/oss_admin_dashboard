import { useQuery } from 'react-query';
import { Response } from 'types/dashboard/dashboard';
import { EP_DASHBOARD } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';
import { useLocation } from 'react-router-dom';

const useDashboard = () => {
  const fetcher = useFetcher();
  const location = useLocation();
  return useQuery<Response, Error>({
    queryKey: ['dashboard', location.search], 
    queryFn: () => fetcher('GET', `${EP_DASHBOARD}${location.search}`),
    refetchOnMount: true,
  });
};

export default useDashboard;
import { useQuery } from 'react-query';
import { Response } from 'types/dashboard/dashboard';
import { EP_DASHBOARD } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useDashboard = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>('dashboard', () => fetcher('GET', EP_DASHBOARD));
};

export default useDashboard;
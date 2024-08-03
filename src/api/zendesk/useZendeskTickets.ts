
import { EP_ZENDESK } from 'constants/endpoints';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { Response } from 'types/zendesk/tickets';
import useFetcher from 'usecase/useFetcher';

const useZendeskTickets = () => {
  const fetcher = useFetcher();
  const location = useLocation();
  return useQuery<Response, Error>({
    queryKey: ['zendesk-tickets', location.search], 
    queryFn: () => fetcher('GET', `${EP_ZENDESK}/tickets${location.search}`),
    refetchOnMount: true,
    enabled: location.search !== '',
  });
};

export default useZendeskTickets;
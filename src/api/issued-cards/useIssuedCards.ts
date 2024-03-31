import { useQuery } from 'react-query';
import { Response } from 'types/issued-card/issued-cards';
import { EP_ISSUED_CARDS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';
import { useLocation } from 'react-router-dom';

const useIssuedCards = (serviceTypeId?: number) => {
  const fetcher = useFetcher();
  const location = useLocation();
  return useQuery<Response, Error>({
    queryKey: ['issued-cards', serviceTypeId, location.search], 
    queryFn: () => fetcher('GET', `${EP_ISSUED_CARDS}/${serviceTypeId}${location.search}`),
    refetchOnMount: true,
    enabled: location.search !== '',
  });
};

export default useIssuedCards;
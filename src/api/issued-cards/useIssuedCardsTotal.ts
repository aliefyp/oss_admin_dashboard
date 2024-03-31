import { useQuery } from 'react-query';
import { Response } from 'types/issued-card/issued-cards-total';
import { EP_ISSUED_CARDS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useIssuedCardsTotal = (serviceTypeId?: number) => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['issued-cards-total', serviceTypeId], 
    queryFn: () => fetcher('GET', `${EP_ISSUED_CARDS}/${serviceTypeId}/total`),
  });
};

export default useIssuedCardsTotal;
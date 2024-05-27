import { useQuery } from 'react-query';
import { Response } from 'types/officer/officer-detail';
import { EP_OFFICERS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useOfficerDetail = (id?: number) => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['officer-detail', id], 
    queryFn: () => fetcher('GET', `${EP_OFFICERS}/${id}`),
    enabled: !!id,
  });
};

export default useOfficerDetail;
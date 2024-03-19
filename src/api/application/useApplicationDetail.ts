import { useQuery } from 'react-query';
import { Response } from 'types/application/application-detail';
import { EP_APPLICATIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useApplicationDetail = (id?: number) => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>('application-detail', () => fetcher('GET', `${EP_APPLICATIONS}/${id}`));
};

export default useApplicationDetail;
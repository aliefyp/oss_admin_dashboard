import { useMutation } from 'react-query';
import { Response } from 'types/application/application-detail';
import { EP_APPLICATIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useApplicationDetail = (id?: number) => {
  const fetcher = useFetcher('GET', `${EP_APPLICATIONS}/${id}`);
  return useMutation<Response, Error>(fetcher);
};

export default useApplicationDetail;
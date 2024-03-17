import { useQuery } from 'react-query';
import { Response } from 'types/application/applications';
import { EP_APPLICATIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

interface Params {
  pageNumber: number;
  pageSize: number;
}

const useApplications = (params: Params) => {
  const queryParams = new URLSearchParams(params as unknown as Record<string, string>);
  const fetcher = useFetcher('GET', `${EP_APPLICATIONS}?${queryParams}`);
  return useQuery<Response, Error>('applications', fetcher);
};

export default useApplications;
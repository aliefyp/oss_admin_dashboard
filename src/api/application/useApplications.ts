import { useQuery } from 'react-query';
import { Response } from 'types/application/applications';
import { EP_APPLICATIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

interface Params {
  pageNumber: number;
  pageSize: number;
}

const useApplications = (params: Params) => {
  const fetcher = useFetcher();
  const queryParams = new URLSearchParams(params as unknown as Record<string, string>);
  return useQuery<Response, Error>('applications', () => fetcher('GET', `${EP_APPLICATIONS}?${queryParams}`));
};

export default useApplications;
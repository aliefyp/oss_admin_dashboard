import { useQuery } from 'react-query';
import { Response } from 'types/organization/organizations';
import { EP_ORGANIZATIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useOrganizations = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['organizations'], 
    queryFn: () => fetcher('GET', `${EP_ORGANIZATIONS}`),
  });
};

export default useOrganizations;
import { useQuery } from 'react-query';
import { Response } from 'types/options';
import { EP_OPTIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useOptionsRoleGroup = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['options-role-group'], 
    queryFn: () => fetcher('GET', `${EP_OPTIONS}/role-group`),
  });
};

export default useOptionsRoleGroup;
import { useQuery } from 'react-query';
import { Response } from 'types/options';
import { EP_OPTIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useOptionsApprovalStatus = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['options-approval-status'], 
    queryFn: () => fetcher('GET', `${EP_OPTIONS}/approval-status`),
  });
};

export default useOptionsApprovalStatus;
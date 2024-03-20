import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

const useLazyApplicationApprove = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number) => {
    return fetcher('POST', `${EP_APPLICATIONS}/${applicationId}/approve`);
  }

  return mutate;
}

export default useLazyApplicationApprove;
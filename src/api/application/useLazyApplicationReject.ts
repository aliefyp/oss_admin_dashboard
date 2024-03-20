import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

const useLazyApplicationReject = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number) => {
    return fetcher('POST', `${EP_APPLICATIONS}/${applicationId}/reject`);
  }

  return mutate;
}

export default useLazyApplicationReject;
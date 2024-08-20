import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

const useLazyApplicationApprove = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number, notes: string) => {
    return fetcher('POST', `${EP_APPLICATIONS}/${applicationId}/approve`, {
      body: JSON.stringify({ notes })
    });
  }

  return mutate;
}

export default useLazyApplicationApprove;
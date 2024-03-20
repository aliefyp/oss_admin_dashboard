import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";


const useLazyApplicationDetail = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number) => {
    return fetcher('GET', `${EP_APPLICATIONS}/${applicationId}`);
  }

  return mutate;
}

export default useLazyApplicationDetail;
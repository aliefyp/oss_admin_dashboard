import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";


const useLazyApplicationDetail = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number, fileId: number) => {
    return fetcher('POST', `${EP_APPLICATIONS}/${applicationId}/files/${fileId}/approve`);
  }

  return mutate;
}

export default useLazyApplicationDetail;
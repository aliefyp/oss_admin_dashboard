import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

const useLazyApplicationDetail = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number, ids: number[]) => {
    const filePromises = ids.map((id) => {
      return fetcher('GET', `${EP_APPLICATIONS}/${applicationId}/files/${id}`, {}, true)
    });

    return Promise.all(filePromises);
  }

  return mutate;
}

export default useLazyApplicationDetail;
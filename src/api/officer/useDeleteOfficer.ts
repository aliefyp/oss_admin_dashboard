import { EP_OFFICERS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

const useDeleteOfficer = () => {
  const fetcher = useFetcher();

  const mutate = (id: number) => {
    return fetcher('DELETE', `${EP_OFFICERS}/${id}`);
  }

  return mutate;
}

export default useDeleteOfficer;
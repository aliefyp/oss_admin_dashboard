import { EP_APPLICATIONS } from "constants/endpoints";
import { useMutation } from "react-query";
import { Response } from "types/application/application-log";
import useFetcher from "usecase/useFetcher";

const useLazyApplicationLog = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number) => {
    return fetcher('GET', `${EP_APPLICATIONS}/${applicationId}/log`);
  }

  return useMutation<Response, Error, number>(mutate);
}

export default useLazyApplicationLog;
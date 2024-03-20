import { EP_APPLICATIONS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

type File = {
  id: number;
  fileName: string;
}

const useLazyApplicationDetail = () => {
  const fetcher = useFetcher();

  const mutate = (applicationId: number, files: File[]) => {
    const filePromises = files.map((file) => {
      return fetcher('GET', `${EP_APPLICATIONS}/${applicationId}/files/${file.id}`, {}, true)
    });

    return Promise.all(filePromises);
  }

  return mutate;
}

export default useLazyApplicationDetail;
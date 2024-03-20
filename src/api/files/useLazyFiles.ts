import { EP_FILES } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

const useLazyFiles = () => {
  const fetcher = useFetcher();

  const mutate = (ids: number[]) => {
    const filePromises = ids.map((id) => {
      return fetcher('GET', `${EP_FILES}/${id}`, {
        headers: {
          'Content-Type': 'application/octet-stream',
        }
      }, true)
    });

    return Promise.all(filePromises);
  }

  return mutate;
}

export default useLazyFiles;
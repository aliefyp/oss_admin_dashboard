import { EP_APPOINTMENTS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

export type Params = {
  status: string;
}

const useUpdateAppoinment = ({ appointmentId }) => {
  const fetcher = useFetcher();

  const mutate = (params: Params) => {
    return fetcher('PUT', `${EP_APPOINTMENTS}/${appointmentId}`, {
      body: JSON.stringify(params),
    });
  }

  return mutate
};

export default useUpdateAppoinment;
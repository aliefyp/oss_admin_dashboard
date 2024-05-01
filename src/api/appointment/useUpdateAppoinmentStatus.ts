import { EP_APPOINTMENTS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

export type Params = {
  status: string;
  notes?: string;
}

const useUpdateAppoinmentStatus = ({ appointmentId }) => {
  const fetcher = useFetcher();

  const mutate = (params: Params) => {
    return fetcher('PUT', `${EP_APPOINTMENTS}/${appointmentId}/status`, {
      body: JSON.stringify(params),
    });
  }

  return mutate;
};

export default useUpdateAppoinmentStatus;
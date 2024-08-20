import { EP_ISSUED_CARDS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

export type Params = {
  isPickup: boolean;
}

const useUpdateDeliveryStatus = ({ applicationId }) => {
  const fetcher = useFetcher();

  const mutate = (params: Params) => {
    const queryParams = new URLSearchParams(params as unknown as Record<string, string>);
    return fetcher('PUT', `${EP_ISSUED_CARDS}/${applicationId}/delivered?${queryParams.toString()}`);
  }

  return mutate;
};

export default useUpdateDeliveryStatus;
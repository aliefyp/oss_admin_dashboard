import { EP_OFFICERS } from "constants/endpoints";
import useFetcher from "usecase/useFetcher";

interface Payload {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  roleGroup: string;
  organizationId: number;
  stateIds: number[];
}

const useCreateOfficer = () => {
  const fetcher = useFetcher();

  const mutate = (id: number, payload: Payload) => {
    return fetcher('PUT', `${EP_OFFICERS}/${id}`, {
      body: JSON.stringify(payload),
    });
  }

  return mutate;
}

export default useCreateOfficer;
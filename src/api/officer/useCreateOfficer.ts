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

  const mutate = (payload: Payload) => {
    return fetcher('POST', EP_OFFICERS, {
      body: JSON.stringify(payload),
    });
  }

  return mutate;
}

export default useCreateOfficer;
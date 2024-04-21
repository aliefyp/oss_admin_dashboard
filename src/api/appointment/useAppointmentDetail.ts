import { useQuery } from 'react-query';
import { Response } from 'types/appointment/appointment-detail';
import { EP_APPOINTMENTS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useAppointmentDetail = (id?: number) => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>('appointment-detail', () => fetcher('GET', `${EP_APPOINTMENTS}/${id}`));
};

export default useAppointmentDetail;
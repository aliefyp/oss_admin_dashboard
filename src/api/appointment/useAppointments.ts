import { useQuery } from 'react-query';
import { Response } from 'types/appointment/appointments';
import { EP_AppointmentS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

interface Params {
  PageNumber: number;
  PageSize: number;
  SearchValue?: string;
  OfficeLocationCode?: string;
  ServiceId?: number;
  ScheduleAtStart?: string;
  ScheduleAtEnd?: string;
}

const useAppointments = (params: Params) => {
  const fetcher = useFetcher();
  const queryParams = new URLSearchParams(params as unknown as Record<string, string>);
  return useQuery<Response, Error>({
    queryKey: ['appointments', params], 
    queryFn: () => fetcher('GET', `${EP_AppointmentS}?${queryParams}`),
    refetchOnMount: true,
  });
};

export default useAppointments;
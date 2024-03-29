import { useQuery } from 'react-query';
import { Response } from 'types/appointment/appointments';
import { EP_APPOINTMENTS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';
import { useLocation } from 'react-router-dom';

interface UseAppointmentParams {
  PageNumber: string;
  PageSize: string;
  SearchValue?: string;
  OfficeLocationCode?: string;
  ServiceId?: string;
  ScheduleAtStart?: string;
  ScheduleAtEnd?: string;
}

const useAppointments = () => {
  const fetcher = useFetcher();
  const location = useLocation();
  return useQuery<Response, Error>({
    queryKey: ['appointments', location.search], 
    queryFn: () => fetcher('GET', `${EP_APPOINTMENTS}?${location.search}`),
    refetchOnMount: true,
    enabled: location.search !== '',
  });
};

export default useAppointments;
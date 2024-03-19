import { useQuery } from 'react-query';
import { Response } from 'types/regions/country';
import { EP_REGIONS_COUNTRY } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useCountry = () => {
  const fetcher = useFetcher()
  return useQuery<Response, Error>('regions-country', () => fetcher('GET', EP_REGIONS_COUNTRY));
};

export default useCountry;
import { useQuery } from 'react-query';
import { Response } from 'types/regions/municipality';
import { EP_REGIONS_MUNICIPALITY } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

interface Params {
  countryCode: string;
}

const useMunicipality = (params: Params) => {
  const queryParams = new URLSearchParams(params as unknown as Record<string, string>);
  const url = `${EP_REGIONS_MUNICIPALITY}?${queryParams}`;
  const fetcher = useFetcher('GET', url);

  return useQuery<Response, Error>('regions-municipality', fetcher);
};

export default useMunicipality;
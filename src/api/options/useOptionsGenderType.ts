import { useQuery } from 'react-query';
import { Response } from 'types/options';
import { EP_OPTIONS } from 'constants/endpoints';
import useFetcher from 'usecase/useFetcher';

const useOptionGenderType = () => {
  const fetcher = useFetcher();
  return useQuery<Response, Error>({
    queryKey: ['options-gender-type'], 
    queryFn: () => fetcher('GET', `${EP_OPTIONS}/gender-type`),
  });
};

export default useOptionGenderType;
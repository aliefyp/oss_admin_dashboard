import { QueryClient } from "react-query";

const setupQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
}

export default setupQueryClient; 

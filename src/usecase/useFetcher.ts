import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import useToaster from "./useToaster";

const useFetcher = () => {
  const auth = useAuthHeader();
  const signOut = useSignOut();
  const toaster = useToaster();

  const fetcher = async (method: string, url: string, options?: RequestInit, isBlob: boolean = false) => {
    try {
      const response = await fetch(url, {
        method: method || 'GET',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
          ...options?.headers,
        }
      }).then((res) => {
        if (!res.ok) {
          throw new Error('HTTP status code: ' + res.status);
        }
        return res;
      });
      
      const data = isBlob ? await response.blob() : await response.json();

      if (data?.errorMessage) {
        throw new Error(data.errorMessage);
      }

      return data;
    } catch (err) {
      console.error(err);

      if (err.status === 401) {
        toaster.open('Session expired, please login again');
        signOut();
      } else {
        toaster.open(err.message);
      }
    }
  };

  return fetcher;
}

export default useFetcher;
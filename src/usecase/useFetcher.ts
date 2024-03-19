import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const useFetcher = () => {
  const auth = useAuthHeader();
  const signOut = useSignOut();

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
      });

      console.log();
      
      const data = isBlob ? await response.blob() : await response.json();

      if (data?.errorMessage) {
        throw new Error(data.errorMessage);
      }

      return data;
    } catch (err) {
      console.error(err);
      if (err.status === 401) signOut();
    }
  };

  return fetcher;
}

export default useFetcher;
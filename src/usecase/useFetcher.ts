import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useSignOut from "react-auth-kit/hooks/useSignOut";

const useFetcher = (method: string, url: string, options?: RequestInit) => {
  const auth = useAuthHeader();
  const signOut = useSignOut();

  const fetcher = async () => {
    try {
      const response = await fetch(url, {
        method: method || 'GET',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth,
          ...options.headers,
        }
      });
      const data = await response.json();
      return data;
    } catch (err) {
      if (err.status === 401) signOut();
    }
  };

  return fetcher;
}

export default useFetcher;
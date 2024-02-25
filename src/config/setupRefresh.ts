import createRefresh from 'react-auth-kit/createRefresh';

interface RefreshTokenCallbackResponse {
  isSuccess: boolean;
  newAuthToken: string | undefined;
  newAuthTokenExpireIn: number | undefined;
  newRefreshTokenExpiresIn: number | undefined;
}

const setupRefresh = createRefresh({
  interval: 86400, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param): Promise<RefreshTokenCallbackResponse> => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${param.authToken}`,
          'Content-Type': 'application/json',
        }
      })
      const data = await response.json();
      console.log("Refreshing")
      return {
        isSuccess: true,
        newAuthToken: data.data.accessToken,
        newAuthTokenExpireIn: 86400,
        newRefreshTokenExpiresIn: 86400
      }
    }
    catch(error){
      console.error(error)
      return {
        isSuccess: false,
        newAuthToken: undefined,
        newAuthTokenExpireIn: undefined,
        newRefreshTokenExpiresIn: undefined,
      } 
    }
  }
})

export default setupRefresh;
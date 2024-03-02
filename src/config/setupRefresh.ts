import createRefresh from 'react-auth-kit/createRefresh';
import { refreshToken, type Params } from 'api/auth/useRefreshToken';

const setupRefresh = createRefresh({
  interval: 2,
  refreshApiCallback: async param => {
    try {
      console.log("Refreshing")
      const data = await refreshToken(param as unknown as Params);
      return {
        isSuccess: true,
        newAuthToken: data.data?.accessToken,
        newAuthTokenExpireIn: 3,
        newRefreshTokenExpiresIn: 5,
      }
    } catch (error) {
      console.error(error)
    }
  }
})

export default setupRefresh;
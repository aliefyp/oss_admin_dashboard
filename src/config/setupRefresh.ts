import createRefresh from 'react-auth-kit/createRefresh';
import { refreshToken, type Params } from 'api/auth/useRefreshToken';

const setupRefresh = createRefresh({
  interval: 2,
  refreshApiCallback: async param => {
    try {
      console.log("Refreshing")

      const params: Params = {
        accessToken: param.authToken,
        refreshToken: param.refreshToken,
      }

      const data = await refreshToken(params);
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
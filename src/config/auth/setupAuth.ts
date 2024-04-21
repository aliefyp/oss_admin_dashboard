import setupRefresh from 'config/setupRefresh';
import createStore from 'react-auth-kit/createStore';

const setupAuth = () => {
  return createStore<any>({
    authType: "localstorage",
    authName: process.env.REACT_APP_SESSION_PREFIX || "_oss_auth",
    refresh: setupRefresh,
    // debug: process.env.NODE_ENV !== "production",
    // cookieDomain: window.location.hostname,
    // cookieSecure: process.env.NODE_ENV === "production",
  })
}

export default setupAuth;

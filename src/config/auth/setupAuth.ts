import setupRefresh from 'config/setupRefresh';
import createStore from 'react-auth-kit/createStore';

const setupAuth = () => {
  return createStore<any>({
    authType: "localstorage",
    authName: process.env.REACT_APP_SESSION_PREFIX || "_auth",
    // cookieDomain: window.location.hostname,
    // cookieSecure: process.env.NODE_ENV === "production",
    refresh: setupRefresh,
    debug: true,
  })
}

export default setupAuth;

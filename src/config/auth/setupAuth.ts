import createStore from 'react-auth-kit/createStore';

const setupAuth = () => {
  return createStore<any>({
    authType: "cookie",
    authName: process.env.REACT_APP_SESSION_PREFIX || "",
    cookieDomain: window.location.hostname,
    cookieSecure: process.env.NODE_ENV === "production",
  })
}

export default setupAuth;

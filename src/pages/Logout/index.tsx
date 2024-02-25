import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSignOut from 'react-auth-kit/hooks/useSignOut';

const Logout = () => {
  const navigate = useNavigate();
  const signOut = useSignOut();

  useEffect(() => {
    if(signOut()) {
      navigate('/login');
    };
    // eslint-disable-next-line
  }, []);

  return null;
};

export default Logout;

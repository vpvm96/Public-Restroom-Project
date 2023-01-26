import { useState, useEffect } from 'react';
import { apiKey } from '../api/firebaseService';

const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(false);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isAuthorizedInSession = sessionStorage.getItem(sessionKey)
    ? true
    : false;

  useEffect(() => {
    if (isAuthorizedInSession) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isAuthorizedInSession]);

  return { isLoggedIn, isAuthorizedInSession, init, setInit, setIsLoggedIn };
};

export default useLoginState;

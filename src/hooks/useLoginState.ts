import { useState, useEffect } from 'react';
import { apiKey } from '../api/firebaseService';

const useLoginState = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [init, setInit] = useState<boolean>(false);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isAuthorizedInSession = sessionStorage.getItem(sessionKey)
    ? true
    : false;

  //새로고침해도 닉네임 유지 방법 1 => 새로고침 할 때 깜빡임 없어서 선택
  //닉네임 유지용
  let userObj = sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);
  let userObjParsed;
  if (userObj) {
    userObjParsed = JSON.parse(userObj);
  }

  useEffect(() => {
    if (isAuthorizedInSession) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isAuthorizedInSession]);

  return {
    isLoggedIn,
    isAuthorizedInSession,
    userObjParsed,
    init,
    setInit,
    setIsLoggedIn,
  };
};

export default useLoginState;

import React, { useState } from 'react';

const useEditProfile = () => {
  const [userNickname, setUserNickname] = useState<string>('');

  //닉네임 유효성 검사
  const [userNicknameObserver, setUserNicknameObserver] = useState<string>('');
  const [isValidNickname, setIsValidNickname] = useState<boolean>(false);

  const onChangeUserNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserNickname = e.target.value;
    setUserNickname(() => newUserNickname);
    if (newUserNickname.length >= 2 && newUserNickname.length <= 6) {
      setUserNicknameObserver('유효한 닉네임입니다.');
      setIsValidNickname(true);
    } else {
      setUserNicknameObserver('닉네임은 2자 이상, 6자 이하로 설정해주세요.');
      setIsValidNickname(false);
    }
  };
  return {
    userNickname,
    userNicknameObserver,
    isValidNickname,
    onChangeUserNickname,
    setUserNickname,
  };
};

export default useEditProfile;

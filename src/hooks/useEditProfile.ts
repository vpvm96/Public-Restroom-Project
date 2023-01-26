import React, { useState } from 'react';

const useEditProfile = () => {
  const [profileRelatedValues, setProfileRelatedValues] = useState({
    userNickname: '',
    userNicknameObserver: '',
    isValidNickname: false,
  });
  const { userNickname, userNicknameObserver, isValidNickname } =
    profileRelatedValues;

  const onChangeUserNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newUserNickname = value;
    if (name === 'userNickname') {
      setProfileRelatedValues((prev) => ({ ...prev, [name]: newUserNickname }));
      if (newUserNickname.length >= 2 && newUserNickname.length <= 6) {
        setProfileRelatedValues((prev) => ({
          ...prev,
          userNicknameObserver: '유효한 닉네임입니다.',
          isValidNickname: true,
        }));
      } else {
        setProfileRelatedValues((prev) => ({
          ...prev,
          userNicknameObserver: '닉네임은 2자 이상, 6자 이하로 설정해주세요.',
          isValidNickname: false,
        }));
      }
    }
  };
  return {
    profileRelatedValues,
    onChangeUserNickname,
    setProfileRelatedValues,
  };
};

export default useEditProfile;

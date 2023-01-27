import React, { useState } from 'react';
import { pwdRegex } from '../utils/UserInfoRegex';

const usePwdManager = () => {
  const [pwdRelatedValues, setPwdRelatedValues] = useState({
    currentPwd: '',
    newPwd: '',
    confirmNewPwd: '',
    isCurrentPwd: false,
    isValidPwd: false,
    isSamePwd: false,
    currentPwdObserver: '',
    newPwdObserver: '',
    confirmNewPwdObserver: '',
  });
  const { currentPwd, newPwd, confirmNewPwd } = pwdRelatedValues;

  const onChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'currentPwd') {
      const currentPwdValue = value;
      setPwdRelatedValues((prev) => ({
        ...prev,
        [name]: currentPwdValue,
      }));
      if (!pwdRegex.test(currentPwdValue)) {
        setPwdRelatedValues((prev) => ({
          ...prev,
          currentPwdObserver: '올바르지 않은 형식의 비밀번호입니다.',
          isCurrentPwd: false,
        }));
      } else {
        setPwdRelatedValues((prev) => ({
          ...prev,
          currentPwdObserver: '올바른 형식의 비밀번호입니다.',
          isCurrentPwd: true,
        }));
      }
    } else if (name === 'newPwd') {
      const newPwdValue = value;
      setPwdRelatedValues((prev) => ({ ...prev, [name]: newPwdValue }));
      if (!pwdRegex.test(newPwdValue)) {
        setPwdRelatedValues((prev) => ({
          ...prev,
          newPwdObserver:
            '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요.',
          isValidPwd: false,
        }));
      } else {
        setPwdRelatedValues((prev) => ({
          ...prev,
          newPwdObserver: '올바른 형식의 비밀번호입니다.',
          isValidPwd: true,
        }));
      }
      //새 비밀번호 입력 시 비밀번호 일치 여부 즉시 반영
      if (confirmNewPwd === newPwdValue) {
        setPwdRelatedValues((prev) => ({
          ...prev,
          confirmNewPwdObserver: '비밀번호가 일치합니다.',
          isSamePwd: true,
        }));
      } else {
        setPwdRelatedValues((prev) => ({
          ...prev,
          confirmNewPwdObserver: '비밀번호가 일치하지 않습니다.',
          isSamePwd: false,
        }));
      }
    } else if (name === 'confirmNewPwd') {
      const currentComparePwdValue = value;
      setPwdRelatedValues((prev) => ({
        ...prev,
        confirmNewPwd: currentComparePwdValue,
      }));
      if (newPwd === currentComparePwdValue) {
        setPwdRelatedValues((prev) => ({
          ...prev,
          confirmNewPwdObserver: '비밀번호가 일치합니다.',
          isSamePwd: true,
        }));
      } else {
        setPwdRelatedValues((prev) => ({
          ...prev,
          confirmNewPwdObserver: '비밀번호가 일치하지 않습니다.',
          isSamePwd: false,
        }));
      }
    }
  };

  //useEffect로 한꺼번에 유효성 검사 가능

  return {
    pwdRelatedValues,
    onChangePwd,
    setPwdRelatedValues,
  };
};

export default usePwdManager;

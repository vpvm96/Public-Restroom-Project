import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { pwdRegex } from '../utils/UserInfoRegex';

const CustomInput = ({ label }: { label: string }): JSX.Element | null => {
  const [currentPwd, setCurrentPwd] = useState<string>('');
  const [newPwd, setNewPwd] = useState<string>('');
  const [confirmNewPwd, setConfirmNewPwd] = useState<string>('');

  //유효성 검사
  const [isCurrentPwd, setIsCurrentPwd] = useState<boolean>(false);
  const [isValidPwd, setIsValidPwd] = useState<boolean>(false);
  const [isSamePwd, setIsSamePwd] = useState<boolean>(false);
  const [currentPwdObserver, setCurrentPwdObserver] = useState<string>('');
  const [newPwdObserver, setNewPwdObserver] = useState<string>('');
  const [confirmNewPwdObserver, setConfirmNewPwdObserver] =
    useState<string>('');

  const onChangeCurrentPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentPwdValue = e.target.value;
      setCurrentPwd(currentPwdValue);
      if (!pwdRegex.test(currentPwdValue)) {
        setCurrentPwdObserver('올바르지 않은 형식의 비밀번호입니다.');
        setIsCurrentPwd(false);
      } else {
        setCurrentPwdObserver('올바른 형식의 비밀번호입니다.');
        setIsCurrentPwd(true);
      }
    },
    []
  );

  const onChangeNewPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentPwdValue = e.target.value;
      setNewPwd(currentPwdValue);
      if (!pwdRegex.test(currentPwdValue)) {
        setNewPwdObserver(
          '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요.'
        );
        setIsValidPwd(false);
      } else {
        setNewPwdObserver('올바른 형식의 비밀번호입니다.');
        setIsValidPwd(true);
      }
    },
    []
  );

  const onChangeConfirmPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const currentComparePwdValue = e.target.value;
      setConfirmNewPwd(currentComparePwdValue);
      if (newPwd === currentComparePwdValue) {
        setConfirmNewPwdObserver('비밀번호가 일치합니다.');
        setIsSamePwd(true);
      } else {
        setConfirmNewPwdObserver('비밀번호가 일치하지 않습니다.');
        setIsSamePwd(false);
      }
    },
    [newPwd]
  );

  switch (label) {
    case 'current':
      return (
        <>
          <InputStyle
            type="password"
            value={currentPwd}
            placeholder="기존 비밀번호를 입력하세요"
            onChange={onChangeCurrentPwd}
          />
          {currentPwd.length > 0 && (
            <CurrentPwdObserver isCurrentPwd={isCurrentPwd}>
              {currentPwdObserver}
            </CurrentPwdObserver>
          )}
        </>
      );
    case 'new':
      return (
        <>
          <InputStyle
            type="password"
            value={newPwd}
            placeholder="새 비밀번호를 입력하세요"
            onChange={onChangeNewPwd}
          />
          {newPwd.length > 0 && (
            <NewPwdObserver isValidPwd={isValidPwd}>
              {newPwdObserver}
            </NewPwdObserver>
          )}
        </>
      );
    case 'confirm':
      return (
        <>
          <InputStyle
            type="password"
            value={confirmNewPwd}
            placeholder="같은 비밀번호를 입력하세요"
            onChange={onChangeConfirmPwd}
          />
          {confirmNewPwd.length > 0 && (
            <ConfirmPwdObserver isSamePwd={isSamePwd}>
              {confirmNewPwdObserver}
            </ConfirmPwdObserver>
          )}
        </>
      );
    default:
      return null;
  }
};

export default CustomInput;

const InputStyle = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  background-color: #eeeeee;
`;

const CurrentPwdObserver = styled.span<{ isCurrentPwd: boolean }>`
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  left: 0;
  color: ${(props) => (props.isCurrentPwd ? '#189701' : '#ff2727')};
`;

const NewPwdObserver = styled.span<{ isValidPwd: boolean }>`
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  left: 0;
  color: ${(props) => (props.isValidPwd ? '#189701' : '#ff2727')};
`;

const ConfirmPwdObserver = styled.span<{ isSamePwd: boolean }>`
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  left: 0;
  color: ${(props) => (props.isSamePwd ? '#189701' : '#ff2727')};
`;

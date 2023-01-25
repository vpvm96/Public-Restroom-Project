import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Navbar,
  CustomButton,
  CustomInput,
  CustomNicknameInput,
} from '../components';
import { apiKey } from '../api/firebaseService';
import { Link } from 'react-router-dom';
import usePwdManager from '../hooks/usePwdManager';
import useButtonReactions from '../hooks/useButtonReactions';

interface pwdRelatedValueTypes {
  currentPwd: string;
  newPwd: string;
  confirmNewPwd: string;
  isCurrentPwd: boolean;
  isValidPwd: boolean;
  isSamePwd: boolean;
  currentPwdObserver: string;
  newPwdObserver: string;
  confirmNewPwdObserver: string;
}

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`;
  const isAuthorizedInSession = sessionStorage.getItem(sessionKey)
    ? true
    : false;

  const { pwdRelatedValues, onChangePwd } = usePwdManager();
  const {
    handleChangeNickname,
    handleLogOut,
    handleChangePwd,
    handleDeleteAccount,
  } = useButtonReactions({ pwdRelatedValues });

  useEffect(() => {
    if (isAuthorizedInSession) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isAuthorizedInSession]);

  return (
    <>
      {/* <Container>
        <NicknameWrapper>
          마이페이지
          <CustomNicknameInput />
          <CustomButton onClickEvent={handleChangeNickname}>
            닉네임 변경
          </CustomButton>
        </NicknameWrapper>
        <InputWrapper>
          <CustomInput
            type="password"
            value={pwdRelatedValues.currentPwd}
            observeValue={pwdRelatedValues.isCurrentPwd}
            observeContent={pwdRelatedValues.currentPwdObserver}
            placeholder="기존 비밀번호를 입력하세요"
            name="currentPwd"
            pwdRelatedValues={pwdRelatedValues}
            onChangePwd={onChangePwd}
          />
          <CustomInput
            type="password"
            value={pwdRelatedValues.newPwd}
            observeValue={pwdRelatedValues.isValidPwd}
            observeContent={pwdRelatedValues.newPwdObserver}
            placeholder="새 비밀번호를 입력하세요"
            name="newPwd"
            pwdRelatedValues={pwdRelatedValues}
            onChangePwd={onChangePwd}
          />
          <CustomInput
            type="password"
            value={pwdRelatedValues.confirmNewPwd}
            observeValue={pwdRelatedValues.isSamePwd}
            observeContent={pwdRelatedValues.confirmNewPwdObserver}
            placeholder="같은 비밀번호를 입력하세요"
            name="confirmNewPwd"
            pwdRelatedValues={pwdRelatedValues}
            onChangePwd={onChangePwd}
          />
          <BtnWrapper>
            <CustomButton onClickEvent={handleLogOut}>로그아웃</CustomButton>
            <CustomButton onClickEvent={handleChangePwd}>
              비밀번호 변경
            </CustomButton>
            <CustomButton onClickEvent={handleDeleteAccount}>
              회원탈퇴
            </CustomButton>
          </BtnWrapper>
        </InputWrapper>
      </Container> */}
      {isLoggedIn && isAuthorizedInSession ? (
        <Container>
          <NicknameWrapper>
            마이페이지
            <CustomNicknameInput />
            <CustomButton onClickEvent={handleChangeNickname}>
              닉네임 변경
            </CustomButton>
          </NicknameWrapper>
          <InputWrapper>
            <CustomInput
              type="password"
              value={pwdRelatedValues.currentPwd}
              observeValue={pwdRelatedValues.isCurrentPwd}
              observeContent={pwdRelatedValues.currentPwdObserver}
              placeholder="기존 비밀번호를 입력하세요"
              name="currentPwd"
              pwdRelatedValues={pwdRelatedValues}
              onChangePwd={onChangePwd}
            />
            <CustomInput
              type="password"
              value={pwdRelatedValues.newPwd}
              observeValue={pwdRelatedValues.isValidPwd}
              observeContent={pwdRelatedValues.newPwdObserver}
              placeholder="새 비밀번호를 입력하세요"
              name="newPwd"
              pwdRelatedValues={pwdRelatedValues}
              onChangePwd={onChangePwd}
            />
            <CustomInput
              type="password"
              value={pwdRelatedValues.confirmNewPwd}
              observeValue={pwdRelatedValues.isSamePwd}
              observeContent={pwdRelatedValues.confirmNewPwdObserver}
              placeholder="같은 비밀번호를 입력하세요"
              name="confirmNewPwd"
              pwdRelatedValues={pwdRelatedValues}
              onChangePwd={onChangePwd}
            />
            <BtnWrapper>
              <CustomButton onClickEvent={handleLogOut}>로그아웃</CustomButton>
              <CustomButton onClickEvent={handleChangePwd}>
                비밀번호 변경
              </CustomButton>
              <CustomButton onClickEvent={handleDeleteAccount}>
                회원탈퇴
              </CustomButton>
            </BtnWrapper>
          </InputWrapper>
        </Container>
      ) : (
        <Container>
          <NoticeWrapper>
            서비스를 이용하시려면&nbsp;
            <Link
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                color: 'blue',
              }}
              to={'/login'}
            >
              로그인
            </Link>
            &nbsp;해주세요.
          </NoticeWrapper>
        </Container>
      )}
    </>
  );
};

export default MyPage;

const Container = styled.div`
  margin-top: 15rem;
  /* width: 40%; */
  /* height: 60%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  /* border: 1px solid black; */
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BtnWrapper = styled.div`
  flex-direction: row;
`;

const NoticeWrapper = styled.div``;

const NicknameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

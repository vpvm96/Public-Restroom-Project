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

const MyPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
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
  }, []);

  return (
    <>
      <Container>
        마이페이지
        <InputWrapper>
          <>
            <CustomNicknameInput />
            <CustomButton>닉네임 변경</CustomButton>
          </>

          <CustomInput />
          {/* <CustomInput label="current" />
          <CustomInput label="new" />
          <CustomInput label="confirm" /> */}
        </InputWrapper>
        <BtnWrapper>
          <CustomButton>로그아웃</CustomButton>
          <CustomButton>비밀번호 변경</CustomButton>
          <CustomButton>회원탈퇴</CustomButton>
        </BtnWrapper>
      </Container>
      {/* {isLoggedIn && isAuthorizedInSession ? (
        <Container>
          마이페이지
          <InputWrapper>
            <CustomInput label="current" />
            <CustomInput label="new" />
            <CustomInput label="confirm" />
          </InputWrapper>
          <BtnWrapper>
            <CustomButton>로그아웃</CustomButton>
            <CustomButton>비밀번호 변경</CustomButton>
            <CustomButton>회원탈퇴</CustomButton>
          </BtnWrapper>
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
      )} */}
    </>
  );
};

export default MyPage;

const Container = styled.div`
  margin-top: 15rem;
  width: 40%;
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
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

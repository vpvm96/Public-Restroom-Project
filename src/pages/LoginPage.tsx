import React from 'react';
import styled from 'styled-components';

const LoginPage = () => {
  return (
    <div>
      <form>
        <InputBox>
          <LoginLogo>
            <h1>wait !</h1>
          </LoginLogo>

          <InputBoxContent>
            <Input name="아이디" value="아이디" />
            <Input name="비밀번호" value="비밀번호" />
          </InputBoxContent>
          <ButtonBox>
            <RegisterBtn>회원 가입</RegisterBtn>
            <LoginBtn>로그인</LoginBtn>
          </ButtonBox>
        </InputBox>
      </form>
    </div>
  );
};

export default LoginPage;

const InputBox = styled.div`
  position: absolute;
  width: 430px;
  height: 600px;
  border-radius: 30px;
  padding: 5px;
  left: 1200px;
  top: 150px;
  border: 2px solid #2192ff;
`;

// 인풋태그
const Input = styled.input`
  border-radius: 30px;
  width: 380px;
  height: 45px;

  border: 3px solid #b2c8df;

  color: #b2c8df;

  margin-top: 20px;
`;

//인풋을 둘러싼 박스
const InputBoxContent = styled.div`
  margin: 20px;
`;

//잠깐만 !
const LoginLogo = styled.div`
  text-align: center;
  margin-top: 110px;
  margin-bottom: 25px;
  font-size: 20px;
  color: #2192ff;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginBtn = styled.button`
  border-radius: 40px;
  width: 110px;
  height: 40px;
  font-size: 20px;
  color: #2192ff;
  border-color: #2192ff;
  font-weight: 900;
  margin-top: 15px;
  background-color: White;
  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
`;

const RegisterBtn = styled.button`
  width: 110px;
  height: 40px;
  color: #2192ff;
  border: none;
  margin-top: 10px;
  background-color: White;
  &:hover {
    color: #816ceb;
    transition: 0.4s;
  }
`;

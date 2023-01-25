import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  //onchange로 값을 저장한다.
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    console.log('onchnageemail:', email);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log('onchnageemail:', password);
  };

  //firebase
  const handleSubmitClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  //firebase 비밀번호 찾기 작업중...
  const findPwd = (e: any) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        console.log('성공');
        alert('비밀번호 초기화 이메일이 전송되었습니다.');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmitClick}>
        <InputBox>
          <LoginLogo>
            <h1>wait !</h1>
          </LoginLogo>

          <InputBoxContent>
            <Inputholder>
              <Input
                name="아이디"
                placeholder="아이디"
                onChange={onChangeEmail}
              ></Input>
            </Inputholder>
            <Inputholder>
              <Input
                name="비밀번호"
                placeholder="비밀번호"
                onChange={onChangePassword}
              ></Input>
            </Inputholder>
          </InputBoxContent>
          <ButtonBox>
            <RegisterBtn onClick={() => navigate('/signup')}>
              회원 가입
            </RegisterBtn>
            <LoginBtn>로그인</LoginBtn>
            <RegisterBtn onClick={findPwd}>비밀번호 찾기</RegisterBtn>
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
  border: none;
  width: 300px;
  height: 38px;
  position: relative;
  left: 30px;
  outline: none;
`;

//Input태그의 테두리
const Inputholder = styled.div`
  border-radius: 30px;
  width: 380px;
  height: 45px;
  border: 3px solid #b2c8df;
  color: #b2c8df;
  margin-top: 25px;
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
  cursor: pointer;
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
  cursor: pointer;
  &:hover {
    color: #816ceb;
    transition: 0.4s;
  }
`;

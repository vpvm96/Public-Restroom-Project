import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/firebaseService';
import { emailRegex, pwdRegex } from '../utils/UserInfoRegex';
import LoginModal from '../components/Modals/LoginModal/LoginModal';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //아이디 찾기 모달창
  const [loginModalopen, setLoginModalopen] = useState(false);

  //onchange로 값을 저장.
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

    setPersistence(authService, browserSessionPersistence)
      .then(() => {
        return signInWithEmailAndPassword(authService, email, password)
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

            alert('로그인 실패');
            if (email.length === 0) {
              alert('이메일을 입력해 주세요');
            } else if (emailRegex.test(email) === false) {
              alert('이메일을 정확히 입력해 주세요');
            } else if (password.length === 0) {
              alert('비밀번호를 입력해 주세요');
            } else if (pwdRegex.test(password) === false) {
              alert('비밀번호를 정확히 입력해 주세요 ');
            }
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
    setLoginModalopen(true);
    console.log(loginModalopen);
  };

  return (
    <div>
      <form onSubmit={handleSubmitClick}>
        <InputBox>
          <LoginLogo>
            <h1>잠깐만 !</h1>
          </LoginLogo>

          <InputBoxContent>
            <Inputholder>
              <Input
                type="email"
                name="아이디"
                placeholder="아이디"
                onChange={onChangeEmail}
              ></Input>
            </Inputholder>
            <Inputholder>
              <Input
                type="password"
                name="비밀번호"
                placeholder="비밀번호"
                onChange={onChangePassword}
              ></Input>
            </Inputholder>
          </InputBoxContent>
          <ButtonBox>
            <RegisterBtn type="button" onClick={() => navigate('/signup')}>
              회원 가입
            </RegisterBtn>

            <LoginBtn type="submit">로그인</LoginBtn>

            <RegisterBtn type="button" onClick={findPwd}>
              비밀번호 찾기
            </RegisterBtn>
          </ButtonBox>
        </InputBox>
      </form>
      <LoginModal
        open={loginModalopen}
        onClose={() => setLoginModalopen(false)}
      />
    </div>
  );
};

export default LoginPage;

const InputBox = styled.div`
  position: relative;
  width: 430px;
  height: 600px;
  border-radius: 30px;
  padding: 5px;
  top: 150px;
  border: 2px solid #2192ff;
  z-index: 1;
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

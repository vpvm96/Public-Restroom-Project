import React, { useState } from 'react';
import styled from 'styled-components';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  return (
    <div>
      <form>
        <InputBox>
          <button
            style={{
              border: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              color: '#2192ff',
            }}
          >
            뒤로가기
          </button>
          <LoginLogo>
            <h1>회원가입</h1>
          </LoginLogo>
          <InputBoxContent>
            <Inputholder>
              <Input name="아이디" placeholder="아이디"></Input>
            </Inputholder>
            <Inputholder>
              <Input name="비밀번호" placeholder="비밀번호"></Input>
            </Inputholder>
            <Inputholder>
              <Input name="비밀번호 확인" placeholder="비밀번호 확인"></Input>
            </Inputholder>
          </InputBoxContent>
          <ButtonBox>
            {/* <RegisterBtn>회원 가입</RegisterBtn> */}
            <LoginBtn>회원 가입</LoginBtn>
          </ButtonBox>
        </InputBox>
      </form>
    </div>
  );
}

export default Register;

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

//Inputholder안의 진짜 input태그
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
  margin-top: 80px;
  margin-bottom: 25px;
  font-size: 20px;
  color: #2192ff;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//회원 가입 버튼
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

import React, { useState } from 'react';
import styled from 'styled-components';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authService } from '../../../api/firebaseService';
import { emailRegex } from '../../../utils/UserInfoRegex';

function LoginModal({ open, onClose, setLoginModalopen }: any) {
  const [findPwd, setFindPwd] = useState('');
  const email = findPwd;

  // 인풋값을 저장
  const findPasswordfnc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindPwd(e.target.value);
  };

  // 비밀번호 찾기
  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailRegex.test(findPwd) === true) {
      await sendPasswordResetEmail(authService, email)
        .then(() => {
          alert('이메일을 발송했습니다. 보관함을 확인해 주세요.');
          setLoginModalopen(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          alert('등록되지 않은 아이디 입니다.');
          // ..
        });
    } else if (findPwd.length === 0) {
      alert('이메일을 입력해주세요');
    } else {
      alert('이메일을 정확히 입력해 주세요.');
    }
  };

  // 모달을 끄고있게 해준다.
  if (!open) return null;

  return (
    <Overlay>
      <ModalContainer className="modalContainer">
        <CloseBtn onClick={onClose} className="closeBtn">
          x
        </CloseBtn>
        <InputContent className="content">
          <Input
            onChange={findPasswordfnc}
            placeholder="이메일을 입력해 주세요."
            className="EmailSubmit"
          ></Input>
        </InputContent>
        <BtnContainer className="btnContainer">
          <Btnprimary
            onClick={handleSubmitClick}
            type="submit"
            className="btnprimary"
          >
            <Span className="bold">제 출</Span>
          </Btnprimary>
        </BtnContainer>
      </ModalContainer>
    </Overlay>
  );
}

export default LoginModal;

// 배경의 색(회색)
const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  transform: translate(0%, -65%);
  width: 100%;
  height: 100%;
  z-index: 2;
`;

//모달 박스 (흰색)
const ModalContainer = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100px;
  position: relative;
  top: 40%;
  display: flex;
  background-color: white;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
`;

// X버튼
const CloseBtn = styled.p`
  position: absolute;
  top: 5px;
  right: 15px;
  cursor: pointer;
`;

// 인풋바깥 테두리
const InputContent = styled.div`
  border-radius: 35px;
  border: 3px solid #b2c8df;
  width: 380px;
  height: 45px;
  margin-top: 25px;
  position: relative;
  left: 20px;
`;

//인풋창
const Input = styled.input`
  border: none;
  width: 300px;
  height: 38px;
  position: relative;
  left: 30px;
  outline: none;
`;

const BtnContainer = styled.div`
  display: flex;
  padding: 1rem 1rem;
`;

const Btnprimary = styled.button`
  width: 100px;
  margin: 0.5rem;
  padding: 16px 0;
  border: none;
  color: #2192ff;
  background-color: aliceblue;
  border-radius: 35px;
  cursor: pointer;
`;

//버튼 글자
const Span = styled.span`
  position: relative;
  bottom: 6px;
`;

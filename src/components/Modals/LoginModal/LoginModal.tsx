import React, { useState } from 'react';
import styled from 'styled-components';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authService } from '../../../api/firebaseService';
import { emailRegex } from '../../../utils/UserInfoRegex';

function LoginModal({ open, onClose }: any) {
  const [findPwd, setFindPwd] = useState('');
  const email = findPwd;

  const findPasswordfnc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindPwd(e.target.value);
    console.log(findPwd);
  };

  const handleSubmitClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (emailRegex.test(findPwd) === true) {
      await sendPasswordResetEmail(authService, email)
        .then(() => {
          alert('이메일을 발송했습니다. 보관함을 확인해 주세요.');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
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

  if (!open) return null;

  return (
    <Overlay>
      <ModalContainer className="modalContainer">
        {/* <div className="modalRight"> */}
        <CloseBtn onClick={onClose} className="closeBtn">
          x
        </CloseBtn>
        <Content className="content">
          <Input
            onChange={findPasswordfnc}
            placeholder="이메일을 입력하세요"
            className="EmailSubmit"
          ></Input>
        </Content>
        <BtnContainer className="btnContainer">
          <Btnprimary
            onClick={handleSubmitClick}
            type="submit"
            className="btnprimary"
          >
            <Span className="bold">제출</Span>
          </Btnprimary>
        </BtnContainer>
        {/* </div> */}
      </ModalContainer>
    </Overlay>
  );
}

export default LoginModal;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  transform: translate(0%, -65%);
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const ModalContainer = styled.div`
  max-width: 600px;
  width: 100%;
  height: 100px;
  position: relative;
  top: 40%;
  display: flex;
  background-color: white;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.75);
  border-radius: 20px;
`;

const CloseBtn = styled.p`
  position: absolute;
  top: 5px;
  right: 15px;
`;

const Content = styled.div`
  border-radius: 35px;
  border: 3px solid #b2c8df;
  width: 380px;
  height: 45px;
  margin-top: 25px;
  position: relative;
  left: 20px;
`;

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
  border-radius: 35px;
  cursor: pointer;
`;

const Span = styled.span`
  position: relative;
  bottom: 6px;
`;

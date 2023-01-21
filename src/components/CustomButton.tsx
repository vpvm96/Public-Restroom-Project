import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { authService } from '../api/firebaseService';
import {
  signOut,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';

type ButtonText = {
  children: string;
};

const CustomButton = ({ children }: ButtonText) => {
  const navigate = useNavigate();
  //현재 사용 비밀번호, 새 비밀번호, 새 비밀번호 확인
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmNewPwd, setConfirmNewPwd] = useState('');

  //새 비밀번호와 확인 비밀번호가 같은지 확인
  const newPwdConfirmed = newPwd === confirmNewPwd;

  const handleLogOut = async () => {
    await signOut(authService)
      .then(() => console.log('성공적으로 로그아웃 하였습니다!'))
      .catch((error) => console.log(error));
    navigate('/', { replace: true });
  };

  const handleDeleteAccount = async () => {
    if (authService.currentUser) {
      await deleteUser(authService.currentUser)
        .then(() => console.log('성공적으로 탈퇴하였습니다!'))
        .catch((error) => console.log(error));
      navigate('/', { replace: true });
    }
  };

  const handleChangePwd = () => {
    if (authService.currentUser?.email) {
      const credential = EmailAuthProvider.credential(
        authService.currentUser.email,
        currentPwd
      );
      reauthenticateWithCredential(authService.currentUser, credential)
        .then(() => {
          // console.log('pwdConfirmed?', pwdConfirmed);
          if (authService.currentUser && newPwdConfirmed) {
            updatePassword(authService.currentUser, newPwd).then(() => {
              alert('비밀번호가 변경되었습니다.');
              setCurrentPwd('');
              setNewPwd('');
              setConfirmNewPwd('');
              navigate('/mypage', { replace: true });
            });
          }
        })
        .catch((error) => {
          if (error.code === 'auth/wrong-password') {
            alert('비밀번호가 틀렸습니다.');
          } else if (error.code === 'auth/too-many-requests') {
            alert('너무 많은 틀린 시도로 계정이 일시적으로 잠겼습니다.');
          }
        });
    }
  };

  switch (children) {
    case '로그아웃':
      return <BtnStyle onClick={handleLogOut}>{children}</BtnStyle>;
    case '회원탈퇴':
      return <BtnStyle onClick={handleDeleteAccount}>{children}</BtnStyle>;
    case '비밀번호 변경':
      return <BtnStyle onClick={handleChangePwd}>{children}</BtnStyle>;
    default:
      return null;
  }
};

export default CustomButton;

const BtnStyle = styled.button`
  width: 5rem;
  height: 1rem;
  border: 1px solid black;
  margin: 10px;
`;

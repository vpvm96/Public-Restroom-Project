import { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
// import { useAppSelector, useAppDispatch } from '../redux/config/configStore';
import {
  getCurrentPwd,
  createNewPwd,
  getConfirmPwd,
  updateUserNickname,
} from '../redux/modules/userSlice';
import { RootState } from '../redux/config/configStore';
// import { userStateType } from '../redux/modules/userSlice';

type ButtonText = {
  children: string;
};

const CustomButton = ({ children }: ButtonText) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const dispatch = useAppDispatch();
  const userInfo: any = useSelector((state: RootState) => state.user);
  //현재 사용 비밀번호, 새 비밀번호, 새 비밀번호 확인
  // const [currentPwd, setCurrentPwd] = useState('');
  // const [newPwd, setNewPwd] = useState('');
  // const [confirmNewPwd, setConfirmNewPwd] = useState('');
  // console.log(userInfo.)

  //새 비밀번호와 확인 비밀번호가 같은지 확인
  // const newPwdConfirmed = newPwd === confirmNewPwd;
  const newPwdConfirmed = userInfo.newPwd === userInfo.confirmNewPwd;

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

  const handleChangeNickname = () => {
    console.log('닉네임 변경부분');
    // dispatch(updateUserInfo({userInfo.userNickname}))
  };

  const handleChangePwd = () => {
    // console.log('비밀번호 변경 클릭!');

    if (authService.currentUser?.email) {
      const credential = EmailAuthProvider.credential(
        authService.currentUser.email,
        userInfo.currentPwd
      );
      reauthenticateWithCredential(authService.currentUser, credential)
        .then(() => {
          // console.log('pwdConfirmed?', pwdConfirmed);
          if (authService.currentUser && newPwdConfirmed) {
            updatePassword(authService.currentUser, userInfo.newPwd).then(
              () => {
                alert('비밀번호가 변경되었습니다.');
                // setCurrentPwd('');
                dispatch(getCurrentPwd(''));
                // setNewPwd('');
                dispatch(createNewPwd(''));
                // setConfirmNewPwd('');
                dispatch(getConfirmPwd(''));
                navigate('/mypage', { replace: true });
              }
            );
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

  // useEffect(() => {
  //   console.log(userInfo);
  // }, [userInfo]);

  switch (children) {
    case '로그아웃':
      return <BtnStyle onClick={handleLogOut}>{children}</BtnStyle>;
    case '회원탈퇴':
      return <BtnStyle onClick={handleDeleteAccount}>{children}</BtnStyle>;
    case '비밀번호 변경':
      return <BtnStyle onClick={handleChangePwd}>{children}</BtnStyle>;
    case '닉네임 변경':
      return <BtnStyle onClick={handleChangeNickname}>{children}</BtnStyle>;
    default:
      return null;
  }
};

export default CustomButton;

const BtnStyle = styled.button`
  width: 6rem;
  height: 2rem;
  border: none;
  background-color: #468bfb;
  margin: 10px;
  color: white;
`;

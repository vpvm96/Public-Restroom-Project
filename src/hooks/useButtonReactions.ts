import { authService } from '../api/firebaseService';
import { useNavigate } from 'react-router-dom';
import {
  signOut,
  deleteUser,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateProfile,
} from 'firebase/auth';
import usePwdManager from './usePwdManager';
import useEditProfile from './useEditProfile';

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

const useButtonReactions = ({
  pwdRelatedValues,
  userNickname,
}: {
  pwdRelatedValues: pwdRelatedValueTypes;
  userNickname: string;
}) => {
  const navigate = useNavigate();
  const { currentPwd, newPwd, confirmNewPwd } = pwdRelatedValues;
  const { setPwdRelatedValues } = usePwdManager();
  const newPwdConfirmed = newPwd === confirmNewPwd;

  const handleLogOut = async () => {
    await signOut(authService)
      .then(() => console.log('성공적으로 로그아웃 하였습니다!'))
      .catch((error) => console.log(error));
    navigate('/', { replace: true });
  };

  const handleDeleteAccount = async () => {
    console.log('회원탈퇴 완료');
    if (authService.currentUser) {
      await deleteUser(authService.currentUser)
        .then(() => console.log('성공적으로 탈퇴하였습니다!'))
        .catch((error) => console.log(error));
      navigate('/', { replace: true });
    }
  };

  //   console.log('userNickname:', userNickname);

  const handleChangeNickname = async () => {
    if (authService.currentUser?.displayName) {
      await updateProfile(authService.currentUser, {
        displayName: userNickname,
      })
        .then(() => {
          console.log('프로필 업데이트 완료!');
        })
        .catch((error) => console.log(error));
    }
    console.log('현재 닉네임', authService.currentUser?.displayName);
    console.log(
      'Button 컴포넌트에서 userInfo:',
      currentPwd,
      newPwd,
      confirmNewPwd
    );
  };

  const handleChangePwd = () => {
    console.log('비밀번호 변경');

    if (authService.currentUser?.email) {
      const credential = EmailAuthProvider.credential(
        authService.currentUser.email,
        currentPwd
      );
      reauthenticateWithCredential(authService.currentUser, credential)
        .then(() => {
          if (authService.currentUser && newPwdConfirmed) {
            updatePassword(authService.currentUser, newPwd).then(() => {
              alert('비밀번호가 변경되었습니다.');
              setPwdRelatedValues({
                ...pwdRelatedValues,
                currentPwd: '',
                newPwd: '',
                confirmNewPwd: '',
              });
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

  return {
    handleChangeNickname,
    handleLogOut,
    handleChangePwd,
    handleDeleteAccount,
  };
};

export default useButtonReactions;

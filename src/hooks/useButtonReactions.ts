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

interface profileRelatedValueTypes {
  userNickname: string;
  userNicknameObserver: string;
  isValidNickname: boolean;
}

const useButtonReactions = ({
  pwdRelatedValues,
  profileRelatedValues,
  setPwdRelatedValues,
}: {
  pwdRelatedValues: pwdRelatedValueTypes;
  profileRelatedValues: profileRelatedValueTypes;
  setPwdRelatedValues: React.Dispatch<
    React.SetStateAction<pwdRelatedValueTypes>
  >;
}) => {
  const navigate = useNavigate();
  const { currentPwd, newPwd, confirmNewPwd } = pwdRelatedValues;
  const { userNickname } = profileRelatedValues;
  const { setProfileRelatedValues } = useEditProfile();
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

  const handleChangeNickname = async () => {
    if (authService.currentUser?.displayName) {
      await updateProfile(authService.currentUser, {
        displayName: userNickname,
      })
        .then(() => {
          alert('프로필 업데이트 완료!');
          setProfileRelatedValues((prev) => ({ ...prev, userNickname: '' }));
          navigate('/mypage', { replace: true });
        })
        .catch((error) => console.log(error));
    } else {
      alert('아직 계정에 displayName이 없습니다.');
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
          if (authService.currentUser && newPwdConfirmed) {
            updatePassword(authService.currentUser, newPwd).then(() => {
              alert('비밀번호가 변경되었습니다.');
            });
          }
          setPwdRelatedValues((prev) => ({
            ...prev,
            currentPwd: '',
            newPwd: '',
            confirmNewPwd: '',
          }));
          navigate('/mypage', { replace: true });
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

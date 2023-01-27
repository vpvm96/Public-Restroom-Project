import React, { useState } from 'react';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { authService, imgStorage } from '../api/firebaseService';
import { updateProfile } from 'firebase/auth';
import { uuidv4 } from '@firebase/util';
import { useNavigate } from 'react-router-dom';

const useEditProfile = () => {
  const [profileRelatedValues, setProfileRelatedValues] = useState({
    userNickname: '',
    userNicknameObserver: '',
    isValidNickname: false,
  });
  // const { userNickname, userNicknameObserver, isValidNickname } =
  //   profileRelatedValues;
  const [attachment, setAttachment] = useState<string | null>();
  const navigate = useNavigate();

  const onChangeUserNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newUserNickname = value;
    if (name === 'userNickname') {
      setProfileRelatedValues((prev) => ({ ...prev, [name]: newUserNickname }));
      if (newUserNickname.length >= 2 && newUserNickname.length <= 6) {
        setProfileRelatedValues((prev) => ({
          ...prev,
          userNicknameObserver: '유효한 닉네임입니다.',
          isValidNickname: true,
        }));
      } else {
        setProfileRelatedValues((prev) => ({
          ...prev,
          userNicknameObserver: '닉네임은 2자 이상, 6자 이하로 설정해주세요.',
          isValidNickname: false,
        }));
      }
    }
  };

  //파일 업로드 input을 통해 업로드한 이미지를 DataURL로 변환
  const onChangeProfileImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const profileURL = finishedEvent.target?.result;
      if (typeof profileURL === 'string') {
        setAttachment(profileURL);
        localStorage.setItem('profileURL', profileURL);
      }
    };
  };

  //firebase Storage에 프로필 이미지 저장 및 currentUser 정보에 반영
  const storeImg = async () => {
    if (attachment) {
      const imgRef = ref(
        imgStorage,
        `${authService.currentUser?.uid}/profileUrl/${uuidv4()}/`
      );
      const profileURL = localStorage.getItem('profileURL');
      if (profileURL) {
        const response = await uploadString(imgRef, profileURL, 'data_url');
        const tempUrl = await getDownloadURL(response.ref);
        if (authService.currentUser) {
          await updateProfile(authService.currentUser, {
            photoURL: tempUrl,
          });
        }
        alert('이미지 업로드가 완료되었습니다.');
        navigate('/mypage', { replace: true });
      }
    }
  };

  //기본 프로필 이미지로 변경
  const onChangeDefaultImg = async () => {
    localStorage.removeItem('profileURL');
    if (authService.currentUser) {
      await updateProfile(authService.currentUser, {
        photoURL: '',
      });
    }
    alert('기본 이미지로 변경되었습니다.');
    navigate('/mypage', { replace: true });
  };

  return {
    profileRelatedValues,
    onChangeUserNickname,
    setProfileRelatedValues,
    attachment,
    onChangeProfileImg,
    onChangeDefaultImg,
    storeImg,
  };
};

export default useEditProfile;

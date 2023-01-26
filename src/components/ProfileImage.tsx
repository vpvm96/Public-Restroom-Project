import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { authService, imgStorage } from '../api/firebaseService';
import profileImgDefault from '../assets/profile.png';
import { uuidv4 } from '@firebase/util';
import CustomButton from './CustomButton';
// type profileURLType = string | ArrayBuffer | null | undefined

const ProfileImage = (): JSX.Element | null => {
  const [attachment, setAttachment] = useState<string | null>();
  // const [userObj, setUserObj]=useState({})

  const onfileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { files } = e.target;
    // const thefile = files![0];
    const thefile = e.target.files![0];
    const reader = new FileReader();
    reader.readAsDataURL(thefile);
    reader.onloadend = (finishedEvent: ProgressEvent<FileReader>) => {
      const profileURL = finishedEvent.target?.result;
      if (typeof profileURL === 'string') {
        setAttachment(profileURL);
        localStorage.setItem('profileURL', profileURL);
      }
    };
  };

  //firebase storage에 로그인한 계정의 프로필 이미지 업로드
  const storeImg = async () => {
    if (attachment) {
      const imgRef = ref(
        imgStorage,
        `${authService.currentUser?.uid}/profileUrl/${uuidv4()}/`
      );
      // const imgRef = imgStorage.ref().child(`${authService.currentUser?.uid}/profileUrl/${uuidv4()}/`)
      console.log('이미지 등록버튼 클릭!', imgRef);
      const profileURL = localStorage.getItem('profileURL');
      if (profileURL) {
        const response = await uploadString(imgRef, profileURL, 'data_url');
        const tempUrl = await getDownloadURL(response.ref);
        if (authService.currentUser) {
          await updateProfile(authService.currentUser, {
            photoURL: tempUrl,
          });
        }
      }
    }
    alert('변경할 이미지가 없습니다!');
  };

  const onClearImg = () => setAttachment(null);
  // useEffect(() => {
  //   authService.onAuthStateChanged(() => {
  //     setInit(true);
  //   });
  // }, [setInit]);

  return (
    <ProfileImgWrapper>
      <label htmlFor="imgInput">
        <ProfileImg
          alt="프로필이미지"
          // src={authService.currentUser?.photoURL || profileImgDefault}
          src={attachment || profileImgDefault}
          style={{ width: '30%', borderRadius: '50%' }}
        />
      </label>
      <input
        id="imgInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onfileChange}
      />
      <button onClick={storeImg}>이미지 등록</button>
      <button onClick={onClearImg}>이미지 제거</button>
      {/* <CustomButton onClickEvent={storeImg}>프로필 수정</CustomButton> */}
    </ProfileImgWrapper>
  );
};

export default ProfileImage;

const ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 30%;
  border-radius: 50%;
`;

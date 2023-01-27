import { useEffect } from 'react';
import styled from 'styled-components';
import { authService } from '../api/firebaseService';
import profileImgDefault from '../assets/profile.png';
import useLoginState from '../hooks/useLoginState';
// import CustomButton from './CustomButton';

const ProfileImage = ({
  attachment,
  onChangeProfileImg,
  storeImg,
}: {
  attachment: string | null | undefined;
  onChangeProfileImg: React.ChangeEventHandler<HTMLInputElement>;
  storeImg: () => void;
}): JSX.Element | null => {
  const { setInit } = useLoginState();

  useEffect(() => {
    authService.onAuthStateChanged(() => {
      setInit(true);
    });
  }, [setInit]);

  return (
    <ProfileImgWrapper>
      <label htmlFor="imgInput">
        {attachment ? (
          <ProfileImg
            alt="프로필이미지"
            src={attachment || profileImgDefault}
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        ) : (
          <ProfileImg
            alt="프로필이미지"
            src={authService.currentUser?.photoURL || profileImgDefault}
            style={{ width: '150px', height: '150px', borderRadius: '50%' }}
          />
        )}
      </label>
      <input
        id="imgInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onChangeProfileImg}
      />
      <BtnWrapper>
        <button onClick={storeImg}>이미지 등록</button>
        {/* <button onClick={() => setAttachment(null)}>이미지 제거</button> */}
        {/* <button onClick={clearImg}>이미지 제거</button> */}
      </BtnWrapper>
      {/* <CustomButton onClickEvent={storeImg}>프로필 수정</CustomButton> */}
    </ProfileImgWrapper>
  );
};

export default ProfileImage;

const ProfileImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 30%;
  border-radius: 50%;
`;

const BtnWrapper = styled.div`
  flex-direction: row;
`;

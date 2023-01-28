import { useEffect } from 'react';
import styled from 'styled-components';
import { authService } from '../api/firebaseService';
import profileImgDefault from '../assets/profile.png';
import useLoginState from '../hooks/useLoginState';

const ProfileImage = ({
  attachment,
  onChangeProfileImg,
}: {
  attachment: string | null | undefined;
  onChangeProfileImg: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element | null => {
  const { setInit } = useLoginState();

  useEffect(() => {
    authService.onAuthStateChanged(() => {
      setInit(true);
    });
  }, [setInit]);

  return (
    <>
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
    </>
  );
};

export default ProfileImage;

const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 30%;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  cursor: pointer;
`;

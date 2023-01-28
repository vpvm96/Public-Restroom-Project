import { ProfileImage, CustomButton, CustomInput } from '../components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import usePwdManager from '../hooks/usePwdManager';
import useButtonReactions from '../hooks/useButtonReactions';
import useLoginState from '../hooks/useLoginState';
import useEditProfile from '../hooks/useEditProfile';
import profileImgDefault from '../assets/profile.png';

const MyPage = () => {
  const { isLoggedIn, isAuthorizedInSession, userObjParsed } = useLoginState();
  const { pwdRelatedValues, onChangePwd, setPwdRelatedValues } =
    usePwdManager();
  const {
    profileRelatedValues,
    onChangeUserNickname,
    attachment,
    onChangeProfileImg,
    onChangeDefaultImg,
    storeImg,
  } = useEditProfile();
  const { handleChangeNickname, handleChangePwd, handleDeleteAccount } =
    useButtonReactions({
      pwdRelatedValues,
      profileRelatedValues,
      setPwdRelatedValues,
    });
  const [isEditUserInfo, setIsEditUserInfo] = useState(false);

  return (
    <>
      {isLoggedIn && isAuthorizedInSession ? (
        <Container>
          {isEditUserInfo ? (
            <>
              <ProfileWrapper>
                <ProfileImage
                  attachment={attachment}
                  onChangeProfileImg={onChangeProfileImg}
                />
                <CustomInput
                  type="text"
                  value={profileRelatedValues.userNickname}
                  observeValue={profileRelatedValues.isValidNickname}
                  observeContent={profileRelatedValues.userNicknameObserver}
                  placeholder="변경할 닉네임을 입력하세요"
                  name="userNickname"
                  onChangeEvent={onChangeUserNickname}
                />
                <ProfileBtnWrapper>
                  {attachment !== undefined ? (
                    <UpdateImgBtn onClick={storeImg}>이미지 등록</UpdateImgBtn>
                  ) : null}
                  <CustomButton onClickEvent={onChangeDefaultImg}>
                    기본 이미지로 변경
                  </CustomButton>
                  <EditNicknameBtn
                    onClick={handleChangeNickname}
                    isDisabled={profileRelatedValues.isValidNickname}
                    disabled={
                      profileRelatedValues.isValidNickname ? false : true
                    }
                  >
                    닉네임 변경
                  </EditNicknameBtn>
                  <ProfileEditToggle
                    onClick={() => setIsEditUserInfo(!isEditUserInfo)}
                  >
                    프로필 변경 닫기
                  </ProfileEditToggle>
                </ProfileBtnWrapper>
              </ProfileWrapper>
              <InputWrapper>
                <CustomInput
                  type="password"
                  value={pwdRelatedValues.currentPwd}
                  observeValue={pwdRelatedValues.isCurrentPwd}
                  observeContent={pwdRelatedValues.currentPwdObserver}
                  placeholder="기존 비밀번호를 입력하세요"
                  name="currentPwd"
                  onChangeEvent={onChangePwd}
                />
                <CustomInput
                  type="password"
                  value={pwdRelatedValues.newPwd}
                  observeValue={pwdRelatedValues.isValidPwd}
                  observeContent={pwdRelatedValues.newPwdObserver}
                  placeholder="새 비밀번호를 입력하세요"
                  name="newPwd"
                  onChangeEvent={onChangePwd}
                />
                <CustomInput
                  type="password"
                  value={pwdRelatedValues.confirmNewPwd}
                  observeValue={pwdRelatedValues.isSamePwd}
                  observeContent={pwdRelatedValues.confirmNewPwdObserver}
                  placeholder="같은 비밀번호를 입력하세요"
                  name="confirmNewPwd"
                  onChangeEvent={onChangePwd}
                />
                <BtnWrapper>
                  <CustomButton onClickEvent={handleChangePwd}>
                    비밀번호 변경
                  </CustomButton>
                  <CustomButton onClickEvent={handleDeleteAccount}>
                    회원탈퇴
                  </CustomButton>
                </BtnWrapper>
              </InputWrapper>
            </>
          ) : (
            <>
              <ProfileImg
                alt="프로필이미지"
                src={userObjParsed.photoURL || profileImgDefault}
                style={{ width: '150px', height: '150px', borderRadius: '50%' }}
              />
              <UserInfoText>{userObjParsed.email}</UserInfoText>
              <UserInfoText>{userObjParsed.displayName}</UserInfoText>
              <ProfileEditToggle
                onClick={() => setIsEditUserInfo(!isEditUserInfo)}
              >
                프로필 변경 열기
              </ProfileEditToggle>
            </>
          )}
        </Container>
      ) : (
        <Container>
          <NoticeWrapper>
            서비스를 이용하시려면&nbsp;
            <Link
              style={{
                textDecoration: 'none',
                fontSize: '16px',
                color: 'blue',
              }}
              to={'/login'}
            >
              로그인
            </Link>
            &nbsp;해주세요.
          </NoticeWrapper>
        </Container>
      )}
    </>
  );
};

export default MyPage;

const Container = styled.div`
  margin-top: 8rem;
  padding: 50px;
  width: 70%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #d3d3d3;
  box-shadow: 5px 5px 5px gray;
  gap: 10px;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const BtnWrapper = styled.div`
  flex-direction: row;
`;

const ProfileBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NoticeWrapper = styled.div``;

const ProfileWrapper = styled.div`
  width: 300px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ProfileEditToggle = styled.button`
  width: 6rem;
  height: 2rem;
  border: none;
  background-color: #468bfb;
  margin: 10px;
  color: white;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  position: relative;
  margin: auto;
  width: 30%;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  cursor: pointer;
`;

const UpdateImgBtn = styled.button`
  width: 6rem;
  height: 2rem;
  border: none;
  background-color: #468bfb;
  margin: 10px;
  color: white;
  cursor: pointer;
`;

const EditNicknameBtn = styled.button<{ isDisabled: boolean }>`
  width: 6rem;
  height: 2rem;
  border: none;
  background-color: ${(props) => (props.isDisabled ? '#468bfb' : '#a4cdfe')};
  margin: 10px;
  color: white;
  cursor: pointer;
`;

const UserInfoText = styled.p``;

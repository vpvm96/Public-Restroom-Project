// import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ProfileImage, CustomButton, CustomInput } from '../components';
import { Link } from 'react-router-dom';
import usePwdManager from '../hooks/usePwdManager';
import useButtonReactions from '../hooks/useButtonReactions';
import useLoginState from '../hooks/useLoginState';
import useEditProfile from '../hooks/useEditProfile';

const MyPage = () => {
  const { isLoggedIn, isAuthorizedInSession } = useLoginState();
  const { pwdRelatedValues, onChangePwd } = usePwdManager();
  const {
    profileRelatedValues,
    onChangeUserNickname,
    attachment,
    onChangeProfileImg,
    storeImg,
  } = useEditProfile();
  const { handleChangeNickname, handleChangePwd, handleDeleteAccount } =
    useButtonReactions({ pwdRelatedValues, profileRelatedValues });

  return (
    <>
      {isLoggedIn && isAuthorizedInSession ? (
        <Container>
          <ProfileWrapper>
            마이페이지
            <ProfileImage
              attachment={attachment}
              onChangeProfileImg={onChangeProfileImg}
              storeImg={storeImg}
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
            <CustomButton onClickEvent={handleChangeNickname}>
              닉네임 변경
            </CustomButton>
          </ProfileWrapper>
          <InputWrapper>
            <CustomInput
              type="password"
              value={pwdRelatedValues.currentPwd}
              observeValue={pwdRelatedValues.isCurrentPwd}
              observeContent={pwdRelatedValues.currentPwdObserver}
              placeholder="기존 비밀번호를 입력하세요"
              name="currentPwd"
              // pwdRelatedValues={pwdRelatedValues}
              onChangeEvent={onChangePwd}
            />
            <CustomInput
              type="password"
              value={pwdRelatedValues.newPwd}
              observeValue={pwdRelatedValues.isValidPwd}
              observeContent={pwdRelatedValues.newPwdObserver}
              placeholder="새 비밀번호를 입력하세요"
              name="newPwd"
              // pwdRelatedValues={pwdRelatedValues}
              onChangeEvent={onChangePwd}
            />
            <CustomInput
              type="password"
              value={pwdRelatedValues.confirmNewPwd}
              observeValue={pwdRelatedValues.isSamePwd}
              observeContent={pwdRelatedValues.confirmNewPwdObserver}
              placeholder="같은 비밀번호를 입력하세요"
              name="confirmNewPwd"
              // pwdRelatedValues={pwdRelatedValues}
              onChangeEvent={onChangePwd}
            />
            <BtnWrapper>
              {/* <CustomButton onClickEvent={handleLogOut}>로그아웃</CustomButton> */}
              <CustomButton onClickEvent={handleChangePwd}>
                비밀번호 변경
              </CustomButton>
              <CustomButton onClickEvent={handleDeleteAccount}>
                회원탈퇴
              </CustomButton>
            </BtnWrapper>
          </InputWrapper>
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
  /* height: 80%; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: 1px solid #d3d3d3;
  box-shadow: 5px 5px 5px gray;
  gap: 10px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const BtnWrapper = styled.div`
  flex-direction: row;
`;

const NoticeWrapper = styled.div``;

const ProfileWrapper = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  /* align-items: baseline; */
`;

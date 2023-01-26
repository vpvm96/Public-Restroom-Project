import React, { useState } from 'react';
import styled from 'styled-components';

const CustomNicknameInput = ({
  userNickname,
  userNicknameObserver,
  isValidNickname,
  onChangeUserNickname,
}: {
  userNickname: string;
  userNicknameObserver: string;
  isValidNickname: boolean;
  onChangeUserNickname: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Container>
      <InputStyle
        type="text"
        value={userNickname}
        placeholder="변경할 닉네임을 입력하세요"
        onChange={onChangeUserNickname}
      />
      <ObserverWrapper>
        {userNickname.length > 0 && (
          <NicknameObserver isSamePwd={isValidNickname}>
            {userNicknameObserver}
          </NicknameObserver>
        )}
      </ObserverWrapper>
    </Container>
  );
};

export default CustomNicknameInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputStyle = styled.input`
  margin-left: 0;
  width: 150px;
  height: 30px;
  border: none;
  background-color: #eeeeee;
`;

const ObserverWrapper = styled.div`
  width: 200px;
  height: 20px;
`;

const NicknameObserver = styled.p<{ isSamePwd: boolean }>`
  margin-left: 0;
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 0px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: -10px;
  /* left: 0; */
  color: ${(props) => (props.isSamePwd ? '#189701' : '#ff2727')};
`;

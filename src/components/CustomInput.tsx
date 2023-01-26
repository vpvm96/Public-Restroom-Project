import React from 'react';
import styled from 'styled-components';

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

const CustomInput = ({
  type,
  value,
  observeValue,
  observeContent,
  placeholder,
  name,
  pwdRelatedValues,
  onChangePwd,
}: {
  type: string;
  value: string;
  observeValue: boolean;
  observeContent: string;
  placeholder: string;
  name: string;
  pwdRelatedValues: pwdRelatedValueTypes;
  onChangePwd: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element | null => {
  return (
    <>
      <InputStyle
        // ref={currentPwdInput}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChangePwd}
      />
      <ObserverWrapper>
        {value.length > 0 && (
          <PwdValueObserver observeValue={observeValue}>
            {observeContent}
          </PwdValueObserver>
        )}
      </ObserverWrapper>
    </>
  );
};

export default CustomInput;

const InputStyle = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  background-color: #eeeeee;
`;

const PwdValueObserver = styled.p<{ observeValue: boolean }>`
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  /* left: 0; */
  color: ${(props) => (props.observeValue ? '#189701' : '#ff2727')};
`;

const ObserverWrapper = styled.div`
  width: 200px;
  height: 20px;
`;

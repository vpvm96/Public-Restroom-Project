import React from 'react';
import styled from 'styled-components';

const CustomInput = ({
  type,
  value,
  observeValue,
  observeContent,
  placeholder,
  name,
  onChangeEvent,
}: {
  type: string;
  value: string;
  observeValue: boolean;
  observeContent: string;
  placeholder: string;
  name: string;
  onChangeEvent: React.ChangeEventHandler<HTMLInputElement>;
}): JSX.Element | null => {
  return (
    <>
      <InputStyle
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChangeEvent}
      />
      <ObserverWrapper>
        {value.length > 0 && (
          <ValueObserver observeValue={observeValue}>
            {observeContent}
          </ValueObserver>
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

const ValueObserver = styled.p<{ observeValue: boolean }>`
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  color: ${(props) => (props.observeValue ? '#189701' : '#ff2727')};
`;

const ObserverWrapper = styled.div`
  width: 200px;
  height: 20px;
`;

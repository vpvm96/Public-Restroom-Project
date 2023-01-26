import styled from 'styled-components';

const CustomButton = ({
  children,
  onClickEvent,
}: {
  children: string;
  onClickEvent: () => void;
}) => {
  return <BtnStyle onClick={onClickEvent}>{children}</BtnStyle>;
};

export default CustomButton;

const BtnStyle = styled.button`
  width: 6rem;
  height: 2rem;
  border: none;
  background-color: #468bfb;
  margin: 10px;
  color: white;
  cursor: pointer;
`;

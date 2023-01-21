import styled from 'styled-components';

const ModalLayout = styled.div`
  width: 800px;
  height: 100%;
  border: 2px solid red;
  display: none;
  padding: 10px 10px 10px 10px;
`;

const ModalBox = styled.div``;
const MyModal = styled.div`
  border: 1px solid;
  width: 600px;
  height: 150px;
`;
const ModalInput = styled.input`
  width: 100%;
  height: 100px;
  border: 2px solid blue;
`;

export { ModalLayout, ModalBox, ModalInput, MyModal };

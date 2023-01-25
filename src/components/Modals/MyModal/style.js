import styled from 'styled-components';

const ModalLayout = styled.div`
  width: 60%;
  height: 100%;
  padding: 10px 0px 10px 0px;
`;

const ModalBox = styled.div``;
const MyModal = styled.div`
  width: 100%;
  height: 150px;
  margin-top: 10px;
`;
const ModalInput = styled.input`
  width: 100%;
  height: 80px;
  padding: 10px;
  padding-bottom: 70px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ModalSapan = styled.span`
  padding: 5px;
  margin-left: 200px;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: blue;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;

export { ModalLayout, ModalBox, ModalInput, MyModal, ModalSapan };

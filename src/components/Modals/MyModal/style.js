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
  width: 100%;
  height: 100%;
  border: 1px solid white;
  box-shadow: 0px 0px 12px -6px rgba(0, 0, 0, 5);
  color: #fff;
  background-color: #4285f4;
  border-radius: 5px;
  cursor: pointer;
  position: relative;
  left: 90%;
`;
const ModalDisplayName = styled.div`
  position: absolute;
`;
const ModalHeader = styled.div`
  position: relative;
  justify-content: space-between;
`;

const Scroll = styled.div`
  overflow-y: scroll;
  height: 420px;
`;
export {
  ModalLayout,
  ModalBox,
  ModalInput,
  MyModal,
  ModalSapan,
  ModalDisplayName,
  ModalHeader,
  Scroll,
};

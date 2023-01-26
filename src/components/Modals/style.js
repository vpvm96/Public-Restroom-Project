import styled from 'styled-components';

const ModalOpen = styled.div`
  display: flex;
  align-items: center;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-bg-show 0.3s;
`;
const Modallayout = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
`;

const ModalSection = styled.section`
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  /* 팝업이 열릴때 스르륵 열리는 효과 */
  animation: modal-show 0.3s;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const ModalButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  border: 0;
`;

const ModalFooter = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;

const FooterButton = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
`;
const ReviewBtton = styled.button`
  width: 52px;
  height: 1.9rem;
  border: none;
  box-shadow: 0px 0px 12px -6px rgba(0, 0, 0, 5);
  color: #fff;
  background-color: #4285f4;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
`;

export {
  Modallayout,
  ModalSection,
  ModalHeader,
  ModalButton,
  ModalFooter,
  FooterButton,
  ModalOpen,
  ReviewBtton,
};

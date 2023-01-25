import React from 'react';
import './style.css';
import MyModals from './MyModal/MyModals';

import { useState } from 'react';
import {
  Modallayout,
  ModalSection,
  ModalHeader,
  ModalButton,
  ModalFooter,
  FooterButton,
  ReviewBtton,
} from './style';

export default function Modal({ header }: any): any {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = () => {
    setModalOpen(false);
  };
  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      <ReviewBtton onClick={openModal}>리뷰작성</ReviewBtton>
      <Modallayout className={modalOpen ? 'openModal modal' : 'modal'}>
        {modalOpen ? (
          <ModalSection>
            <ModalHeader>
              화장실 리뷰
              <ModalButton className="close" onClick={closeModal}>
                &times;
              </ModalButton>
            </ModalHeader>
            <MyModals />
            <ModalFooter>
              <FooterButton className="close" onClick={closeModal}>
                close
              </FooterButton>
            </ModalFooter>
          </ModalSection>
        ) : null}
      </Modallayout>
    </>
  );
}

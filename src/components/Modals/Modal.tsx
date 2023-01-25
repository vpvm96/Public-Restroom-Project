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

export default function Modal({ HNR_NAM, GU_NM, OBJECTID }: any): any {
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
              {`${GU_NM + ' ' + HNR_NAM} 공용 화장실`}
              <ModalButton className="close" onClick={closeModal}>
                &times;
              </ModalButton>
            </ModalHeader>
            <MyModals OBJECTID={OBJECTID} />
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

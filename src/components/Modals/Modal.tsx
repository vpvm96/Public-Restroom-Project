import React from 'react';
import './style.css';
import MyModals from './MyModal/MyModals';
import { useState, useCallback } from 'react';
import {
  Modallayout,
  ModalSection,
  ModalHeader,
  ModalButton,
  ModalFooter,
  FooterButton,
  ReviewBtton,
} from './style';
import { uuidv4 } from '@firebase/util';
import { authService } from '../../api/firebaseService';
export default function Modal({ HNR_NAM, GU_NM, OBJECTID }: any): any {
  const [modal, setModals]: any = useState([
    {
      title: `${GU_NM + ' ' + HNR_NAM} 공용 화장실`,
      displayName: '빨간휴지',
      content: '노란휴지없나',
      ModalId: OBJECTID,
      id: uuidv4(),
      uuid: '',
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);
  const openModal = useCallback(() => {
    // 로그인 안하면 리뷰작성 안눌림
    if (!authService.currentUser) {
      alert('로그인이 필요합니다');
      return;
    }
    setModalOpen(true);
  }, []);

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
            <MyModals
              GU_NM={GU_NM}
              HNR_NAM={HNR_NAM}
              OBJECTID={OBJECTID}
              modal={modal}
              setModals={setModals}
            />
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

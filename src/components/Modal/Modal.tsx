import React, { useRef, useState } from 'react';
import {
  ModalLayout,
  ModalBox,
  ModalInput,
  MyModal,
  YourModal,
  ModalBtn,
} from './style';

export default function Modal(): any {
  const [modalText, setModalText] = useState('');
  const [isModal, setisModal] = useState(false);
  const modalRef = useRef<any>();
  const InputRef = useRef<any>();

  const [modal, setModals]: any = useState([
    {
      writer: '빨간휴지',
      text: '노란휴지없나',
      isModal: false,
    },
  ]);

  // 버튼누르면 Modal 보이고 안보이고
  const ModalBtn = () => {
    setisModal(!isModal);
    if (isModal === false) {
      modalRef.current.style = 'display:none';
    } else if (isModal === true) {
      modalRef.current.style = 'display:block';
    }
  };

  // input 창안에 onchange
  const ModalTextChange = (event: any): any => {
    setModalText(event.target.value);
  };

  const ModalInputBtn = (): any => {
    if (!modalText) {
      alert('리뷰입력하삼');
      InputRef.current.focus();
      return;
    }
    const newModal: any = {
      modalText,
      isModal: false,
    };

    setModals((prev: any): any => {
      return [...prev, newModal];
    });
    setModalText('');
    alert('리뷰등록됨');
  };

  return (
    <>
      <button onClick={ModalBtn}>이걸누르면 모달이 툭</button>
      <ModalLayout ref={modalRef}>
        <MyModal>
          작성자 : 빨간휴지줄까 파란휴지줄까
          <ModalBox>
            <ModalInput
              placeholder="댓글을 입력해주세요"
              value={modalText}
              onChange={ModalTextChange}
              ref={InputRef}
            />
            <button onClick={ModalInputBtn}>확인</button>
            <button>수정</button> <button>삭제</button>
          </ModalBox>
        </MyModal>
        {modal.map((item: any) => {
          return (
            <YourModal>
              <p> 내용 : {item.modalText}</p>
            </YourModal>
          );
        })}
      </ModalLayout>
    </>
  );
}

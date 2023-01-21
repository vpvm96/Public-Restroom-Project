import React, { useRef, useState } from 'react';
import { ModalLayout, ModalBox, ModalInput, MyModal } from './style';
import { uuidv4 } from '@firebase/util';
import YourModal from './YourModal/YourModal';
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
      id: uuidv4(),
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

  const addModal = (): any => {
    if (!modalText) {
      alert('리뷰입력하삼');
      InputRef.current.focus();
      return;
    }
    const newModal: any = {
      modalText,
      isModal: false,
      id: uuidv4(),
    };

    setModals((prev: any): any => {
      return [...prev, newModal];
    });
    setModalText('');
    alert('리뷰등록됨');
  };

  console.log(modal);
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
            <button onClick={addModal}>확인</button>
          </ModalBox>
        </MyModal>
        {modal.map((item: any) => {
          return <YourModal item={item} setModals={setModals} />;
        })}
      </ModalLayout>
    </>
  );
}

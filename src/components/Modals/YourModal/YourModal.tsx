import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import {
  YourModals,
  YourModalsBtnArea,
  YourModalsLayout,
  YourModalsInput,
  YourModalSapan,
  YourModlasText,
} from './style';

export default function YourModal({ item, modal, setModals }: any) {
  // 수정,버튼
  const changeInput = useRef<any>();
  const changeDel = useRef<any>();
  const changeEdit = useRef<any>();
  const changeSuc = useRef<any>();
  const input = useRef<any>();
  const [totgle, setTtogle] = useState(false);
  const [edit, setEdit] = useState('');

  // 댓글삭제하기
  const deleteModal = () => {
    setModals((prev: any) => prev.filter((t: any) => t.id !== item.id));
    console.log(item);
    alert('삭제하시겠습니까');
  };

  // 수정버튼
  const inputText = (event: any) => {
    setTtogle(true);
    input.current.style = 'display:none';
    changeInput.current.style = 'display:block';
    changeInput.current.focus();
    setEdit(item.modalText);
  };

  //input onchange
  const inputTextHandeler = (event: any) => {
    setEdit(event.target.value);
    console.log(edit);
  };

  //수정완료버튼
  const inputTextChange = (event: any) => {
    if (edit === '') {
      alert('입력하삼');
      return;
    }
    setTtogle(false);
    input.current.style = 'display:block';
    changeInput.current.style = 'display:none';
    const editValue = modal.map((data: any) => ({
      ...data,
      modalText: data.id === item.id ? edit : data.modalText,
    }));
    setModals(editValue);
  };

  return (
    <YourModalsLayout>
      <YourModals>
        <YourModlasText ref={input} style={{ display: 'block' }}>
          {item.modalText}
        </YourModlasText>
        <YourModalsInput
          style={{ display: 'none' }}
          id="text"
          name="text"
          ref={changeInput}
          value={edit}
          onChange={inputTextHandeler}
        />
        <YourModalsBtnArea>
          {totgle === false ? (
            <>
              <YourModalSapan ref={changeDel} onClick={deleteModal}>
                삭제
              </YourModalSapan>
              <YourModalSapan ref={changeEdit} onClick={inputText}>
                수정
              </YourModalSapan>
            </>
          ) : (
            <YourModalSapan ref={changeSuc} onClick={inputTextChange}>
              수정완료
            </YourModalSapan>
          )}
        </YourModalsBtnArea>
      </YourModals>
    </YourModalsLayout>
  );
}

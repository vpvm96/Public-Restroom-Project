import { uuidv4 } from '@firebase/util';
import { text } from 'node:stream/consumers';
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import {
  YourModals,
  YourModalsBtnArea,
  YourModalsLayout,
  YourModalsInput,
} from './style';

export default function YourModal({ item, setModals }: any) {
  // 수정,버튼
  const changeInput = useRef<any>();
  const changeDel = useRef<any>();
  const changeEdit = useRef<any>();
  const changeSuc = useRef<any>();
  const [edit, setEdit] = useState(item.modalText);

  // 댓글삭제하기
  const deleteModal = () => {
    setModals((prev: any) => prev.filter((t: any) => t.id !== item.id));
    console.log(item);
    alert('삭제하시겠습니까');
  };

  // 수정버튼
  const inputText = (event: any) => {
    changeDel.current.style = 'display:none';
    changeEdit.current.style = 'display:none';
    changeSuc.current.style = 'display:block';
    changeInput.current.style = 'display:block';
    changeInput.current.focus();
    setEdit(event.target.value);
  };

  //수정완료버튼
  const inputTextChange = (event: any) => {
    changeInput.current.style = 'display:none';
    changeDel.current.style = 'display:block';
    changeEdit.current.style = 'display:block';
    changeSuc.current.style = 'display:none';

    const NewEdit = {
      // writer: '',
      modalText: edit,
      // isModal: false,
      // id: uuidv4(),
    };

    // setModals(NewEdit);
  };

  const edits = ({ item }: any): any => {
    const newModal: any = {
      writer: '',
      modalText: edit,
      isModal: false,
      id: uuidv4(),
    };
    setModals((prev: any): any => {
      return { ...prev, newModal };
    });
  };

  //input onchange
  const inputTextHandeler = (event: any) => {
    setEdit(event.target.value);
  };

  return (
    <YourModalsLayout>
      <YourModals>
        {item.modalText}
        <input
          style={{ display: 'none' }}
          id="text"
          name="text"
          ref={changeInput}
          // value={item.modalText}
          value={edit}
          onChange={inputTextHandeler}
        />
      </YourModals>
      <YourModalsBtnArea>
        <button
          ref={changeDel}
          style={{ display: 'block' }}
          name="del"
          onClick={deleteModal}
        >
          삭제
        </button>
        <button
          ref={changeEdit}
          style={{ display: 'block' }}
          name="edit"
          onClick={inputText}
        >
          수정
        </button>
        <button ref={changeSuc} onClick={edits} style={{ display: 'none' }}>
          수정완료
        </button>
      </YourModalsBtnArea>
    </YourModalsLayout>
  );
}

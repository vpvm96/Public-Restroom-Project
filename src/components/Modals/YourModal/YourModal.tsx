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
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { fireStore } from '../../../api/firebaseService';

export default function YourModal({ item }: any) {
  // 수정,버튼
  const changeInput = useRef<any>();
  const changeDel = useRef<any>();
  const changeEdit = useRef<any>();
  const changeSuc = useRef<any>();
  const input = useRef<any>();
  const [totgle, setTtogle] = useState(false);
  const [edit, setEdit] = useState('');

  // 댓글삭제하기
  const handleModalCommentDelete = async (reviewId: any) => {
    console.log('reviewId', reviewId);
    await deleteDoc(doc(fireStore, 'reviews', reviewId));
  };

  // 수정버튼
  const inputText = (event: any) => {
    setTtogle(true);
    input.current.style = 'display:none';
    changeInput.current.style = 'display:block';
    setEdit(item.content);
    changeInput.current.focus();
  };

  //input onchange
  const inputTextHandeler = (event: any) => {
    setEdit(event.target.value);
  };

  //수정완료버튼
  const handleModalCommentEdit = async () => {
    const commentRef = doc(fireStore, 'reviews', item.id);
    try {
      await updateDoc(commentRef, {
        content: edit,
      });
      setTtogle(false);
      input.current.style = 'display:block';
      changeInput.current.style = 'display:none';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <YourModalsLayout>
      닉네임
      <YourModals>
        <YourModlasText ref={input} style={{ display: 'block' }}>
          {item.content}
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
              <YourModalSapan
                ref={changeDel}
                onClick={() => handleModalCommentDelete(item.id)}
              >
                삭제
              </YourModalSapan>
              <YourModalSapan ref={changeEdit} onClick={inputText}>
                수정
              </YourModalSapan>
            </>
          ) : (
            <YourModalSapan ref={changeSuc} onClick={handleModalCommentEdit}>
              수정완료
            </YourModalSapan>
          )}
        </YourModalsBtnArea>
      </YourModals>
    </YourModalsLayout>
  );
}

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
import Modal from '../Modal';
import { getAuth } from 'firebase/auth';
export default function YourModal({ item }: any) {
  // 수정,버튼
  const changeInput = useRef<any>();
  const changeDel = useRef<any>();
  const changeEdit = useRef<any>();
  const changeSuc = useRef<any>();
  const input = useRef<any>();

  const [totgle, setTtogle] = useState(false);
  const [edit, setEdit] = useState('');
  const auth = getAuth();

  // 댓글삭제하기
  const handleModalCommentDelete = async (reviewId: any) => {
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
    <div style={{ display: 'block' }}>
      <YourModalsLayout>
        {item.displayName}
        <YourModals>
          <YourModlasText ref={input}>{item.content}</YourModlasText>
          <YourModalsInput
            style={{ display: 'none' }}
            id="text"
            name="text"
            ref={changeInput}
            value={edit}
            onChange={inputTextHandeler}
          />
          {/* 로그인된 아이디랑 작성된 댓글의 아이디가 같으면 수정 삭제버튼이 보이게하기*/}
          {item.authId === auth.currentUser?.uid ? (
            <YourModalsBtnArea style={{ display: 'block' }}>
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
                <YourModalSapan
                  ref={changeSuc}
                  onClick={handleModalCommentEdit}
                >
                  수정완료
                </YourModalSapan>
              )}
            </YourModalsBtnArea>
          ) : (
            ''
          )}
        </YourModals>
      </YourModalsLayout>
    </div>
  );
}

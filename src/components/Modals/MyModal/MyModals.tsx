import React, { useRef, useState, useEffect } from 'react';
import {
  ModalLayout,
  ModalBox,
  ModalInput,
  MyModal,
  ModalSapan,
  ModalDisplayName,
  ModalHeader,
  Scroll,
} from './style';
import YourModal from '../YourModal/YourModal';
import { getAuth } from 'firebase/auth';
import { fireStore } from '../../../api/firebaseService';
import { doc, setDoc, collection, onSnapshot } from 'firebase/firestore';

export default function MyModals({
  HNR_NAM,
  GU_NM,
  OBJECTID,
  modal,
  setModals,
}: any): any {
  const [content, setcontent] = useState('');
  const modalRef = useRef<any>();
  const InputRef = useRef<any>();
  const auth = getAuth();
  const [re, setRe] = useState(false);
  // 파이어베이스에 리뷰가져오기
  useEffect(() => {
    const q = collection(fireStore, 'reviews');
    onSnapshot(q, (snapshot) => {
      const reviews: any = snapshot.docs.map((doc) => {
        const review = {
          id: doc.id,
          ...doc.data(),
        };
        return review;
      });
      setModals(reviews);
    });
  }, []);

  // input 창안에 onchange
  const ModalTextChange = (event: any): any => {
    setcontent(event.target.value);
  };
  // 댓글추가하기
  const addModal = (event: any): any => {
    event.preventDefault();
    // 로그인을 안했을때
    if (!auth.currentUser) {
      alert('로그인이 필요합니다');
      return;
      // input에 리뷰를 입력하지 않았을때
    } else if (!content) {
      alert('리뷰를 입력하세요');
      InputRef.current.focus();
      return;
    }
    setcontent('');
    setRe(true);
    alert('리뷰등록됨');
    //파이어베이스 데이터베이스에 넣어놓기
    const authId = auth.currentUser?.uid;
    const usersRef = collection(fireStore, 'reviews');
    setDoc(doc(usersRef), {
      displayName: auth.currentUser.displayName,
      ModalId: OBJECTID,
      authId,
      content,
      title: `${GU_NM + ' ' + HNR_NAM} 공용 화장실`,
    });
    return;
  };

  return (
    <>
      <ModalLayout ref={modalRef}>
        <MyModal>
          <ModalBox>
            <ModalHeader>
              <ModalDisplayName>
                작성자 : {auth.currentUser?.displayName}
              </ModalDisplayName>
              <ModalSapan onClick={addModal}>확인</ModalSapan>
            </ModalHeader>
            <ModalInput
              placeholder="리뷰를 남겨주세요"
              value={content}
              onChange={ModalTextChange}
              ref={InputRef}
              style={{ display: 'block' }}
            />
          </ModalBox>
        </MyModal>
        <Scroll>
          {modal
            /* 화장실Id에 맞는거만 필터로 보여줘서 맵을 돌림*/
            .filter((m: any) => m.ModalId === OBJECTID)
            .map((item: any) => {
              return (
                <YourModal
                  key={item.id}
                  item={item}
                  modal={modal}
                  setModals={setModals}
                />
              );
            })}
        </Scroll>
      </ModalLayout>
    </>
  );
}

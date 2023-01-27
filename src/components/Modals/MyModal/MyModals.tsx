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
import { authService, fireStore } from '../../../api/firebaseService';
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
export interface ModalState {
  [key: string]: string | number;
}

interface ModalProps {
  HNR_NAM: string;
  GU_NM: string;
  OBJECTID: string | number;
  modal: ModalState[];
  setModals: (reviews: { id: string }[]) => void;
}

export default function MyModals({
  HNR_NAM,
  GU_NM,
  OBJECTID,
  modal,
  setModals,
}: ModalProps) {
  const [content, setcontent] = useState('');
  const InputRef = useRef<HTMLInputElement>(null);

  // 파이어베이스에 리뷰가져오기
  useEffect(() => {
    const q = collection(fireStore, 'reviews');
    //orderBY로 최신순정렬함
    orderBy('createdAt');
    onSnapshot(q, (snapshot) => {
      const reviews = snapshot.docs.map((doc) => {
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
  const ModalTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setcontent(event.target.value);
  };
  // 댓글추가하기
  const addModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    // 로그인을 안했을때
    if (!authService.currentUser) {
      alert('로그인이 필요합니다');
      return;
      // input에 리뷰를 입력하지 않았을때
    } else if (!content) {
      alert('리뷰를 입력하세요');
      InputRef.current!.focus();
      return;
    }
    setcontent('');
    alert('리뷰등록됨');
    //파이어베이스 데이터베이스에 넣어놓기
    const authId = authService.currentUser?.uid;
    const usersRef = collection(fireStore, 'reviews');
    setDoc(doc(usersRef), {
      displayName: authService.currentUser.displayName,
      ModalId: OBJECTID,
      authId,
      content,
      title: `${GU_NM + ' ' + HNR_NAM} 공용 화장실`,
      createdAt: new Date(),
    });
    return;
  };

  return (
    <>
      <ModalLayout>
        <MyModal>
          <ModalBox>
            <ModalHeader>
              <ModalDisplayName>
                작성자 : {authService.currentUser?.displayName}
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
            .filter((m: ModalState) => m.ModalId === OBJECTID)
            .map((item: ModalState) => {
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

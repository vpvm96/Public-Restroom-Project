import React from 'react';
import { YourModals, YourModalsBtnArea, YourModalsLayout } from './style';

export default function YourModal({ item, setModals }: any) {
  // 댓글삭제하기
  const deleteModal = () => {
    setModals((prev: any) => prev.filter((t: any) => t.id !== item.id));
    console.log(item);
    alert('삭제하시겠습니까');
  };

  return (
    <YourModalsLayout>
      <YourModals>{item.modalText}</YourModals>
      <YourModalsBtnArea>
        <button onClick={deleteModal}>삭제</button>
        <button>수정</button>
      </YourModalsBtnArea>
    </YourModalsLayout>
  );
}

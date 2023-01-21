import React from 'react';
import { YourModals } from './style';

export default function YourModal({ item, setModals }: any) {
  const deleteModal = () => {
    setModals((prev: any) => prev.filter((t: any) => t.id !== item.id));
    console.log(item);
    alert('삭제하시겠습니까');
  };

  return (
    <YourModals>
      {item.modalText}
      <button onClick={deleteModal}>삭제</button>
    </YourModals>
  );
}

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import mainImg from '../assets/main.png';
import { fireStore } from '../api/firebaseService';
import { collection, getDocs } from 'firebase/firestore';
const MainPage = () => {
  const [test, setTest] = useState([]);
  const testCollectionRef = collection(fireStore, 'test');

  useEffect(() => {
    const getTest = async () => {
      const data = await getDocs(testCollectionRef);
      console.log(data);
      setTest(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getTest();
  }, []);

  return (
    <MainWrap>
      <MainImg />
      <Into>
        <p>급똥 어디까지 참아봤니?</p>
        <p>
          밖에서 갑자기 화장실이 급할 때, <br></br>"너무 급해 돈을 내도 좋으니
          화장실만 찾자..." 라는 생각을 해본적 다들 한 번씩 있을겁니다.<br></br>
          이런 불편함으로인해 화장실이 급한 사용자들에게 화장실 위치 정보를
          공유하는 플랫폼 잠깐만! 이 도와 드리겠습니다.<br></br> 잠깐만은 서울시
          공공화장실의 위치 정보를 공유하는 플랫폼 입니다.
        </p>
      </Into>
      <ReviewBox>
        {test.map((t) => {
          return (
            <div>
              <h3>
                {t.title} : {t.content}
              </h3>
              <p>{t.createdAt}</p>
            </div>
          );
        })}
        {/* {review.map((item) => {
          return (
            <div>
              <h3>
                {item.title} : {item.contents}
              </h3>
              <p>{item.date}</p>
            </div>
          );
        })} */}
      </ReviewBox>
    </MainWrap>
  );
};

//리뷰에 날짜가 있으니까 리뷰를 받아서 날짜를 parsInt로 바꿔서
//가장큰 숫자부터 보여줘 parsInt(review.date.split('-'))
//박스에다 radious와 박스 쉐도우 주기
//박스 넓이를 더주고 패딩을 줘서 글을 안으로 밀어넣기
//근데 box-shadow 줄거면 바깥에 solid값은 검은색하지 말고 다른거 하세요

export default MainPage;

const MainWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: lightgray;
`;

const MainImg = styled.div`
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 300px;
  background-image: url(${mainImg});
`;

const Into = styled.div`
  background-color: white;
  margin-top: 70px;
  width: 70%;
  padding: 50px;
  font-weight: 700;
  font-size: 20px;
  border-radius: 20px;
  background-color: white;
  box-shadow: 5px 5px 5px;
`;

const ReviewBox = styled.div`
  background-color: white;
  margin-top: 100px;
  width: 70%;
  padding: 50px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 200px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px;
  /* overflow: scroll; */
`;

// const initialState = [
//   {
//     title: '강남 화장실',
//     contents: '휴지가 없네',
//     date: '2023-1-03-12:30',
//   },
//   {
//     title: '신사 화장실',
//     contents: '너무 청결해요',
//     date: '2023-1-13-12:30',
//   },
//   {
//     title: '구파발 화장실',
//     contents: '화장실에서 삥뜯겼어요...',
//     date: '2023-1-05-12:30',
//   },
//   {
//     title: '부천 화장실',
//     contents: '심대호 무서워',
//     date: '2023-1-06-12:30',
//   },
//   {
//     title: '화장실5',
//     contents: '화장실5 리뷰',
//     date: '2023-1-07-12:30',
//   },
//   {
//     title: '화장실6',
//     contents: '화장실6 리뷰',
//     date: '2023-1-01-12:30',
//   },
//   {
//     title: '화장실7',
//     contents: '화장실7 리뷰',
//     date: '2023-1-02-12:30',
//   },
//   {
//     title: '화장실8',
//     contents: '화장실8 리뷰',
//     date: '2023-1-21-12:30',
//   },
//   {
//     title: '화장실9',
//     contents: '화장실9 리뷰',
//     date: '2023-1-20-12:30',
//   },
//   {
//     title: '화장실10',
//     contents: '화장실10 리뷰',
//     date: '2023-1-30-12:30',
//   },
//   {
//     title: '화장실11',
//     contents: '화장실11 리뷰',
//     date: '2023-1-19-12:30',
//   },
//   {
//     title: '화장실12',
//     contents: '화장실12 리뷰',
//     date: '2023-1-17-11:30',
//   },
//   {
//     title: '화장실13',
//     contents: '화장실13 리뷰',
//     date: '2023-1-17-10:30',
//   },
//   {
//     title: '화장실14',
//     contents: '화장실14 리뷰',
//     date: '2023-1-17-09:30',
//   },
// ];

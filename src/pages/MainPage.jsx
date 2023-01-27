import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../api/firebaseService';
import { BsFillBookmarkFill } from 'react-icons/bs';
import mainImg from '../assets/Banner.jpg';
import InfoImg from '../assets/Info.png';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';

const MainPage = () => {
  const [reviews, setReviews] = useState([]);
  const testCollectionRef = collection(fireStore, 'reviews');

  const auth = getAuth();
  console.log('현재유저:', auth.currentUser.displayName);

  useEffect(() => {
    const getReviews = async () => {
      const data = await getDocs(testCollectionRef);
      setReviews(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
        }))
      );
    };

    getReviews();
  }, []);

  return (
    <MainWrap>
      <MainImg />
      <InfoWrap>
        <Infoimg src={InfoImg} />
        <Info>
          <Title>급똥 어디까지 참아봤니?</Title>
          <br></br>
          <p>
            밖에서 갑자기 화장실이 급할 때, <br></br>"너무 급해 돈을 내도 좋으니
            화장실만 찾자..." 라는 생각을 해본적 다들 한 번씩 있을겁니다. 이런
            불편함으로인해 화장실이 급한 사용자들에게 화장실 위치 정보를
            공유하는 플랫폼 잠깐만! 이 도와 드리겠습니다. 잠깐만은 서울시
            공공화장실의 위치 정보를 공유하는 플랫폼 입니다.
          </p>
        </Info>
      </InfoWrap>

      <ReviewText>REVIEW</ReviewText>
      <div>화장실 이용에 대한 리뷰를 소개합니다.</div>
      <ReviewBoxWrap>
        {reviews.map((r) => {
          return (
            <ReviewBox key={r.id}>
              <Icon>
                <BsFillBookmarkFill size={50} />
              </Icon>
              <p style={{ position: 'absolute', top: '10%' }}>
                닉네임: {r.displayName}
              </p>
              <p style={{ position: 'absolute', top: '25%' }}>{r.title}</p>
              <p style={{ position: 'absolute', top: '45%' }}>{r.content}</p>
              <p style={{ position: 'absolute', top: '80%', right: '5%' }}>
                {r.createdAt.toString().slice(0, 24)}
              </p>
            </ReviewBox>
          );
        })}
      </ReviewBoxWrap>
    </MainWrap>
  );
};

export default MainPage;

const MainWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #ffff;
`;

const MainImg = styled.div`
  background-size: cover;
  object-fit: contain;
  background-position: center;
  width: 100%;
  height: 400px;
  background-image: url(${mainImg});
`;

const InfoWrap = styled.div`
  display: flex;
  margin-top: 70px;
  padding: 150px;
  justify-content: space-evenly;
  /* height: 1000px; */
  border-bottom: 1px solid #d3d3d3;
  width: 95%;
`;

const Title = styled.p`
  font-size: 46px;
  font-weight: bold;
`;

const Infoimg = styled.img`
  margin: 50px;
  width: 50%;
`;

const Info = styled.div`
  font-size: 30px;
  margin: 50px;
`;

const ReviewText = styled.p`
  text-align: center;
  font-size: 100px;
  font-weight: bold;
  margin-top: 50px;
`;
const ReviewBoxWrap = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
`;

const ReviewBox = styled.div`
  background-color: #f2f2f2;
  margin-top: 100px;
  width: 30%;
  height: 200px;
  padding: 50px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 100px;
  position: relative;
  /* border-radius: 10px; */
  /* box-shadow: 5px 5px 5px; */
`;

const Icon = styled.div`
  position: absolute;
  top: 0%;
  right: -1%;
`;

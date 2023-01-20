import styled from 'styled-components';

const MapSearchList = () => {
  return (
    <MapSearchListWrapper>
      <MapSearchListContainer>
        <MapSearchListLeftBox>
          <MapSearchListLeftCategoryText>화장실</MapSearchListLeftCategoryText>
          <MapSearchListLeftPlaceNameText>
            송파구 마천동 공용 화장실
          </MapSearchListLeftPlaceNameText>
          <MapSearchListLeftAdressText>
            서울 종로구 동숭길 86 2,3층
          </MapSearchListLeftAdressText>
        </MapSearchListLeftBox>
        <MapSearchListRightBox>
          <MapSearchListRightModalBtn>리뷰 작성</MapSearchListRightModalBtn>
        </MapSearchListRightBox>
      </MapSearchListContainer>
    </MapSearchListWrapper>
  );
};
// phoeNumber, categoryGroupName, placeName, x, y, roadAdressName, placeUrl
const MapSearchListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 2px 3px 5px 0px #d3d3d3;
`;
const MapSearchListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const MapSearchListLeftBox = styled.div`
  width: 85%;
  margin-right: 0;
`;
const MapSearchListLeftCategoryText = styled.p`
  color: #9ca4a7;
`;
const MapSearchListLeftPlaceNameText = styled.p`
  color: black;
  margin-top: 0.5rem;
`;
const MapSearchListLeftAdressText = styled.p`
  color: #9ca4a7;
  margin-top: 0.5rem;
`;
const MapSearchListRightBox = styled.div`
  width: 15%;
  margin: 0;
`;
const MapSearchListRightModalBtn = styled.button`
  width: 100%;
  height: 1.7rem;
  border: none;
  box-shadow: 0px 0px 12px -6px rgba(0, 0, 0, 5);
  color: #fff;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  background-color: #4285f4;
`;

export default MapSearchList;
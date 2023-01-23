import { BsSearch, BsX } from 'react-icons/bs';
import MapSearchList from './MapSearchList';
import styled from 'styled-components';

interface MapSearchProps {
  markerInfo: [
    { id: string; marker: kakao.maps.Marker; data: [key: string | number] }
  ];
}

const MapSearch = ({ markerInfo }: MapSearchProps) => {
  return (
    <MapSearchWrapper>
      <MapSearchContainer>
        <MapSearchBarContainer>
          <MapIconBox>
            <BsSearch className="search" />
            <BsX className="xamrk" />
          </MapIconBox>
          <MapSearchBar type="text" placeholder="Search" />
        </MapSearchBarContainer>
      </MapSearchContainer>
      <MapSearchListContainer>
        <MapSearchListText>총 {markerInfo.length}개의 결과</MapSearchListText>
        {markerInfo.map((info) => (
          <MapSearchList key={info.id} markerInfo={info.data} />
        ))}
      </MapSearchListContainer>
    </MapSearchWrapper>
  );
};

const MapSearchWrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const MapSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const MapSearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
`;
const MapSearchBar = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 2rem;
  border-radius: 0.5rem;
  background-color: #f0f1f6;
  border: 2px transparent;
`;
const MapIconBox = styled.div`
  .search {
    position: absolute;
    overflow: hidden;
    top: 15px;
    left: 10px;
  }
  .xamrk {
    position: absolute;
    overflow: hidden;
    font-size: 1.5rem;
    top: 13px;
    right: 10px;
  }
`;
const MapSearchListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const MapSearchListText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1rem 0rem 0rem 1rem;
`;

export default MapSearch;

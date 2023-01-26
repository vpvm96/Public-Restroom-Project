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
      <MapSearchContainer></MapSearchContainer>
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
  height: 90vh;
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

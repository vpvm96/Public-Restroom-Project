import MapSearch from '../components/map/MapSearch';
import MapLocation from '../components/map/MapLocation';
import useMapLocation from '../hooks/useMapLocation';
import useRestroom from '../hooks/useRestroom';
import styled from 'styled-components';

const MapPage = () => {
  const { locationData } = useRestroom();
  const { markerInfo, kakaoLocation } = useMapLocation();

  return (
    <MapPageWrapper>
      <MapPageContainer>
        <MapPageLeftBox>
          <MapSearch markerInfo={markerInfo} />
        </MapPageLeftBox>
        <MapPageRightBox>
          <MapLocation
            kakaoLocation={kakaoLocation}
            locationData={locationData}
          />
        </MapPageRightBox>
      </MapPageContainer>
    </MapPageWrapper>
  );
};

const MapPageWrapper = styled.div`
  width: 100%;
`;
const MapPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const MapPageLeftBox = styled.div`
  width: 35%;
`;
const MapPageRightBox = styled.div`
  width: 65%;
`;

export default MapPage;

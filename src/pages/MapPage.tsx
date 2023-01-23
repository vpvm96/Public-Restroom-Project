import MapSearch from '../components/map/MapSearch';
import MapLocation from '../components/map/MapLocation';
import styled from 'styled-components';
import useCurrentLocation from '../hooks/useCurrentLocation';
import useRestroom from '../hooks/useRestroom';

const MapPage = () => {
  const { markerInfo, kakaoLocation } = useCurrentLocation();
  const { locationData } = useRestroom();

  return (
    <MapPageWrapper>
      <MapPageContainer>
        <MapPageLeftBox>
          <MapSearch markerInfo={markerInfo} />
        </MapPageLeftBox>
        <MapPageRightBox>
          <MapLocation
            locationData={locationData}
            kakaoLocation={kakaoLocation}
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

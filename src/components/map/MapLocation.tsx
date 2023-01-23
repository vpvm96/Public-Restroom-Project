import { useEffect } from 'react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import useRestroom from '../../hooks/useRestroom';
import styled from 'styled-components';

const MapLocation = () => {
  const { kakaoLocation } = useCurrentLocation();
  const { locationData } = useRestroom();

  useEffect(() => {
    kakaoLocation(locationData);
  }, [kakaoLocation, locationData]);

  return (
    <MapLocationWrapper>
      <MapLocationContainer id="map" />
    </MapLocationWrapper>
  );
};

const MapLocationWrapper = styled.div`
  width: 100vw;
  height: 100vh;
`;
const MapLocationContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default MapLocation;

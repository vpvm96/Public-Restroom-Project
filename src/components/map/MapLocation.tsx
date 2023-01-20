import { useEffect } from 'react';
import useCurrentLocation from '../../hooks/useCurrentLocation';
import styled from 'styled-components';

const MapLocation = () => {
  const kakaoLocation: any = useCurrentLocation();

  useEffect(() => {
    kakaoLocation();
  }, [kakaoLocation]);

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

import { useEffect } from 'react';
import styled from 'styled-components';

interface MapLocationProps {
  kakaoLocation: any;
  locationData: { key: string | number };
}

const MapLocation = ({ kakaoLocation, locationData }: MapLocationProps) => {
  useEffect(() => {
    if (!locationData) return;
    kakaoLocation(locationData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationData]);

  return (
    <MapLocationWrapper>
      <MapLocationContainer id="map" />
    </MapLocationWrapper>
  );
};

const MapLocationWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const MapLocationContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export default MapLocation;

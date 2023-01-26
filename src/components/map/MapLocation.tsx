import { useEffect } from 'react';
import styled from 'styled-components';

interface MapLocationProps {
  locationData: any;
  kakaoLocation: any;
}

const MapLocation = ({ locationData, kakaoLocation }: MapLocationProps) => {
  useEffect(() => {
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

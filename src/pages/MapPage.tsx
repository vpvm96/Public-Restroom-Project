import React from 'react';
import MapSearch from '../components/map/MapSearch';
import styled from 'styled-components';

const MapPage = () => {
  return (
    <MapPageWrapper>
      <MapPageContainer>
        <MapPageLeftBox>
          <MapSearch />
        </MapPageLeftBox>
        <MapPageRightBox></MapPageRightBox>
      </MapPageContainer>
    </MapPageWrapper>
  );
};

const MapPageWrapper = styled.div`
  width: 100%;
`;
const MapPageContainer = styled.div`
  width: 100%;
`;
const MapPageLeftBox = styled.div`
  width: 40%;
`;
const MapPageRightBox = styled.div`
  width: 60%;
`;

export default MapPage;

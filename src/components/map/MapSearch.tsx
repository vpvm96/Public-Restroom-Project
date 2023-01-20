import React from 'react';
import { BsSearch, BsX } from 'react-icons/bs';
import styled from 'styled-components';
import MapSearchList from './MapSearchList';

const MapSearch = () => {
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
        <MapSearchListText>1 Result</MapSearchListText>
        <MapSearchList />
        <MapSearchList />
      </MapSearchListContainer>
    </MapSearchWrapper>
  );
};

const MapSearchWrapper = styled.div`
  width: 100%;
`;
const MapSearchContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const MapSearchBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 2.8rem;
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
    top: 11px;
    left: 10px;
  }
  .xamrk {
    position: absolute;
    overflow: hidden;
    font-size: 1.5rem;
    top: 11px;
    right: 10px;
  }
`;
const MapSearchListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
`;
const MapSearchListText = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin: 1rem 0rem 0rem 1rem;
`;

export default MapSearch;

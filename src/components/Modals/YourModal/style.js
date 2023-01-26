import styled from 'styled-components';

const YourModlasText = styled.div`
  position: absolute;
`;
const YourModals = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border: 1px solid black;
  word-wrap: break-word;
  padding: 10px;
  display: flex;
  position: relative;
`;
const YourModalsBtnArea = styled.div`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 0px;
`;
const YourModalsLayout = styled.div`
  width: 100%;
  height: 100%;
`;
const YourModalsInput = styled.input`
  width: 100%;
  height: 100%;
  margin: 0px;
`;
const YourModalSapan = styled.span`
  padding-left: 50px;
  padding: 5px;
  margin-left: 2px;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: blue;
  color: white;
  border-radius: 5px;
  cursor: pointer;
`;
export {
  YourModalSapan,
  YourModals,
  YourModalsBtnArea,
  YourModalsLayout,
  YourModalsInput,
  YourModlasText,
};

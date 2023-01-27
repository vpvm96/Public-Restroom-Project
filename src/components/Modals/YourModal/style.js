import styled from 'styled-components';

const YourModlasText = styled.div`
  font-size: 13px;
  position: absolute;
`;
const YourModals = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border: 1px solid black;
  word-wrap: break-word;
  padding: 10px;
  position: relative;
`;
const YourModalsBtnArea = styled.div`
  width: 100px;
  height: 30px;
  position: absolute;
  right: 0px;
  bottom: 15px;
`;
const YourModalsLayout = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
`;
const YourModalsInput = styled.input`
  width: 70%;
  height: 50%;
  margin: 0px;
`;
const YourModalSapan = styled.span`
  padding-left: 50px;
  padding: 5px;
  margin-left: 2px;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 12px -6px rgba(0, 0, 0, 5);
  color: #fff;
  background-color: #4285f4;
  border-radius: 5px;
  cursor: pointer;
`;
const YourModalTitle = styled.div`
  font-weight: 600;
  margin-bottom: 20px;
`;
export {
  YourModalSapan,
  YourModals,
  YourModalsBtnArea,
  YourModalsLayout,
  YourModalsInput,
  YourModlasText,
  YourModalTitle,
};

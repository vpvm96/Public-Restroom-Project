import axios from 'axios';

export const getBublicRestroomRequest = async () => {
  const url = `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_PUBLIC_API_KEY}/json/GeoInfoPublicToiletWGS/1/1000`;

  // const request = [
  //   ['1', '1000'],
  //   ['1001', '2000'],
  //   ['2001', '3000'],
  //   ['3001', '4000'],
  //   ['4001', '5000'],
  // ];

  const {
    data: { GeoInfoPublicToiletWGS },
  } = await axios.get(url);

  return GeoInfoPublicToiletWGS;
};

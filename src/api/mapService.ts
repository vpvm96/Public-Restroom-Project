import axios from 'axios';

export interface RestRoomDataType {
  readonly [key: string | number]: string;
}

export const getBublicRestroomRequest = async () => {
  const restRoomData: RestRoomDataType[] = [];

  const request = [
    ['1', '1000'],
    ['1001', '2000'],
    ['2001', '3000'],
    ['3001', '4000'],
    ['4001', '5000'],
  ];

  request.forEach(async (req) => {
    const {
      data: {
        GeoInfoPublicToiletWGS: { row },
      },
    } = await axios.get(
      `http://openapi.seoul.go.kr:8088/${process.env.REACT_APP_PUBLIC_API_KEY}/json/GeoInfoPublicToiletWGS/${req[0]}/${req[1]}`
    );
    restRoomData.push(...row);
  });

  return restRoomData;
};

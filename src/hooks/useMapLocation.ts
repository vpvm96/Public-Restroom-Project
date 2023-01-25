import { useState } from 'react';

// interface MarkerInfoType {
//   markerInfo: {
//     id: string;
//     marker: kakao.maps.Marker;
//     data: [key: string | number];
//   };
//   setMarkerInfo: {
//     id: string;
//     marker: kakao.maps.Marker;
//     data: [key: string | number];
//   };
// }

// interface LocationDataType {
//   CREAT_DE:string
//   GU_NM: string;
//   HNR_NAM: string;
//   LAT: string
//   LNG: string
//   MASTERNO: string;
//   MTC_AT: string;
//   NEADRES_NM: string;
//   OBJECTID: number;
//   SLAVENO: string;
// }

const useMapLocation = () => {
  const [markerInfo, setMarkerInfo]: any = useState([]);

  function kakaoLocation(locationData: any) {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // const lat = position.coords.latitude, 현재 위치 정보 얻어오는 위도 경도
        //   lon = position.coords.longitude;

        // 동대문역 위도 경도 37.571033, 127.009504
        // 노원역 위도 경도 37.654326, 127.060089
        // 서울역 위도 경도 37.555364, 126.968700

        const locPosition = new kakao.maps.LatLng(37.654326, 127.060089),
          message = '<div style="padding:5px;">현재 위치</div>';

        displayMarkerAll(locationData, map, locPosition);
        displayMarker(locPosition, message, map);
        displayCircle(locPosition, map);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message, map);
      displayCircle(locPosition, map);
      displayMarkerAll(locationData, map, locPosition);
    }
  }

  function displayMarker(
    locPosition: kakao.maps.LatLng,
    message: string,
    map: kakao.maps.Map
  ) {
    const marker = new kakao.maps.Marker({
      map: map,
      position: locPosition,
    });

    const iwContent = message,
      iwRemoveable = true;

    const infowindow = new kakao.maps.InfoWindow({
      content: iwContent,
      removable: iwRemoveable,
    });

    infowindow.open(map, marker);
    map.setCenter(locPosition);
  }

  function displayMarkerAll(
    locationData: any,
    map: kakao.maps.Map,
    locPosition: kakao.maps.LatLng
  ) {
    const markerArr: any = [];
    const imageSrc: string =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
    const radius = 350;
    const imageSize = new kakao.maps.Size(24, 35);
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

    locationData?.forEach((item: any) => {
      const c1 = locPosition;
      const c2 = new kakao.maps.LatLng(item.LAT, item.LNG);
      const poly = new kakao.maps.Polyline({
        path: [c1, c2],
      });
      const dist = poly.getLength();

      if (dist < radius) {
        const marker = new kakao.maps.Marker({
          map: map,
          position: c2,
          title: item.GU_NM + item.HNR_NAM,
          image: markerImage,
        });
        const infoWindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">No.${
            item.OBJECTID + ' ' + item.GU_NM
          } 화장실</div>`,
          removable: true,
        });
        kakao.maps.event.addListener(marker, 'click', function () {
          window.open(
            `https://map.kakao.com/link/roadview/${item.LAT},${item.LNG}`
          );
        });
        markerArr.push(item);
        infoWindow.open(map, marker);
      } else {
        console.log('영역 밖 맵');
      }
    });
    setMarkerInfo(markerArr);
  }

  function displayCircle(locPosition: kakao.maps.LatLng, map: kakao.maps.Map) {
    const circle = new kakao.maps.Circle({
      center: locPosition,
      radius: 350,
      strokeWeight: 5,
      strokeColor: '#75B8FA',
      strokeOpacity: 1,
      strokeStyle: 'dashed',
      fillColor: '#CFE7FF',
      fillOpacity: 0.7,
    });

    circle.setMap(map);
  }

  return {
    markerInfo,
    kakaoLocation,
  };
};

export default useMapLocation;

const useCurrentLocation = () => {
  function kakaoLocation(locationData: any) {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude,
          lon = position.coords.longitude;

        const locPosition = new kakao.maps.LatLng(37.571033, 127.009504),
          message = '<div style="padding:5px;">현재 위치</div>';

        displayMarker(locPosition, message, map);
        displayMarkerAll(locationData, map);
        displayCircle(locPosition, map);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message, map);
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

  function displayMarkerAll(locationData: any, map: kakao.maps.Map) {
    const imageSrc: string =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';

    locationData.row.forEach((item: any) => {
      const imageSize = new kakao.maps.Size(24, 35);
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      const marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(item.LAT, item.LNG),
        title: item.GU_NM + item.HNR_NAM,
        image: markerImage,
      });
    });
  }

  function displayCircle(locPosition: any, map: kakao.maps.Map) {
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
    kakaoLocation,
  };
};

export default useCurrentLocation;

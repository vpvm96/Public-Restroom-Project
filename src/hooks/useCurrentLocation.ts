const useCurrentLocation = () => {
  function kakaoLocation() {
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

        const locPosition = new kakao.maps.LatLng(lat, lon),
          message = '<div style="padding:5px;">현재 위치</div>';

        displayMarker(locPosition, message, map);
      });
    } else {
      const locPosition = new kakao.maps.LatLng(33.450701, 126.570667),
        message = 'geolocation을 사용할수 없어요..';

      displayMarker(locPosition, message, map);
    }
  }

  function displayMarker(locPosition: any, message: any, map: any) {
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

  return kakaoLocation;
};

export default useCurrentLocation;

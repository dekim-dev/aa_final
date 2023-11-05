import React, { useEffect } from "react";
import styled from "styled-components";
const { kakao } = window;

const MapContainer = styled.div`
  width: 100%;
  height: 28rem;
  border: 1px solid black;
  @media screen and (max-width: 768px) {
    height: 18rem;
  }
`;

const KakaoMap = ({ latitude, longitude, name }) => {
  useEffect(() => {
    const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표
      level: 3, //지도의 레벨(확대, 축소 정도)
    };

    // 마커를 표시할 위치
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    const markerPosition = new kakao.maps.LatLng(latitude, longitude);

    // 마커 생성 및 설정
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true,
    });
    marker.setMap(map);

    const iwContent = `<div style="width: 240px; height: 100%; padding: 5px;"> <br>🏥 ${name}<br><br><a href="https://map.kakao.com/?q=${name}&map_type=TYPE_MAP" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/${name},${latitude},${longitude}" style="color:blue" target="_blank">길찾기</a></div>`;
    const iwPosition = new kakao.maps.LatLng(latitude, longitude); //인포윈도우 표시 위치

    // 인포윈도우를 생성 및 설정
    var infowindow = new kakao.maps.InfoWindow({
      position: iwPosition,
      content: iwContent,
      removable: true,
    });

    // 인포윈도우 열기
    infowindow.open(map, marker);

    // 마커 클릭 시 인포윈도우 열기
    kakao.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
  }, [latitude, longitude, name]);

  return (
    <>
      <MapContainer id="map"></MapContainer>
    </>
  );
};

export default KakaoMap;

import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../../context/UserContext";
import { getAds } from "../../service/ApiService";
import useWindowResize from "../../utils/useWindowResize";

const ParentWrapper = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ececec;
  margin-top: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  img {
    width: 400px;
    height: 80px;
    margin-left: 10px;
  }
`;

const MobileWrapper = styled.div`
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ececec;
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  img {
    width: 100%;
    max-height: 80px;
  }
`;

const Ad = () => {
  const { authority, isPaidMember } = useContext(UserContext);
  const [ads, setAds] = useState([]);
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const isMobile = useWindowResize();
  const token = localStorage.getItem("ACCESS_TOKEN");

  const fetchAdList = async () => {
    try {
      const response = await getAds();
      setAds(response);
      console.log("🟢광고 리스트: ", response);
    } catch (error) {
      console.log("🔴광고 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchAdList();
  }, [isPaidMember, token]);

  useEffect(() => {
    const interval = setInterval(() => {
      // 다음 광고로 이동
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [ads]);

  if (authority === "ROLE_USER" && isPaidMember === "UNPAID") {
    if (isMobile) {
      // 모바일 화면일 때
      if (ads.length > 0) {
        return (
          <MobileWrapper>
            <img
              src={ads[currentAdIndex].imgUrl}
              alt={`광고 이미지 ${currentAdIndex + 1}`}
            />
          </MobileWrapper>
        );
      } else {
        return <div>로딩 중...</div>;
      }
    } else {
      // 웹페이지
      const nextAdIndex = (currentAdIndex + 1) % ads.length;
      if (ads.length > 0 && ads[currentAdIndex] && ads[nextAdIndex]) {
        return (
          <ParentWrapper>
            <img
              src={ads[currentAdIndex].imgUrl}
              alt={`광고 이미지 ${currentAdIndex + 1}`}
            />
            <img
              src={ads[nextAdIndex].imgUrl}
              alt={`광고 이미지 ${nextAdIndex + 1}`}
            />
          </ParentWrapper>
        );
      } else {
        return <div>로딩 중...</div>;
      }
    }
  } else {
    return null;
  }
};

export default Ad;

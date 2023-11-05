import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { successPay } from "../../service/ApiService";
import { UserContext } from "../../context/UserContext";

const KakaoCallback = () => {
  const { setIsPaidMember } = useContext(UserContext);
  const navigate = useNavigate();

  // pg_token을 URL에서 추출하는 함수
  const getParameterByName = (name, url) => {
    // 브라우저 환경이 아닌 경우, null 반환
    if (typeof window === "undefined") {
      return null;
    }

    // URL이 지정되지 않은 경우, 현재 브라우저의 URL을 사용
    if (!url) {
      url = window.location.href;
    }

    // URLSearchParams 객체를 사용하여 URL의 쿼리 매개변수를 추출
    const searchParams = new URLSearchParams(new URL(url).search);

    // 주어진 이름(name)에 해당하는 쿼리 매개변수 값을 반환
    return searchParams.get(name);
  };

  const pgToken = getParameterByName("pg_token");

  // pg_token 추출 및 서버에 전송
  useEffect(() => {
    const sendPgToken = async () => {
      try {
        const response = await successPay(pgToken);
        // 응답에서 필요한 데이터 추출
        const {
          item_name,
          created_at,
          amount: { total },
        } = response;
        console.log("🟢pgToken success: ", response);
        setIsPaidMember("PAID");
        navigate("/membership/success", {
          state: { paymentData: { item_name, created_at, total } },
        });
      } catch (error) {
        console.error("🔴pgToken error: ", error);
      }
    };
    sendPgToken();
  }, [pgToken, navigate, setIsPaidMember]);

  return (
    <>
      <p>결제가 진행중입니다.</p>
    </>
  );
};

export default KakaoCallback;

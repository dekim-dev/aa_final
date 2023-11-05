import React from "react";
import { useLocation } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { paymentData } = location.state;

  return (
    <>
      <h1>카카오페이 결제가 정상적으로 완료되었습니다.</h1>
      <p>결제 일시 : {paymentData.created_at}</p>
      <p>상품명 : {paymentData.item_name}</p>
      <p>결제 금액 : {paymentData.total}원</p>
    </>
  );
};

export default Success;

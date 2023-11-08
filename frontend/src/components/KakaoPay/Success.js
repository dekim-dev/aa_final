import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 70%;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  margin: 5rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: start;
  letter-spacing: 4px;
  h3 {
    width: 100%;
    border-bottom: 1px solid #ececec;
    padding-bottom: 0.6rem;
  }
  p {
    margin: 1rem;
  }
  span {
    font-weight: bold;
  }
  button {
    margin-top: 1rem;
    align-self: center;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    gap: 1rem s p {
      margin: 0.4rem;
    }
  }
`;

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { paymentData } = location.state;

  return (
    <ParentWrapper>
      <h3>카카오페이 결제가 정상적으로 완료되었습니다.</h3>
      <p>
        <span>결제 일시 :</span> {paymentData.created_at}
      </p>
      <p>
        <span>상품명 :</span> Appropriate Attention {paymentData.item_name}
      </p>
      <p>
        <span>결제 금액 :</span> {paymentData.total}원
      </p>
      <button onClick={() => navigate("/")}>메인으로 가기</button>
    </ParentWrapper>
  );
};

export default Success;

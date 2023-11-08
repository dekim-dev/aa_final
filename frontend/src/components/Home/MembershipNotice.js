import { Link } from "react-router-dom";
import styled from "styled-components";
import symbol from "../../assets/images/aa_symbol.svg";

const LinkWrapper = styled(Link)`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ececec;
  img {
    width: 2.2rem;
    height: 2.2rem;
  }
  .description {
    font-size: 1.2rem;
    font-weight: 500;
    color: #ce3c3c;
    &:hover {
      font-weight: bolder;
    }
  }
  .nickname {
    font-weight: bold;
    margin: 0.5rem 0;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

export const NoticeForUnpaidMember = () => {
  return (
    <>
      <LinkWrapper to="/membership">
        <img src={symbol} alt="logo"></img>
        <span className="description">광고없이 이용하기</span>
      </LinkWrapper>
    </>
  );
};

export const NoticeForPaidMember = ({ nickname }) => {
  return (
    <LinkWrapper to="/membership">
      <span className="nickname">{nickname}</span>님 안녕하세요!
    </LinkWrapper>
  );
};
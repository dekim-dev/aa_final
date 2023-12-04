import { Link } from "react-router-dom";
import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 100%;
  background-color: #ececec;
  padding: 2rem;
  position: relative;
  ul {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }
  li {
    border-left: 1px solid gray;
    padding-left: 1rem;
  }
  li:first-child {
    border-left: none;
    padding-left: 0;
  }
  @media screen and (max-width: 768px) {
    padding: 0.8rem;
    font-size: 0.7rem;
    margin-top: 0.4rem;
    ul {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      justify-content: center;
    }
    li {
      padding-left: 0.4rem;
    }
  }
`;

const Footer = () => {
  return (
    <ParentWrapper>
      <ul>
        <li>Appropriate Attention</li>
        <li>
          <Link to={"/user-agreements"}>이용약관</Link>
        </li>
        <li>
          <Link to={"/user-policy"}>개인정보처리방침</Link>
        </li>
        <li>
          <Link to={"/user-inquiry"}>고객센터</Link>
        </li>
      </ul>
    </ParentWrapper>
  );
};
export default Footer;
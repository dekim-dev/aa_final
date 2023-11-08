import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/images/aa_logo.svg";
import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 70%;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  margin: 5rem auto;
  padding: 1rem;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 4px;
  img {
    width: 5rem;
    height: 5rem;
  }
  .img_wrapper {
    display: flex;
    align-items: center;
  }
  .nickname {
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    flex-direction: column;
    gap: 1rem;
  }
`;

const PaidMember = () => {
  const { userNickname } = useContext(UserContext);
  return (
    <ParentWrapper>
      <p>
        <span className="nickname">{userNickname}</span>님은
      </p>
      <div className="img_wrapper">
        <img src={logo} alt="logo" />
        의&nbsp;
      </div>
      <div> 멤버십 회원입니다.</div>
    </ParentWrapper>
  );
};
export default PaidMember;
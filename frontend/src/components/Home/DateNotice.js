import styled from "styled-components";

const ParentWrapper = styled.div`
  h1 {
    font-size: 3rem;
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 2rem;
      margin-bottom: 0.6rem;
    }
  }
`;
const DateNotice = () => {
  let today = new Date();

  return (
    <ParentWrapper>
      <h1>
        📅 {today.getFullYear()}년 {today.getMonth() + 1}월 {today.getDate()}일
      </h1>
    </ParentWrapper>
  );
};

export default DateNotice;

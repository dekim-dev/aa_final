import styled from "styled-components";

const ParentWrapper = styled.div`
  h2 {
    font-size: 2rem;
    font-weight: 500;
  }
  h3 {
    font-size: 1.5rem;
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1.2rem;
    }
    h3 {
      font-size: 1rem;
    }
  }
`;
const Quote = () => {
  return (
    <ParentWrapper>
      <h2>"내가 마주친 모든 난관은 나를 더 강하고 더 확고하게 만들어줬다."</h2>
      <h3 style={{ textAlign: "right" }}>- 시몬 바일스</h3>
    </ParentWrapper>
  );
};

export default Quote;

import JoinForm from "../components/JoinForm";
import { Symbol } from "../components/common/Logo.js";
import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 80%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const JoinPage = () => {
  return (
    <ParentWrapper>
      <Symbol />
      <JoinForm />
    </ParentWrapper>
  );
};
export default JoinPage;

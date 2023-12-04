import LoginForm from "../components/LoginForm";
import { Logo } from "../components/common/Logo";
import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 80%;
  height: 70vh;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LoginPage = () => {
  return (
    <ParentWrapper>
      <Logo />
      <LoginForm />
    </ParentWrapper>
  );
};
export default LoginPage;

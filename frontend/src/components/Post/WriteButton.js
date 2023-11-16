import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ParentWrapper = styled.div``;

const WriteButton = () => {
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate("/post");
    console.log("글쓰기 페이지로 이동");
  };
  return (
    <ParentWrapper>
      <button onClick={handleBtnClick}>글쓰기</button>
    </ParentWrapper>
  );
};
export default WriteButton;

import DiaryEditor from "./DiaryEditor";
import styled from "styled-components";
import LatestDiaryList from "./LatestDiaryList";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const DiaryMain = () => {
  return (
    <ParentWrapper>
      <LatestDiaryList />
      <DiaryEditor />
    </ParentWrapper>
  );
};
export default DiaryMain;

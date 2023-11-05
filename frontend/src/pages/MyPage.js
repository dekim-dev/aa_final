import { Route, Routes } from "react-router-dom";
import { styled } from "styled-components";
import Menu from "../components/MyPage/Menu";
import TodoList from "../components/MyPage/TodoList/TodoList";
import InfoEditor from "../components/MyPage/MySetting/InfoEditor";
import DiaryMain from "../components/MyPage/Diary/DiaryMain";
import DiaryList from "../components/MyPage/Diary/DiaryList";
import DiaryViewer from "../components/MyPage/Diary/DiaryViewer";
import DiaryEditor from "../components/MyPage/Diary/DiaryEditor";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  @media screen and (max-width: 768px) {
    gap: 0;
  }
`;

const MyPage = () => {
  return (
    <ParentWrapper>
      <Menu />
      <Routes>
        <Route path="/tdlist" element={<TodoList />} />
        <Route path="/diary" element={<DiaryMain />} />
        <Route path="/diary/list" element={<DiaryList />} />
        <Route path="/diary/:diaryId" element={<DiaryViewer />} />
        <Route
          path="/diary/edit/:diaryId"
          element={<DiaryEditor isEdit={true} />}
        />
        <Route path="/setting/*" element={<InfoEditor />} />
      </Routes>
    </ParentWrapper>
  );
};
export default MyPage;

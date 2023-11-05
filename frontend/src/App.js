import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import JoinPage from "./pages/JoinPage";
import PostPage from "./pages/PostPage";
import PostWritePage from "./pages/PostWritePage";
import NavBar from "./components/common/NavBar";
import BoardPage from "./pages/BoardPage";
import ClinicListPage from "./pages/ClinicListPage";
import ClinicDetailPage from "./pages/ClinicDetailPage";
import MyPage from "./pages/MyPage";
import UserStore from "./context/UserContext";
import PostEditPage from "./pages/PostEditPage";
import AdminPage from "./pages/AdminPage";
import Ad from "./components/common/Ad";
import MembershipPage from "./pages/MembershipPage";
import KakaoCallback from "./components/KakaoPay/KakaoCallBack";
import FindPwdPage from "./pages/FindPwdPage";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "NanumSquareNeo";
    text-decoration: none;
    list-style: none;
    a {
      text-decoration: none;
      color: black;
      &:visited {
        color: black
      }
    }
  }
`;

function App() {
  return (
    <UserStore>
      <GlobalStyle />
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<JoinPage />} />
          <Route path="/findpwd" element={<FindPwdPage />} />
          <Route path="/post" element={<PostWritePage />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/post/edit/:postId" element={<PostEditPage />} />
          <Route path="/board/free" element={<BoardPage boardName="free" />} />
          <Route path="/board/qna" element={<BoardPage boardName="qna" />} />
          <Route path="/board/best" element={<BoardPage boardName="best" />} />
          <Route
            path="/board/notice"
            element={<BoardPage boardName="notice" />}
          />
          <Route path="/clinic/list" element={<ClinicListPage />} />
          <Route path="/clinic/:clinicId" element={<ClinicDetailPage />} />
          <Route path="/mypage/*" element={<MyPage />} />
          <Route path="/membership/*" element={<MembershipPage />} />
          <Route path="/kakao/auth/callback" element={<KakaoCallback />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
        <Ad />
      </Router>
    </UserStore>
  );
}

export default App;

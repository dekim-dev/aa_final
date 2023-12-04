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
import UserRoute from "./utils/UserRoute";
import AdminRoute from "./utils/AdminRoute";
import UserAgreements from "./components/common/UserAgreements";
import UserPolicy from "./components/common/UserPolicy";
import Footer from "./components/common/Footer";
import InquiryPage from "./pages/InquiryPage";

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
          <Route path="/board/notice" element={<BoardPage boardName="notice" />} />
          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/post" element={<UserRoute><PostWritePage /></UserRoute>} />
          <Route path="/post/edit/:postId" element={<UserRoute><PostEditPage /></UserRoute>} />
          <Route path="/board/free" element={<UserRoute><BoardPage boardName="free" /></UserRoute>} />
          <Route path="/board/qna" element={<UserRoute><BoardPage boardName="qna" /></UserRoute>} />
          <Route path="/board/best" element={<UserRoute><BoardPage boardName="best" /></UserRoute>} />
          <Route path="/clinic/list" element={<UserRoute><ClinicListPage /></UserRoute>} />
          <Route path="/clinic/:clinicId" element={<UserRoute><ClinicDetailPage /></UserRoute>} />
          <Route path="/mypage/*" element={<UserRoute><MyPage /></UserRoute>} />
          <Route path="/membership/*" element={<UserRoute><MembershipPage /></UserRoute>} />
          <Route path="/kakao/auth/callback" element={<KakaoCallback />} />
          <Route path="/admin/*" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="/user-agreements" element={<UserAgreements />} />
          <Route path="/user-policy" element={<UserPolicy />} />
          <Route path="/user-inquiry" element={<InquiryPage />} />
        </Routes>
        <Ad />
        <Footer />
      </Router>
    </UserStore>
  );
}

export default App;
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logout } from "../../../service/ApiService";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const DropdownMenu = styled.ul`
  position: absolute;
  border: 1px solid #ececec;
  border-radius: 8px;
  right: 0.4rem;
  top: 3.2rem;
  width: 150px;
  display: flex;
  flex-direction: column;
  background-color: white;
  animation: fadeIn 0.3s ease-in-out; /* 애니메이션 추가 */
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1); /* 그림자 추가 */

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-10px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StyledLink = styled(Link)`
  margin: 0;
  padding: 1rem;
  font-size: 1rem;
  border-bottom: solid 1px #ececec; // 하단(중간) 선
  text-align: center;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border-bottom: none; /* 마지막 링크의 하단 경계선 제거 */
  }

  &:active {
    font-weight: bold;
  }
`;

const DropdownContent = ({ isLoggedIn, setDropDownView }) => {
  const { setUserPfImg, setUserId, setIsLogin, authority } =
    useContext(UserContext);

  const handleLinkClick = () => {
    setDropDownView(false);
  };

  const signOut = async () => {
    const refreshToken = localStorage.getItem("REFRESH_TOKEN");
    const requestBody = { refreshToken: refreshToken };

    if (isLoggedIn) {
      try {
        await logout(requestBody);
        localStorage.clear();
        alert("로그아웃 되었습니다.");
        setUserPfImg(null);
        setUserId(null);
        setIsLogin(false);
        window.location.replace("/");
        console.log("✔ 로그아웃 완료");
      } catch (error) {
        console.error("로그아웃 중 오류 발생:", error);
      }
    }
  };

  if (isLoggedIn) {
    return (
      <DropdownMenu>
        {authority === "ROLE_USER" ? (
          <StyledLink to="/mypage" onClick={handleLinkClick}>
            마이페이지
          </StyledLink>
        ) : (
          <StyledLink to="/admin" onClick={handleLinkClick}>
            관리자 페이지
          </StyledLink>
        )}
        <StyledLink to="/" onClick={signOut}>
          로그아웃
        </StyledLink>
      </DropdownMenu>
    );
  } else {
    return (
      <DropdownMenu>
        <StyledLink to="/signin" onClick={handleLinkClick}>
          로그인
        </StyledLink>
        <StyledLink to="/signup" onClick={handleLinkClick}>
          회원가입
        </StyledLink>
      </DropdownMenu>
    );
  }
};
export default DropdownContent;

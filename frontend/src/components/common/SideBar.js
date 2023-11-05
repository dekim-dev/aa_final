import styled from "styled-components";
import { Link } from "react-router-dom";
import HamburgerIcon from "../../assets/images/hamburgerIcon.svg";
import React, { useState } from "react";
import { Symbol } from "./Logo";
import LogoText1 from "../../assets/images/LogoText1.svg";
import LogoText2 from "../../assets/images/LogoText2.svg";

const ParentWrapper = styled.div`
  width: 70vw;
  height: 100vh;
  top: 0;
  left: 0;
  padding: 1rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: space-evenly; */
  /* gap: 1rem; */
  position: absolute;
  background-color: #ececec;
  .side_bar_menu {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    p {
      font-weight: lighter;
      font-size: 1.6rem;
      &:hover {
        font-weight: 600;
      }
    }
  }
  .logo_text {
    text-align: center;
  }
  transition: left 0.5s;
  animation: slideIn 0.5s ease-in-out; /* 애니메이션을 적용 */

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateX(-10px);
    }
    20% {
      opacity: 0;
      transform: translateX(-40px);
    }
    40% {
      opacity: 0;
      transform: translateX(-80px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const SideBar = ({ setIsSideBarOpen }) => {
  const handleLinkClick = () => {
    setIsSideBarOpen(false);
  };
  return (
    <ParentWrapper>
      <div
        style={{ alignSelf: "flex-end", cursor: "pointer", fontSize: "2rem" }}
        onClick={() => setIsSideBarOpen(false)}
      >
        <p>❌</p>
      </div>
      <div style={{ marginTop: "2rem" }}>
        <Symbol width={"8rem"} height={"8rem"} />
      </div>
      <div className="side_bar_menu">
        <Link to="/" onClick={handleLinkClick}>
          <p>홈</p>
        </Link>
        <Link to="/board/free" onClick={handleLinkClick}>
          <p>자유게시판</p>
        </Link>
        <Link to="/board/qna" onClick={handleLinkClick}>
          <p>질문게시판</p>
        </Link>
        <Link to="/board/best" onClick={handleLinkClick}>
          <p>베스트게시판</p>
        </Link>
        <Link to="/clinic/list" onClick={handleLinkClick}>
          <p>병원찾기</p>
        </Link>
        <Link to="/board/notice" onClick={handleLinkClick}>
          <p>공지사항</p>
        </Link>
      </div>
      <div className="logo_text" style={{ marginTop: "6rem" }}>
        <img src={LogoText1} alt="text1" />
        <img src={LogoText2} alt="text2" />
      </div>
    </ParentWrapper>
  );
};

const SideBarIcon = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div>
      <img
        style={{ width: "3rem", cursor: "pointer" }}
        src={HamburgerIcon}
        alt="hamburger icon"
        onClick={() => setIsSideBarOpen(!isSideBarOpen)}
      />
      {isSideBarOpen && <SideBar setIsSideBarOpen={setIsSideBarOpen} />}
    </div>
  );
};
export default SideBarIcon;

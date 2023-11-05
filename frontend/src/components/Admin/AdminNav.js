import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const ParentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 16%;
  height: 100%;
  background-color: #ececec;
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  cursor: pointer;
  padding: 1.4rem 1rem;
  &:hover {
    font-weight: bold;
  }
`;

const AdminNav = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <ParentContainer>
        <ul>
          <StyledLink
            to="/admin"
            style={{
              fontWeight: currentPath === "/admin" ? "bold" : "normal",
            }}
          >
            <li>회원 관리</li>
          </StyledLink>
          <StyledLink
            to="/admin/clinic"
            style={{
              fontWeight: currentPath === "/admin/clinic" ? "bold" : "normal",
            }}
          >
            <li>병원 관리</li>
          </StyledLink>
          <StyledLink
            to="/admin/post"
            style={{
              fontWeight: currentPath === "/admin/post" ? "bold" : "normal",
            }}
          >
            <li>게시글 관리</li>
          </StyledLink>
          <StyledLink
            to="/admin/comment"
            style={{
              fontWeight: currentPath === "/admin/comment" ? "bold" : "normal",
            }}
          >
            <li>댓글 관리</li>
          </StyledLink>
          <StyledLink
            to="/admin/ad"
            style={{
              fontWeight: currentPath === "/admin/ad" ? "bold" : "normal",
            }}
          >
            <li>광고 관리</li>
          </StyledLink>
          <StyledLink
            to="/admin/inquiry"
            style={{
              fontWeight: currentPath === "/admin/inquiry" ? "bold" : "normal",
            }}
          >
            <li>문의 관리</li>
          </StyledLink>
          <StyledLink
            to="/admin/report"
            style={{
              fontWeight: currentPath === "/admin/report" ? "bold" : "normal",
            }}
          >
            <li>신고 관리</li>
          </StyledLink>
        </ul>
      </ParentContainer>
    </>
  );
};

export default AdminNav;

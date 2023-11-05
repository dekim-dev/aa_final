import { Link, NavLink } from "react-router-dom";
import { styled } from "styled-components";

const ParentContainer = styled.div`
  height: 4rem;
  ul {
    list-style: none;
    display: flex;
    li {
      width: 10rem;
      padding: 1rem;
      border: 1px solid black;
      text-align: center;
      @media screen and (max-width: 768px) {
        padding: 0.4rem 0;
      }
    }
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    padding: none;
  }
`;

const StyledNavLink = styled(NavLink)`
  &:hover {
    font-weight: 700;
  }
  &.active {
    font-weight: 800;
  }
`;

const Menu = () => {
  return (
    <ParentContainer>
      <ul>
        <li>
          <StyledNavLink to="/mypage/tdlist">📝 투두리스트</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/mypage/diary">📕 다이어리</StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/mypage/setting">⚙️ 설정</StyledNavLink>
        </li>
      </ul>
    </ParentContainer>
  );
};
export default Menu;

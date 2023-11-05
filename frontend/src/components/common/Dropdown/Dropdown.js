import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import NonMember from "../../../assets/images/nonMemberImg.svg";
import DropdownContent from "./DropdownMenu";
import { getUserInfo } from "../../../service/ApiService";
import { UserContext } from "../../../context/UserContext";

const DropDownWrapper = styled.div`
  position: relative;
`;

const ProfileIcon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 3px solid #ececec;
  cursor: pointer;
  transition: transform 0.3s; /* 애니메이션을 부드럽게 하기 위한 설정 */
  &:hover {
    animation: zoomOut 0.5s ease-in-out; /* 애니메이션을 적용 */

    @keyframes zoomOut {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
      100% {
        transform: scale(1);
      }
    }
  }
`;
const DropDown = () => {
  const [dropDownView, setDropDownView] = useState(false);

  const {
    userPfImg,
    setUserId,
    setUserPfImg,
    setIsLogin,
    setAuthority,
    setIsPaidMember,
    setUserNickname,
    setBlockedUsers,
    isLogin,
    authority,
  } = useContext(UserContext);

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        const response = await getUserInfo();
        console.log("👉🏻드롭다운: ", response);
        setUserId(response.id);
        setUserPfImg(response.pfImg);
        setAuthority(response.authority);
        setIsPaidMember(response.isPaidMember);
        setUserNickname(response.nickname);
        setBlockedUsers(response.blockedUserIds);

        setIsLogin(true);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInformation();
  }, [
    setUserId,
    setUserPfImg,
    setIsLogin,
    setAuthority,
    setIsPaidMember,
    setUserNickname,
    setBlockedUsers,
  ]);

  return (
    <DropDownWrapper>
      {!isLogin || authority === "ROLE_ADMIN" ? (
        <ProfileIcon
          src={NonMember}
          alt="nonUserImg"
          onClick={() => setDropDownView(!dropDownView)}
        />
      ) : (
        <ProfileIcon
          src={userPfImg}
          alt="userImg"
          onClick={() => setDropDownView(!dropDownView)}
        />
      )}
      {dropDownView && (
        <DropdownContent
          isLoggedIn={isLogin}
          setDropDownView={() => setDropDownView(!dropDownView)}
        />
      )}
    </DropDownWrapper>
  );
};
export default DropDown;

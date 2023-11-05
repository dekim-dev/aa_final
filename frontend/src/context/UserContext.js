import { createContext, useState } from "react";
export const UserContext = createContext(null);

const UserStore = (props) => {
  const [userPfImg, setUserPfImg] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLogin, setIsLogin] = useState(false);
  const [authority, setAuthority] = useState("");
  const [isPaidMember, setIsPaidMember] = useState("");
  const [userNickname, setUserNickname] = useState("");
  const [blockedUsers, setBlockedUsers] = useState([]);

  return (
    <UserContext.Provider
      value={{
        userPfImg,
        setUserPfImg,
        userId,
        setUserId,
        isLogin,
        setIsLogin,
        authority,
        setAuthority,
        isPaidMember,
        setIsPaidMember,
        userNickname,
        setUserNickname,
        blockedUsers,
        setBlockedUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserStore;

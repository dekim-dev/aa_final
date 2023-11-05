import React, { useContext, useState } from "react";
import InputField from "./common/TextField";
import Button from "./common/Button";
import styled from "styled-components";
import { signin, getUserInfo } from "../service/ApiService";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ParentWrapper = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
  .extra_wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
`;

const LoginForm = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    pwd: "",
  });

  const {
    setUserPfImg,
    setUserId,
    setAuthority,
    setIsPaidMember,
    setIsLogin,
    setUserNickname,
    setBlockedUsers,
  } = useContext(UserContext);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    if (!state.email || !state.pwd) {
      alert("이메일주소와 비밀번호를 모두 입력해 주세요.");
      return;
    }

    const requestData = {
      email: state.email,
      password: state.pwd,
    };

    try {
      const response = await signin(requestData);
      if (response.status === 200) {
        alert(`로그인 되었습니다.`);
        console.log("🟢로그인 성공: ", response);
        // 프로필 정보를 가져오고 UserContext를 업데이트
        const userInfo = await getUserInfo();
        setUserId(userInfo.id);
        setUserPfImg(userInfo.pfImg);
        setAuthority(userInfo.authority);
        setIsPaidMember(userInfo.isPaidMember);
        setIsLogin(true);
        setUserNickname(userInfo.nickname);
        setBlockedUsers(userInfo.blockedUserIds);
        console.log(userInfo);
        console.log(UserContext);
        navigate("/");
        if (userInfo.authority === "ROLE_ADMIN") {
          navigate("/admin");
        }
      } else {
        alert(response.response.data);
        console.error("🔴로그인 실패:", response);
      }
    } catch (error) {
      alert("로그인에 실패했습니다.");
      console.error("🔴로그인 실패:", error);
    }
  };

  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <ParentWrapper>
      <InputField
        name="email"
        label={"이메일"}
        value={state.email}
        placeholder={"이메일을 입력하세요."}
        onChange={handleChangeState}
        width="100%"
      />
      <InputField
        type={"password"}
        name="pwd"
        label={"비밀번호"}
        value={state.pwd}
        placeholder={"비밀번호를 입력하세요."}
        onChange={handleChangeState}
        onKeyDown={enterKeyEventHandler}
        width="100%"
      />
      <Button
        width="70%"
        height="2rem"
        fontSize="1.5rem"
        padding="10px 20px"
        onClick={handleLogin}
      >
        로 그 인
      </Button>
      <div className="extra_wrapper">
        <Link to="/signup">회원가입</Link>
        <Link to="/findpwd">비밀번호 찾기</Link>
      </div>
    </ParentWrapper>
  );
};

export default LoginForm;

import { useState } from "react";
import styled from "styled-components";
import InputField from "./common/TextField";
import Button from "./common/Button";
import { dupEmail, dupNickname, signup } from "../service/ApiService";
import { useNavigate } from "react-router-dom";

const ParentWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.8rem;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const JoinForm = () => {
  const navigate = useNavigate();

  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameHelperText, setNicknameHelperText] = useState("");

  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailHelperText, setIsEmailHelperText] = useState("");

  const [isPwdValid, setIsPwdValid] = useState(false);
  const [pwdHelperText, setPwdHelperText] = useState("");

  const [isConPwdValid, setIsConPwdValid] = useState(false);
  const [conPwdHelperText, setConPwdHelperText] = useState("");

  const [state, setState] = useState({
    email: "",
    nickname: "",
    pwd: "",
    conPwd: "",
  });

  const handleChangeState = async (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });

    if (name === "nickname") {
      const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/;
      if (nicknameRegex.test(value)) {
        // 정규식 확인
        setNicknameHelperText("사용 가능한 닉네임입니다.");
        // 닉네임 중복 확인
        try {
          const response = await dupNickname(value); // 호출하여 중복 확인
          console.log("🟡닉네임 중복여부: ", response);
          if (response.data === false) {
            setIsNicknameValid(true);
            setNicknameHelperText("사용 가능한 닉네임입니다.");
          } else {
            setIsNicknameValid(false);
            setNicknameHelperText("이미 사용 중인 닉네임입니다.");
          }
        } catch (error) {
          console.error("닉네임 중복 확인 오류: ", error);
        }
      } else {
        setIsNicknameValid(false);
        setNicknameHelperText(
          "닉네임은 2~10자의 영문, 숫자, 한글로 이루어져야 합니다."
        );
      }
    }

    if (name === "email") {
      const emailRegEx = /^[a-zA-Z0-9+-/_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (emailRegEx.test(value)) {
        // 정규식 확인
        setIsEmailHelperText("사용 가능한 이메일입니다.");
        // 이메일 중복 확인
        try {
          const response = await dupEmail(value); // 호출하여 중복 확인
          console.log("🟡이메일 중복여부: ", response);
          if (response.data === false) {
            setIsEmailValid(true);
            setIsEmailHelperText("사용 가능한 이메일입니다.");
          } else {
            setIsEmailValid(false);
            setIsEmailHelperText("이미 사용 중인 이메일입니다.");
          }
        } catch (error) {
          console.error("이메일 중복 확인 오류: ", error);
        }
      } else {
        setIsEmailValid(false);
        setIsEmailHelperText("@를 포함한 이메일을 입력해 주세요.");
      }
    }

    // 비밀번호 (정규식 : 8 ~ 16자 영문, 숫자, 특수문자를 최소 한가지씩 조합)
    if (name === "pwd") {
      const pwdRegex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
      if (pwdRegex.test(value)) {
        // 정규식 확인
        setPwdHelperText("올바른 형식입니다.");
        setIsPwdValid(true);
      } else {
        setPwdHelperText(
          "숫자+영문자+특수문자 조합으로 8자리 이상 입력해 주세요."
        );
        setIsPwdValid(false);
      }
    }
    if (name === "conPwd") {
      if (state.pwd === value) {
        setConPwdHelperText("비밀번호가 일치합니다.");
        setIsConPwdValid(true);
      } else {
        setConPwdHelperText("비밀번호가 일치하지 않습니다.");
        setIsConPwdValid(false);
      }
    }
  };

  const handleJoin = () => {
    if (isEmailValid && isNicknameValid && isPwdValid && isConPwdValid) {
      console.log(isEmailValid, isNicknameValid, isPwdValid, isConPwdValid);
      const requestData = {
        email: state.email,
        nickname: state.nickname,
        password: state.pwd,
      };

      signup(requestData)
        .then((response) => {
          alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다");
          navigate("/signin");
          console.log(response);
        })
        .catch((error) => {
          alert("회원가입에 실패하였습니다.");
          console.log(error);
        });
    } else {
      let errorMessage = "";
      if (!isEmailValid) {
        errorMessage += "이메일을 확인해 주세요. ";
      }
      if (!isNicknameValid) {
        errorMessage += "닉네임을 확인해 주세요. ";
      }
      if (!isConPwdValid) {
        errorMessage += "비밀번호를 확인해 주세요. ";
      }
      alert(errorMessage);
    }
  };

  return (
    <ParentWrapper>
      <InputField
        type={"email"}
        name="email"
        label={"이메일 주소"}
        value={state.email}
        placeholder={"이메일주소를 입력하세요."}
        onChange={handleChangeState}
        helperText={emailHelperText}
        width="100%"
        isValid={isEmailValid}
      />
      <InputField
        type={"text"}
        name="nickname"
        label={"닉네임"}
        value={state.nickname}
        placeholder={"닉네임을 입력하세요."}
        onChange={handleChangeState}
        helperText={nicknameHelperText}
        width="100%"
        isValid={isNicknameValid}
      />
      <InputField
        type={"password"}
        name="pwd"
        label={"비밀번호"}
        value={state.pwd}
        placeholder={"비밀번호를 입력하세요."}
        onChange={handleChangeState}
        helperText={pwdHelperText}
        width="100%"
        isValid={isPwdValid}
      />
      <InputField
        type={"password"}
        name="conPwd"
        label={"비밀번호 확인"}
        value={state.confPwd}
        placeholder={"비밀번호를 재입력 하세요."}
        onChange={handleChangeState}
        helperText={conPwdHelperText}
        width="100%"
        isValid={isConPwdValid}
      />
      <Button
        width="70%"
        height="2rem"
        fontSize="1.5rem"
        padding="10px 20px"
        onClick={handleJoin}
      >
        회 원 가 입
      </Button>
    </ParentWrapper>
  );
};
export default JoinForm;

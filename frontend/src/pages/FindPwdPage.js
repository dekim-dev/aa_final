import { useState } from "react";
import Button from "../components/common/Button";
import InputField from "../components/common/TextField";
import styled from "styled-components";
import { issueTempPwd } from "../service/ApiService";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const FindPwdPage = () => {
  const [email, setEmail] = useState("");
  const [emailHelperText, setIsEmailHelperText] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailHelperText("");
  };

  const tempPwd = async () => {
    const response = await issueTempPwd(email);
    if (response === "가입되어있지 않은 이메일 주소 입니다.") {
      setIsEmailHelperText("가입되어있지 않은 이메일 주소 입니다.");
    } else if (response.status === 200) {
      alert("입력된 이메일로 임시비밀번호가 전송되었습니다.");
      setEmail("");
    }
  };
  return (
    <ParentWrapper>
      <h3>임시 비밀번호 받기</h3>
      <InputField
        type={"email"}
        name="email"
        label={"이메일 주소"}
        value={email}
        placeholder={"이메일주소를 입력하세요."}
        onChange={handleEmailChange}
        helperText={emailHelperText}
        width="100%"
      />
      <Button
        width="70%"
        height="2rem"
        fontSize="1.2rem"
        padding="10px 20px"
        onClick={tempPwd}
      >
        임시 비밀번호 받기
      </Button>
    </ParentWrapper>
  );
};
export default FindPwdPage;

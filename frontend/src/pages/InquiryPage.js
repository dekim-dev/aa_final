import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import { sendInquiry } from "../service/ApiService";

const ParentWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  input {
    height: 3rem;
    padding: 0.4rem;
    width: 100%;
  }
`;

const StyledButton = styled.button`
  background-color: #ce3c3c;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  padding: 0.2rem;
  min-height: 2rem;
  transition: all 250ms;
  width: 20%;
  &:hover,
  &:focus {
    background-color: #ce3c3c;
    box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
  }
  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    background-color: rgba(206, 60, 60, 0.5);
    box-shadow: rgba(0, 0, 0, 0.06) 0 2px 4px;
    transform: translateY(0);
  }
`;

const NonMemberContainer = styled.div`
  font-size: 2rem;
  padding: 2rem;
  height: 68vh;
`;

const InquiryPage = () => {
  const { userNickname } = useContext(UserContext);

  const [state, setState] = useState({
    title: "",
    content: "",
    email: "",
    med: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!state.title || !state.content || !state.email) {
      alert("모든 필드를 입력해 주세요.");
      return;
    }

    const inquiryRequest = {
      title: state.title,
      content: state.content,
      userEmail: state.email,
      userNickname: userNickname,
    };

    try {
      const response = await sendInquiry(inquiryRequest);
      console.log(response);
      alert("문의가 접수되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ParentWrapper>
      <h3 style={{ textAlign: "center" }}>문의하기</h3>
      {userNickname ? (
        <>
          <p style={{ alignSelf: "start" }}>닉네임: {userNickname}</p>
          <input
            type="text"
            name="title"
            onChange={handleChangeState}
            value={state.title}
            placeholder="문의 제목"
          />
          <textarea
            name="content"
            onChange={handleChangeState}
            value={state.content}
            placeholder="문의하실 내용을 입력하세요."
            style={{ width: "100%", height: "400px", padding: "0.4rem" }}
          />
          <input
            type="email"
            name="email"
            onChange={handleChangeState}
            value={state.email}
            placeholder="답변을 받을 이메일 주소를 입력해 주세요."
          />
          <StyledButton onClick={handleSubmit}>등 록</StyledButton>
        </>
      ) : (
        <NonMemberContainer>
          비회원은 dekim0712@naver.com 으로 문의 주세요☺️
        </NonMemberContainer>
      )}
    </ParentWrapper>
  );
};

export default InquiryPage;
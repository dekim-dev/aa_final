import React, { useState } from "react";
import styled from "styled-components";

const ResponsePopupWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const ResponsePopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  .wrapper {
    width: 100%;
    h4 {
      padding-bottom: 0.2rem;
    }
  }
  .button {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
  }
  textarea {
    width: 100%;
    height: 150px;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  button {
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
  }
`;

const AdminEmailPopUp = ({
  isOpen,
  onClose,
  defaultNickname,
  defaultEmail,
  onSendResponse,
}) => {
  const [responseText, setResponseText] = useState("");

  const handleSendResponse = () => {
    onSendResponse(responseText);
    setResponseText("");
    onClose();
  };
  const handleCancel = () => {
    setResponseText("");
    onClose();
  };

  return isOpen ? (
    <ResponsePopupWrapper>
      <ResponsePopupContent>
        <div className="nickname wrapper">
          <h4>닉네임</h4>
          <input type="text" id="nickname" value={defaultNickname} readOnly />
        </div>
        <div className="email wrapper">
          <h4>이메일</h4>
          <input type="text" id="email" value={defaultEmail} readOnly />
        </div>
        <div className="content wrapper">
          <h4>답변 내용</h4>
          <textarea
            id="responseText"
            value={responseText}
            onChange={(e) => setResponseText(e.target.value)}
          />
        </div>
        <div className="button wrapper">
          <button onClick={handleCancel}>취소</button>
          <button onClick={handleSendResponse}>보내기</button>
        </div>
      </ResponsePopupContent>
    </ResponsePopupWrapper>
  ) : null;
};

export default AdminEmailPopUp;

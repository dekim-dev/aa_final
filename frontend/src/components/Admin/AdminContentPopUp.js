import React from "react";
import styled from "styled-components";

const PopupWrapper = styled.div`
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

const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  label {
    font-weight: bold;
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

const AdminContentPopUp = ({ isOpen, content, label, onClose }) => {
  return isOpen ? (
    <PopupWrapper>
      <PopupContent>
        <div className="label_wrapper">
          <h4>{label && <label>{label}</label>}</h4>
        </div>
        <div className="content_wrapper">{content}</div>
        <div className="button_wrapper">
          <button onClick={onClose}>닫기</button>
        </div>
      </PopupContent>
    </PopupWrapper>
  ) : null;
};

export default AdminContentPopUp;

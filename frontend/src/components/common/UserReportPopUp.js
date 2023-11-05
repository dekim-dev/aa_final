import { useState } from "react";
import styled from "styled-components";

const ReportUserPopupWrapper = styled.div`
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

const ReportUserForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 26rem;
  text-align: left;
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  textarea {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .buttons_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  button {
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    &:hover {
      background-color: gray;
    }
  }

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const UserReportPopUp = ({ isOpen, onClose, onSubmit }) => {
  const [reportReason, setReportReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ reportReason });
    setReportReason("");
  };

  const handleCancel = () => {
    setReportReason("");
    onClose();
  };

  return isOpen ? (
    <ReportUserPopupWrapper>
      <ReportUserForm onSubmit={handleSubmit}>
        <label htmlFor="reportReason">신고 이유</label>
        <textarea
          id="reportReason"
          value={reportReason}
          onChange={(e) => setReportReason(e.target.value)}
          rows="4"
          cols="50"
        ></textarea>
        <div className="buttons_wrapper">
          <button type="button" onClick={handleCancel}>
            취소
          </button>
          <button type="submit">확인</button>
        </div>
      </ReportUserForm>
    </ReportUserPopupWrapper>
  ) : null;
};

export default UserReportPopUp;

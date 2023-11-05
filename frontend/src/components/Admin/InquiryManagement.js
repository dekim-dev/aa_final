import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  allInquiries,
  updateInquiryStatus,
} from "../../service/AdminApiService";
import Pagination from "../common/Pagination";
import { dateFormat } from "../../utils/Functions";
import AdminEmailPopUp from "./AdminEmailPopUp";
import AdminContentPopUp from "./AdminContentPopUp";

const ParentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  .button_container {
    margin: 1rem auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
    gap: 2rem;
  }
  .pagination {
    margin: 1rem auto;
    align-self: center;
  }
`;

const Table = styled.table`
  width: 90%;
  margin: 0 auto;
  tbody :hover {
    background-color: #ececec;
  }
  th,
  td {
    padding: 0.8rem;
    border-bottom: 1px solid black;
    text-align: center;
  }
  .nickname_wrapper {
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
  .inquiry_wrapper {
    text-align: left;
    white-space: nowrap; /* 텍스트가 넘칠 경우 줄 바꿈 방지 */
    overflow: hidden; /* 넘칠 경우 숨김 처리 */
    text-overflow: ellipsis; /* 넘칠 경우 마침표 (...)로 대체 */
    max-width: 14rem;
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`;

const InquiryManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedInquiryIds, setSelectedInquiryIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const pageSize = 10;

  const [selectedUserId, setSelectedUserId] = useState(null); // 새로 추가
  const [selectedUser, setSelectedUser] = useState({}); // 새로운 상태 추가

  const [showInquiryContentPopup, setShowInquiryContentPopup] = useState(false);
  const [selectedContent, setSelectedContent] = useState("");

  const handleReportReasonClick = (content) => {
    setSelectedContent(content);
    setShowInquiryContentPopup(true);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    // 클릭한 문의 작성자의 닉네임과 이메일 정보를 가져와 selectedUser 상태에 저장
    const clickedReport = inquiries.find(
      (inquiry) => inquiry.userId === userId
    );
    setSelectedUser({
      nickname: clickedReport.userNickname,
      email: clickedReport.userEmail,
    });
  };

  const fetchInquiryPages = async () => {
    try {
      const response = await allInquiries(currentPage - 1, pageSize);
      setInquiries(response.content);
      setTotalResults(response.totalElements);
      console.log("문의 리스트: ", response);
    } catch (error) {
      console.log("문의 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchInquiryPages();
  }, [currentPage]);

  const toggleAllCheckbox = () => {
    const allIds = inquiries.map((inquiry) => inquiry.id);
    if (selectAll) {
      setSelectedInquiryIds([]);
    } else {
      setSelectedInquiryIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleCheckbox = (inquiryId) => {
    if (selectedInquiryIds.includes(inquiryId)) {
      setSelectedInquiryIds(
        selectedInquiryIds.filter((id) => id !== inquiryId)
      );
    } else {
      setSelectedInquiryIds([...selectedInquiryIds, inquiryId]);
    }
  };

  // const handleDeleteBtn = async () => {
  //   if (selectedReportIds.length === 0) {
  //     alert("삭제할 문의글을 선택하세요.");
  //     return;
  //   }
  //   const shouldDelete = window.confirm("선택한 문의글을 삭제하시겠습니까?");
  //   if (shouldDelete) {
  //     try {
  //       await deleteReports(selectedReportIds);
  //       console.log("🟢삭제된 문의글번호: ", selectedReportIds);
  //       setSelectedReportIds([]);
  //       setSelectAll(false);
  //       fetchReportPages();
  //     } catch (error) {
  //       console.error("🔴문의글 삭제 실패", error);
  //     }
  //   }
  // };

  const handleManagedBtn = async () => {
    if (selectedInquiryIds.length === 0 || selectedInquiryIds.length > 1) {
      console.log(selectedInquiryIds);
      alert("문의글을 하나씩 선택해 주세요.");
      return;
    }
    try {
      await updateInquiryStatus(selectedInquiryIds);
      console.log("🟢업데이트 된 문의글번호: ", selectedInquiryIds);
      alert("처리가 완료 되었습니다.");
      setSelectedInquiryIds([]);
      setSelectAll(false);
      fetchInquiryPages();
    } catch (error) {
      console.error("🔴문의글 상태 업데이트 실패", error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <ParentContainer>
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleAllCheckbox}
                  checked={selectAll}
                />
              </th>
              <th>번호</th>
              <th>날짜</th>
              <th>회원</th>
              <th>문의 제목</th>
              <th>내용</th>
              <th>처리상태</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((report) => (
              <tr key={report.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(report.id)}
                    checked={selectedInquiryIds.includes(report.id)}
                  />
                </td>
                <td>{report.id}</td>
                <td>{dateFormat(report.inquiryDate)}</td>
                <td>
                  <div
                    className="nickname_wrapper"
                    onClick={() => handleUserClick(report.userId)}
                  >
                    {report.userNickname}
                  </div>
                </td>
                <td>{report.title}</td>
                <td>
                  <p
                    className="inquiry_wrapper"
                    onClick={() => handleReportReasonClick(report.content)}
                  >
                    {report.content}
                  </p>
                </td>
                <td>{report.answered ? "O" : "X"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          className="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(totalResults / pageSize)}
          onPageChange={handlePageChange}
        />
        <div className="button_container">
          {/* <button onClick={handleDeleteBtn}>문의글 삭제</button> */}
          <button>문의글 삭제</button>
          <button onClick={handleManagedBtn}>처리 확인</button>
        </div>
      </ParentContainer>
      <AdminEmailPopUp
        isOpen={selectedUserId !== null}
        onClose={() => setSelectedUserId(null)}
        defaultNickname={selectedUser.nickname}
        defaultEmail={selectedUser.email}
        // onSendResponse={handleSendResponse} // 답변을 보내는 함수
      />

      <AdminContentPopUp
        isOpen={showInquiryContentPopup}
        content={selectedContent}
        onClose={() => setShowInquiryContentPopup(false)}
        label="문의 내용"
      />
    </>
  );
};
export default InquiryManagement;

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  allReports,
  deleteReports,
  updateReportStatus,
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
  .report_reason_wrapper {
    white-space: nowrap; /* 텍스트가 넘칠 경우 줄 바꿈 방지 */
    overflow: hidden; /* 넘칠 경우 숨김 처리 */
    text-overflow: ellipsis; /* 넘칠 경우 마침표 (...)로 대체 */
    max-width: 18rem;
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
`;

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedReportIds, setSelectedReportIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const pageSize = 10;

  const [selectedUserId, setSelectedUserId] = useState(null); // 새로 추가
  const [selectedUser, setSelectedUser] = useState({}); // 새로운 상태 추가

  const [showReportReasonPopup, setShowReportReasonPopup] = useState(false);
  const [selectedReportReason, setSelectedReportReason] = useState("");

  const handleReportReasonClick = (content) => {
    setSelectedReportReason(content);
    setShowReportReasonPopup(true);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    // 클릭한 신고 내용의 닉네임과 이메일 정보를 가져와 selectedUser 상태에 저장
    const clickedReport = reports.find((report) => report.userId === userId);
    setSelectedUser({
      nickname: clickedReport.userNickname,
      email: clickedReport.userEmail,
    });
  };

  const fetchReportPages = async () => {
    try {
      const response = await allReports(currentPage - 1, pageSize);
      setReports(response.content);
      setTotalResults(response.totalElements);
      console.log("신고 리스트: ", response);
    } catch (error) {
      console.log("신고 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchReportPages();
  }, [currentPage]);

  const toggleAllCheckbox = () => {
    const allIds = reports.map((report) => report.id);
    if (selectAll) {
      setSelectedReportIds([]);
    } else {
      setSelectedReportIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleCheckbox = (reportId) => {
    if (selectedReportIds.includes(reportId)) {
      setSelectedReportIds(selectedReportIds.filter((id) => id !== reportId));
    } else {
      setSelectedReportIds([...selectedReportIds, reportId]);
    }
  };

  const handleDeleteBtn = async () => {
    if (selectedReportIds.length === 0) {
      alert("삭제할 신고글을 선택하세요.");
      return;
    }
    const shouldDelete = window.confirm("선택한 신고글을 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        await deleteReports(selectedReportIds);
        console.log("🟢삭제된 신고글번호: ", selectedReportIds);
        setSelectedReportIds([]);
        setSelectAll(false);
        fetchReportPages();
      } catch (error) {
        console.error("🔴신고글 삭제 실패", error);
      }
    }
  };

  const handleManagedBtn = async () => {
    if (selectedReportIds.length === 0 || selectedReportIds.length > 1) {
      console.log(selectedReportIds);
      alert("신고글을 하나씩 선택해 주세요.");
      return;
    }
    try {
      await updateReportStatus(selectedReportIds);
      console.log("🟢업데이트 된 신고글번호: ", selectedReportIds);
      alert("처리가 완료 되었습니다.");
      setSelectedReportIds([]);
      setSelectAll(false);
      fetchReportPages();
    } catch (error) {
      console.error("🔴신고글 상태 업데이트 실패", error);
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
              <th>신고날짜</th>
              <th>신고한 회원</th>
              <th>신고된 회원</th>
              <th>신고 사유</th>
              <th>답변상태</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(report.id)}
                    checked={selectedReportIds.includes(report.id)}
                  />
                </td>
                <td>{report.id}</td>
                <td>{dateFormat(report.reportDate)}</td>
                <td>
                  <div
                    className="nickname_wrapper"
                    onClick={() => handleUserClick(report.userId)}
                  >
                    {report.userNickname}
                  </div>
                </td>
                <td>{report.reportedUserNickname}</td>
                <td>
                  <p
                    className="report_reason_wrapper"
                    onClick={() => handleReportReasonClick(report.content)}
                  >
                    {report.content}
                  </p>
                </td>
                <td>{report.managed ? "O" : "X"}</td>
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
          <button onClick={handleDeleteBtn}>신고글 삭제</button>
          <button onClick={handleManagedBtn}>처리 완료</button>
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
        isOpen={showReportReasonPopup}
        content={selectedReportReason}
        onClose={() => setShowReportReasonPopup(false)}
        label="신고 내용"
      />
    </>
  );
};
export default ReportManagement;

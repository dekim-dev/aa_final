import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  deleteMultipleDiaries,
  getDiaryList,
} from "../../../service/ApiService";
import { dateFormat, dateFormatWithKoreanDay } from "../../../utils/Functions";
import { Link, useLocation } from "react-router-dom";
import Pagination from "../../common/Pagination";
import useWindowResize from "../../../utils/useWindowResize";

const ParentWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  .button_wrapper {
    width: 90%;
    display: flex;
    justify-content: flex-end; /* 내부 요소를 끝으로 정렬 */
    margin-top: 1rem;
  }
  .pagination {
    align-self: center;
    margin-bottom: 2rem;
  }
`;

const StyledTable = styled.table`
  margin: 0 auto;
  width: 80%;
  border-collapse: collapse;
  text-align: center;
  thead {
    border-top: 1px solid #000;
  }
  tbody tr:hover {
    background-color: #ececec;
    font-weight: bold;
  }
  th,
  td {
    border-bottom: 1px solid grey;
    padding: 1rem 0.6rem;
  }
  th.createdAt,
  td.createdAt {
    width: 20%;
  }
  th.title,
  td.title {
    width: 30%;
  }
  th.conclusion,
  td.conclusion {
    width: 40%;
  }
  th.medicationLists,
  td.medicationLists {
    width: 10%;
  }
`;

const MobileWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  display: flex;
  align-items: center;
  .col {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .map_container {
    padding-bottom: 1rem;
    border-bottom: 1px solid black;
    line-height: 1.2rem;
    cursor: pointer;

    &:first-child {
      border-top: 1px solid black;
      padding-top: 1rem;
    }
  }
  .row {
    display: flex;
    gap: 0.6rem;
    color: grey;
    .createdAt {
      font-size: 0.8rem;
      margin-left: 1.4rem;
    }
  }
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
    font-size: 1rem;
  }
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 280px;
    font-size: 0.8rem;
  }
`;

const DiaryList = () => {
  const isMobile = useWindowResize();

  const [diaryList, setDiaryList] = useState([]);
  const [selectedDiaryIds, setSelectedDiaryIds] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const pageSize = parseInt(queryParams.get("pageSize")) || 10;
  const [currentPage, setCurrentPage] = useState(page);
  const [totalResults, setTotalResults] = useState();

  const getDiaries = async () => {
    try {
      const response = await getDiaryList(currentPage - 1, pageSize);
      console.log("🟢", response);
      setDiaryList(response.content);
      setTotalResults(response.totalElements);
    } catch (error) {
      console.log("🔴", error);
    }
  };

  useEffect(() => {
    getDiaries();
  }, [currentPage]);

  const handleCheckboxChange = (diaryId) => {
    // 체크박스 선택 상태를 업데이트
    if (selectedDiaryIds.includes(diaryId)) {
      setSelectedDiaryIds(selectedDiaryIds.filter((id) => id !== diaryId));
    } else {
      setSelectedDiaryIds([...selectedDiaryIds, diaryId]);
    }
    console.log(selectedDiaryIds);
  };

  const handleDeleteSelectedDiary = async () => {
    const confirmDelete = window.confirm(
      "정말 삭제하시겠습니까? 복구가 불가능합니다."
    );
    if (confirmDelete) {
      try {
        const response = await deleteMultipleDiaries(selectedDiaryIds);
        if (response) {
          setSelectedDiaryIds([]);
          getDiaries();
          setCurrentPage(1); // 삭제 후 1 페이지로 돌아가기
          console.log("다이어리 삭제 성공");
          window.alert("다이어리가 삭제되었습니다.");
        } else {
          console.log("다이어리 삭제 실패");
          window.alert("다이어리 삭제 실패");
        }
      } catch (error) {
        console.error("다이어리 삭제 오류: ", error);
        window.alert("다이어리 삭제 중 오류가 발생했습니다.");
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <ParentWrapper>
      {isMobile ? (
        <MobileWrapper>
          <div className="col">
            {diaryList.map((diary) => (
              <div className="map_container" key={diary.id}>
                <div className="row">
                  <input
                    type="checkbox"
                    checked={selectedDiaryIds.includes(diary.id)}
                    onChange={() => handleCheckboxChange(diary.id)}
                  />
                  <Link to={`/mypage/diary/${diary.id}`}>
                    <p className="title">{diary.title}</p>
                    {/* <p className="content">{diary.content}</p> */}
                  </Link>
                </div>
                <div className="row">
                  <p className="createdAt">
                    {dateFormatWithKoreanDay(diary.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </MobileWrapper>
      ) : (
        <StyledTable>
          <thead>
            <tr>
              <th></th>
              <th className="createdAt">날짜</th>
              <th className="title">제목</th>
              <th className="conclusion">한 줄 문장</th>
              <th className="medicationLists">💊</th>
            </tr>
          </thead>
          <tbody>
            {diaryList.map((diary) => (
              <tr key={diary.id}>
                <td>
                  {
                    <input
                      type="checkbox"
                      checked={selectedDiaryIds.includes(diary.id)}
                      onChange={() => handleCheckboxChange(diary.id)}
                    />
                  }
                </td>
                <td className="createdAt">{dateFormat(diary.createdAt)}</td>
                <td className="title">
                  <Link to={`/mypage/diary/${diary.id}`}>{diary.title}</Link>
                </td>
                <td className="conclusion">{diary.conclusion}</td>
                <td className="medicationLists">
                  {diary.medicationLists.length > 0 ? "O" : "X"}
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      )}

      <div className="button_wrapper">
        <button onClick={handleDeleteSelectedDiary}>삭제</button>
      </div>
      <Pagination
        className="pagination"
        currentPage={currentPage}
        totalPages={Math.ceil(totalResults / pageSize)}
        onPageChange={handlePageChange}
      />
    </ParentWrapper>
  );
};
export default DiaryList;

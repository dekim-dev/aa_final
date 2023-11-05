import { useEffect, useState } from "react";
import { deleDiaryById, getDiaryById } from "../../../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { dateFormatWithKoreanDay } from "../../../utils/Functions";

const ParentWrapper = styled.div`
  width: 70%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 90vh;

  input {
    height: 2rem;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
  .diary {
    display: flex;
    gap: 1rem;
    align-items: center;
    border-bottom: 1px solid #ececec;
    padding-bottom: 1rem;
  }
  .description {
    font-size: 0.8rem;
    color: gray;
  }
  .date_title_wrapper {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: start;
  }
  .diary_med_wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
  }
  .each_med_wrapper {
    margin-right: 2rem;
  }
  .bottom_btns_wrapper {
    width: 100%;
    margin-top: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const DiaryViewer = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();
  const [diaryData, setDiaryData] = useState([]);

  const fetchDiaryById = async () => {
    try {
      const response = await getDiaryById(diaryId);
      setDiaryData(response);
      console.log("🟢", response);
    } catch (error) {
      console.log("🔴", error);
    }
  };

  useEffect(() => {
    fetchDiaryById();
  }, []);

  const removeDiaryById = async () => {
    if (window.confirm(`정말 삭제하시겠습니까?`)) {
      try {
        const response = await deleDiaryById(diaryId);
        console.log("🟢다이어리 삭제 성공: ", response);
        navigate("/mypage/diary/list");
      } catch (error) {
        console.log("🔴다이어리 삭제 실패, ", error);
      }
    }
  };

  const navigateToEditPage = () => {
    navigate(`/mypage/diary/edit/${diaryId}`);
  };
  return (
    <>
      <ParentWrapper>
        <div className="diary">
          <p className="description">날짜: </p>
          <p>{dateFormatWithKoreanDay(diaryData.createdAt)}</p>
        </div>

        <div className="diary" style={{ width: "100%" }}>
          <p className="description">제목: </p>
          <h2>{diaryData.title}</h2>
        </div>
        <div className="diary med_wrapper">
          <p className="description">복용약: </p>

          {diaryData.medicationLists && diaryData.medicationLists.length > 0 ? (
            diaryData.medicationLists.map((medication, index) => (
              <div className="each_med_wrapper" key={index}>
                <p>💊 : {medication.med}</p>
                {medication.takenAt ? (
                  <p>🕰️ : {medication.takenAt.slice(0, 5)}</p>
                ) : (
                  <p>🕰️ : 시간 정보 없음</p>
                )}
              </div>
            ))
          ) : (
            <p>복용한 약이 없습니다.</p>
          )}
        </div>
        <div className="diary content_wrapper" style={{ minHeight: "18rem" }}>
          <p className="description">내용: </p>
          <div>{diaryData.content}</div>
        </div>
        <div className="diary conclusion_wrapper">
          <p className="description">오늘의 한 줄: </p>
          <div>{diaryData.conclusion}</div>
        </div>
        <div className="bottom_btns_wrapper">
          <button onClick={removeDiaryById}>삭제</button>
          <button onClick={navigateToEditPage}>수정</button>
        </div>
      </ParentWrapper>
    </>
  );
};
export default DiaryViewer;

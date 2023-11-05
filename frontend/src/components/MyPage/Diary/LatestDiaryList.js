import { useEffect, useState } from "react";
import { getThreeLatestDiaryList } from "../../../service/ApiService";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../utils/Functions";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 70%;

  .diary_row {
    display: flex;
    border-bottom: 1px solid #ececec;
    padding: 0.2rem;
    padding-bottom: 0.4rem;
    gap: 2rem;
  }
  .view_all_button_wrapper {
    display: flex;
    justify-content: flex-end;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const LatestDiaryList = () => {
  const [diaryList, setDiaryList] = useState([]);

  const getLatestDiaries = async () => {
    try {
      const response = await getThreeLatestDiaryList();
      setDiaryList(response);
      console.log("🟢", response);
    } catch (error) {
      console.log("🔴", error);
    }
  };

  useEffect(() => {
    getLatestDiaries();
  }, []);

  return (
    <ParentWrapper>
      <div className="view_all_button_wrapper">
        <button>
          <Link to={"/mypage/diary/list"}>전체보기</Link>
        </button>
      </div>
      {diaryList.map((diary) => (
        <Link
          className="map_container"
          to={`/mypage/diary/${diary.id}`}
          key={diary.id}
        >
          <div className="diary_row">
            <p className="createdAt">{dateFormat(diary.createdAt)}</p>
            <p className="viewCount"> {diary.conclusion}</p>
          </div>
        </Link>
      ))}
    </ParentWrapper>
  );
};
export default LatestDiaryList;

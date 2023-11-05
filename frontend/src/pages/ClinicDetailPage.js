import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ClinicInfo from "../components/Clinic/Detail/ClinicInfo";
import KakaoMap from "../components/Clinic/Detail/KakaoMap";
import CommentViewer from "../components/Post/Comment/CommentViewer";
import CommentEditor from "../components/Post/Comment/CommentEditor";
import { useParams } from "react-router-dom";
import {
  createDeleteRecommend,
  getClinicInfoById,
} from "../service/ApiService";
import { UserContext } from "../context/UserContext";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  section {
    width: 70%;
    .section_title {
      /* font-size: 1.5rem; */
      line-height: 2.5rem;
    }
  }
  .comment_wrapper {
    width: 88%;
  }
  .recommend_wrapper {
    width: 70%;
    margin: 0 auto;
    display: flex;
  }
  .recommend_btn {
    margin-left: auto;
  }
`;

const ClinicDetailPage = () => {
  const { clinicId } = useParams();
  const { userId } = useContext(UserContext);
  const [clinicInfo, setClinicInfo] = useState({});
  const [schedule, setSchedule] = useState();
  const [kakaoMapInfo, setKakaoMapInfo] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getClinicInfo = async () => {
      try {
        const response = await getClinicInfoById(clinicId);
        console.log(response);
        setClinicInfo(response);
        setSchedule(response.scheduleJson);
        setComments(response.commentDTOs);
        setKakaoMapInfo({
          latitude: response.latitude,
          longitude: response.longitude,
          name: response.name,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getClinicInfo();
  }, [clinicId]);

  /* 댓글 리스트 업데이트를 위한 함수들 */
  // 댓글 추가
  const addComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // 댓글 삭제
  const deleteCommentAndUpdateList = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  // 댓글 수정
  const handleCommentUpdate = (commentId, updatedContent) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, content: updatedContent }
          : comment
      )
    );
  };

  const handleClickRecommend = async () => {
    console.log("🍒clinicId : ", clinicId);
    const response = await createDeleteRecommend(clinicId);
    console.log("🍒병원 추천 리턴값 : ", response);
    if (response.recommended) {
      alert("추천되었습니다.");
    } else {
      alert("추천을 취소하였습니다.");
    }
  };

  return (
    <ParentWrapper>
      <section>
        <h2 className="section_title">📌 병원 정보</h2>
        <ClinicInfo clinicInfo={clinicInfo} schedule={schedule} />
      </section>
      <section>
        <h2 className="section_title">📍 지도에서 보기</h2>
        <KakaoMap {...kakaoMapInfo} />
      </section>
      <div className="recommend_wrapper">
        <button className="recommend_btn" onClick={handleClickRecommend}>
          👍🏻
        </button>
      </div>
      <div className="comment_wrapper">
        <CommentViewer
          commentData={comments}
          clinicId={clinicId}
          userId={userId}
          onCommentDelete={deleteCommentAndUpdateList}
          onCommentUpdate={handleCommentUpdate}
        />
        <CommentEditor
          clinicId={clinicId}
          userId={userId}
          onCommentAdd={addComment}
        />
      </div>
    </ParentWrapper>
  );
};
export default ClinicDetailPage;

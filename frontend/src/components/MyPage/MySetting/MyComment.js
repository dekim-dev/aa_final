import { useEffect, useState } from "react";
import {
  deleteMultipleComments,
  getAllComments,
} from "../../../service/ApiService";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dateFormat } from "../../../utils/Functions";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  .empty_result {
    text-align: center;
  }
  .map_container {
    margin: 1rem auto;
    width: 80%;
    border-bottom: 1px solid gray;
    padding-bottom: 0.4rem;
  }
  .checkbox_nickname_date {
    margin: 0.4rem auto;
    display: flex;
    gap: 1rem;
    font-weight: bold;
    font-size: 0.9rem;
  }
  .content_postTitle {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-left: 1.8rem;
    p {
      font-weight: 300;
      font-size: 0.9rem;
    }
  }
  .button_wrapper {
    width: 90%;
    display: flex;
    justify-content: flex-end; /* 내부 요소를 끝으로 정렬 */
    margin-top: 1rem;
  }
`;

const MyComment = () => {
  const [userComments, setUserComments] = useState([]);
  const [selectedCommentIds, setSelectedCommentIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllComments(0, 10);
        setUserComments(response.content);
        console.log(response);
      } catch (err) {
        console.log("회원의 모든 댓글 불러오기 에러: ", err);
      }
    };
    fetchData();
    setSelectedCommentIds([]);
  }, []);

  const handleCheckboxChange = (commentId) => {
    // 체크박스 선택 상태를 업데이트
    if (selectedCommentIds.includes(commentId)) {
      setSelectedCommentIds(
        selectedCommentIds.filter((id) => id !== commentId)
      );
    } else {
      setSelectedCommentIds([...selectedCommentIds, commentId]);
    }
  };

  const handleDeleteSelectedPosts = async () => {
    console.log("🍒selectedCommentIds: ", selectedCommentIds);
    try {
      const response = await deleteMultipleComments(selectedCommentIds);
      if (response) {
        setSelectedCommentIds([]);
        setUserComments(
          userComments.filter(
            (comment) => !selectedCommentIds.includes(comment.id)
          )
        );
        console.log("댓글 삭제 성공");
      } else {
        console.log("댓글 삭제 실패");
      }
    } catch (error) {
      console.error("댓글 삭제 오류: ", error);
    }
  };

  return (
    <ParentWrapper>
      {userComments.length === 0 ? (
        <div className="empty_result">작성된 댓글이 없습니다.</div>
      ) : (
        <>
          {userComments.map((comment) => (
            <div className="map_container" key={comment.id}>
              <div className="checkbox_nickname_date">
                <input
                  type="checkbox"
                  checked={selectedCommentIds.includes(comment.id)}
                  onChange={() => handleCheckboxChange(comment.id)}
                />
                <p>{comment.nickname}</p>
                <p>{dateFormat(comment.createdAt)}</p>
              </div>
              <div className="content_postTitle">
                <Link to={`/post/${comment.postId}`}>
                  <span className="title">{comment.content}</span>
                </Link>
                <p>원문제목: {comment.postTitle}</p>
              </div>
            </div>
          ))}
        </>
      )}
      {userComments.length !== 0 && (
        <div className="button_wrapper">
          <button onClick={handleDeleteSelectedPosts}>삭제</button>
        </div>
      )}
    </ParentWrapper>
  );
};
export default MyComment;

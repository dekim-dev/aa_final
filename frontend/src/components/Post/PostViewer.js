import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createDeleteLikes,
  deletePost,
  reportPost,
} from "../../service/ApiService";
import { dateFormat } from "../../utils/Functions";
import { styled } from "styled-components";
import MyButton from "./MyButton";
import { usePostStore } from "../../store";
import { UserNicknameBar, UserPfImgBar } from "../common/UserNameTag";
import useWindowResize from "../../utils/useWindowResize";

const Wrapper = styled.div`
  width: 100%;
`;

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .row {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .title {
    font-size: 1.4rem;
  }
  .post_info_container {
    margin-top: -0.8rem;
  }
  .user_info_wrapper {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  .content {
    border: 1px solid #ececec;
    width: 100%;
    min-height: 40rem;
    padding: 0.4rem;

    image {
    }
    .image-style-side {
      float: right;
    }
    figure.image {
      margin: 0.9em auto;
      text-align: center;
      max-width: 90%;
    }
    .image.image_resized {
      display: block;
      box-sizing: border-box;
    }
    .image.image_resized img {
      width: 100%;
    }

    .image.image_resized > figcaption {
      display: block;
      caption-side: bottom;
      word-break: break-word;
      color: gray;
      background-color: #ececec;
      padding: 0.6em;
      font-size: 0.75em;
      outline-offset: -1px;
    }
  }
  .edit_delete_wrapper {
    align-self: flex-end;
    display: flex;
    gap: 0.6rem;
  }
  @media screen and (max-width: 768px) {
    gap: 0.8rem;
    .post_info_container {
      margin-top: 0rem;
    }
  }
`;

const MobileInfoWrapper = styled.div`
  display: flex;
  .nickname_post_info_wrapper {
    display: flex;
    flex-direction: column;
  }
`;

export const koreanBoardNames = {
  free: "자유게시판",
  qna: "질문게시판",
  best: "베스트게시판",
  notice: "공지사항",
  clinic: "병원찾기게시판",
};

export const topics = {
  experience: "경험",
  daily: "일상",
  thoughts: "생각",
  treatment: "진료",
  ADHD: "ADHD",
  study: "공부",
  work: "직장",
  etc: "기타",
};

const PostViewer = ({ postData, canEdit, postId }) => {
  const navigate = useNavigate();
  const { post } = usePostStore();
  const isMobile = useWindowResize();

  const handleDelete = async () => {
    if (window.confirm(`정말 삭제하시겠습니까?`)) {
      try {
        const response = await deletePost(postId);
        console.log(postId);
        console.log("글 삭제 성공", response);
        console.log(post);
        navigate(`/board/${post.post.boardCategory}`);
      } catch (error) {
        console.log("글 삭제 실패", error);
      }
    }
  };

  const handleClickLikes = async () => {
    const likesDTO = { postId: postId };
    const response = await createDeleteLikes(likesDTO);
    if (response.added) {
      alert("좋아요를 눌렀습니다.");
    } else {
      alert("좋아요를 취소하였습니다.");
    }
  };

  const handleReportPost = async () => {
    const response = await reportPost(postId);
    console.log(response);
  };

  return (
    <Wrapper>
      {postData && (
        <ParentWrapper>
          <div className="board_topic_container row">
            <p>{koreanBoardNames[postData.boardCategory]}</p>
          </div>
          <div className="title">
            <p>
              [{topics[postData.topic]}] {postData.title}
            </p>
          </div>
          {isMobile ? (
            <MobileInfoWrapper>
              <UserPfImgBar userPfImg={postData.pfImg} />
              <div className="nickname_post_info_wrapper">
                <UserNicknameBar
                  userNickname={postData.nickname}
                  userId={postData.userId}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.6rem",
                    color: "gray",
                    fontSize: "0.9rem",
                  }}
                >
                  <p>{dateFormat(postData.createdAt)}</p>
                  <p>◉{postData.viewCount}</p>
                  <p>❤︎ {postData.likesCount} </p>
                </div>
              </div>
            </MobileInfoWrapper>
          ) : (
            <div className="post_info_container row">
              <div className="user_info_wrapper">
                <UserPfImgBar userPfImg={postData.pfImg} />
                <UserNicknameBar
                  userNickname={postData.nickname}
                  userId={postData.userId}
                />
              </div>
              <p>{dateFormat(postData.createdAt)}</p>
              <p>조회수 {postData.viewCount}</p>
              <p>좋아요 {postData.likesCount}</p>
            </div>
          )}

          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />

          {!canEdit && (
            <div className="edit_delete_wrapper">
              <button onClick={handleReportPost}>게시글 신고</button>
              <button onClick={handleClickLikes}>👍🏻</button>
            </div>
          )}
          {canEdit && (
            <div className="edit_delete_wrapper">
              <Link to={`/post/edit/${postId}`}>
                <MyButton text="수정" />
              </Link>
              <MyButton text="삭제" onClick={handleDelete} />
            </div>
          )}
        </ParentWrapper>
      )}
    </Wrapper>
  );
};
export default PostViewer;

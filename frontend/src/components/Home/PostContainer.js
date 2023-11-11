import { useContext, useEffect, useState } from "react";
import { getLatestPosts } from "../../service/ApiService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const PostsContainer = styled.div`
  border: 1px solid #ececec;
  width: 70%;
  height: 18rem;
  h3 {
    text-align: center;
    margin: 1rem 2rem;
  }

  .map_container {
    width: 90%;
    margin: 1rem auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ececec;
    padding-bottom: 1rem;
    &:last-child {
      border-bottom: none;
    }
    .title {
      margin-left: 1rem;
      cursor: pointer;
      &:hover {
        font-weight: bold;
      }
    }
    .nickname {
      margin-right: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const PostContainer = () => {
  const navigate = useNavigate();
  const { isLogin } = useContext(UserContext);
  const token = localStorage.getItem("ACCESS_TOKEN");
  const [freeBoardResponse, setFreeBoardResponse] = useState([]);
  const [qnaBoardResponse, setQnaBoardResponse] = useState([]);
  const [noticeBoardResponse, setNoticeBoardResponse] = useState([]);

  const fetchLatestPostsFromFreeBoard = async () => {
    const freeBoardResponse = await getLatestPosts("free");
    console.log("👉🏻자유게시판: ", freeBoardResponse);
    setFreeBoardResponse(freeBoardResponse.data);
  };
  const fetchLatestPostsFromQnaBoard = async () => {
    const qnaBoardResponse = await getLatestPosts("qna");
    console.log("👉🏻질문게시판: ", qnaBoardResponse);
    setQnaBoardResponse(qnaBoardResponse.data);
  };
  const fetchLatestPostsFromNoticeBoard = async () => {
    const noticeBoardResponse = await getLatestPosts("notice");
    console.log("👉🏻공지게시판: ", noticeBoardResponse);
    setNoticeBoardResponse(noticeBoardResponse.data);
  };

  useEffect(() => {
    fetchLatestPostsFromFreeBoard();
    fetchLatestPostsFromQnaBoard();
    fetchLatestPostsFromNoticeBoard();
  }, []);

  return (
    <ParentWrapper>
      <PostsContainer>
        <h3>공지 게시판</h3>
        {noticeBoardResponse.length > 0 ? (
          noticeBoardResponse.map((post) => (
            <div className="map_container" key={post.id}>
              <div className="title" onClick={() => {navigate(`/post/${post.id}`);}}>
                {post.title}
              </div>
              <div className="nickname">{post.nickname}</div>
            </div>
          ))
        ) : (
          <p>공지 게시판에 게시글이 없습니다.</p>
        )}
      </PostsContainer>
      <PostsContainer>
        <h3>자유 게시판</h3>
        {freeBoardResponse.length > 0 ? (
          freeBoardResponse.map((post) => (
            <div className="map_container" key={post.id}>
              <div
                className="title"
                onClick={() => {
                  if (isLogin) {
                    navigate(`/post/${post.id}`);
                  } else {
                    alert("로그인후에 게시글 열람이 가능합니다.");
                    navigate("/signin");
                  }
                }}
              >
                {post.title}
              </div>
              <p className="nickname">{post.nickname}</p>
            </div>
          ))
        ) : (
          <p>자유 게시판에 게시글이 없습니다.</p>
        )}
      </PostsContainer>
      <PostsContainer>
        <h3>질문 게시판</h3>
        {qnaBoardResponse.length > 0 ? (
          qnaBoardResponse.map((post) => (
            <div className="map_container" key={post.id}>
              <div
                className="title"
                onClick={() => {
                  if (isLogin) {
                    navigate(`/post/${post.id}`);
                  } else {
                    alert("로그인후에 게시글 열람이 가능합니다.");
                    navigate("/signin");
                  }
                }}
              >
                {post.title}
              </div>
              <p className="nickname">{post.nickname}</p>
            </div>
          ))
        ) : (
          <p>질문 게시판에 글이 없습니다.</p>
        )}
      </PostsContainer>
    </ParentWrapper>
  );
};
export default PostContainer;

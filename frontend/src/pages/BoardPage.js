import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BoardTable from "../components/Board/BoardTable";
import BoardSearch from "../components/Board/BoardSearch";
import WriteButton from "../components/Post/WriteButton";
import {
  FreeBoardTopics,
  QnABoardTopics,
} from "../components/Post/TopicSelectBox";
import {
  getPopularPosts,
  getPostsByBoardCategory,
  searchByKeyword,
} from "../service/ApiService";
import { useLocation } from "react-router-dom";
import Pagination from "../components/common/Pagination";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    text-align: center;
  }
  .search_bar {
    margin: 0 auto;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .pagination {
    align-self: center;
  }
`;

const koreanBoardNames = {
  free: "자유게시판",
  qna: "질문게시판",
  best: "베스트게시판",
  notice: "공지사항",
  clinic: "병원찾기게시판",
};

const BoardPage = ({ boardName }) => {
  const koreanBoardName = koreanBoardNames[boardName] || boardName;

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get("page")) || 1;
  const pageSize = parseInt(queryParams.get("pageSize")) || 10;
  const [postList, setPostList] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [totalResults, setTotalResults] = useState();
  const [searchResults, setSearchResults] = useState(null);

  const handleSearch = async (keyword) => {
    try {
      const encodedKeyword = encodeURIComponent(keyword);
      const response = await searchByKeyword(
        encodedKeyword,
        boardName,
        currentPage - 1,
        pageSize
      );
      setSearchResults(response);
    } catch (error) {
      console.error("게시글 검색 에러:", error);
    }
  };

  useEffect(() => {
    if (boardName === "best") {
      getPopularPostsList(); // 베스트 게시판인 경우 베스트 게시글을 가져옴
    } else if (searchResults) {
      setPostList(searchResults.content);
      setTotalResults(searchResults.totalElements);
    } else {
      getPostListByBoardCategory();
    }
  }, [boardName, currentPage, searchResults]);

  const getPopularPostsList = async () => {
    try {
      const response = await getPopularPosts();
      setPostList(response.content);
      setTotalResults(response.totalElements);
      console.log(response);
    } catch (error) {
      console.error("베스트 게시글 가져오기 에러:", error);
    }
  };

  useEffect(() => {
    setSearchResults(null);
    setCurrentPage(1);
  }, [boardName]);

  const getPostListByBoardCategory = async () => {
    try {
      const response = await getPostsByBoardCategory(
        currentPage - 1,
        pageSize,
        boardName
      );
      setPostList(response.content);
      setTotalResults(response.totalElements);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <ParentWrapper>
      <h2> {koreanBoardName}</h2>
      <div className="search_bar">
        <div className="select_box">
          {boardName === "free" && <FreeBoardTopics />}
          {boardName === "qna" && <QnABoardTopics />}
        </div>
        <BoardSearch
          boardName={boardName}
          onSearch={handleSearch}
          postList={postList}
        />
      </div>
      <BoardTable boardName={boardName} postList={postList} />
      <Pagination
        className="pagination"
        currentPage={currentPage}
        totalPages={Math.ceil(totalResults / pageSize)}
        onPageChange={handlePageChange}
      />
      {boardName !== "notice" && boardName !== "best" && <WriteButton />}
    </ParentWrapper>
  );
};

export default BoardPage;

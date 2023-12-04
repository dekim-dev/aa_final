import React, { useEffect, useState, useCallback } from "react";
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
  noticePost,
  noticePostList,
  searchByKeyword,
} from "../service/ApiService";
import { useLocation } from "react-router-dom";
import Pagination from "../components/common/Pagination";

const ParentWrapper = styled.div`
  height: 75vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  h2 {
    text-align: center;
  }
  .search_bar,
  .button_wrapper {
    width: 90%;
    text-align: right;
  }
  .pagination {
    align-self: center;
  }
  @media screen and (max-width: 768px) {
    .search_bar,
    .button_wrapper {
      width: 94%;
      text-align: right;
    }
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

  const getNoticeList = async () => {
    try {
      const response = await noticePostList();
      setPostList(response.content);
      setTotalResults(response.totalElements);
      console.log(response);
    } catch (error) {
      console.error("공지사항 가져오기 에러:", error);
    }
  };

  useEffect(() => {
    setSearchResults(null);
    setCurrentPage(1);
  }, [boardName]);

  const getPostListByBoardCategory = useCallback(async () => {
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
  }, [currentPage, pageSize, boardName]);

  useEffect(() => {
    if (boardName === "best") {
      getPopularPostsList();
    } else if (searchResults) {
      setPostList(searchResults.content);
      setTotalResults(searchResults.totalElements);
    } else if (boardName === "notice") {
      getNoticeList();
    } else {
      getPostListByBoardCategory();
    }
  }, [boardName, currentPage, searchResults, getPostListByBoardCategory]);


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <ParentWrapper>
      <h2> {koreanBoardName}</h2>
      <div className="search_bar">
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
      <div className="button_wrapper">
        {boardName !== "notice" && boardName !== "best" && <WriteButton />}
      </div>
    </ParentWrapper>
  );
};

export default BoardPage;
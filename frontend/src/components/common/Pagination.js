import React from "react";
import styled from "styled-components";

const ParentWrapper = styled.div`
  button {
    width: 2rem;
    height: 2rem;
    padding: 0.4rem;
    border: none;
    background-color: transparent;
    border-radius: 50%;
    font-size: 0.8rem;
    cursor: pointer;
    &:hover {
      font-weight: bold;
    }
  }
  .active {
    background-color: #ce3c3c;
    color: #ffffff;
    font-weight: bold;
  }
  @media screen and (max-width: 768px) {
    button {
      width: 1.6rem;
      height: 1.6rem;
      font-size: 0.6rem;
    }
  }
`;

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const prevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];   // 배열로 모든 페이지 숫자 받기
    const pagesPerGroup = 5;  // 한번에 보여줄 페이지 숫자 개수

    const currentGroup = Math.ceil(currentPage / pagesPerGroup);  // 5단위로 페이지 넘버를 보여주기 위한 그룹
    const startPage = (currentGroup - 1) * pagesPerGroup + 1;     // ex) (3-1) * 5 + 1 = 11
    const endPage = Math.min(totalPages, currentGroup * pagesPerGroup); // 전체 페이지 숫자보다 더 큰 숫자가 나오지 않도록 TotalPages와 비교

    // 페이지 번호 버튼 생성
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <ParentWrapper className="pagination">
      <button onClick={() => onPageChange(1)}>&lt;&lt;</button>
      <button onClick={prevPage}>&lt;</button>
      {getPageNumbers()}
      <button onClick={nextPage}>&gt;</button>
      <button onClick={() => onPageChange(totalPages)}>&gt;&gt;</button>
    </ParentWrapper>
  );
};

export default Pagination;

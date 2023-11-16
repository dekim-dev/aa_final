import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ParentWrapper = styled.div`
  input {
    margin-right: 0.6rem;
  }
`;

const BoardSearch = ({ boardName, onSearch, postList }) => {
  const [keyword, setKeyword] = useState("");

  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSearchClick = () => {
    onSearch(keyword);
  };

  useEffect(() => {
    setKeyword("");
  }, [boardName]);

  return (
    <ParentWrapper>
      <input
        type="text"
        placeholder="검색어 입력"
        value={keyword}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>검색</button>
    </ParentWrapper>
  );
};

export default BoardSearch;

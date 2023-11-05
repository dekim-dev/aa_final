import React, { useEffect, useState } from "react";

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
    <div>
      <input
        type="text"
        placeholder="검색어 입력"
        value={keyword}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick}>검색</button>
    </div>
  );
};

export default BoardSearch;

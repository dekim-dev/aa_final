import styled from "styled-components";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
`;

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  handleSearch,
  fetchData,
}) => {
  return (
    <ParentWrapper className="search">
      <input
        type="text"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder="병원 검색"
      />
      <button
        onClick={() => {
          handleSearch();
          fetchData(1);
        }}
      >
        검색
      </button>
    </ParentWrapper>
  );
};

export default SearchBar;

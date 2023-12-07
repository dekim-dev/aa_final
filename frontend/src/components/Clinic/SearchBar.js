import styled from "styled-components";

const ParentWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.4rem;
  .search_wrapper {
    display: flex;
    gap: 0.4rem;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  handleSearch,
  fetchData,
  searchAddress,
  setSearchAddress,
}) => {
  return (
    <ParentWrapper className="search">
      <div className="search_wrapper">
        <input
          type="text"
          placeholder="병원 이름으로 검색"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button
          onClick={() => {
            handleSearch();
            fetchData(1);
          }}
        >
          검색
        </button>
      </div>
      <div className="search_wrapper">
        <input
          type="text"
          placeholder="주소로 검색"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
        />
        <button
          onClick={() => {
            handleSearch();
            fetchData(1);
          }}
        >
          검색
        </button>
      </div>
    </ParentWrapper>
  );
};

export default SearchBar;
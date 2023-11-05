import React, { useEffect, useState } from "react";
import {
  getClinicList,
  getClinicListByKeyword,
} from "../../service/ApiService";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import MobileClinicTable from "./MobileClinicTable";
import WebClinicTable from "./WebClinicTable";
import Pagination from "../common/Pagination";
import SearchBar from "./SearchBar";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    text-align: center;
  }
  .pagination {
    align-self: center;
  }
  .search {
    align-self: flex-end;
  }
`;

const ClinicTable = ({ isMobile }) => {
  const [clinicList, setClinicList] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const pageSize = queryParams.get("pageSize") || 10;

  const fetchData = async (page) => {
    try {
      let response;

      if (searchKeyword) {
        response = await getClinicListByKeyword(
          searchKeyword,
          page - 1, // 사용자에게 보이는 페이지 번호에서 1을 뺀 값 (인덱스 값)
          pageSize
        );
      } else {
        response = await getClinicList(page - 1, pageSize);
      }

      if (response) {
        const clinicData = searchKeyword ? response.clinics : response.content;
        setClinicList(clinicData);
        setTotalResults(
          searchKeyword ? response.totalResults : response.totalElements
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, pageSize]);

  const TableComponent = isMobile ? MobileClinicTable : WebClinicTable;

  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 페이지를 1로 초기화
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <ParentWrapper>
      <h2>병원 리스트</h2>
      <SearchBar
        className="search"
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        handleSearch={handleSearch}
        fetchData={fetchData}
      />
      <TableComponent clinicList={clinicList} />
      <Pagination
        className="pagination"
        currentPage={currentPage}
        totalPages={Math.ceil(totalResults / pageSize)} // 전체 페이지 수 계산
        onPageChange={handlePageChange}
      />
    </ParentWrapper>
  );
};

export default ClinicTable;

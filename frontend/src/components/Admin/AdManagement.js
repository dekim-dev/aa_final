import { useState, useEffect } from "react";
import styled from "styled-components";
import { allAds, deleteMultipleAds } from "../../service/AdminApiService";
import Pagination from "../common/Pagination";
import AdPopUp from "./AdPopUp";

const ParentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  .button_container {
    margin: 1rem auto;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
  .pagination {
    margin: 1rem auto;
    align-self: center;
  }
`;

const Table = styled.table`
  width: 90%;
  margin: 0 auto;
  tbody :hover {
    background-color: #ececec;
  }
  th,
  td {
    padding: 0.8rem;
    border-bottom: 1px solid black;
    text-align: center;
  }
  .clinic_name {
    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
  td.image_url {
    white-space: nowrap; /* 텍스트 줄 바꿈 방지 */
    overflow: hidden; /* 넘치는 부분 숨김 */
    text-overflow: ellipsis; /* 말줄임표 표시 */
    max-width: 200px;
  }
`;

const AdManagement = () => {
  const [ads, setAds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedAdIds, setSelectedAdIds] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedAd, setSelectedAd] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const pageSize = 10;

  const fetchAdList = async () => {
    try {
      const response = await allAds(currentPage - 1, pageSize);
      setAds(response.content);
      setTotalResults(response.totalElements);
      console.log("🟢광고 리스트: ", response);
    } catch (error) {
      console.log("🔴광고 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchAdList();
  }, [currentPage]);

  const handleAddPopUpOpen = () => {
    setIsPopupOpen(true);
    setSelectedAd(null);
  };
  const handleAddPopUpClose = async () => {
    setIsPopupOpen(false);
    await fetchAdList();
    const totalPages = Math.ceil(totalResults / pageSize);
    setCurrentPage(totalPages);
  };

  const handleEditPopUpOpen = (clinic) => {
    setSelectedAd(clinic);
    setIsPopupOpen(true);
  };
  const handleEditPopUpClose = async () => {
    setIsPopupOpen(false);
    await fetchAdList();
  };

  const toggleAllCheckbox = () => {
    const allIds = ads.map((clinic) => clinic.id);
    if (selectAll) {
      setSelectedAdIds([]);
    } else {
      setSelectedAdIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleCheckbox = (clinicId) => {
    if (selectedAdIds.includes(clinicId)) {
      setSelectedAdIds(selectedAdIds.filter((id) => id !== clinicId));
    } else {
      setSelectedAdIds([...selectedAdIds, clinicId]);
    }
  };

  const handleDeleteBtn = async () => {
    if (selectedAdIds.length === 0) {
      alert("삭제할 광고를 선택하세요.");
      return;
    }
    const shouldDelete = window.confirm("선택한 광고를 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        await deleteMultipleAds(selectedAdIds);
        console.log("🟢삭제된 광고 번호: ", selectedAdIds);
        setSelectedAdIds([]);
        setSelectAll(false);
        fetchAdList();
      } catch (error) {
        console.error("🔴광고 삭제 실패", error);
      }
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalResults / pageSize)) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <ParentContainer>
        <Table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={toggleAllCheckbox}
                  checked={selectAll}
                />
              </th>
              <th>번호</th>
              <th>만료일</th>
              <th>광고주</th>
              <th>이미지주소</th>
            </tr>
          </thead>
          <tbody>
            {ads.map((ad) => (
              <tr key={ad.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(ad.id)}
                    checked={selectedAdIds.includes(ad.id)}
                  />
                </td>
                <td>{ad.id}</td>
                <td
                  className="clinic_name"
                  onClick={() => handleEditPopUpOpen(ad)}
                >
                  {ad.expiresOn}
                </td>
                <td>{ad.advertiser}</td>
                <td className="image_url">{ad.imgUrl}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          className="pagination"
          currentPage={currentPage}
          totalPages={Math.ceil(totalResults / pageSize)}
          onPageChange={handlePageChange}
        />
        <div className="button_container">
          <button onClick={handleAddPopUpOpen}>광고 등록</button>
          <button onClick={handleDeleteBtn}>광고 삭제</button>
        </div>
      </ParentContainer>
      {isPopupOpen && (
        <AdPopUp
          ad={selectedAd}
          onClose={() => setIsPopupOpen(false)}
          mode={selectedAd ? "edit" : "add"}
          onAdd={handleAddPopUpClose}
          onEdit={handleEditPopUpClose}
        />
      )}
    </>
  );
};
export default AdManagement;

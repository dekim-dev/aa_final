import { useState, useEffect } from "react";
import styled from "styled-components";
import { deleteMultipleClinics } from "../../service/AdminApiService";
import { getClinicList } from "../../service/ApiService";
import ClinicPopUp from "./ClinicPopUp";
import Pagination from "../common/Pagination";

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
`;

const ClinicManagement = () => {
  const [clinics, setClinics] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedClinicIds, setSelectedClinicIds] = useState([]);

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const pageSize = 10;

  const fetchClinicList = async () => {
    try {
      const response = await getClinicList(currentPage - 1, pageSize);
      setClinics(response.content);
      setTotalResults(response.totalElements);
      console.log("🟢병원 리스트: ", response);
    } catch (error) {
      console.log("🔴병원 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchClinicList();
  }, [currentPage]);

  const handleAddPopUpOpen = () => {
    setIsPopupOpen(true);
    setSelectedClinic(null);
  };
  const handleAddPopUpClose = async () => {
    setIsPopupOpen(false);
    await fetchClinicList();
    const totalPages = Math.ceil(totalResults / pageSize);
    setCurrentPage(totalPages);
  };

  const handleEditPopUpOpen = (clinic) => {
    setSelectedClinic(clinic);
    setIsPopupOpen(true);
  };
  const handleEditPopUpClose = async () => {
    setIsPopupOpen(false);
    await fetchClinicList();
  };

  const toggleAllCheckbox = () => {
    const allIds = clinics.map((clinic) => clinic.id);
    if (selectAll) {
      setSelectedClinicIds([]);
    } else {
      setSelectedClinicIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleCheckbox = (clinicId) => {
    if (selectedClinicIds.includes(clinicId)) {
      setSelectedClinicIds(selectedClinicIds.filter((id) => id !== clinicId));
    } else {
      setSelectedClinicIds([...selectedClinicIds, clinicId]);
    }
  };

  const handleDeleteBtn = async () => {
    if (selectedClinicIds.length === 0) {
      alert("삭제할 병원을 선택하세요.");
      return;
    }
    const shouldDelete = window.confirm("선택한 병원을 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        await deleteMultipleClinics(selectedClinicIds);
        console.log("🟢삭제된 병원번호: ", selectedClinicIds);
        setSelectedClinicIds([]);
        setSelectAll(false);
        fetchClinicList();
      } catch (error) {
        console.error("🔴병원 삭제 실패", error);
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
              <th>병원명</th>
              <th>주소</th>
              <th>전화번호</th>
              <th>고유번호</th>
            </tr>
          </thead>
          <tbody>
            {clinics.map((clinic) => (
              <tr key={clinic.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(clinic.id)}
                    checked={selectedClinicIds.includes(clinic.id)}
                  />
                </td>
                <td>{clinic.id}</td>
                <td
                  className="clinic_name"
                  onClick={() => handleEditPopUpOpen(clinic)}
                >
                  {clinic.name}
                </td>
                <td>{clinic.address}</td>
                <td>{clinic.tel}</td>
                <td> {clinic.hpid}</td>
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
          <button onClick={handleAddPopUpOpen}>병원 등록</button>
          <button onClick={handleDeleteBtn}>병원 삭제</button>
        </div>
      </ParentContainer>
      {isPopupOpen && (
        <ClinicPopUp
          clinic={selectedClinic}
          onClose={handleEditPopUpClose}
          mode={selectedClinic ? "edit" : "add"}
          onAdd={handleAddPopUpClose}
          onEdit={handleEditPopUpClose}
        />
      )}
    </>
  );
};
export default ClinicManagement;

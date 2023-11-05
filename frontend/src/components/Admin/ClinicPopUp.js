import React, { useState } from "react";
import styled from "styled-components";
import {
  registerClinic,
  updateClinicInfo,
} from "../../service/AdminApiService";

const PopupContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  input {
    width: 100%;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ClinicPopUp = ({ clinic, onClose, mode, onAdd, onEdit }) => {
  const [editedClinic, setEditedClinic] = useState({ ...clinic });

  // 기본 일정 값
  const defaultSchedule = [
    {
      dayOfWeek: "1",
      startTime: "0830",
      endTime: "1730",
    },
    {
      dayOfWeek: "2",
      startTime: "0830",
      endTime: "1730",
    },
    {
      dayOfWeek: "3",
      startTime: "0830",
      endTime: "1730",
    },
    {
      dayOfWeek: "4",
      startTime: "0830",
      endTime: "1730",
    },
    {
      dayOfWeek: "5",
      startTime: "0830",
      endTime: "1730",
    },
  ];

  if (mode === "add") {
    // 병원 추가 모드에서만 기본 일정 값을 설정
    editedClinic.scheduleJson = JSON.stringify(defaultSchedule);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedClinic({
      ...editedClinic,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    try {
      if (mode === "add") {
        const response = await registerClinic(editedClinic);
        if (response) {
          onAdd();
        } else {
          console.error("🔴병원 등록 실패");
        }
      } else if (mode === "edit") {
        const response = await updateClinicInfo(clinic.id, editedClinic);
        if (response) {
          onEdit();
        } else {
          console.error("🔴병원 정보 업데이트 실패");
        }
      }
    } catch (error) {
      console.error("🔴병원 등록/업데이트 실패", error);
    }
  };

  return (
    <>
      <PopupOverlay onClick={onClose} />
      <PopupContainer>
        <h2>{mode === "add" ? "병원 추가" : "병원 수정"}</h2>
        <label>
          병원명:
          <input
            type="text"
            name="name"
            value={editedClinic.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          주소:
          <input
            type="text"
            name="address"
            value={editedClinic.address}
            onChange={handleInputChange}
          />
        </label>
        <label>
          상세 주소:
          <input
            type="text"
            name="detailedAddr"
            value={editedClinic.detailedAddr}
            onChange={handleInputChange}
          />
        </label>
        <label>
          고유 번호:
          {mode === "add" ? (
            <input
              type="text"
              name="hpid"
              value={editedClinic.hpid}
              onChange={handleInputChange}
            />
          ) : (
            <input
              readOnly
              type="text"
              name="hpid"
              value={editedClinic.hpid}
              onChange={handleInputChange}
            />
          )}
        </label>
        <label>
          정보:
          <input
            type="text"
            name="info"
            value={editedClinic.info}
            onChange={handleInputChange}
          />
        </label>
        <label>
          위도:
          {mode === "add" ? (
            <input
              type="text"
              name="latitude"
              placeholder="소수로 입력하세요"
              value={editedClinic.latitude}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              name="latitude"
              value={editedClinic.latitude}
              onChange={handleInputChange}
            />
          )}
        </label>
        <label>
          경도:
          {mode === "add" ? (
            <input
              type="text"
              name="longitude"
              placeholder="소수로 입력하세요"
              value={editedClinic.longitude}
              onChange={handleInputChange}
            />
          ) : (
            <input
              type="text"
              name="longitude"
              value={editedClinic.longitude}
              onChange={handleInputChange}
            />
          )}
        </label>
        <label>
          전화번호:
          <input
            type="text"
            name="tel"
            value={editedClinic.tel}
            onChange={handleInputChange}
          />
        </label>
        <label>
          진료시간:
          {mode === "add" ? (
            <>
              <input
                type="text"
                name="scheduleJson"
                value={defaultSchedule}
                onChange={handleInputChange}
                readOnly
              />
              <span style={{ fontSize: "0.5rem" }}>
                수정페이지에서 수정해주세요
              </span>
            </>
          ) : (
            <input
              type="text"
              name="scheduleJson"
              value={editedClinic.scheduleJson}
              onChange={handleInputChange}
            />
          )}
        </label>
        <button onClick={handleSaveClick}>
          {mode === "add" ? "추가" : "저장"}
        </button>
      </PopupContainer>
    </>
  );
};

export default ClinicPopUp;

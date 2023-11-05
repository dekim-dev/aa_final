import React, { useState } from "react";
import styled from "styled-components";
import { registerAd, updateAd } from "../../service/AdminApiService";
import AdImgUploadBtn from "./AdImgUploadBtn";

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
  img {
    width: 400px;
    height: 80px;
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

const AdPopUp = ({ ad, onClose, mode, onAdd, onEdit }) => {
  const [editedAd, setEditedAd] = useState({ ...ad });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAd({
      ...editedAd,
      [name]: value,
    });
  };

  const handleImageUploaded = (imgUrl) => {
    setEditedAd({
      ...editedAd,
      imgUrl: imgUrl,
    });
  };

  const handleSaveClick = async () => {
    try {
      if (mode === "add") {
        const response = await registerAd(editedAd);
        if (response) {
          onAdd();
        } else {
          console.error("🔴광고 등록 실패");
        }
      } else if (mode === "edit") {
        const response = await updateAd(ad.id, editedAd);
        if (response) {
          onEdit();
        } else {
          console.error("🔴광고 정보 업데이트 실패");
        }
      }
    } catch (error) {
      console.error("🔴광고 등록/업데이트 실패", error);
    }
  };

  return (
    <>
      <PopupOverlay onClick={onClose} />
      <PopupContainer>
        <h2>{mode === "add" ? "광고 추가" : "광고 수정"}</h2>
        <label>
          만료일:
          <input
            type="date"
            name="expiresOn"
            value={editedAd.expiresOn}
            onChange={handleInputChange}
          />
        </label>
        <label>
          광고주:
          <input
            type="text"
            name="advertiser"
            value={editedAd.advertiser}
            onChange={handleInputChange}
          />
        </label>
        <label>
          이미지주소:
          <input
            type="text"
            name="imgUrl"
            value={editedAd.imgUrl}
            onChange={handleInputChange}
          />
        </label>
        <label>
          이미지 업로드:
          <AdImgUploadBtn
            onImageUploaded={handleImageUploaded}
            expiresOn={editedAd.expiresOn}
          />
        </label>
        {editedAd.imgUrl && <img src={editedAd.imgUrl} alt="Uploaded" />}
        <button onClick={handleSaveClick}>
          {mode === "add" ? "추가" : "저장"}
        </button>
      </PopupContainer>
    </>
  );
};
export default AdPopUp;

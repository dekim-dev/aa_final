import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import Resizer from "react-image-file-resizer";
import { styled } from "styled-components";

const ImgContainer = styled.img`
  width: 10rem;
  height: 10rem;
`;

const ImgUploadButton = ({ userId, postId, onImageUploaded }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [downloadedImgUrl, setDownloadedImgUrl] = useState("");

  // 이미지가 변경될 때 호출되는 함수
  const onImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0]; // 업로드할 파일을 가져옴

    if (!file) return; // 파일이 없으면 함수 종료

    const maxWidth = 200;

    // 이미지 리사이징
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxWidth * (file.height / file.width),
      "JPEG", // 리사이즈된 이미지 형식 (JPEG)
      80, // 이미지 품질 (0-100)
      0, // 회전 각도 (0도)
      (uriBlob) => {
        const uri = URL.createObjectURL(uriBlob); // Blob을 Data URL로 변환
        setSelectedImg(uriBlob); // 선택한 이미지를 상태에 설정
        setPreviewImgUrl(uri); // 리사이징된 이미지 URL을 상태에 설정 (미리보기)
      },
      "blob" // Blob 형식으로 리사이징
    );
  };

  // 이미지 업로드 처리 함수
  const handleUpload = () => {
    if (!selectedImg) return; // 선택한 이미지가 없으면 함수 종료

    // 이미지를 Firebase Storage에 업로드하기 위한 참조 만들기
    const storageRef = ref(
      storage,
      `user_pfImg/0${userId}_${
        selectedImg.name
      }_${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getMilliseconds()}`
    );

    // 이미지 업로드 작업
    const uploadTask = uploadBytes(storageRef, selectedImg);

    // 이미지 업로드 작업 완료 후 처리
    uploadTask.then((snapshot) => {
      setSelectedImg(null); // 선택한 이미지 상태 초기화
      // 업로드된 이미지의 다운로드 URL 가져오기
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const baseUrl = downloadURL.split("?alt=media")[0] + "?alt=media"; // token부분 잘라내기
        setDownloadedImgUrl(baseUrl);
        setUploadMessage("업로드가 완료되었습니다!");
        console.log(downloadedImgUrl);
        setPreviewImgUrl("");
        // 이미지 업로드 후 콜백 함수 호출
        onImageUploaded(baseUrl); // 업로드된 이미지의 주소를 콜백 함수로 전달
      });
    });
  };

  return (
    <>
      <input type="file" onChange={onImageChange} />
      {previewImgUrl && <ImgContainer src={previewImgUrl} alt="Preview" />}
      {/* {downloadedImgUrl && (
        <ImgContainer src={downloadedImgUrl} alt="Uploaded" />
      )} */}
      {selectedImg && <button onClick={handleUpload}>Upload</button>}
      {/* {uploadMessage && <p>{uploadMessage}</p>} */}
    </>
  );
};

export default ImgUploadButton;

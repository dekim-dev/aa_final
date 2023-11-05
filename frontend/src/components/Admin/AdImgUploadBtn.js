import { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase";
import Resizer from "react-image-file-resizer";
import { styled } from "styled-components";

const ImgContainer = styled.img`
  width: 400px;
  height: 80px;
`;

const AdImgUploadBtn = ({ onImageUploaded, expiresOn }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [downloadedImgUrl, setDownloadedImgUrl] = useState("");
  const [fileName, setFileName] = useState("");

  const onImageChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];

    if (!file) return;

    setFileName(file.name); // 파일 이름 추출

    Resizer.imageFileResizer(
      file,
      400,
      80,
      "JPEG",
      100,
      0,
      (uriBlob) => {
        const uri = URL.createObjectURL(uriBlob);
        setSelectedImg(uriBlob);
        setPreviewImgUrl(uri);
      },
      "blob"
    );
  };

  const handleUpload = () => {
    if (!selectedImg) return;
    const formattedExpiresOn = expiresOn.replaceAll("-", "");

    console.log(selectedImg);
    const storageRef = ref(
      storage,
      `ad_imgUrl/${fileName}_${formattedExpiresOn}`
    );

    const uploadTask = uploadBytes(storageRef, selectedImg);

    uploadTask.then((snapshot) => {
      setSelectedImg(null);
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        const baseUrl = downloadURL.split("?alt=media")[0] + "?alt=media";
        setDownloadedImgUrl(baseUrl);
        setUploadMessage("업로드가 완료되었습니다!");
        onImageUploaded(baseUrl);
        setPreviewImgUrl("");
      });
    });
  };

  return (
    <>
      <input type="file" onChange={onImageChange} />
      {previewImgUrl && <ImgContainer src={previewImgUrl} alt="Preview" />}
      {selectedImg && <button onClick={handleUpload}>업로드</button>}
    </>
  );
};

export default AdImgUploadBtn;

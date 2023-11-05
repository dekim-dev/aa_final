import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import Resizer from "react-image-file-resizer";

export default function MyEditor({ handleChange, userId, ...props }) {
  const storage = getStorage(); // Firebase Storage 초기화: 아래에서 하면 에러 발생..

  // 파일 업로드를 처리하는 함수
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          loader.file.then((file) => {
            // File 객체를 Blob으로 변환
            const blob = file.slice(0, file.size, file.type);

            // 이미지 리사이징
            const resizeImage = (blob) => {
              return new Promise((resolveResize) => {
                const maxWidthPx = 500;

                Resizer.imageFileResizer(
                  blob,
                  maxWidthPx,
                  maxWidthPx * (file.height / file.width),
                  "JPEG",
                  90,
                  0,
                  (uriBlob) => {
                    console.log("uriBlob: ", uriBlob);
                    resolveResize(uriBlob);
                  },
                  "blob" // Blob 형식으로 리사이징
                );
              });
            };

            // 이미지 리사이징 함수 사용
            resizeImage(blob).then((resizedBlob) => {
              const body = new FormData();
              body.append("file", resizedBlob); // 리사이즈된 이미지를 업로드

              // Firebase Storage에 이미지 업로드를 위한 참조를 생성합니다.
              const storageRef = ref(
                storage,
                `images/0${userId}_${
                  file.name
                }_${new Date().getFullYear()}${new Date().getMonth()}${new Date().getDate()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getMilliseconds()}`
              ); // 이미지에 대한 참조

              // 이미지를 Firebase Storage에 업로드
              uploadBytes(storageRef, resizedBlob) // 파일을 Firebase Storage에 업로드
                .then((snapshot) => {
                  // 업로드된 이미지의 다운로드 URL 가져오기
                  return getDownloadURL(snapshot.ref);
                })
                .then((imageUrl) => {
                  const baseUrl =
                    imageUrl.split("?alt=media")[0] + "?alt=media"; // 토큰 잘라내기
                  resolve({
                    default: baseUrl,
                  });
                })
                .catch((error) => {
                  reject(error);
                });
            });
          });
        });
      },
    };
  }

  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div className="App">
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin],
          toolbar: {
            items: [
              "heading",
              "|",
              "bold",
              "italic",
              "fontSize",
              "blockQuote",
              "|",
              "alignment",
              "|",
              "imageUpload",
              "link",
              "undo",
              "redo",
              "|",
              "fontFamily",
              "highlight",
              "fontColor",
            ],
          },
        }}
        editor={Editor}
        onReady={(editor) => {}}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
        onChange={(event, editor) => {
          handleChange(editor.getData());
        }}
        {...props}
      />
    </div>
  );
}

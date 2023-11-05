import { useContext, useState } from "react";
import { styled } from "styled-components";
import {
  createClinicComment,
  createComment,
} from "../../../service/ApiService";
import { UserNicknameBar, UserPfImgBar } from "../../common/UserNameTag";
import { UserContext } from "../../../context/UserContext";
import useWindowResize from "../../../utils/useWindowResize";

const ParentWrapper = styled.div`
  margin: 1rem auto;
  width: 80%;
  padding: 1rem;
  border: 1px solid #ececec;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  gap: 1rem;
  text-align: center;
  textarea {
    width: 100%;
    padding: 0.4rem;
    border: 1px solid silver;
  }
  .user_info_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
  }
`;

const MobileWrapper = styled.div`
  width: 80%;
  margin: 1rem auto;
  border: 1px solid #ececec;
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  .user_info_wrapper {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }
  textarea {
    width: 90%;
    margin: 0 auto;
    padding: 0.2rem;
    border: 1px solid silver;
  }
  .button_wrapper {
    align-self: flex-end;
  }
`;

const CommentEditor = ({ postId, onCommentAdd, clinicId }) => {
  const { userNickname, userPfImg } = useContext(UserContext);
  const [content, setContent] = useState("");
  const isMobile = useWindowResize();

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    const requestData = {
      content: content,
    };
    try {
      if (postId != null) {
        // 글 수정일 경우 updatePost 함수 호출
        const response = await createComment(requestData, postId);
        console.log("댓글 등록 성공: ", response);
        alert("댓글이 등록되었습니다.");
        setContent("");
        onCommentAdd(response); // 새로운 댓글을 추가하는 콜백 호출
      } else if (clinicId != null) {
        const response = await createClinicComment(requestData, clinicId);
        console.log("댓글 등록 성공: ", response);
        alert("댓글이 등록되었습니다.");
        setContent("");
        onCommentAdd(response); // 새로운 댓글을 추가하는 콜백 호출
      }
    } catch (error) {
      console.error("댓글 등록 실패: ", error);
    }
  };

  return isMobile ? (
    <MobileWrapper>
      <div className="user_info_wrapper">
        <UserPfImgBar userPfImg={userPfImg} />
        <UserNicknameBar userNickname={userNickname} />
      </div>
      <textarea
        type="text"
        placeholder="댓글을 입력하세요"
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <div className="button_wrapper">
        <button onClick={handleSubmit}>등록</button>
      </div>
    </MobileWrapper>
  ) : (
    <ParentWrapper>
      <div className="user_info_wrapper">
        <UserPfImgBar userPfImg={userPfImg} />
        <UserNicknameBar userNickname={userNickname} />
      </div>
      <div>
        <textarea
          type="text"
          placeholder="댓글을 입력하세요"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <div>
        <button onClick={handleSubmit}>등록</button>
      </div>
    </ParentWrapper>
  );
};
export default CommentEditor;

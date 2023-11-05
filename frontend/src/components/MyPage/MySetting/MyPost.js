import { useEffect, useState } from "react";
import { deleteMultiplePosts, getAllPosts } from "../../../service/ApiService";
import BoardTable from "../../Board/BoardTable";
import styled from "styled-components";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
  .button_wrapper {
    width: 90%;
    display: flex;
    justify-content: flex-end; /* 내부 요소를 끝으로 정렬 */
    margin-top: 1rem;
  }
`;

const MyPost = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPostIds, setSelectedPostIds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllPosts(0, 10);
        setUserPosts(response.content);
        console.log(response);
      } catch (err) {
        console.log("회원의 모든 게시글 불러오기 에러: ", err);
      }
    };
    fetchData();
    setSelectedPostIds([]);
  }, []);

  const handleCheckboxChange = (postId) => {
    // 체크박스 선택 상태를 업데이트
    if (selectedPostIds.includes(postId)) {
      setSelectedPostIds(selectedPostIds.filter((id) => id !== postId));
    } else {
      setSelectedPostIds([...selectedPostIds, postId]);
    }
  };

  const handleDeleteSelectedPosts = async () => {
    console.log("🍒selectedPostIds: ", selectedPostIds);
    try {
      const response = await deleteMultiplePosts(selectedPostIds);
      if (response) {
        setSelectedPostIds([]);
        setUserPosts(
          userPosts.filter((post) => !selectedPostIds.includes(post.id))
        );
        console.log("게시글 삭제 성공");
      } else {
        console.log("게시글 삭제 실패");
      }
    } catch (error) {
      console.error("게시글 삭제 오류: ", error);
    }
  };

  return (
    <ParentWrapper>
      <BoardTable
        postList={userPosts}
        showCheckbox={true}
        selectedPostIds={selectedPostIds}
        onCheckboxChange={handleCheckboxChange}
      />
      <div className="button_wrapper">
        <button onClick={handleDeleteSelectedPosts}>삭제</button>
      </div>{" "}
    </ParentWrapper>
  );
};
export default MyPost;

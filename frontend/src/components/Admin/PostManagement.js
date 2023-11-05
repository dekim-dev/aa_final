import { useState, useEffect } from "react";
import styled from "styled-components";
import { allPosts, deletePosts } from "../../service/AdminApiService";
import Pagination from "../common/Pagination";
import { dateFormat } from "../../utils/Functions";
import { Link } from "react-router-dom";

const ParentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  .button_container {
    margin: 1rem auto;
    width: 90%;
    display: flex;
    justify-content: flex-end;
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
  .post_title {
    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const PostManagement = () => {
  const [posts, setPosts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedPostIds, setSelectedPostIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const pageSize = 10;

  const fetchPostPages = async () => {
    try {
      const response = await allPosts(currentPage - 1, pageSize);
      setPosts(response.content);
      setTotalResults(response.totalElements);
      console.log("🟢게시글 리스트: ", response);
    } catch (error) {
      console.log("🔴게시글 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchPostPages();
  }, [currentPage]);

  const toggleAllCheckbox = () => {
    const allIds = posts.map((post) => post.id);
    if (selectAll) {
      setSelectedPostIds([]);
    } else {
      setSelectedPostIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleCheckbox = (postId) => {
    if (selectedPostIds.includes(postId)) {
      setSelectedPostIds(selectedPostIds.filter((id) => id !== postId));
    } else {
      setSelectedPostIds([...selectedPostIds, postId]);
    }
  };

  const handleDeleteBtn = async () => {
    if (selectedPostIds.length === 0) {
      alert("삭제할 게시글을 선택하세요.");
      return;
    }
    const shouldDelete = window.confirm("선택한 게시글을 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        await deletePosts(selectedPostIds);
        console.log("🟢삭제된 게시글번호: ", selectedPostIds);
        setSelectedPostIds([]);
        setSelectAll(false);
        fetchPostPages();
      } catch (error) {
        console.error("🔴게시글 삭제 실패", error);
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
              <th>글번호</th>
              <th>게시판</th>
              <th>말머리</th>
              <th>글제목</th>
              <th>글쓴이</th>
              <th>작성일</th>
              <th>추천수</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(post.id)}
                    checked={selectedPostIds.includes(post.id)}
                  />
                </td>
                <td>{post.id}</td>
                <td>{post.boardCategory}</td>
                <td>{post.topic}</td>
                <td className="post_title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.nickname}</td>
                <td>{dateFormat(post.createdAt)}</td>
                <td> {post.likesCount}</td>
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
          <button onClick={handleDeleteBtn}>게시글 삭제</button>
        </div>
      </ParentContainer>
    </>
  );
};
export default PostManagement;

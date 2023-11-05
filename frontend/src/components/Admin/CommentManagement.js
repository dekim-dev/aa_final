import { useState, useEffect } from "react";
import styled from "styled-components";
import { allComments, deleteComments } from "../../service/AdminApiService";
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
  .comment_content {
    &:hover {
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const CommentManagement = () => {
  const [comments, setComments] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedCommentIds, setSelectedCommentIds] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState();
  const pageSize = 10;

  const fetchCommentPages = async () => {
    try {
      const response = await allComments(currentPage - 1, pageSize);
      setComments(response.content);
      setTotalResults(response.totalElements);
      console.log("🟢댓글 리스트: ", response);
    } catch (error) {
      console.log("🔴댓글 리스트 가져오기 실패", error);
    }
  };

  useEffect(() => {
    fetchCommentPages();
  }, [currentPage]);

  const toggleAllCheckbox = () => {
    const allIds = comments.map((comment) => comment.id);
    if (selectAll) {
      setSelectedCommentIds([]);
    } else {
      setSelectedCommentIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const toggleCheckbox = (commentId) => {
    if (selectedCommentIds.includes(commentId)) {
      setSelectedCommentIds(
        selectedCommentIds.filter((id) => id !== commentId)
      );
    } else {
      setSelectedCommentIds([...selectedCommentIds, commentId]);
    }
  };

  const handleDeleteBtn = async () => {
    if (selectedCommentIds.length === 0) {
      alert("삭제할 댓글을 선택하세요.");
      return;
    }
    const shouldDelete = window.confirm("선택한 댓글을 삭제하시겠습니까?");
    if (shouldDelete) {
      try {
        await deleteComments(selectedCommentIds);
        console.log("🟢삭제된 댓글번호: ", selectedCommentIds);
        setSelectedCommentIds([]);
        setSelectAll(false);
        fetchCommentPages();
      } catch (error) {
        console.error("🔴댓글 삭제 실패", error);
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
              <th>댓글번호</th>
              <th>게시판</th>
              <th>글쓴이</th>
              <th>내용</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => toggleCheckbox(comment.id)}
                    checked={selectedCommentIds.includes(comment.id)}
                  />
                </td>
                <td>{comment.id}</td>
                <td>
                  {comment.clinicId !== null ? "병원" : comment.postBoard}
                </td>
                <td>{comment.nickname}</td>
                <td className="comment_content">
                  {comment.clinicId !== null ? (
                    <Link to={`/clinic/${comment.clinicId}`}>
                      {comment.content}
                    </Link>
                  ) : (
                    <Link to={`/post/${comment.postId}`}>
                      {comment.content}
                    </Link>
                  )}{" "}
                </td>
                <td>{dateFormat(comment.createdAt)}</td>
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
          <button onClick={handleDeleteBtn}>댓글 삭제</button>
        </div>
      </ParentContainer>
    </>
  );
};
export default CommentManagement;

import styled from "styled-components";

const DeleteButton = styled.button`
  margin-left: auto; /* 아이콘을 오른쪽 끝으로 정렬 */
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  &:hover {
    background-color: #ececec;
  }
`;

const ItemDeleteIcon = ({ itemId, handleDelete }) => {
  const handleDeleteClick = () => {
    const confirmDelete = window.confirm("투두아이템을 삭제하시겠습니까?");
    if (confirmDelete) {
      handleDelete(itemId);
    }
  };

  return <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>;
};

export default ItemDeleteIcon;

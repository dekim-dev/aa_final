import { useState } from "react";
import styled from "styled-components";
import { dateFormatWithDash } from "../../../utils/Functions";

const StyledButton = styled.button`
  border: transparent;
  cursor: pointer;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Modal = styled.div`
  border: 2px solid black;
  background-color: white;
  padding: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .new_item {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    input {
      width: 70%;
      margin: 0 auto;
    }
  }

  .button_container {
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .cancel_submit_btn_container {
    padding-top: 1rem;
    border-top: 1px solid #ececec;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  .button_container button.active {
    background-color: black;
    color: white;
  }
`;
const ItemAddIcon = ({ selectedDate, handleAdd }) => {
  const [newItem, setNewItem] = useState({
    itemName: "",
    timeOfDay: "",
    priority: 3,
    createdAt: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewItem({
      itemName: "",
      timeOfDay: "",
      priority: 3,
      createdAt: "",
    });
  };

  const handleSubmitBtn = () => {
    const item = {
      itemName: newItem.itemName,
      timeOfDay: newItem.timeOfDay,
      priority: newItem.priority,
      createdAt: dateFormatWithDash(selectedDate),
    };
    handleAdd(item);
    handleCloseModal();
  };

  return (
    <>
      <StyledButton onClick={handleOpenModal}>
        <h2>추가</h2>
      </StyledButton>
      {isModalOpen && (
        <Overlay>
          <Modal>
            <div className="new_item title">
              <h4>💡새로운 할 일을 입력하세요.</h4>
              <input
                type="text"
                value={newItem.itemName}
                onChange={(e) =>
                  setNewItem({ ...newItem, itemName: e.target.value })
                }
              />
            </div>
            <div className="new_item time_of_day">
              <h4>💡언제 완료해야 하나요?</h4>
              <div className="button_container">
                <button
                  onClick={() =>
                    setNewItem({ ...newItem, timeOfDay: "MORNING" })
                  }
                  className={newItem.timeOfDay === "MORNING" ? "active" : ""}
                >
                  오전
                </button>
                <button
                  onClick={() =>
                    setNewItem({ ...newItem, timeOfDay: "AFTERNOON" })
                  }
                  className={newItem.timeOfDay === "AFTERNOON" ? "active" : ""}
                >
                  오후
                </button>
                <button
                  onClick={() =>
                    setNewItem({ ...newItem, timeOfDay: "EVENING" })
                  }
                  className={newItem.timeOfDay === "EVENING" ? "active" : ""}
                >
                  저녁
                </button>
              </div>
            </div>
            <div className="new_item priority">
              <h4>💡얼마나 중요한가요?</h4>
              <div className="button_container">
                <button
                  onClick={() => setNewItem({ ...newItem, priority: 1 })}
                  className={newItem.priority === 1 ? "active" : ""}
                >
                  매우중요
                </button>
                <button
                  onClick={() => setNewItem({ ...newItem, priority: 2 })}
                  className={newItem.priority === 2 ? "active" : ""}
                >
                  중요
                </button>
                <button
                  onClick={() => setNewItem({ ...newItem, priority: 3 })}
                  className={newItem.priority === 3 ? "active" : ""}
                >
                  보통
                </button>
              </div>
            </div>
            <div className="cancel_submit_btn_container">
              <button onClick={handleCloseModal}>취소</button>
              <button onClick={handleSubmitBtn}>등록</button>
            </div>
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default ItemAddIcon;

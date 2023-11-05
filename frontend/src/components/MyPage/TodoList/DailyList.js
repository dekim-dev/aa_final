import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ItemDeleteIcon from "./ItemDeleteIcon";
import {
  createTodoItem,
  deleteTodoItem,
  updateTodoItemStatus,
} from "../../../service/ApiService";
import ItemAddIcon from "./ItemAddIcon";

const ParentWrapper = styled.div`
  width: ${(props) => props.width || "30rem"};
  height: ${(props) => props.height || "20rem"};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid gray;
  border-radius: 10px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .date {
      margin: 0.4rem auto;
    }
  }

  .todo_item_container {
    display: flex;
    align-items: center;
  }

  .todo_item_title {
    display: flex;
    padding: 0.2rem;
    border-radius: 4px;
  }
  .morning {
    background-color: #fcd19f;
  }
  .afternoon {
    background-color: #ececec;
  }
  .evening {
    background-color: #c3beff;
  }
  .done {
    text-decoration: line-through;
  }

  .todo_item_priority_1 {
    font-size: 0.4rem;
    font-weight: bold;
    margin-left: 0.2rem;
    color: red;
  }
  .todo_item_priority_2 {
    font-size: 0.4rem;
    font-weight: bold;
    margin-left: 0.2rem;
    color: orangeRed;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 20px;
  height: 20px;
`;

const DailyTodoList = ({ selectedDate, dailyTodoItems, width, height }) => {
  const [dailyTodoList, setDailyTodoList] = useState([]);

  useEffect(() => {
    const sortedTodoList = sortTodoList(dailyTodoItems);

    setDailyTodoList(sortedTodoList);
  }, [selectedDate, dailyTodoItems]);

  const handleDelete = async (itemId) => {
    try {
      await deleteTodoItem(itemId);

      // 삭제 후 dailyTodoItems에서 삭제된 아이템 제외하여 새로운 목록 설정
      const updatedTodoList = dailyTodoList.filter(
        (item) => item.id !== itemId
      );
      setDailyTodoList(updatedTodoList);
    } catch (error) {
      console.error("아이템 삭제 에러", error);
    }
  };

  const handleAdd = async (newItem) => {
    try {
      const response = await createTodoItem(newItem);
      const updatedList = [...dailyTodoList, response];
      const sortedList = sortTodoList(updatedList);
      setDailyTodoList(sortedList);
    } catch (error) {
      console.error("아이템 추가 에러:", error);
    }
  };

  const handleUpdateStatus = async (itemId, currentStatus) => {
    try {
      const newStatus = currentStatus === "DONE" ? "NOT_STARTED" : "DONE";
      await updateTodoItemStatus(itemId, newStatus);

      // 상태 변경 후, 변경된 상태로 dailyTodoList 업데이트
      const updatedList = dailyTodoList.map((item) =>
        item.id === itemId ? { ...item, todoItemStatus: newStatus } : item
      );
      setDailyTodoList(updatedList);
    } catch (error) {
      console.error("상태 변경 실패:", error);
    }
  };

  const getTimeOfDay = (timeOfDay) => {
    if (timeOfDay === "MORNING") {
      return "morning";
    } else if (timeOfDay === "AFTERNOON") {
      return "afternoon";
    } else if (timeOfDay === "EVENING") {
      return "evening";
    }
    return "";
  };

  const getPriority = (priority) => {
    if (priority === 1) {
      return "매우중요";
    } else if (priority === 2) {
      return "중요";
    }
    return "";
  };

  const formatDate = (date) => {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = weekdays[date.getDay()]; // 요일을 한글로 변환
    return `${month}/${day} (${dayOfWeek})`;
  };

  return (
    <ParentWrapper width={width} height={height}>
      <div className="header">
        <h2 className="date">{formatDate(selectedDate)}</h2>
        <div className="add_icon">
          <ItemAddIcon selectedDate={selectedDate} handleAdd={handleAdd} />
        </div>
      </div>
      {dailyTodoList.length === 0 ? (
        <p style={{ textAlign: "center", paddingTop: "1rem" }}>
          투두리스트가 없습니다.
        </p>
      ) : (
        dailyTodoList.map((item) => (
          <div className="todo_item_container" key={item.id}>
            <Checkbox
              defaultChecked={item.todoItemStatus === "DONE"}
              type="checkbox"
              onClick={() => handleUpdateStatus(item.id, item.todoItemStatus)}
            />
            <div
              className={`todo_item_title ${getTimeOfDay(item.timeOfDay)} ${
                item.todoItemStatus === "DONE" ? "done" : ""
              }`}
            >
              {item.itemName}
            </div>
            <div className={`todo_item_priority_${item.priority}`}>
              {getPriority(item.priority)}
            </div>
            <ItemDeleteIcon
              className="delete_icon"
              itemId={item.id}
              handleDelete={handleDelete}
            />
          </div>
        ))
      )}
    </ParentWrapper>
  );
};
export default DailyTodoList;

// 정렬
const sortTodoList = (todoList) => {
  const sortedList = [...todoList];

  // 시간대와 우선순위로 정렬
  sortedList.sort((a, b) => {
    // 시간대가 다르면 시간대로 정렬
    const timeOfDayOrder = ["MORNING", "AFTERNOON", "EVENING"];
    const timeOfDayA = a.timeOfDay;
    const timeOfDayB = b.timeOfDay;

    if (
      timeOfDayOrder.indexOf(timeOfDayA) !== -1 &&
      timeOfDayOrder.indexOf(timeOfDayB) !== -1
    ) {
      const timeComparison =
        timeOfDayOrder.indexOf(timeOfDayA) - timeOfDayOrder.indexOf(timeOfDayB);

      if (timeComparison === 0) {
        // 시간대가 같으면 우선순위로 정렬
        return a.priority - b.priority;
      }
      return timeComparison;
    }
    return 0;
  });

  return sortedList;
};

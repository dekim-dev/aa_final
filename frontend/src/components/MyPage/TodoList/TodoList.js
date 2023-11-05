import { styled } from "styled-components";
import StyledCalendar from "../StyledCalendar";
import DailyTodoList from "./DailyList";
import { useEffect, useState } from "react";
import { getTodoItemsByDate } from "../../../service/ApiService";

const ParentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const TodoList = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyTodoItems, setDailyTodoItems] = useState([]); // 상태 추가
  useEffect(() => {
    async function fetchTodaysItems() {
      try {
        const response = await getTodoItemsByDate(selectedDate);
        setDailyTodoItems(response);
        console.log("🟢: ", response);
      } catch (error) {
        console.log("🔴fetch error: ", error);
      }
    }
    fetchTodaysItems();
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <ParentWrapper>
      <DailyTodoList
        selectedDate={selectedDate}
        dailyTodoItems={dailyTodoItems}
      />
      <StyledCalendar onDateSelect={handleDateSelect} />
    </ParentWrapper>
  );
};
export default TodoList;

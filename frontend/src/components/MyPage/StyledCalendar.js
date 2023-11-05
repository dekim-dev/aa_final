import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const ParentWrapper = styled.div`
  .react-calendar {
    width: 26rem;
    height: 20rem;
    background-color: #fff;
    border-radius: 8px;
    /* box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2); */
    padding: 0.2rem;
  }
  .react-calendar__navigation button {
    background: none;
    font-size: 1rem;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
    border-radius: 8px;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #ff7c52;
    border-radius: 6px;
    font-weight: bold;
  }
  .react-calendar__tile--now {
    background: #fec262;
    border-radius: 6px;
    font-weight: bold;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #ff7c52;
    border-radius: 6px;
    font-weight: bold;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #ff7c52;
  }
  .react-calendar__tile--active {
    background: #ff7c52;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  @media screen and (max-width: 768px) {
    width: 90%;
  }
`;

const StyledCalendar = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onDateSelect(date); // 선택한 날짜를 부모 컴포넌트로 전달
  };

  return (
    <ParentWrapper>
      <Calendar onChange={handleDateChange} value={selectedDate} />
    </ParentWrapper>
  );
};

export default StyledCalendar;

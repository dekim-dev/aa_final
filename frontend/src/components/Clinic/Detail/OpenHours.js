import styled from "styled-components";

const ParentContainer = styled.div`
  border-top: 1px solid #ececec;
  padding: 0.6rem;
  div {
    line-height: 1.4rem;
  }
`;

const timeFormat = (timeString) => {
  if (!timeString) {
    return " ";
  }
  const hours = timeString.substring(0, 2);
  const minutes = timeString.substring(2, 4);
  return `${hours}:${minutes}`;
};

const OpenHours = ({ schedule }) => {
  const scheduleArray = JSON.parse(schedule); // 문자열을 배열로 변환

  const daysInKorean = [
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
    "일요일",
    "공휴일",
  ];

  return (
    <ParentContainer>
      {scheduleArray.map((time, index) => (
        <div key={index}>
          <p>
            {daysInKorean[time.dayOfWeek - 1]} {timeFormat(time.startTime)} ~{" "}
            {timeFormat(time.endTime)}
          </p>
        </div>
      ))}
    </ParentContainer>
  );
};
export default OpenHours;

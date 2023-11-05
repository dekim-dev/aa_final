export const dateFormat = (inputDate) => {
  // Date 객체 생성
  const date = new Date(inputDate);

  // 년, 월, 일 추출
  const year = String(date.getFullYear()).slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // 월과 일을 두 자리 문자열로 변환
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDay = String(day).padStart(2, "0");

  const formattedDate = `${year}/${formattedMonth}/${formattedDay}`;
  return formattedDate;
};

export const dateFormatWithKoreanDay = (inputDate) => {
  // Date 객체 생성
  const givenDate = new Date(inputDate);

  // 년, 월, 일 추출
  const year = String(givenDate.getFullYear()).slice(-2);
  const month = givenDate.getMonth() + 1;
  const date = givenDate.getDate();

  // 요일을 한글로 변환
  const daysOfWeek = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const day = daysOfWeek[givenDate.getDay()];

  // 월과 일을 두 자리 문자열로 변환
  const formattedMonth = String(month).padStart(2, "0");
  const formattedDate = String(date).padStart(2, "0");

  const formattedDateWithDay = `${year}. ${formattedMonth}. ${formattedDate}. ${day}`;
  return formattedDateWithDay;
};

/** 📆todoItem용 Date객체 문자열로 변환 */
export const dateFormatWithDash = (selectedDate) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const day = selectedDate.getDate();
  const dateString = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  console.log("📆: ", dateString);

  return dateString;
};

export const dateFormatWithTime = (dateString) => {
  // Date 객체 생성
  const date = new Date(dateString);

  // 원하는 날짜 형식으로 포맷팅
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 해주고 2자리로 포맷팅
  const day = String(date.getDate()).padStart(2, "0"); // 일자를 2자리로 포맷팅
  const hours = String(date.getHours()).padStart(2, "0"); // 시를 2자리로 포맷팅
  const minutes = String(date.getMinutes()).padStart(2, "0"); // 분을 2자리로 포맷팅

  // 최종 포맷된 날짜 문자열
  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;

  return formattedDate;
};

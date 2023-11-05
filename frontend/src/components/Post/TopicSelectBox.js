const FreeBoardTopics = ({ onChange, selectedTopic }) => {
  return (
    <>
      <select onChange={onChange} value={selectedTopic}>
        <option defaultChecked value={""}>
          말머리 선택
        </option>
        <option value="experience">경험</option>
        <option value="daily">일상</option>
        <option value="thoughts">생각</option>
        <option value="treatment">진료</option>
      </select>
    </>
  );
};

const QnABoardTopics = ({ onChange, selectedTopic }) => {
  return (
    <>
      <select onChange={onChange} value={selectedTopic}>
        <option defaultChecked value={""}>
          말머리 선택
        </option>
        <option value="ADHD">ADHD</option>
        <option value="study">공부</option>
        <option value="work">직장</option>
        <option value="etc">etc.</option>
      </select>
    </>
  );
};

export { FreeBoardTopics, QnABoardTopics };

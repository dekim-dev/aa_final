import { useState } from "react";
import styled from "styled-components";
import OpenHours from "./OpenHours";

const ParentContainer = styled.div`
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  .toggle_schedule {
    cursor: pointer;
    &:hover {
      background-color: #ececec;
    }
  }
`;

const RotatableArrow = styled.span`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.rotate ? "rotate(180deg)" : "rotate(0deg)")};
  display: inline-block;
`;

const ClinicInfo = ({ clinicInfo, schedule }) => {
  const [toggleSchedule, setToggleSchedule] = useState(false);

  const handleClickSchedule = () => {
    setToggleSchedule(!toggleSchedule);
  };

  return (
    <>
      {clinicInfo ? (
        <ParentContainer className="inside">
          <p>상호 : {clinicInfo.name}</p>
          <p>설명 : {clinicInfo.info}</p>
          <p>주소 : {clinicInfo.address}</p>
          <p>전화번호 : {clinicInfo.tel}</p>
          <p
            className="toggle_schedule"
            onClick={handleClickSchedule}
            rotate={toggleSchedule.toString()}
          >
            진료시간보기 <RotatableArrow>🕰️</RotatableArrow>
          </p>
          {toggleSchedule && <OpenHours schedule={schedule} />}
        </ParentContainer>
      ) : (
        <p>병원 정보를 불러오는 중입니다 🏥</p>
      )}
    </>
  );
};

export default ClinicInfo;

import { Link } from "react-router-dom";
import styled from "styled-components";

const MobileWrapper = styled.div`
  margin: 0 auto;
  width: 90%;
  .col {
    //❗️ col로 map 전체 width 잡기
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .map_container {
    padding: 1rem;
    border-bottom: 1px solid black;
    line-height: 1.4rem;
    cursor: pointer;

    &:first-child {
      border-top: 1px solid black;
      padding-top: 1rem;
    }
    .clinic_name {
      font-size: 1rem;
      font-weight: bold;
    }
    .clinic_addr {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.9rem;
    }
  }
`;

const MobileClinicTable = ({ clinicList }) => {
  return (
    <>
      <MobileWrapper>
        <div className="col">
          {clinicList.map((clinic) => (
            <Link
              className="map_container"
              to={`/clinic/${clinic.id}`}
              key={clinic.id}
            >
              <p className="clinic_name">{clinic.name}</p>
              <p className="clinic_addr">{clinic.address}</p>
            </Link>
          ))}
        </div>
      </MobileWrapper>
    </>
  );
};

export default MobileClinicTable;

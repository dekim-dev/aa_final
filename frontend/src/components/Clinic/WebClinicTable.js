import { Link } from "react-router-dom";
import { styled } from "styled-components";

const ParentWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  text-align: left;
  thead {
    border-top: 1px solid #000;
  }
  tbody tr:hover {
    background-color: #ececec;
  }
  th,
  td {
    border-bottom: 1px solid grey;
    padding: 1rem 0.6rem 1rem 0.6rem;
  }
  .clinic_name,
  .clinic_addr,
  .clinic_tel {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .clinic_name {
    width: 18rem;
    max-width: 18rem;
    font-weight: 500;
    &:hover {
      font-weight: bold;
      text-decoration: underline;
      text-underline-position: under;
    }
  }
  .clinic_addr {
    width: 40rem;
    max-width: 40rem;
  }
  .clinic_tel {
    width: 10rem;
  }
  .commentsCount_wrapper {
    font-size: 0.8rem;
    font-weight: 600;
  }
`;

const WebClinicTable = ({ clinicList }) => {
  return (
    <ParentWrapper>
      <p
        style={{
          fontSize: "0.9rem",
          fontWeight: "600",
          marginBottom: "0.2rem",
        }}
      >
        회원 추천이 있는 병원에는 '✨'이모티콘이 표시됩니다.
      </p>
      <StyledTable>
        <thead>
          <tr>
            <th>병원이름</th>
            <th>주소</th>
            <th>전화번호</th>
          </tr>
        </thead>
        <tbody>
          {clinicList.map((clinic) => (
            <tr key={clinic.id}>
              <td className="clinic_name">
                {clinic.recommendCount >= 1 && "✨"}
                <Link to={`/clinic/${clinic.id}`}>{clinic.name}</Link>
                {"\u00A0\u00A0"}
                <span className="commentsCount_wrapper">
                  [{clinic.commentDTOs.length}]
                </span>
              </td>
              <td className="clinic_addr">{clinic.address}</td>
              <td className="clinic_tel">{clinic.tel}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </ParentWrapper>
  );
};

export default WebClinicTable;
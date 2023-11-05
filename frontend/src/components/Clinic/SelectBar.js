import React, { useState } from "react";
import { styled } from "styled-components";
import { getClinicListByAddress } from "../../service/ApiService";

const ParentWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const regions = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원특별자치도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];
const SelectBar = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [clinicList, setClinicList] = useState([]);
  const handleChangeOption = async (e) => {
    const selectedValue = e.target.value;
    setSelectedRegion(selectedValue);

    if (selectedValue) {
      const response = await getClinicListByAddress(selectedValue, 0, 10);
      setClinicList(response);
      console.log(response);
    }
  };

  return (
    <ParentWrapper>
      <select value={selectedRegion} onChange={handleChangeOption}>
        <option value={""}>지역</option>
        {regions.map((region, index) => (
          <option key={index} value={region}>
            {region}
          </option>
        ))}
      </select>
    </ParentWrapper>
  );
};
export default SelectBar;

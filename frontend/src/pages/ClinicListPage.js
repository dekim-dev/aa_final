import React from "react";
import ClinicTable from "../components/Clinic/ClinicTable";
import useWindowResize from "../utils/useWindowResize";

const ClinicListPage = () => {
  const isMobile = useWindowResize();

  return (
    <>
      <ClinicTable isMobile={isMobile} />
    </>
  );
};

export default ClinicListPage;

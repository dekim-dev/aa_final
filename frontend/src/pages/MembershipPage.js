import { Route, Routes } from "react-router-dom";
import Success from "../components/KakaoPay/Success";
import ReadyOrDes from "../components/KakaoPay/ReadyOrDes";
import Fail from "../components/KakaoPay/Fail";
import Cancel from "../components/KakaoPay/Cancel";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import PaidMember from "../components/KakaoPay/PaidMember";

const MembershipPage = () => {
  const { isPaidMember } = useContext(UserContext);

  return (
    <>
      <Routes>
        {isPaidMember === "PAID" ? (
          <Route index path="/" element={<PaidMember />} />
        ) : (
          <Route index path="/" element={<ReadyOrDes />} />
        )}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
    </>
  );
};
export default MembershipPage;

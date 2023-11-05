import { Route, Routes } from "react-router-dom";
import Success from "../components/KakaoPay/Success";
import ReadyOrDes from "../components/KakaoPay/ReadyOrDes";
import Fail from "../components/KakaoPay/Fail";
import Cancel from "../components/KakaoPay/Cancel";

const MembershipPage = () => {
  return (
    <>
      <h1>멤버십페이지</h1>
      <br />
      <Routes>
        <Route index path="/" element={<ReadyOrDes />} />
        <Route path="/success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
        <Route path="/fail" element={<Fail />} />
      </Routes>
    </>
  );
};
export default MembershipPage;

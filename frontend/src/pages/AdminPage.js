import { Route, Routes } from "react-router-dom";
import AdminNav from "../components/Admin/AdminNav";
import UserManagement from "../components/Admin/UserManagement";
import styled from "styled-components";
import ClinicManagement from "../components/Admin/ClinicManagement";
import AdManagement from "../components/Admin/AdManagement";
import PostManagement from "../components/Admin/PostManagement";
import CommentManagement from "../components/Admin/CommentManagement";
import ReportManagement from "../components/Admin/ReportManagement";
import InquiryManagement from "../components/Admin/InquiryManagement";

const ParentWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const AdminPage = () => {
  return (
    <ParentWrapper>
      <AdminNav />
      <Routes>
        <Route path="/" element={<UserManagement />} />
        <Route path="/clinic" element={<ClinicManagement />} />
        <Route path="/ad" element={<AdManagement />} />
        <Route path="/post" element={<PostManagement />} />
        <Route path="/comment" element={<CommentManagement />} />
        <Route path="/report" element={<ReportManagement />} />
        <Route path="/inquiry" element={<InquiryManagement />} />
      </Routes>
    </ParentWrapper>
  );
};
export default AdminPage;

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const { authority } = useContext(UserContext);

  return authority === "ROLE_ADMIN" ? (
    children
  ) : (
    <>
      {alert("접근할 수 없는 페이지 입니다.")}
      <Navigate to="/" state={{ from: location }} replace />
    </>
  );
};

export default AdminRoute;
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("ACCESS_TOKEN");

  return token ? (
    children
  ) : (
    <>
      {alert("로그인이 필요합니다.")}
      <Navigate to="/signin" state={{ from: location }} replace />
    </>
  );
};

export default UserRoute;
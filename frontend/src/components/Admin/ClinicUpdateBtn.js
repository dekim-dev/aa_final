import {
  getClinicInfoFromApi,
  getClinicInfoFromApiForAdmin,
} from "../../service/AdminApiService";

const ClinicUpdateBtn = () => {
  const fetchClinicInfoFromApi = async () => {
    try {
      const response = await getClinicInfoFromApi();
      console.log("🟢병원api 성공", response);
      alert("병원리스트가 업데이트 되었습니다.");
    } catch (error) {
      console.log("🔴병원api 에러", error);
      alert("병원리스트 업데이트중 에러가 발생했습니다.");
    }
  };

  const fetchClinicInfoForAdmin = async () => {
    try {
      const response = await getClinicInfoFromApiForAdmin();
      console.log("🟢병원api 성공", response);
      alert("병원리스트가 업데이트 되었습니다.");
    } catch (error) {
      console.log("🔴병원api 에러", error);
      alert("병원리스트 업데이트중 에러가 발생했습니다.");
    }
  };

  return (
    <>
      <button onClick={fetchClinicInfoFromApi}>db매니저용버튼</button>
      <button onClick={fetchClinicInfoForAdmin}>관리자용 버튼</button>
    </>
  );
};
export default ClinicUpdateBtn;
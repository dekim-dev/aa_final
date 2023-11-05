import { useContext, useEffect, useState } from "react";
import {
  deleteUser,
  getUserInfoForUpdate,
  updateUserNickname,
  updateUserPfImg,
  updateUserPwd,
} from "../../../service/ApiService";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ImgUploadButton from "../../common/ImgUploadButton";
import { UserContext } from "../../../context/UserContext";
import InputField from "../../common/TextField";

const ParentWrapper = styled.div`
  width: 100%;
  .user_info_wrapper {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    width: 40%;
    @media screen and (max-width: 768px) {
      width: 90%;
    }
  }
  img {
    width: 10rem;
    height: 10rem;
    border-radius: 20px;
  }
  .button_wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  .divider_wrapper {
    width: 100%;
    align-self: flex-start;
    font-size: 1rem;
    background-color: #ececec;
    padding: 0.4rem;
    margin-top: 1rem;
  }
  .withdraw_button {
    margin-bottom: 1rem;
  }
`;

const MyInfoSetting = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const { setUserPfImg } = useContext(UserContext);

  const [newNickname, setNewNickname] = useState("");
  const [nicknameHelperText, setNicknameHelperText] = useState("");
  const [isNewNicknameValid, setIsNewNicknameValid] = useState(false);

  const [newPwd, setNewPwd] = useState("");
  const [newPwdHelperText, setNewPwdHelperText] = useState("");
  const [isNewPwdValid, setIsNewPwdValid] = useState(false);

  const [conNewPwd, setConNewPwd] = useState("");
  const [conNewPwdHelperText, setConNewPwdHelperText] = useState("");
  const [isConNewPwdValid, setIsConNewPwdValid] = useState(false);

  const handleChangeNickname = (e) => {
    const newNicknameValue = e.target.value;
    setNewNickname(newNicknameValue);

    const nicknameRegex = /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{2,10}$/;

    if (nicknameRegex.test(newNicknameValue)) {
      // 정규식 확인
      setNicknameHelperText("사용 가능한 닉네임입니다.");
      setIsNewNicknameValid(true);
      // 닉네임 중복 확인
    } else {
      setNicknameHelperText(
        "닉네임은 2~10자의 영문, 숫자, 한글로 이루어져야 합니다."
      );
      setIsNewNicknameValid(false);
    }
  };

  const handleChangeNewPwd = (e) => {
    setNewPwd(e.target.value);
    const pwdRegex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (pwdRegex.test(e.target.value)) {
      setNewPwdHelperText("올바른 형식입니다.");
      setIsNewPwdValid(true);
    } else {
      setNewPwdHelperText(
        "숫자+영문자+특수문자 조합으로 8자리 이상 입력해 주세요."
      );
      setIsNewPwdValid(false);
    }
  };
  const handleChangeConNewPwd = (e) => {
    setConNewPwd(e.target.value);
    if (newPwd === e.target.value) {
      setConNewPwdHelperText("비밀번호가 일치합니다.");
      setIsConNewPwdValid(true);
    } else {
      setConNewPwdHelperText("비밀번호가 일치하지 않습니다.");
      setIsConNewPwdValid(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserInfoForUpdate();
        setUserInfo(response);
        setNewNickname(response.nickname);
        console.log(response);
      } catch (err) {
        console.log("🔴회원 정보 불러오기 에러 : ", err);
      }
    };
    fetchData();
  }, []);

  const handleUpdateNickname = async () => {
    if (!isNewNicknameValid) {
      alert("닉네임이 유효하지 않습니다.");
      return;
    }
    const requestData = { newNickname: newNickname };
    try {
      if (!newNickname) {
        alert("닉네임을 입력하세요");
      } else {
        const response = await updateUserNickname(requestData);
        alert("닉네임이 변경되었습니다.");
        // 닉네임 업데이트 성공 시 새로운 닉네임으로 상태 업데이트
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          nickname: newNickname,
        }));
        console.log("🟢닉네임 업데이트 성공: ", response);
      }
    } catch (error) {
      setNicknameHelperText(error.data);
      alert(error.data);
      console.error("🔴닉네임 업데이트 오류: ", error);
    }
  };

  const handleUpdatePwd = async () => {
    if (!newPwd || !conNewPwd) {
      alert("비밀번호를 입력하세요.");
    } else if (!isNewPwdValid || !isConNewPwdValid) {
      alert("비밀번호를 확인해주세요.");
    } else {
      const requestData = { newPwd: newPwd, conNewPwd: conNewPwd };
      try {
        const response = await updateUserPwd(requestData);
        alert("비밀번호가 변경되었습니다.");
        setNewPwdHelperText("");
        setConNewPwdHelperText("");
        console.log("🟢비밀번호 업데이트 성공: ", response);
      } catch (error) {
        console.error("🔴비밀번호 업데이트 오류: ", error);
      }
    }
  };

  const handleUpdatePfImg = async (pfImgUrl) => {
    const requestData = { newPfImg: pfImgUrl };
    try {
      // 사용자 프로필 이미지 업데이트 요청
      const response = await updateUserPfImg(requestData);
      if (response) {
        console.log("🟢프로필 이미지 업데이트 성공");
        // 프로필 이미지 URL을 상태로 설정
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          pfImg: pfImgUrl,
        }));
        setUserPfImg(pfImgUrl);
      }
    } catch (error) {
      console.error("🔴프로필 이미지 업데이트 오류: ", error);
    }
  };

  const handleClickWithdrawBtn = async () => {
    const confirmation = window.confirm("정말로 회원탈퇴 하시겠습니까?");
    if (confirmation) {
      try {
        const response = await deleteUser();
        if (response) {
          localStorage.clear();
          navigate("/", { replace: true });
          window.location.reload();
          alert("회원탈퇴가 완료되었습니다.");
          console.log("회원탈퇴 성공");
        } else {
          console.log("회원탈퇴 실패");
        }
      } catch (error) {
        console.error("회원탈퇴 오류: ", error);
      }
    } else {
      console.log("회원탈퇴가 취소되었습니다.");
    }
  };

  return (
    <ParentWrapper>
      <div className="user_info_wrapper">
        <div className="divider_wrapper">프로필 사진 변경</div>
        <img src={userInfo.pfImg} alt="user_pfImg" />
        <ImgUploadButton
          userId={userInfo.id}
          onImageUploaded={handleUpdatePfImg}
        />
        <div className="divider_wrapper">닉네임 변경</div>
        <InputField
          type={"text"}
          name="nickname"
          label={"닉네임"}
          value={newNickname}
          onChange={handleChangeNickname}
          helperText={nicknameHelperText}
          width="100%"
          isValid={isNewNicknameValid}
        />
        <div className="button_wrapper">
          <button onClick={handleUpdateNickname}>닉네임 변경</button>
        </div>
        <div className="divider_wrapper">비밀번호 변경</div>
        <InputField
          type={"password"}
          name="newPwd"
          label={"새로운 비밀번호"}
          value={newPwd}
          placeholder={"변경할 비밀번호를 입력하세요."}
          onChange={handleChangeNewPwd}
          helperText={newPwdHelperText}
          width="100%"
          isValid={isNewPwdValid}
        />
        <InputField
          type={"password"}
          name="conNewPwd"
          label={"비밀번호 확인"}
          value={conNewPwd}
          placeholder={"비밀번호를 한번 더 입력하세요."}
          onChange={handleChangeConNewPwd}
          helperText={conNewPwdHelperText}
          width="100%"
          isValid={isConNewPwdValid}
        />
        <div className="button_wrapper">
          <button onClick={handleUpdatePwd}>비밀번호 변경</button>
        </div>
        <div className="divider_wrapper">이메일 변경</div>
        <InputField
          readOnly
          value={userInfo.email}
          helperText={"이메일 변경은 관리자에게 문의해주세요."}
          width="100%"
        />
        <div className="divider_wrapper"> </div>{" "}
        <div className="button_wrapper">
          <button className="withdraw_button" onClick={handleClickWithdrawBtn}>
            회원 탈퇴
          </button>
        </div>
      </div>
    </ParentWrapper>
  );
};
export default MyInfoSetting;

import styled from "styled-components";
import { readyPay } from "../../service/ApiService";
import kakaoPayIcon from "../../assets/images/kakao_pay_icon.png";
import logotext1 from "../../assets/images/LogoText1.svg";
import logotext2 from "../../assets/images/LogoText2.svg";

const ParentWrapper = styled.div`
  width: 70%;
  height: 50vh;
  border: 1px solid #eeeeee;
  border-radius: 12px;
  margin: 5rem auto;
  padding: 1rem;
  font-size: 1.4rem;
  letter-spacing: 2px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  h3 {
    width: 100%;
    border-bottom: 1px solid #ececec;
    padding-bottom: 0.6rem;
    align-self: flex-start;
  }
  p {
    display: flex;
    align-items: center;
  }
  .kakao_pay_wrapper {
    img {
      cursor: pointer;
    }
    align-self: center;
  }
  .logo_text_wrapper {
    display: inline-flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    padding: 1rem;
    .logo_1 {
      width: 15rem;
    }
    .logo_2 {
      width: 12rem;
    }
  }
  @media screen and (max-width: 768px) {
    width: 90%;
    .desc_wrapper {
      width: 100%;
    }
    .logo_text_wrapper {
      padding: 0.2rem;
    }
    p {
      display: flexbox;
      flex-direction: column;
      align-items: center;
      font-size: 1rem;
      gap: 0.6rem;
    }
  }
`;

const ReadyOrDes = () => {
  const handlePaymentClick = async () => {
    try {
      const response = await readyPay();
      console.log("🟢결제 준비 성공: ", response);
      let a = document.createElement("a");
      a.href = response.next_redirect_pc_url;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log("🔴결제 준비 실패: ", error);
    }
  };

  return (
    <ParentWrapper>
      <h3>멤버십 결제</h3>
      <div className="desc_wrapper">
        <p>
          👉🏻 ₩4,500으로 광고없는
          <div className="logo_text_wrapper">
            <img className="logo_1" src={logotext1} alt="logotext1" />
            <img className="logo_2" src={logotext2} alt="logotext2" />
          </div>
          을 이용하세요!
        </p>
        <br />
        <p>
          ❗️ 테스트 결제이며,
          <span style={{ fontWeight: "bold", color: "red" }}>
            실제 결제는 이루어지지 않습니다
          </span>
        </p>
      </div>
      <div className="kakao_pay_wrapper">
        <img src={kakaoPayIcon} alt="kpay" onClick={handlePaymentClick} />
      </div>
    </ParentWrapper>
  );
};
export default ReadyOrDes;

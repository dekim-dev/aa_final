import { readyPay } from "../../service/ApiService";

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
    <>
      <h3>카카오 페이 결제</h3>
      <button onClick={handlePaymentClick}>결제하기</button>
    </>
  );
};
export default ReadyOrDes;

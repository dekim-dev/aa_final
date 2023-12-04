import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowDown from "../assets/images/chevron-down.svg";
import ArrowUp from "../assets/images/chevron-up.svg";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 0 auto;
  width: 96%;
`;

const CheckBoxLabel = styled.p`
  font-size: 0.9rem;
  justify-self: flex-end;
  font-weight: 400;
`;

const AgreementTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AgreementContent = styled.div`
  height: 150px;
  font-size: 0.8rem;
  line-height: 1rem;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  overflow-y: scroll;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 10px;
  h1 {
    font-weight: bold;
    font-size: 1rem;
  }
  .term_title {
    font-weight: bold;
  }
  ol {
    list-style-type: decimal;
    margin-left: 10px;
  }
  ul {
    margin-left: 10px;
  }
  .ul_square {
    list-style-type: square;
  }
  .ul_disc {
    list-style-type: disc;
  }
`;

const Icon = styled.div`
  cursor: pointer;
  align-self: center;
  margin-right: 6px;
`;

const JoinAgreements = ({ onAgreementChange }) => {
  const [isAllAgreementOpen, setIsAllAgreementOpen] = useState(false);
  const [isAgreement1Open, setAgreement1Open] = useState(false);
  const [isAgreement2Open, setAgreement2Open] = useState(false);
  const [checkItems, setCheckItems] = useState([]);

  const toggleAllAgreement = () => {
    setIsAllAgreementOpen(!isAllAgreementOpen);
  };

  const toggleAgreement1 = () => {
    setAgreement1Open(!isAgreement1Open);
  };

  const toggleAgreement2 = () => {
    setAgreement2Open(!isAgreement2Open);
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((e) => e !== id));
    }
    // 체크박스 상태 변경 후 콜백 호출
    onAgreementChange(checkItems);
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckItems(["chk1", "chk2"]);
    } else {
      setCheckItems([]);
    }
    // 체크박스 상태 변경 후 콜백 호출
    onAgreementChange(checkItems);
  };

  useEffect(() => {
    onAgreementChange(checkItems);
  }, [checkItems, onAgreementChange]);

  return (
    <ParentWrapper>
      <AgreementTitleWrapper>
        <span style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
          <input
            type="checkbox"
            checked={checkItems.length === 2 ? true : false}
            onChange={(e) => handleAllCheck(e.target.checked)}
          />
          <CheckBoxLabel>약관 전체 동의</CheckBoxLabel>
        </span>
        <Icon onClick={toggleAllAgreement}>
          {isAllAgreementOpen ? (
            <img src={ArrowDown} alt="down" />
          ) : (
            <img src={ArrowUp} alt="down" />
          )}
        </Icon>
      </AgreementTitleWrapper>
      {isAllAgreementOpen && (
        <>
          <AgreementTitleWrapper>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <input
                type="checkbox"
                onChange={(e) => handleSingleCheck(e.target.checked, "chk1")}
                checked={checkItems.includes("chk1") ? true : false}
              />
              <CheckBoxLabel>이용약관 동의(필수)</CheckBoxLabel>
            </span>
            <Icon onClick={toggleAgreement1}>
              {isAgreement1Open ? (
                <img src={ArrowDown} alt="down" />
              ) : (
                <img src={ArrowUp} alt="down" />
              )}
            </Icon>
          </AgreementTitleWrapper>
          {isAgreement1Open && (
            <AgreementContent>
              <h1>이용 약관</h1>
              <div className="term 1">
                <p className="term_title">제1조 (목적)</p>
                <ul className="ul_square">
                  <li>
                    이 약관은, Appropriate Attention(이하 "회사”)가 제공하는
                    서비스('http://이하 “서비스”)를 이용하고자 하는 이용자(이하
                    "회원")간의 권리와 의무 및 기타 제반사항을 명확히 하는 것을
                    목적으로 합니다.
                  </li>
                </ul>
              </div>
              <div className="term 2">
                <p className="term_title">제2조 (용어의 정의)</p>
                <ul className="ul_square">
                  <li>
                    본 약관에서 사용하는 용어의 정의는 다음과 같습니다.
                    <br />
                    <ol>
                      <li>
                        “서비스”란 이용자가 회사의 서비스를 이용할 수 있도록
                        "회사"가 제공하는 회원의 일상등에 대한 공유를 위한 웹/앱
                        플랫폼 서비스 일체를 의미합니다.
                      </li>
                      <li>
                        "회원"이란 "회사"의 서비스에 가입하여 고유번호를 부여
                        받은 후 이를 이용하는 사람을 의미합니다.
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
              <div className="term 3">
                <p className="term_title">제3조 (약관의 효력)</p>
                <ol>
                  <li>
                    회사는 본 약관을 "회사" 서비스 화면에 게시하여, 서비스를
                    이용하고자 하는 "회원"이 본 약관을 확인할 수 있도록 하여야
                    합니다.
                  </li>
                  <li>
                    본 약관에 의해 "서비스"를 이용하고자 하는 자는 이 약관의
                    내용을 숙지하고 "회원"과 "회사"간의 권리, 의무관계에 대해
                    동의함을 확인합니다.
                  </li>
                  <li>
                    "회사"는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서
                    이 약관을 개정할 수 있으며, 이 경우 개정 내용과 적용 일자를
                    명시하여 "회사" 서비스를 통해 그 적용일자 7일 전부터
                    적용일자 전일까지 공지합니다. 다만 변경 내용이 "회원"에게
                    불리한 변경의 경우, 개정약관의 적용일자 30일 전부터
                    적용일자까지 공지합니다.
                  </li>
                  <li>
                    "회원"이 개정약관에 동의하지 않는 경우 개정 약관의 적용일
                    이전에 거부 의사를 표시하고 이 약관에 대한 동의를 해지할 수
                    있습니다.
                  </li>
                  <li>
                    "회사"가 본 조 3항에 따라 개정약관을 공지하면서 "회원"에게
                    적용일 전까지 의사표시를 하지 않으면 의사 표시가 표명된
                    것으로 본다는 뜻을 명확하게 공지하였음에도 "회원"이
                    명시적으로 거부 의사를 표명하지 아니한 경우 개정약관에
                    동의한 것으로 봅니다.
                  </li>
                </ol>
              </div>
              <div className="term 4">
                <p className="term_title">제4조 (이 약관의 성립)</p>
                <ol>
                  <li>
                    이 약관은 "서비스"를 이용하고자하는 자가 이 약관에 동의하고
                    "회사"가 정한 절차에 따라 "서비스" 이용 신청을 하며, 이에
                    대해 "회사"가 승낙함으로써 성립합니다. "회사"는 이용승낙의
                    의사표시를 해당 서비스 화면에 게시하거나 전자우편 또는 기타
                    방법으로 할 수 있습니다.
                  </li>
                  <li>
                    이 "회사"의 "서비스" 이용은 14세 이상 부터 가능합니다.
                  </li>
                </ol>
              </div>
              <div className="term 5">
                <p className="term_title">제5조 (정보 제공 및 광고의 게재)</p>
                <ol>
                  <li>
                    "회원"은 "서비스" 이용 시 서비스 화면 상 노출되는 광고
                    게재에 대해 동의합니다.
                  </li>
                  <li>
                    "회원"이 "서비스"상에 개제되어 있는 광고를 이용할 경우, 이는
                    전적으로 "회원"과 광고주 간의 법률관계이므로, 그로인해
                    발생한 "회원"과 광고주간 분쟁 들 제반 문제는 "회원"과
                    광고주간에 직접 해결하여야 하며, 이와 관련하여 "회사"는
                    어떠한 책임도 지지 않습니다.
                  </li>
                </ol>
              </div>
              <div className="term 6">
                <p className="term_title">제6조 (비밀유지의무)</p>
                <ol>
                  <li>
                    이 약관과 관련하여 상대방으로부터 제공받은 모든 정보는 다음
                    각 호 어느 하나에 해당하는 경우를 제외하고는 비밀로 하고, 이
                    약관상의 권리 또는 의무를 이행하기 위한 목적 이외에 이를
                    사용하거나 제3자에게 제공할 수 없습니다.
                    <ul className="ul_disc">
                      <li>당사자들이 공개하기로 합의한 사항</li>
                      <li>공지된 정보</li>
                      <li>
                        정보를 제공받은 당사자가 제3자로부터 이미 적법하게
                        취득한 정보
                      </li>
                      <li>
                        법률에 특별한 규정이 있거나 법령을 준수하기 위하여
                        불가피하게 정보를 제공하여야 하는 경우
                      </li>
                    </ul>
                  </li>
                  <li>
                    본 조의 비밀유지의무는 이 약관이 이행되지 않거나 해지 기타
                    사유로 종료된 경우에도 그 때로부터 2년간 유효합니다.
                  </li>
                </ol>
              </div>
              <div className="term 7">
                <p className="term_title">제7조 (회원 탈퇴 및 자격 상실 등)</p>
                <ol>
                  <li>
                    "회원"은 "회사"에 언제든지 탈퇴를 요청할 수 있으며 "회사"는
                    즉시 회원탈퇴를 처리하며 해당 "회원"의 작성글을 포함한 모든
                    정보를 영구삭제 합니다.
                  </li>
                </ol>
              </div>
              <div className="term 8">
                <p className="term_title">제8조 (면책)</p>
                <ol>
                  <li>
                    "회사"는 "회원"들 사이의 정보 공유를 위한 시스템만을 제공할
                    뿐, 해당 정보 또는 정보 이용에 대한 분쟁이 발생한 경우, 그
                    분쟁의 결과로 인한 책임은 "회원"이 부담합니다. 제3자가
                    "회사"를 상대로 민/형사상 등의 문제를 제기하는 경우 "회원"은
                    문제의 해결을 위하여 필요한 정보를 제공하는 등 적극
                    협조하여야 하며, 이와 관련하여 "회사"에 손해 또는 비용이
                    발생하는 경우 이를 배상 또는 보상합니다.
                  </li>
                  <li>
                    "회사"는 적법한 권리자의 요구가 있거나, 컴퓨터 등
                    정보통신설비의 보수, 점검, 교체 및 고장, 통신의 두절 등의
                    사유가 발생한 경우 "회사"의 "서비스" 제공을 일시적으로
                    중단할 수 있으며, 이와 관련하여 "회사"는 고의 또는 중대한
                    과실이 없는 한 책임을 부담하지 않습니다.
                  </li>
                </ol>
              </div>
              <div className="term 9">
                <p className="term_title">제9조 (약관 개정)</p>
                <ol>
                  <li>
                    약관 변경시 "회사"는 "서비스"를 통해 공지하며, 공지일로부터
                    7일 후 적용됩니다. "회원"이 변경되는 약관 내용에 대해 이의가
                    있는 경우 7일 이내에 제기할 수 있으며, "회사"가 약관 변경을
                    명확하게 알리거나 통지하였음에도 불구하고 7일 이내에
                    "회원"이 거부 의사를 명시적으로 나타내지 않는 경우에는,
                    "회원"은 약관의 개정에 동의하는 것으로 간주됩니다.
                  </li>
                </ol>
              </div>
              <div className="term 10">
                <p className="term_title">제10조 (분쟁의 해결)</p>
                <ol>
                  <li>
                    이 약관으로 인하여 또는 이 약관과 관련하여 분쟁이 발생하는
                    경우 당사자들은 일차적으로 협의를 통한 원만한 해결을
                    도모합니다.
                  </li>
                  <li>
                    제1항에 의한 협의가 이루어지지 않는 경우 이 약관으로 인하여
                    또는 이 약관과 관련하여 발생하는 모든 분쟁의 해결은
                    서울중앙지방법원을 제1심의 합의관할로 하는 소송에 의합니다.
                  </li>
                </ol>
              </div>
              ■ 적용 일자 : 2023년 11월 25일
              <br />
            </AgreementContent>
          )}
          <AgreementTitleWrapper>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <input
                type="checkbox"
                onChange={(e) => handleSingleCheck(e.target.checked, "chk2")}
                checked={checkItems.includes("chk2") ? true : false}
              />{" "}
              <CheckBoxLabel>개인정보 수집 및 이용동의(필수)</CheckBoxLabel>{" "}
            </span>
            <Icon onClick={toggleAgreement2}>
              {isAgreement2Open ? (
                <img src={ArrowDown} alt="down" />
              ) : (
                <img src={ArrowUp} alt="down" />
              )}
            </Icon>
          </AgreementTitleWrapper>
          {isAgreement2Open && (
            <AgreementContent>
              <h1>개인정보처리방침</h1>
              <p>
                Appropriate Attention ('http://'이하 "회사") 은(는)
                개인정보보호법에 따라 정보주체의 개인정보를 보호하고 이와 관련한
                고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과
                같이 개인정보 처리방침을 수립·공개합니다.
              </p>
              <p>■ 이 개인정보처리방침은 2023년 11월 25일 부터 적용됩니다.</p>
              <div className="term 1">
                <p className="term_title">제1조(개인정보의 처리 목적)</p>
                <ul className="ul_square">
                  <li>
                    "회사" 은(는) 다음의 목적을 위하여 개인정보를 처리합니다.
                    처리하고 있는 개인정보는 다음의 목적 이외의 용도로는
                    이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보
                    보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를
                    이행할 예정입니다.
                    <ol>
                      <li>
                        홈페이지 회원가입 및 관리
                        <br />
                        회원 가입의사 확인, 회원제 서비스 제공에 따른 본인
                        식별·인증, 회원자격 유지·관리, 서비스 부정이용 방지,
                        각종 고지·통지 목적으로 개인정보를 처리합니다.
                        <br />
                      </li>
                      <li>
                        재화 또는 서비스 제공
                        <br />
                        서비스 제공, 콘텐츠 제공을 목적으로 개인정보를
                        처리합니다.
                        <br />
                      </li>
                      <li>
                        마케팅 및 광고에의 활용
                        <br />
                        광고성 정보 제공, 서비스의 유효성 확인 등을 목적으로
                        개인정보를 처리합니다.
                        <br />
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
              <div className="term 2">
                <p className="term_title">
                  제2조(개인정보의 처리 및 보유 기간)
                </p>
                <ul className="ul_square">
                  <li>
                    "회사"은(는) 법령에 따른 개인정보 보유·이용기간 또는
                    정보주체로부터 개인정보를 수집 시에 동의받은 개인정보
                    보유·이용기간 내에서 개인정보를 처리·보유합니다.
                  </li>
                  <li>
                    각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
                    <ol>
                      <li>
                        홈페이지 회원가입 및 관리
                        <br />
                        홈페이지 회원가입 및 관리와 관련한 개인정보는
                        수집.이용에 관한 동의일로부터{" "}
                        <span style={{ fontWeight: "bold" }}>탈퇴 시</span> 까지
                        위 이용목적을 위하여 보유.이용됩니다.
                        <ul className="ul_disc">
                          <li>보유근거 : 이용약관</li>
                          <li>관련법령 : </li>
                          <li>예외사유 : </li>
                        </ul>
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
              <div className="term 3">
                <p className="term_title">제3조(처리하는 개인정보의 항목)</p>
                <ul className="ul_square">
                  <li>
                    "회사"은(는) 다음의 개인정보 항목을 처리하고 있습니다.
                  </li>
                  <ol>
                    <li>
                      홈페이지 회원가입 및 관리
                      <br />
                      필수항목 : 이메일, 비밀번호, 닉네임
                      <br />
                    </li>
                  </ol>
                </ul>
              </div>
              <div className="term 4">
                <p className="term_title">
                  제4조(개인정보의 파기절차 및 파기방법)
                </p>
                <ul className="ul_square">
                  <li>
                    "회사"은(는) 개인정보 보유기간의 경과, 처리목적 달성 등
                    개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를
                    파기합니다.
                  </li>
                  <li>
                    정보주체로부터 동의받은 개인정보 보유기간이 경과하거나
                    처리목적이 달성되었음에도 불구하고 다른 법령에 따라
                    개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를
                    별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여
                    보존합니다.
                  </li>
                  <li>
                    개인정보 파기의 절차 및 방법은 다음과 같습니다.
                    <ol>
                      <li>
                        파기절차
                        <br />
                        "회사"은(는) 파기 사유가 발생한 개인정보를 선정하고,
                        "회사"의 개인정보 보호책임자의 승인을 받아 개인정보를
                        파기합니다.
                        <br />
                      </li>
                      <li>
                        파기방법
                        <br />
                        전자적 파일 형태의 정보는 기록을 재생할 수 없는 기술적
                        방법을 사용합니다.
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
              <div className="term 5">
                <p className="term_title">
                  제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한
                  사항)
                </p>
                <ol>
                  <li>
                    정보주체는 "회사"에 대해 언제든지 개인정보
                    열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
                  </li>
                  <li>
                    제1항에 따른 권리 행사는 "회사"에 대해 「개인정보 보호법」
                    시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을
                    통하여 하실 수 있으며 "회사"은(는) 이에 대해 지체 없이
                    조치하겠습니다.
                  </li>
                  <li>
                    제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을
                    받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우
                    “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호
                    서식에 따른 위임장을 제출하셔야 합니다.
                  </li>
                  <li>
                    개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조
                    제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수
                    있습니다.
                  </li>
                  <li>
                    개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가
                    수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수
                    없습니다.
                  </li>
                  <li>
                    "회사"은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의
                    요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나
                    정당한 대리인인지를 확인합니다.
                  </li>
                </ol>
              </div>
              <div className="term 6">
                <p className="term_title">
                  제6조(개인정보의 안전성 확보조치에 관한 사항)
                </p>
                <ul className="ul_square">
                  <li>
                    "회사"은(는) 개인정보의 안전성 확보를 위해 다음과 같은
                    조치를 취하고 있습니다.
                    <ol>
                      <li>
                        정기적인 자체 감사 실시
                        <br />
                        개인정보 취급 관련 안정성 확보를 위해 정기적(분기
                        1회)으로 자체 감사를 실시하고 있습니다.
                      </li>
                      <li>
                        개인정보 취급 직원의 최소화 및 교육
                        <br />
                        개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜
                        최소화 하여 개인정보를 관리하는 대책을 시행하고
                        있습니다.
                      </li>
                      <li>
                        내부관리계획의 수립 및 시행
                        <br />
                        개인정보의 안전한 처리를 위하여 내부관리계획을 수립하고
                        시행하고 있습니다.
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
              <div className="term 7">
                <p className="term_title">
                  제7조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그
                  거부에 관한 사항)
                </p>
                <ul className="ul_square">
                  <li>
                    "회사"은(는) 정보주체의 이용정보를 저장하고 수시로 불러오는
                    ‘쿠키(cookie)’를 사용하지 않습니다.
                  </li>
                </ul>
              </div>
              <div className="term 8">
                <p className="term_title">
                  제8조(행태정보의 수집·이용·제공 및 거부 등에 관한 사항)
                </p>
                <ul className="ul_square">
                  <li>
                    행태정보의 수집·이용·제공 및 거부등에 관한 사항
                    <br />
                    "회사"은(는) 온라인 맞춤형 광고 등을 위한 행태정보를
                    수집·이용·제공하지 않습니다.
                  </li>
                </ul>
              </div>
              <div className="term 9">
                <p className="term_title">
                  제9조 (개인정보 보호책임자에 관한 사항)
                </p>
                <ol>
                  <li>
                    "회사"은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고,
                    개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을
                    위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
                    <br />
                    <ul className="ul_disc">
                      <li>
                        개인정보 보호책임자
                        <br />
                        성명 :김다은
                        <br />
                        직책 :<br />
                        직급 :<br />
                        연락처: dekim0712@naver.com
                        <br />※ 개인정보 보호 담당부서로 연결됩니다.
                      </li>
                    </ul>
                  </li>
                </ol>
              </div>
              <div className="term 10">
                <p className="term_title">
                  제10조(정보주체의 권익침해에 대한 구제방법)
                </p>
                <ul className="ul_square">
                  <li>
                    정보주체는 개인정보침해로 인한 구제를 받기 위하여
                    개인정보분쟁조정위원회, 한국인터넷진흥원
                    개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수
                    있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는
                    아래의 기관에 문의하시기 바랍니다.
                    <br />
                    <ol>
                      <li>
                        개인정보분쟁조정위원회 : (국번없이) 1833-6972
                        ([www.kopico.go.kr](http://www.kopico.go.kr/))
                      </li>
                      <li>
                        개인정보침해신고센터 : (국번없이) 118
                        ([privacy.kisa.or.kr](http://privacy.kisa.or.kr/))
                      </li>
                      <li>
                        대검찰청 : (국번없이) 1301
                        ([www.spo.go.kr](http://www.spo.go.kr/))
                      </li>
                      <li>
                        경찰청 : (국번없이) 182
                        ([ecrm.cyber.go.kr](http://ecrm.cyber.go.kr/))
                        <br />
                        「개인정보보호법」제35조(개인정보의 열람),
                        제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지
                        등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한
                        처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은
                        자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수
                        있습니다.
                        <br />※ 행정심판에 대해 자세한 사항은
                        중앙행정심판위원회([www.simpan.go.kr](http://www.simpan.go.kr/))
                        홈페이지를 참고하시기 바랍니다.
                      </li>
                    </ol>
                  </li>
                </ul>
              </div>
              <div className="term 11">
                <p className="term_title">제11조(개인정보 처리방침 변경)</p>
                <p>■ 이 개인정보처리방침은 2023년 11월 25일 부터 적용됩니다.</p>
              </div>
            </AgreementContent>
          )}
        </>
      )}
    </ParentWrapper>
  );
};
export default JoinAgreements;
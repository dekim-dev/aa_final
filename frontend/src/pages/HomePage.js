import React, { useContext, useEffect, useState } from "react";
import DateNotice from "../components/Home/DateNotice";
import ImgUploadButton from "../components/common/ImgUploadButton";
import LoginForm from "../components/LoginForm";
import styled from "styled-components";
import { UserContext } from "../context/UserContext";
import DailyTodoList from "../components/MyPage/TodoList/DailyList";
import { getTodoItemsByDate } from "../service/ApiService";
import Quote from "../components/Home/Quote";
import PostContainer from "../components/Home/PostContainer";
import { NoticeForPaidMember, NoticeForUnpaidMember,} from "../components/Home/MembershipNotice";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  .date_notice_row {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .date_quote_wrapper {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }
  .login_wrapper {
    width: 22rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1px solid #cccccc;
    padding: 1rem;
    background-color: white;
  }
  @media screen and (max-width: 768px) {
    .date_notice_row {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      gap: 1rem;
    }
    .login_wrapper {
      width: 90%;
    }
    .date_quote_wrapper {
      width: 90%;
    }
  }
`;

const HomePage = () => {
  const { isLogin, isPaidMember, userNickname } = useContext(UserContext);

  const [dailyTodoItems, setDailyTodoItems] = useState([]); // 상태 추가
  useEffect(() => {
    async function fetchTodaysItems() {
      try {
        const response = await getTodoItemsByDate(new Date());
        setDailyTodoItems(response);
        console.log("🟢: ", response);
      } catch (error) {
        console.log("🔴fetch error: ", error);
      }
    }
    fetchTodaysItems();
  }, []);

  return (
    <ParentWrapper>
      <div className="date_notice_row">
        <div className="date_quote_wrapper">
          <DateNotice />
          <Quote />
        </div>
        {isLogin ? (
           <>
              <div className="login_wrapper">
                <DailyTodoList
                  selectedDate={new Date()}
                  dailyTodoItems={dailyTodoItems}
                  width={"20rem"}
                  height={"18rem"}
                />
                {isPaidMember === "PAID" ? (
                  <NoticeForPaidMember nickname={userNickname} />
                ) : (
                  <NoticeForUnpaidMember />
                )}
              </div>
           </>
        ) : (
          <div className="login_wrapper">
            <LoginForm />
          </div>
        )}
      </div>
      <PostContainer />
    </ParentWrapper>
  );
};

export default HomePage;

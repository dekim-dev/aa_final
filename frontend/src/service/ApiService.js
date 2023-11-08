import axios from "axios";
//import { API_BASE_URL } from "../app-config";
import { dateFormatWithDash } from "../utils/Functions";

/** ✨api사용을 위한 call 함수 */
export const call = async (api, method, request) => {
  let token = localStorage.getItem("ACCESS_TOKEN");

//  if (!token) {
//    // 토큰이 없을 경우 로그인 필요
//    alert("로그인이 필요합니다.");
//    throw new Error("로그인이 필요합니다.");
//  }

  const config = {
    method: method,
//    url: API_BASE_URL + api,
    url: api,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
    data: request,
  };

  try {
    const response = await axios(config);
    return response.data;
    // return {
    //   data: response.data,
    //   status: response.status,
    // };
  } catch (error) {
    // 토큰 만료 또는 유효하지 않은 경우
    if (error.response && error.response.status === 401) {
      console.log("401에러 : ", error);
      try {
        // refreshToken 호출하여 새로운 액세스 토큰 발급
        const newAccessToken = await refreshToken();

        // 새로운 액세스 토큰으로 요청 재시도
        const newConfig = {
          ...config,
          headers: {
            ...config.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        const response = await axios(newConfig);
        return response.data;
      } catch (refreshError) {
        throw refreshError;
      }
    }

    // 다른 에러 처리
    return Promise.reject(error.response);
  }
};

// 회원가입
export const signup = async (request) => {
  try {
    const response = await axios.post("/auth/signup", request); // 토큰 없이 요청 보내기
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

// 닉네임 중복 확인
export const dupNickname = async (nickname) => {
  try {
    const response = await axios.get("/auth/nickname", {
      params: { nickname: nickname },
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// 이메일 중복 확인
export const dupEmail = async (email) => {
  try {
    const response = await axios.get("/auth/email", {
      params: { email: email },
    });
    return response;
  } catch (error) {
    return error.response.data;
  }
};

// 비밀번호 재발급
export const issueTempPwd = async (email) => {
  try {
    const response = await axios.get(`/auth/password/${email}`);
    console.log(response);
    return response;
  } catch (error) {
    return error.response.data;
  }
};
// 로그인
export const signin = async (request) => {
  try {
    const response = await axios.post("/auth/login", request);
    const token = response.data.accessToken; // 서버 응답에서 토큰 추출
    localStorage.setItem("ACCESS_TOKEN", `${token}`); // 토큰 저장
    localStorage.setItem("REFRESH_TOKEN", `${response.data.refreshToken}`);
    console.log("📌accessToken: " + token);
    console.log("📌refreshToken: " + response.data.refreshToken);
    console.log("✔ 로그인 완료");
    return response;
  } catch (error) {
    return error;
  }
};

// 로그아웃
export const logout = async (requestBody) => {
  try {
    // 로그아웃 API 엔드포인트 호출
    await axios.post("/auth/logout", requestBody);
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
    throw error;
  }
};

// 프론트엔드에서의 OPTIONS 요청에 대한 처리
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      error.config.method === "options"
    ) {
      // OPTIONS 요청에 대한 응답 처리
      return Promise.resolve(error.response);
    }
    return Promise.reject(error);
  }
);

// 리프레시 토큰을 사용하여 새로운 액세스 토큰 발급
export const refreshToken = async () => {
  try {
    const response = await axios.post("/auth/reissue", {
      refreshToken: localStorage.getItem("REFRESH_TOKEN"),
      accessToken: localStorage.getItem("ACCESS_TOKEN"),
    });
    const newAccessToken = response.data.accessToken; // 새로운 액세스 토큰
    console.log("✨newAccessToken: " + newAccessToken);

    // 새로운 액세스 토큰을 로컬 스토리지에 저장
    localStorage.setItem("ACCESS_TOKEN", newAccessToken);

    return newAccessToken;
  } catch (error) {
    throw error;
  }
};

// 번호로 게시글 가져오기
export const post = async (postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/post/${postId}`, "GET", null, token);
    return response;
  } catch (error) {
    return error;
  }
};

// 글쓰기
export const createPost = async (requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    console.log("글쓰기 토큰: ", token);
    const response = await call(`/post`, "POST", requestData, token);
    console.log("글쓰기 반환: ", response);
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 리스트
export const getClinicList = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/list?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 키워드로 검색
export const getClinicListByKeyword = async (keyword, page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/search?keyword=${keyword}&page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 디테일 정보
export const getClinicInfoById = async (id) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/clinics/${id}`, "GET", null, token);
    return response;
  } catch (error) {
    return error;
  }
};

// 병원 주소로 검색
export const getClinicListByAddress = async (address, page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/searchAddress?address=${address}&page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// Todo 아이템 생성
export const createTodoItem = async (todoItemDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/todo-item", "POST", todoItemDTO, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 날짜에 해당하는 Todo 아이템 목록 조회
export const getTodoItemsByDate = async (date) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/todo-item/items?date=${dateFormatWithDash(date)}`,
      "GET",
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// Todo 아이템 삭제
export const deleteTodoItem = async (itemId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/todo-item/${itemId}`, "DELETE", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// Todo 아이템 상태 업데이트
export const updateTodoItemStatus = async (itemId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/todo-item/${itemId}`, "PUT", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 게시판별로 글 불러오기
export const getPostsByBoardCategory = async (
  page,
  pageSize,
  boardCategory
) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/category/${boardCategory}?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 생성
export const createDiary = async (diary) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/diary", "POST", diary, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 조회
export const getDiaryList = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/diary?page=${page}&pageSize=${pageSize}`,
      "GET",
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 최신순으로 3개 조회
export const getThreeLatestDiaryList = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/diary/latest", "GET", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 id로 조회
export const getDiaryById = async (diaryId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/diary/${diaryId}`, "GET", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 id로 삭제
export const deleDiaryById = async (diaryId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/diary/${diaryId}`, "DELETE", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// MedList 개별 삭제
export const deleteMedListById = async (diaryId, medId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/diary/${diaryId}/${medId}`, "DELETE", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 id로 수정
export const updateDiaryById = async (diaryId, requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/diary/${diaryId}`, "PUT", requestData, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 다이어리 다중 삭제
export const deleteMultipleDiaries = async (diaryIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/diary/diary`, "DELETE", diaryIds, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 정보 조회 (UserContext저장용)
export const getUserInfo = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/main/userInfo", "GET", token);
    return response;
  } catch (error) {
    throw error;
  }
};
//export const getUserInfo = async () => {
//  try {
//    const response = await axios.get("/main/userInfo");
//    return response;
//    console.log(response)
//  } catch (error) {
//  console.log(error)
//    throw error;
//  }
//};

// 글 수정
export const updatePost = async (requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/post/edit`, "PUT", requestData, token);
    console.log("글수정 성공: ", response);
    return response;
  } catch (error) {
    console.log("글수정 실패: ", error);
    return error;
  }
};

// 글 삭제
export const deletePost = async (postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/delete?postId=${postId}`,
      "DELETE",
      token
    );
    console.log("글삭제 성공: ", response);
    return response;
  } catch (error) {
    console.log("글삭제 실패: ", error);
    return error;
  }
};

// 조회수 증가
export const increaseViewCount = async (postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/view-count?postId=${postId}`,
      "PUT",
      token
    );
    console.log("조회수 증가 성공: ", response);
    return response;
  } catch (error) {
    console.log("조회수 증가 실패: ", error);
    return error;
  }
};

// 좋아요 클릭
export const createDeleteLikes = async (likesDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/likes`, "POST", likesDTO, token);
    console.log("좋아요 api 성공: ", response);
    return response;
  } catch (error) {
    console.log("좋아요 api 실패: ", error);
    return error;
  }
};

// 게시글 신고
export const reportPost = async (postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/user/post/${postId}/report`,
      "PUT",
      null,
      token
    );
    console.log("게시글 신고/취소 성공: ", response);
    return response;
  } catch (error) {
    console.log("게시글 신고/취소 실패: ", error);
    return error;
  }
};

//댓글 작성
export const createComment = async (requestData, postId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/${postId}/comment`,
      "POST",
      requestData,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

//댓글 수정
export const updateComment = async (commentId, requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/${commentId}/comment`,
      "PUT",
      requestData,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

//댓글 삭제
export const deleteComment = async (commentId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/post/${commentId}/comment`, "DELETE", token);
    return response;
  } catch (error) {
    return error;
  }
};

// 클리닉 댓글 작성
export const createClinicComment = async (requestData, clinicId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/${clinicId}/comment`,
      "POST",
      requestData,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 클리닉 댓글 수정
export const updateClinicComment = async (commentId, requestData) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/${commentId}/comment`,
      "PUT",
      requestData,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 클리닉 댓글 삭제
export const deleteClinicComment = async (commentId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/${commentId}/comment`,
      "DELETE",
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 클리닉 추천 클릭
export const createDeleteRecommend = async (clinicId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/clinics/recommendation/${clinicId}`,
      "POST",
      token
    );
    console.log("병원추천 api 성공: ", response);
    return response;
  } catch (error) {
    console.log("병원추천 api 실패: ", error);
    return error;
  }
};

// 회원의 모든 게시글 조회
export const getAllPosts = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/user/posts?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원의 게시글 삭제
export const deleteMultiplePosts = async (postIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/posts`, "DELETE", postIds, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원의 모든 댓글 조회
export const getAllComments = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/user/comments?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원의 댓글 삭제
export const deleteMultipleComments = async (commentIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/comments`, "DELETE", commentIds, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 정보 (수정용)
export const getUserInfoForUpdate = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/info`, "GET", null, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 닉네임 수정
export const updateUserNickname = async (requestBody) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/nickname`, "PUT", requestBody, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 비밀번호 수정
export const updateUserPwd = async (requestBody) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/password`, "PUT", requestBody, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 프로필사진 수정
export const updateUserPfImg = async (requestBody) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/pfImg`, "PUT", requestBody, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 탈퇴
export const deleteUser = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/delete`, "DELETE", null, token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 게시글 키워드로 검색
export const searchByKeyword = async (
  keyword,
  boardCategory,
  page,
  pageSize
) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/post/search?keyword=${keyword}&boardCategory=${boardCategory}&page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 광고 조회
export const getAds = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/main/ads", "GET", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 카카오페이 결제 요청
export const readyPay = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/payment/ready", "POST", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 카카오페이 승인 요청
export const successPay = async (pgToken) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/payment/success?pg_token=${pgToken}`,
      "GET",
      token
    );
    return response;
  } catch (error) {
    throw error;
  }
};

// 베스트게시판용 게시글
export const getPopularPosts = async () => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call("/post/popular", "GET", token);
    return response;
  } catch (error) {
    throw error;
  }
};

// 회원 차단
export const blockAUser = async (userId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/block/${userId}`, "POST", token);
    return response;
  } catch (error) {
    return error;
  }
};

// 회원 차단
export const unblockAUser = async (userId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/user/block/${userId}`, "DELETE", token);
    return response;
  } catch (error) {
    return error;
  }
};

// 회원 신고
export const reportUser = async (reportRequestDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/user/report`,
      "POST",
      reportRequestDTO,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// ✨ 메인
export const getLatestPosts = async (boardCategory) => {
  try {
    const response = await axios.get(
      `/main/post/${boardCategory}`
    );
    return response;
  } catch (error) {
    return error;
  }
};

// 공지사항 게시글 (토큰 필요 X)
export const noticePost = async (postId) => {
  try {
    const response = await axios.get(`/main/notice/${postId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 공지사항 게시글리스트 (토큰 필요 X)
export const noticePostList = async () => {
  try {
    const response = await axios.get(`/main/board/notice`);
  return response.data;
  } catch (error) {
    return error.response.data;
  }
}


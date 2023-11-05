import { call } from "./ApiService";

// ✨ 회원 관리

export const allUserInfo = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/users?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateUserInfo = async (userInfoAllDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/users`, "PUT", userInfoAllDTO, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteMultipleUsers = async (userIdList) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/users`, "DELETE", userIdList, token);
    return response;
  } catch (error) {
    return error;
  }
};

// ✨ 병원 관리

export const registerClinic = async (clinicDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/clinic`, "POST", clinicDTO, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateClinicInfo = async (clinicId, clinicDTO) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/clinic/${clinicId}`,
      "PUT",
      clinicDTO,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteMultipleClinics = async (clinicIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/clinic`, "DELETE", clinicIds, token);
    return response;
  } catch (error) {
    return error;
  }
};

// ✨ 광고 관리

export const allAds = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/advertisement?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const registerAd = async (newAd) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/advertisement`, "POST", newAd, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateAd = async (adId, updatedAd) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/advertisement/${adId}`,
      "PATCH",
      updatedAd,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteMultipleAds = async (adIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/advertisement`, "DELETE", adIds, token);
    return response;
  } catch (error) {
    return error;
  }
};

// ✨ 게시글 관리

export const allPosts = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/post?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deletePosts = async (postIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/post`, "DELETE", postIds, token);
    return response;
  } catch (error) {
    return error;
  }
};

// ✨ 댓글 관리

export const allComments = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/comment?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteComments = async (commentIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/comment`, "DELETE", commentIds, token);
    return response;
  } catch (error) {
    return error;
  }
};

// ✨ 신고 관리
export const allReports = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/report?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteReports = async (reportIds) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(`/admin/report`, "DELETE", reportIds, token);
    return response;
  } catch (error) {
    return error;
  }
};

export const updateReportStatus = async (reportId) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/report/${reportId}`,
      "PATCH",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

// ✨ 문의 관리
export const allInquiries = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/inquiry?page=${page}&pageSize=${pageSize}`,
      "GET",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const updateInquiryStatus = async (inquiryID) => {
  try {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const response = await call(
      `/admin/inquiry/${inquiryID}`,
      "PATCH",
      null,
      token
    );
    return response;
  } catch (error) {
    return error;
  }
};

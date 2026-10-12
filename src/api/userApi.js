// src/api/userApi.js
import axiosInstance from "./axios";

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/profile/view");
  return data.user;
};

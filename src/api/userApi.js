// src/api/userApi.js
import axiosInstance from "./axios";

export const getCurrentUser = async () => {
  const { data } = await axiosInstance.get("/profile/view");
  return data.user;
};

export const updatePassword = async (userPassword) => {
  const resp = await axiosInstance.patch("/profile/updatePassword", userPassword)
  return resp.data
}
export const updateProfile = async (data)=>{
  const resp = await axiosInstance.patch("/profile/update",data)
  return resp.data;
}

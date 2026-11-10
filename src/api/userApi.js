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
export const updateProfile = async (data) => {
  const resp = await axiosInstance.patch("/profile/update", data)
  return resp.data;
}


export const verifyEmail = async ({ token }) => {
  const response = await axiosInstance.post(
    "/auth/verify-email",
    { token }
  );

  return response.data;
};

export const resendVerificationEmail = async ({ emailId }) => {
  const response = await axiosInstance.post(
    "/auth/resend-verification",
    { emailId }
  );

  return response.data;
};


export const forgotPassword = async ({ emailId }) => {
  const response = await axiosInstance.post(
    "/auth/forgot-password",
    { emailId }
  );

  return response.data;
};

export const verifyResetOtp = async ({ emailId, otp }) => {
  const response = await axiosInstance.post(
    "/auth/verify-reset-otp",
    { emailId, otp }
  );

  return response.data;
};

export const resetPassword = async ({
  emailId,
  resetToken,
  newPassword,
}) => {
  const response = await axiosInstance.post(
    "/auth/reset-password",
    { emailId, resetToken, newPassword }
  );

  return response.data;
};

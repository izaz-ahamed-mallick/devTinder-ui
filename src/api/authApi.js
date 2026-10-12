import axiosInstance from "./axios"


export const loginUser = async (credential) => {
  const { data } = await axiosInstance.post("/login", credential)
  return data
}

export const signupUser = async (userData) => {
  const { data } = await axiosInstance.post("/signup", userData);
  return data;
};


export const logOutUser = async () => {
  const { data } = await axiosInstance.post("/logout")
  return data.message
}

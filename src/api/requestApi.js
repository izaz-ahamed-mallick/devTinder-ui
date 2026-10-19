import axiosInstance from "./axios"

export const getAllRequestData = async () => {
  const resp = await axiosInstance.get("/user/request/getAllRequest")
  return resp.data
}

export const updatePendingRequest = async (userInfo) => {
  const { status, toUserId } = userInfo
  const resp = await axiosInstance.patch(`/connectionRequest/${status}/${toUserId}`)
  return resp.data
}

export const getAllRejectedRequest = async () => {
  const resp = await axiosInstance.get("/user/request/rejectedUser")
  return resp.data?.data
}

export const getAcceptedConnection = async () => {
  const resp = await axiosInstance.get(`/user/request/acceptedConnection`)
  console.log(resp)
  return resp.data.data
}



export const getFeedConnection = async (currentIndex) => {
  const resp = await axiosInstance.get(`/user/feed?skip=${currentIndex}&limit=${5}`)
  console.log(resp)
  return resp.data.data
}


export const updateFeedConnection = async (currentUser) => {
  const {status,toUserId}=currentUser
  const resp = await axiosInstance.post(`/connectionRequest/${status}/${toUserId}`)
  return resp.data.data
}

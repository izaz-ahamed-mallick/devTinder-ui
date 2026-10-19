import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAcceptedConnection, getAllRejectedRequest, getAllRequestData, getFeedConnection, updateFeedConnection, updatePendingRequest } from "../api/requestApi"
import { data } from "autoprefixer"
import { toast } from "sonner"


export const usePendingRequest = () => {
  return useQuery({
    queryKey: ["pendingRequest"],
    queryFn: getAllRequestData
  })
}

export const useRejectedRequest = () => {
  return useQuery({
    queryKey: ["rejectedRequest"],
    queryFn: getAllRejectedRequest
  })
}



export const useUpdateRequest = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePendingRequest,
    onSuccess: (data) => {
      toast.success(data.message || "Connection request is updated successfully`")
      queryClient.invalidateQueries({ queryKey: ["pendingRequest"] })
    },
    onError: (data) => {
      toast.success(data.message || "Something went wrong!!`")
    }
  })
}



export const useAcceptedConnections = () => {
  return useQuery({
    queryKey: ["acceptedRequestconnection"],
    queryFn: getAcceptedConnection,
  })
}

export const useFeedConnectionRequest = (page) => {
  return useQuery({
    queryKey: ["feedConnection", page],
    queryFn: () => getFeedConnection(page),
    staleTime: 0,
  });
};

export const useSendConnectionRequest = () => {
  return useMutation({

    mutationFn: updateFeedConnection,
  })
}


import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginUser, logOutUser } from "../api/authApi";
import { toast } from "sonner";



export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      toast.success(data.message || "Login successful!");
      navigate("/feed", { replace: true });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Login failed. Please try again.",
      );
    },
  });
};


export const useLogOut = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logOutUser,

    onSuccess: (data) => {
      // Clear all cached queries and mutations
      queryClient.clear();

      toast.success(data.message || "Logout successful!");

      navigate("/login", { replace: true });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Logout failed. Please try again."
      );
    },
  });
};

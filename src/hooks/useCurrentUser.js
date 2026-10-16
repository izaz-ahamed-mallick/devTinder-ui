// src/hooks/useCurrentUser.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser, updateProfile } from "../api/userApi";
import { toast } from "sonner";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,

    onSuccess: async (response) => {
      toast.success(response.message || "Profile updated successfully!");

      await queryClient.invalidateQueries({
        queryKey: ["currentUser"],
      });
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
          "Profile update failed. Please try again."
      );
    },
  });
};

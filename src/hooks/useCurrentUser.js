// src/hooks/useCurrentUser.js
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/userApi";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

import { useMutation } from "@tanstack/react-query"
import { signupUser } from "../api/authApi"
import { toast } from "sonner";
import { useNavigate } from "react-router";



export const useSignUp = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {

      toast.success(data.message || "Logout successful!");

      // navigate("/login", { replace: true });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        "Signup failed. Please try again."
      );
    }
  })
}

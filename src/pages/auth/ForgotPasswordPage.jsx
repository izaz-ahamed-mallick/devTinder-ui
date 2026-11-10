import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForgotPassword, useResetPassword, useVerifyResetOtp } from "../../hooks/useAuth";


const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [showPassword,setShowPassword]=useState()
  const [showConfirmPassword,setShowConfirmPassword]=useState()
  const [step, setStep] = useState(
    () => sessionStorage.getItem("forgotPasswordStep") || "email"
  );

  const [emailId, setEmailId] = useState(
    () => sessionStorage.getItem("forgotPasswordEmail") || ""
  );

  const [resetToken, setResetToken] = useState(
    () => sessionStorage.getItem("passwordResetToken") || ""
  );

  const [resendCountdown, setResendCountdown] = useState(() => {
    const availableAt = Number(sessionStorage.getItem("resendAvailableAt"));
    return availableAt ? Math.max(0, Math.ceil((availableAt - Date.now()) / 1000)) : 0;
  });
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      emailId: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: sendOtp,
    isPending: isSendingOtp,
    isError: isSendOtpError,
    error: sendOtpError,
  } = useForgotPassword();

  const {
    mutate: verifyOtp,
    isPending: isVerifyingOtp,
    isError: isVerifyOtpError,
    error: verifyOtpError,
  } = useVerifyResetOtp();

  const {
    mutate: resetPassword,
    isPending: isResettingPassword,
    isError: isResetPasswordError,
    error: resetPasswordError,
  } = useResetPassword();

  const handleSendOtp = ({ emailId }) => {
    sendOtp(
      { emailId },
      {
        onSuccess: () => {
          const availableAt = Date.now() + 60 * 1000;

          sessionStorage.setItem("forgotPasswordEmail", emailId);
          sessionStorage.setItem("forgotPasswordStep", "otp");
          sessionStorage.setItem("resendAvailableAt", String(availableAt));

          setEmailId(emailId);
          setResendCountdown(60);
          setStep("otp");
        },
      }
    );
  };

  const handleVerifyOtp = ({ otp }) => {
    verifyOtp(
      { emailId, otp },
      {
        onSuccess: (response) => {
          sessionStorage.setItem("passwordResetToken", response.resetToken);
          sessionStorage.setItem("forgotPasswordStep", "reset");

          setResetToken(response.resetToken);
          setStep("reset");
        },
      }
    );
  };

  const handleResetPassword = ({ newPassword, confirmPassword }) => {
    if (newPassword !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.",
      });
      return;
    }

    resetPassword(
      { emailId, resetToken, newPassword },
      {
        onSuccess: () => {
          sessionStorage.removeItem("forgotPasswordStep");
          sessionStorage.removeItem("forgotPasswordEmail");
          sessionStorage.removeItem("passwordResetToken");
          sessionStorage.removeItem("resendAvailableAt");

          setResetToken("");
          setStep("success");
        },
      }
    );
  };

  const handleResendOtp = () => {
    if (isSendingOtp || resendCountdown > 0) return;

    sendOtp(
      { emailId },
      {
        onSuccess: () => {
          const availableAt = Date.now() + 60 * 1000;

          sessionStorage.setItem("resendAvailableAt", String(availableAt));
          setResendCountdown(60);
        },
      }
    );
  };

  useEffect(() => {
    if (step !== "otp") return;

    const updateCountdown = () => {
      const availableAt = Number(sessionStorage.getItem("resendAvailableAt"));
      const remaining = availableAt
        ? Math.max(0, Math.ceil((availableAt - Date.now()) / 1000))
        : 0;

      setResendCountdown(remaining);
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const getErrorMessage = (error, fallback) => {
    return (
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message ||
      fallback
    );
  };

  const inputClass =
    "input h-12 w-full border-[#2B3039] bg-[#0B0D10] text-[#F0F2F5] placeholder:text-[#68717E] focus:border-[#A7B7CD] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A7B7CD]/20";

  const errorClass = "mt-2 text-xs text-red-400";

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-2xl border border-[#2B3039] bg-[#11151B] shadow-2xl lg:grid-cols-2">

        {/* Left: Brand panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden border-r border-[#2B3039] bg-[#0E1217] p-10 lg:flex">
          <div className="absolute -right-24 -top-24 size-72 rounded-full bg-[#A7B7CD]/[0.06] blur-3xl" />

          <div className="relative">
            <img
              src="/logo.png"
              alt="DevCircle"
              className="h-10 w-auto max-w-full object-contain sm:h-12"
            />
          </div>

          <div className="relative my-12">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#A7B7CD]">
              Account security
            </p>

            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#F0F2F5] xl:text-5xl">
              Your account,
              <br />
              your security.
              <br />
              <span className="text-[#A7B7CD]">
                Stay connected.
              </span>
            </h1>

            <p className="mt-6 max-w-sm text-base leading-7 text-[#8B929E]">
              Reset your password securely and get back to connecting
              with developers and building meaningful relationships.
            </p>

            <div className="mt-8 flex items-center gap-3 text-sm text-[#8B929E]">
              <ShieldCheck size={19} className="text-[#A7B7CD]" />
              Secure account recovery
            </div>
          </div>

          <p className="relative text-xs text-[#68717E]">
            Built for developers, by developers.
          </p>
        </section>

        {/* Right: Recovery form */}
        <section className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md min-h-[480px] flex flex-col justify-center">

            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <img
                src="/logo.png"
                alt="DevCircle"
                className="h-10 w-auto max-w-full object-contain object-left"
              />
            </div>

            {/* Step 1: Email */}
            {step === "email" && (
              <>
                <div className="mb-8">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-[#A7B7CD]/20 bg-[#A7B7CD]/10 text-[#A7B7CD]">
                    <LockKeyhole size={23} />
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-[#F0F2F5]">
                    Forgot password?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#8B929E]">
                    No worries. Enter your registered email address and
                    we'll send you an OTP to reset your password.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(handleSendOtp)}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <label
                      htmlFor="emailId"
                      className="mb-2 block text-sm font-medium text-[#D5D9E0]"
                    >
                      Email address
                    </label>

                    <input
                      id="emailId"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      aria-invalid={Boolean(errors.emailId)}
                      {...register("emailId", {
                        required: "Email address is required.",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Please enter a valid email address.",
                        },
                      })}
                    />

                    {errors.emailId && (
                      <p className={errorClass} role="alert">
                        {errors.emailId.message}
                      </p>
                    )}
                  </div>

                  <div className="min-h-[20px]">
                    {isSendOtpError && (
                      <p className="text-xs leading-5 text-[#F47B9A]">
                        {getErrorMessage(
                          sendOtpError,
                          "Unable to send OTP. Please try again."
                        )}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSendingOtp}
                    className="btn h-12 min-h-12 w-full border-[#A7B7CD] bg-[#A7B7CD] text-[#10151D] hover:border-[#C5D0DF] hover:bg-[#C5D0DF] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSendingOtp ? (
                      <>
                        <RefreshCw size={17} className="animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            {/* Step 2: Verify OTP */}
            {step === "otp" && (
              <>
                <div className="mb-8">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-[#A7B7CD]/20 bg-[#A7B7CD]/10 text-[#A7B7CD]">
                    <Mail size={23} />
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-[#F0F2F5]">
                    Verify your email
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#8B929E]">
                    We've sent a verification code to{" "}
                    <span className="font-medium text-[#D5D9E0]">
                      {emailId}
                    </span>
                    . Enter the OTP below.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(handleVerifyOtp)}
                  noValidate
                  className="space-y-5"
                >
                  <div>
                    <label className="mb-2 block text-sm font-medium text-[#D5D9E0]">
                      Enter OTP
                    </label>

                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="Enter 4-digit OTP"
                      className={inputClass}
                      {...register("otp", {
                        required: "OTP is required.",
                        pattern: {
                          value: /^\d{4}$/,
                          message: "Please enter a valid 4-digit OTP.",
                        },
                      })}
                    />

                    {errors.otp && (
                      <p className={errorClass} role="alert">
                        {errors.otp.message}
                      </p>
                    )}
                  </div>

                  {isVerifyOtpError && (
                    <p className="text-xs text-[#F47B9A]" role="alert">
                      {getErrorMessage(verifyOtpError, "Invalid or expired OTP.")}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifyingOtp}
                    className="btn h-12 min-h-12 w-full border-[#A7B7CD] bg-[#A7B7CD] text-[#10151D] hover:bg-[#C5D0DF] disabled:opacity-60"
                  >
                    {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
                    {!isVerifyingOtp && <ArrowRight size={18} />}
                  </button>

                  <div className="flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setStep("email")}
                      className="text-[#8998B5] transition hover:text-[#DCE5FF]"
                    >
                      Change email
                    </button>

                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isSendingOtp || resendCountdown > 0}
                      className="font-medium text-[#A7B7CD] transition hover:text-[#C5D0DF] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isSendingOtp
                        ? "Sending OTP..."
                        : resendCountdown > 0
                          ? `Resend OTP in 00:${String(resendCountdown).padStart(2, "0")}`
                          : "Resend OTP"}
                    </button>
                  </div>
                </form>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setStep("email")}
                    className="flex items-center gap-1.5 text-[#8B929E] transition hover:text-[#F0F2F5]"
                  >
                    <ArrowLeft size={14} />
                    Change email
                  </button>

                </div>
              </>
            )}

            {/* Step 3: Reset password */}
            {step === "reset" && (
              <>
                <div className="mb-8">
                  <div className="mb-6 flex size-12 items-center justify-center rounded-xl border border-[#A7B7CD]/20 bg-[#A7B7CD]/10 text-[#A7B7CD]">
                    <KeyRound size={23} />
                  </div>

                  <h2 className="text-3xl font-semibold tracking-tight text-[#F0F2F5]">
                    Create new password
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#8B929E]">
                    Your email has been verified. Create a strong new password
                    for your DevCircle account.
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit(handleResetPassword)}
                  noValidate
                  className="space-y-5"
                >
                  {/* New password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="mb-2 block text-sm font-medium text-[#D5D9E0]"
                    >
                      New password
                    </label>

                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Enter new password"
                        className={`${inputClass} pr-12`}
                        aria-invalid={Boolean(errors.newPassword)}
                        {...register("newPassword", {
                          required: "New password is required.",
                          minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters.",
                          },
                          validate: {
                            uppercase: (value) =>
                              /[A-Z]/.test(value) ||
                              "Include at least one uppercase letter.",
                            lowercase: (value) =>
                              /[a-z]/.test(value) ||
                              "Include at least one lowercase letter.",
                            number: (value) =>
                              /\d/.test(value) ||
                              "Include at least one number.",
                            special: (value) =>
                              /[^A-Za-z0-9]/.test(value) ||
                              "Include at least one special character.",
                          },
                        })}
                      />

                      <button
                        type="button"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B929E] transition hover:text-[#F0F2F5]"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>

                    {errors.newPassword && (
                      <p className={errorClass} role="alert">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="mb-2 block text-sm font-medium text-[#D5D9E0]"
                    >
                      Confirm new password
                    </label>

                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Confirm new password"
                        className={`${inputClass} pr-12`}
                        aria-invalid={Boolean(errors.confirmPassword)}
                        {...register("confirmPassword", {
                          required: "Please confirm your password.",
                          validate: (value) =>
                            value === getValues("newPassword") ||
                            "Passwords do not match.",
                        })}
                      />

                      <button
                        type="button"
                        aria-label={
                          showConfirmPassword ? "Hide password" : "Show password"
                        }
                        onClick={() =>
                          setShowConfirmPassword((current) => !current)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B929E] transition hover:text-[#F0F2F5]"
                      >
                        {showConfirmPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && (
                      <p className={errorClass} role="alert">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* API error */}
                  {isResetPasswordError && (
                    <p className="text-xs leading-5 text-[#F47B9A]" role="alert">
                      {getErrorMessage(
                        resetPasswordError,
                        "Unable to reset your password. Please try again."
                      )}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isResettingPassword || !resetToken}
                    className="btn h-12 min-h-12 w-full border-[#A7B7CD] bg-[#A7B7CD] text-[#10151D] hover:border-[#C5D0DF] hover:bg-[#C5D0DF] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isResettingPassword ? (
                      <>
                        <RefreshCw size={17} className="animate-spin" />
                        Updating password...
                      </>
                    ) : (
                      <>
                        Reset password
                        <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}

            {/* Step 4: Success */}
            {step === "success" && (
              <div className="py-6 text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
                  <CheckCircle2 size={32} />
                </div>

                <h2 className="text-3xl font-semibold tracking-tight text-[#F0F2F5]">
                  Password updated!
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#8B929E]">
                  Your password has been reset successfully. You can now
                  sign in to your DevCircle account using your new password.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="btn mt-8 h-12 min-h-12 w-full border-[#A7B7CD] bg-[#A7B7CD] text-[#10151D] hover:border-[#C5D0DF] hover:bg-[#C5D0DF]"
                >
                  Back to Login
                  <ArrowRight size={18} />
                </button>
              </div>
            )}

            {/* Footer */}
            {step !== "success" && (
              <div className="mt-8 text-center">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 text-sm text-[#8B929E] transition hover:text-[#F0F2F5]"
                >
                  <ArrowLeft size={15} />
                  Back to Login
                </Link>
              </div>
            )}

            <p className="mt-8 text-center text-xs leading-5 text-[#68717E]">
              Built for developers, by developers.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ForgotPasswordPage;

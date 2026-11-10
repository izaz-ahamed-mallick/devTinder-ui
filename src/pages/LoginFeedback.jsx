import { useState } from "react";
import {
  MailCheck,
  RefreshCw,
  ArrowRight,
  CircleAlert,
  CheckCircle2,
} from "lucide-react";
import { useResendVerificationEmail } from "../hooks/useAuth";

const LoginFeedback = ({
  isEmailNotVerified,
  isError,
  error,
  emailId,
}) => {
  const [resendState, setResendState] = useState({
    emailId: "",
    sent: false,
    error: "",
  });

  const {
    mutate: resendEmail,
    isPending: isResending,
  } = useResendVerificationEmail();

  const resendSent =
    resendState.emailId === emailId && resendState.sent;

  const resendError =
    resendState.emailId === emailId ? resendState.error : "";

  const handleResendVerification = () => {
    if (!emailId || isResending) return;

    setResendState({
      emailId,
      sent: false,
      error: "",
    });

    resendEmail(
      { emailId },
      {
        onSuccess: () => {
          setResendState({
            emailId,
            sent: true,
            error: "",
          });
        },
        onError: () => {
          setResendState({
            emailId,
            sent: false,
            error: "Unable to send verification email. Please try again.",
          });
        },
      }
    );
  };

  return (
    <>
      {isEmailNotVerified && (
        <div className="mt-5 w-full rounded-xl border border-[#718DFF]/20 bg-[#111720] p-4">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-[#718DFF]/20 bg-[#718DFF]/10 text-[#91A7FF]">
              <MailCheck size={19} />
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-semibold text-[#DCE5FF]">
                Verify your email address
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#8998B5]">
                Your email hasn't been verified yet. Verify your email to
                unlock your DevCircle account.
              </p>

              {resendSent ? (
                <div className="mt-3 flex items-start gap-2 text-xs text-emerald-400">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0" />
                  <span>
                    Verification link sent successfully! Please check your
                    inbox.
                  </span>
                </div>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={isResending || !emailId}
                    className="group mt-3 inline-flex items-center gap-2 rounded-lg border border-[#718DFF]/25 bg-[#718DFF]/10 px-3.5 py-2 text-xs font-semibold text-[#B9C8FF] transition-all duration-300 hover:border-[#718DFF]/50 hover:bg-[#718DFF]/20 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isResending ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MailCheck size={14} />
                        Resend verification link
                        <ArrowRight
                          size={14}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>

                  {resendError && (
                    <p className="mt-2 text-xs text-[#F47B9A]">
                      {resendError}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {isError && !isEmailNotVerified && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#F06A8C]/20 bg-[#F06A8C]/[0.06] p-4">
          <CircleAlert
            size={17}
            className="shrink-0 text-[#F47B9A]"
          />
          <p className="text-xs leading-5 text-[#F0A5B4]">
            {error?.response?.data?.message ||
              "Unable to sign in. Please check your credentials and try again."}
          </p>
        </div>
      )}
    </>
  );
};

export default LoginFeedback;

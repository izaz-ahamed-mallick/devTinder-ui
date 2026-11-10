
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import {
  ShieldCheck,
  MailCheck,
  ArrowRight,
  Sparkles,
  CircleAlert,
  Check,
} from "lucide-react";
import { useVerifyEmail } from "../hooks/useAuth";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [verified, setVerified] = useState(false);

  const { mutate, isPending, isError, error } = useVerifyEmail();

  const handleVerify = () => {
    if (!token || isPending) return;

    mutate(
      { token },
      {
        onSuccess: () => setVerified(true),
      }
    );
  };

  const getVerificationError = (error) => {
    const status = error?.response?.status;
    const backendMessage = error?.response?.data?.message;

    if (status === 404) {
      return {
        title: "Verification link not found",
        message:
          "This verification link is invalid or no longer available. Please request a new verification email.",
      };
    }

    if (status === 410) {
      return {
        title: "Link expired",
        message:
          "Your verification link has expired. Request a fresh link to verify your email.",
      };
    }

    if (status === 400 || status === 401) {
      return {
        title: "Unable to verify email",
        message:
          "This verification link is invalid or has already been used. Please request a new one.",
      };
    }

    if (!error?.response) {
      return {
        title: "Connection problem",
        message:
          "We couldn't connect to the server. Check your internet connection and try again.",
      };
    }

    return {
      title: "Something went wrong",
      message:
        "We couldn't verify your email right now. Please try again later.",
    };
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0D10] px-4 py-10 text-[#F0F2F5]">
      {/* Ambient background */}
      <div className="pointer-events-none absolute -left-32 -top-32 size-96 rounded-full bg-[#526DFF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 size-96 rounded-full bg-[#F06A8C]/10 blur-[120px]" />

      <section className="relative w-full max-w-md overflow-hidden rounded-[30px] border border-white/[0.08] bg-[#11151B]/95 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
        {/* Branding */}
        <div className="mb-10 flex items-center justify-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl border border-[#718DFF]/20 bg-[#718DFF]/10 text-[#9BABFF]">
            <ShieldCheck size={22} />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Dev<span className="text-[#8298FF]">Tinder</span>
          </span>
        </div>

        {/* Icon */}
        <div className="mb-7 flex justify-center">
          <div
            className={`flex size-24 items-center justify-center rounded-[28px] border ${verified
              ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-400"
              : "border-[#718DFF]/20 bg-gradient-to-br from-[#718DFF]/15 to-[#F06A8C]/10 text-[#9BABFF]"
              }`}
          >
            {verified ? (
              <Check size={43} strokeWidth={2} />
            ) : (
              <MailCheck size={43} strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="text-center">
          <div className="mb-3 flex justify-center">
            <span className="rounded-full border border-[#718DFF]/20 bg-[#718DFF]/[0.07] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9BABFF]">
              {verified ? "Verification complete" : "One last step"}
            </span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {verified
              ? "You're verified!"
              : "Verify your email"}
          </h1>

          <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-[#8995A6]">
            {verified
              ? "Your email address has been successfully verified. Welcome to the DevCircle community!"
              : "You're just one step away from joining a community of developers. Confirm your email address to activate your account."}
          </p>
        </div>

        {/* Error messages */}
        {!token && (
          <div className="mt-7 flex items-start gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-4 text-left">
            <CircleAlert size={19} className="shrink-0 text-red-400" />
            <p className="text-xs leading-5 text-red-300">
              Invalid verification link. Please open the link from your email again.
            </p>
          </div>
        )}

        {isError && (
          <div className="relative mt-7 overflow-hidden rounded-2xl border border-[#F06A8C]/20 bg-gradient-to-br from-[#291820] to-[#17151D] p-4 text-left">
            <div className="absolute -right-8 -top-8 size-24 rounded-full bg-[#F06A8C]/10 blur-2xl" />

            <div className="relative flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#F06A8C]/20 bg-[#F06A8C]/10 text-[#FF8FA8]">
                <CircleAlert size={20} />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-[#FF9BAD]">
                  {getVerificationError(error).title}
                </h3>

                <p className="mt-1 text-xs leading-6 text-[#C5AAB3]">
                  {getVerificationError(error).message}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Action */}
        <div className="mt-8">
          {verified ? (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#718DFF] to-[#5262D9] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(82,98,217,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(82,98,217,0.4)]"
            >
              Continue to login
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              type="button"
              disabled={!token || isPending}
              onClick={handleVerify}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#718DFF] to-[#5262D9] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_30px_rgba(82,98,217,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(82,98,217,0.4)] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? (
                <>
                  <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Verifying email...
                </>
              ) : (
                <>
                  Verify my email
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="mt-7 flex items-center justify-center gap-2 text-[11px] text-[#68788D]">
          <ShieldCheck size={14} />
          Secure email verification by DevCircle
        </div>
      </section>
    </main>
  );
};

export default VerifyEmail;

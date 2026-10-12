
import { Navigate, Outlet } from "react-router";
import { ShieldCheck, LoaderCircle, RefreshCw } from "lucide-react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import DevTinderLoader from "../common/DevTinderLoader";

const PrivateRoute = () => {
  const {
    data: user,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useCurrentUser();

  // Wait until the backend verifies the session.
 if (isPending) {
  return (
    <DevTinderLoader
      fullScreen
      label="Verifying your session..."
    />
  );
}

  // Redirect only when the backend confirms authentication is invalid.
  if (isError && error?.response?.status === 401) {
    return <Navigate to="/login" replace />;
  }

  // Allow retrying when authentication cannot be verified.
  if (isError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0D10] px-4 text-[#F0F2F5]">
        <div className="w-full max-w-md rounded-2xl border border-[#2B3039] bg-[#11151B] p-8 text-center shadow-2xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2B3039] bg-[#0E1217]">
            <ShieldCheck size={30} className="text-[#A7B7CD]" />
          </div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#8B929E]">
            Connection issue
          </p>

          <h1 className="text-xl font-semibold tracking-tight">
            Unable to verify your session
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#8B929E]">
            We couldn't confirm your authentication right now. Check your
            connection and try again.
          </p>

          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#A7B7CD] px-5 py-3 text-sm font-semibold text-[#0B0D10] transition hover:bg-[#C1CDDE] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={16}
              className={isFetching ? "animate-spin" : ""}
            />
            {isFetching ? "Checking session..." : "Try again"}
          </button>
        </div>
      </main>
    );
  }

  // Protect child routes when no authenticated user is available.
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the requested protected page.
  return <Outlet />;
};

export default PrivateRoute;

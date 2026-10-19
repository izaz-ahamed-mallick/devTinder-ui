import { Inbox, ArrowUpRight, UserRound } from "lucide-react";
import DevTinderLoader from "../common/DevTinderLoader";
import { useRejectedRequest } from "../hooks/useRequest";

const RejectedRequests = () => {
  const { data, isLoading, isError } = useRejectedRequest();

  const requests = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : Array.isArray(data?.data?.data)
        ? data.data.data
        : [];

  if (isLoading) {
    return <DevTinderLoader />;
  }

  if (isError) {
    return (
      <div className="px-6 py-12 text-center text-sm text-[#E4AAB3]">
        Couldn't load rejected requests. Please try again.
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
        <div className="flex size-12 items-center justify-center rounded-xl border border-[#303744] bg-[#181E27] text-[#A7B7CD]">
          <Inbox size={22} />
        </div>

        <p className="mt-4 text-sm font-medium text-[#F0F2F5]">
          No rejected requests
        </p>

        <p className="mt-2 text-xs leading-5 text-[#7D8999]">
          Rejected requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 p-2">
      {requests.map((request) => {
        const user = request.user ?? request.fromUserId ?? {};

        const name =
          [user.firstName, user.lastName].filter(Boolean).join(" ") ||
          "Developer";

        const requestId = request.requestId ?? request._id;

        const initials =
          `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`
            .toUpperCase() || "D";

        return (
          <button
            key={requestId}
            type="button"
            className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-3.5 text-left transition duration-200 hover:border-[#292F39] hover:bg-[#151A22]"
          >
            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#303744] bg-[#171D26] text-sm font-semibold text-[#A7B7CD]">
              {user.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt={name}
                  className="size-full object-cover"
                />
              ) : (
                initials
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-wide text-[#F0F2F5] transition-colors group-hover:text-white">
                {name}
              </p>

              <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#8FA7C2] transition-colors group-hover:text-[#D7E3F2]">
                <UserRound size={12} />
                Profile
                <ArrowUpRight
                  size={12}
                  className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default RejectedRequests;


import { useMemo, useState } from "react";
import {
  Search,
  X,
  Clock3,
  Code2,
  Inbox,
  Users,
  MapPin,
  ChevronRight,
  Fingerprint,
  Layers3,
  CheckCheck,
  ArrowRight,
} from "lucide-react";

import { FaLinkedin } from "react-icons/fa";
import { usePendingRequest, useUpdateRequest } from "../hooks/useRequest";
import { formatRelativeTime } from "../utils/formatRelativeTime";
import DevTinderLoader from "../common/DevTinderLoader";

const ReceivedRequests = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { data, isLoading, isError } = usePendingRequest();
  const { mutate } = useUpdateRequest();

  const requests = useMemo(() => {
    const requestData = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : Array.isArray(data?.data?.data)
          ? data.data.data
          : [];

    return requestData
      .filter((request) => request?.user || request?.fromUserId)
      .map((request) => {
        const user = request.user ?? request.fromUserId;
        const firstName = user?.firstName ?? "";
        const lastName = user?.lastName ?? "";
        const location = user?.location;

        const locationText =
          typeof location === "string"
            ? location
            : [location?.city, location?.state, location?.country]
              .filter(Boolean)
              .join(", ");

        return {
          id: request.requestId ?? request._id,
          status: request.status ?? "interested",
          name:
            [firstName, lastName].filter(Boolean).join(" ") || "Developer",
          location: locationText || "Location not added",
          about: user?.about || "No introduction added yet.",
          skills: Array.isArray(user?.skills) ? user.skills : [],
          initials:
            `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase() || "D",
          linkedinUrl: user?.linkedinUrl || "",
          githubUrl: user?.githubUrl || "",
          photoUrl: user?.photoUrl || "",
          createdAt: request.createdAt,
        };
      });
  }, [data]);

  const visibleRequests = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const isPending = request.status === "interested" || request.status === "received";
      const searchableText = [
        request.name,
        request.location,
        request.about,
        ...request.skills,
      ]
        .join(" ")
        .toLowerCase();

      return isPending && searchableText.includes(search);
    });
  }, [requests, searchTerm]);

  const selectedRequest =
    visibleRequests.find((item) => item.id === selectedId) ||
    visibleRequests[0] ||
    null;


  const handleRequest = (data, status) => {
    const userInfo = { status: status, toUserId: data.id }
    mutate(userInfo)
  }

  return (
    <div className="min-w-0 text-[#F0F2F5]">
      {isLoading && (
        <DevTinderLoader label="  Loading connection requests..." />
      )}
      {isError && (
        <div className="rounded-2xl border border-[#44343A] bg-[#1B1419] px-6 py-8 text-center text-sm text-[#E4AAB3]">
          Couldn't load connection requests. Please try again.
        </div>
      )}
      {!isLoading && !isError && (
        <section className="overflow-hidden rounded-2xl border border-[#292F39] bg-[#10141A]">
          {/* Toolbar */}
          <div className="border-b border-[#292F39] p-4 sm:p-5">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.17em] text-[#707D8E]">
                  Connection inbox
                </p>
                <h2 className="mt-1.5 text-lg font-semibold">
                  Manage your requests
                </h2>
              </div>

              <label className="flex w-full items-center gap-2.5 rounded-xl border border-[#303744] bg-[#0B0D10] px-3.5 py-3 transition focus-within:border-[#667F9C] xl:max-w-xs">
                <Search size={16} className="shrink-0 text-[#7D8999]" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search name, location, or skill..."
                  aria-label="Search developers"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#596473]"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="text-[#7D8999] hover:text-white"
                  >
                    <X size={15} />
                  </button>
                )}
              </label>
            </div>

          </div>

          {/* Split inbox */}
          <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[minmax(250px,0.82fr)_minmax(0,1.4fr)]">
            {/* Request list */}
            <div className="min-w-0 border-b border-[#292F39] lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between px-4 py-3.5 sm:px-5">
                <span className="text-xs font-medium text-[#A4AEBC]">
                  People reaching out
                </span>
                <span className="text-xs text-[#667283]">
                  {visibleRequests.length} results
                </span>
              </div>

              {visibleRequests.length > 0 ? (
                <div className="space-y-1 p-2 pt-0">
                  {visibleRequests.map((request) => {
                    const isSelected = selectedRequest?.id === request.id;

                    return (
                      <button
                        key={request.id}
                        type="button"
                        onClick={() => setSelectedId(request.id)}
                        aria-pressed={isSelected}
                        className={`group relative w-full overflow-hidden rounded-xl border p-3.5 text-left transition duration-200 sm:p-4 ${isSelected
                          ? "border-[#3B4B60] bg-[#1B2430]"
                          : "border-transparent hover:border-[#292F39] hover:bg-[#151A22]"
                          }`}
                      >
                        {isSelected && (
                          <span className="absolute inset-y-3 left-0 w-0.5 rounded-r bg-[#A7B7CD]" />
                        )}

                        <div className="flex items-start gap-3">
                          <div
                            className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#303744] bg-[#171D26] text-sm font-semibold text-[#A7B7CD]"
                          >
                            {request.photoUrl ? (
                              <img src={request.photoUrl} alt={request.name} className="size-full object-cover" />
                            ) : request.initials}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p className="truncate text-sm font-semibold text-[#F0F2F5]">
                                {request.name}
                              </p>
                              <span className="shrink-0 pt-0.5 text-[10px] text-[#758193]">
                                {formatRelativeTime(request.createdAt)}
                              </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-2">
                              <div className="flex min-w-0 flex-wrap gap-1.5">
                                {request.skills.slice(0, 2).map((skill) => (
                                  <span
                                    key={skill}
                                    className="max-w-full truncate rounded-md border border-[#303744] bg-[#0E1218] px-2 py-1 text-[10px] text-[#9EADBF]"
                                  >
                                    {skill}
                                  </span>
                                ))}
                                {request.skills.length > 2 && (
                                  <span className="px-1 py-1 text-[10px] text-[#7D8999]">
                                    +{request.skills.length - 2}
                                  </span>
                                )}
                              </div>

                              <ChevronRight
                                size={15}
                                className={`shrink-0 transition-transform ${isSelected
                                  ? "translate-x-0 text-[#C4D0E0]"
                                  : "-translate-x-1 text-[#586474] group-hover:translate-x-0"
                                  }`}
                              />
                            </div>
                          </div>
                        </div>

                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex min-h-64 flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="flex size-12 items-center justify-center rounded-xl border border-[#303744] bg-[#181E27] text-[#A7B7CD]">
                    <Inbox size={22} />
                  </div>
                  <p className="mt-4 text-sm font-medium">
                    {searchTerm ? "No matching developers" : "Nothing here yet"}
                  </p>
                  <p className="mt-2 max-w-xs text-xs leading-5 text-[#7D8999]">
                    {searchTerm
                      ? "Try another name, location, or skill."
                      : "New connection requests will appear here."}
                  </p>
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={() => setSearchTerm("")}
                      className="mt-3 text-xs text-[#C4D0E0] hover:text-white"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Selected developer details */}
            <div className="relative min-w-0">
              {selectedRequest ? (
                <div key={selectedRequest.id} className="animate-in fade-in duration-200">
                  {/* Developer identity */}
                  <div className="border-b border-[#292F39] bg-[#11151B] px-5 py-6 sm:px-7 sm:py-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div
                        className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#303744] bg-[#171D26] text-2xl font-semibold text-[#A7B7CD]"
                      >
                        {selectedRequest.photoUrl ? (
                          <img src={selectedRequest.photoUrl} alt={selectedRequest.name} className="size-full object-cover" />
                        ) : selectedRequest.initials}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-2xl font-semibold tracking-tight text-[#F0F2F5] sm:text-3xl">
                          {selectedRequest.name}
                        </h3>
                        <p className="mt-2 flex items-center gap-2 text-sm text-[#A7B7CD]">
                          <MapPin size={15} />
                          {selectedRequest.location}
                        </p>
                        {selectedRequest.linkedinUrl && (
                          <a
                            href={selectedRequest.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm text-[#A7B7CD] transition hover:text-white"
                          >
                            <FaLinkedin size={16} />
                            LinkedIn profile
                          </a>
                        )}
                        {selectedRequest.githubUrl && (
                          <a
                            href={selectedRequest.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-3 inline-flex items-center gap-2 text-sm text-[#A7B7CD] transition hover:text-white"
                          >
                            GitHub profile
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-7">
                    {/* Context row */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-[#292F39] bg-[#0D1015] p-3.5">
                        <MapPin size={16} className="mb-3 text-[#8DA5C0]" />
                        <p className="text-[10px] uppercase tracking-[0.12em] text-[#697586]">
                          Location
                        </p>
                        <p className="mt-1.5 text-xs font-medium leading-5 text-[#D0D8E3]">
                          {selectedRequest.location}
                        </p>
                      </div>

                      <div className="rounded-xl border border-[#292F39] bg-[#0D1015] p-3.5">
                        <Users size={16} className="mb-3 text-[#8DA5C0]" />
                        <p className="text-[10px] uppercase tracking-[0.12em] text-[#697586]">
                          Request status
                        </p>
                        <p className="mt-1.5 text-xs font-medium leading-5 text-[#D0D8E3]">
                          Pending
                        </p>
                      </div>
                    </div>

                    {/* About */}
                    <div className="mt-7">
                      <div className="mb-3 flex items-center gap-2">
                        <Fingerprint size={16} className="text-[#8DA5C0]" />
                        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#AAB5C4]">
                          A little about them
                        </h4>
                      </div>
                      <p className="text-sm leading-7 text-[#A0AAB8]">
                        {selectedRequest.about}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mt-7">
                      <div className="mb-3 flex items-center gap-2">
                        <Layers3 size={16} className="text-[#8DA5C0]" />
                        <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-[#AAB5C4]">
                          Skills
                        </h4>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.skills.map((skill, index) => (
                          <span
                            key={skill}
                            className="inline-flex items-center gap-2 rounded-lg border border-[#303744] bg-[#151B24] px-3 py-2 text-xs text-[#CFD9E5]"
                          >
                            <Code2
                              size={13}
                              className={
                                index === 0 ? "text-[#A7B7CD]" : "text-[#687B91]"
                              }
                            />
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Request metadata */}
                    <div className="mt-7 flex items-center justify-between gap-3 border-t border-[#292F39] pt-4">
                      <span className="flex items-center gap-2 text-xs text-[#7D8999]">
                        <Clock3 size={14} />
                        Received {selectedRequest.createdAt ? new Date(selectedRequest.createdAt).toLocaleDateString() : "recently"}
                      </span>

                      <span className="text-[10px] font-medium uppercase tracking-wider text-[#758397]">
                        Incoming request
                      </span>
                    </div>

                    <div className="mt-5 rounded-xl border border-[#292F39] bg-[#0D1015] p-4">
                      <p className="mb-4 text-xs leading-5 text-[#7D8999]">
                        Interested in connecting with this developer?
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => handleRequest(selectedRequest, "rejected")}
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#44343A] bg-[#1B1419] px-3 py-3 text-sm font-medium text-[#E4AAB3] transition hover:border-[#78505A] hover:bg-[#2A1B21] active:scale-[0.99]"
                        >
                          <X size={16} />
                          Reject
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRequest(selectedRequest, "accepted")}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C4D0E0] px-3 py-3 text-sm font-semibold text-[#0B0D10] transition hover:bg-white active:scale-[0.99]"
                        >
                          <CheckCheck size={16} />
                          Accept
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[440px] flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="relative flex size-16 items-center justify-center rounded-2xl border border-[#303744] bg-[#171D26]">
                    <Inbox size={27} className="text-[#A7B7CD]" />
                    <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-[#10141A] bg-[#647F9E]" />
                  </div>
                  <p className="mt-5 text-base font-semibold">
                    Your inbox, at your pace.
                  </p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#7D8999]">
                    {searchTerm
                      ? "Try another search to find a developer."
                      : "Select a developer from the list to explore their profile and decide whether to connect."}
                  </p>
                </div>
              )}
            </div>


            {/* Workspace footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#292F39] bg-[#0D1015] px-4 py-3.5 sm:px-5">
              <span className="flex items-center gap-2 text-[10px] text-[#758193]">
                <Code2 size={13} />
                BUILT FOR DEVELOPER CONNECTIONS
              </span>
              <span className="font-mono text-[10px] text-[#586474]">
                DEVTINDER / NETWORK
              </span>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ReceivedRequests;

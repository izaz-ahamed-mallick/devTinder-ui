import { useState } from "react";
import {
  Users,
  Search,
  MapPin,
  Code2,
  UserRound,

} from "lucide-react";

import DevTinderLoader from "../common/DevTinderLoader";
import { useAcceptedConnections } from "../hooks/useRequest";

const ConnectionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: connections = [], isLoading, isError } = useAcceptedConnections();
console.log(connections)
  const filteredConnections = connections.filter((user) => {
    const name = [user.firstName, user.lastName]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const skills = Array.isArray(user.skills)
      ? user.skills.join(" ").toLowerCase()
      : "";

    return `${name} ${skills}`.includes(searchTerm.toLowerCase().trim());
  });

  if (isLoading) {
    return <DevTinderLoader />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-[#292F39] bg-[#10141A] px-6 py-12 text-center">
        <p className="text-sm text-[#E4AAB3]">
          Couldn't load your connections. Please try again.
        </p>
      </div>
    );
  }

  return (
    <main className="min-w-0 space-y-6 pb-10 text-[#F0F2F5]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#849CB9]">
            Your network
          </p>

          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Connections
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-6 text-[#8E98A7]">
            Stay connected with developers and grow together.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#292F39] bg-[#10141A] px-3.5 py-2.5">
          <Users size={17} className="text-[#A7B7CD]" />
          <span className="text-sm font-medium">
            {connections.length}{" "}
            {connections.length === 1 ? "connection" : "connections"}
          </span>
        </div>
      </header>

      <div className="relative">
        <Search
          size={17}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7D8999]"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by name or skill..."
          className="w-full rounded-xl border border-[#292F39] bg-[#10141A] py-3 pl-11 pr-4 text-sm text-[#F0F2F5] outline-none transition placeholder:text-[#687486] focus:border-[#536781]"
        />
      </div>

      {filteredConnections.length === 0 ? (
        <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-[#292F39] bg-[#10141A] px-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl border border-[#303744] bg-[#181E27] text-[#A7B7CD]">
            <Users size={22} />
          </div>

          <h2 className="mt-4 text-sm font-semibold">
            {connections.length === 0
              ? "No connections yet"
              : "No matching developers"}
          </h2>

          <p className="mt-2 max-w-sm text-xs leading-5 text-[#7D8999]">
            {connections.length === 0
              ? "When you accept connection requests, your connections will appear here."
              : "Try searching with a different name or skill."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredConnections.map((user) => {
            const name =
              [user.firstName, user.lastName].filter(Boolean).join(" ") ||
              "Developer";

            const initials =
              `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`
                .toUpperCase() || "D";

            const skills = Array.isArray(user.skills) ? user.skills : [];

            return (
              <article
                key={user._id}
                className="group rounded-2xl border border-[#292F39] bg-[#10141A] p-5 transition duration-200 hover:border-[#3B4B60] hover:bg-[#121821]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#303744] bg-[#181E27] text-base font-semibold text-[#A7B7CD]">
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
                    <h2 className="truncate text-base font-semibold text-[#F0F2F5]">
                      {name}
                    </h2>

                    <p className="mt-1 flex items-center gap-1.5 text-xs capitalize text-[#8E98A7]">
                      <UserRound size={13} />
                      {user.gender || "Developer"}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="mb-2 flex items-center gap-2 text-xs font-medium text-[#A7B7CD]">
                    <Code2 size={14} />
                    Skills
                  </p>

                  {skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.slice(0, 5).map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-lg border border-[#303744] bg-[#181E27] px-2.5 py-1 text-xs text-[#C2CCDA]"
                        >
                          {skill}
                        </span>
                      ))}

                      {skills.length > 5 && (
                        <span className="rounded-lg px-2 py-1 text-xs text-[#8E98A7]">
                          +{skills.length - 5} more
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-[#687486]">
                      No skills added yet.
                    </p>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default ConnectionsPage;

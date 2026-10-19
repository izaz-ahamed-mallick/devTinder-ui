import { useState } from "react";
import { Users } from "lucide-react";
import ReceivedRequests from "../components/ReceivedRequests";
import RejectedRequests from "../components/RejectedRequests";


const filters = [
  { label: "Received", value: "received" },
  { label: "Rejected", value: "rejected" },
];

const RequestsPage = () => {
  const [activeTab, setActiveTab] = useState("received");

  return (
    <main className="min-w-0 space-y-6 pb-10 text-[#F0F2F5]">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#849CB9]">
            Your network
          </p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[#F0F2F5] sm:text-3xl">
            Connection requests
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-6 text-[#8E98A7]">
            Meet developers, discover shared interests, and grow your network.
          </p>
        </div>
      </header>

      <section className="overflow-hidden rounded-2xl border border-[#292F39] bg-[#10141A]">
        <div className="border-b border-[#292F39] px-4 pt-4 sm:px-5 sm:pt-5">
          <div className="flex gap-5 overflow-x-auto">
            {filters.map((filter) => {
              const isActive = activeTab === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveTab(filter.value)}
                  className={`relative flex shrink-0 items-center gap-2 pb-3 text-sm transition-colors ${
                    isActive
                      ? "font-medium text-[#F0F2F5]"
                      : "text-[#7D8999] hover:text-[#D5DCE6]"
                  }`}
                >
                  {filter.label}
                  {isActive && (
                    <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#A7B7CD]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {activeTab === "received" ? <ReceivedRequests /> : <RejectedRequests />}
      </section>
    </main>
  );
};

export default RequestsPage;

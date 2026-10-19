
import { Code2, Terminal, Users } from "lucide-react";

const DevTinderLoader = ({
  label = "Loading your data...",
  fullScreen = true,
}) => {
  return (
    <main
      role="status"
      aria-live="polite"
      className={`flex w-full items-center justify-center overflow-hidden px-4 ${fullScreen
          ? "h-[100dvh] bg-[#0B0D10]"
          : "min-h-[260px] bg-transparent"
        }`}
    ><div className="flex w-full max-w-md flex-col items-center text-center">
        {/* Custom loader emblem — inspired by your developer logo */}
        <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#26364D] animate-[spin_12s_linear_infinite]" />
          <div className="absolute inset-3 rounded-full border border-dashed border-[#34465F] animate-[spin_18s_linear_infinite_reverse]" />
          <div className="absolute inset-7 rounded-full border border-[#314A69]" />

          {/* Orbiting blue particle */}
          <div className="absolute inset-0 animate-[spin_5s_linear_infinite]">
            <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#4D8DFF] shadow-[0_0_14px_rgba(77,141,255,0.8)]" />
          </div>

          {/* Orbiting developer symbols */}
          <div className="absolute left-0 top-6 flex h-8 w-8 items-center justify-center rounded-xl border border-[#34465F] bg-[#111923] text-[#A7C9FF]">
            <Code2 size={16} />
          </div>

          <div className="absolute right-0 top-7 flex h-8 w-8 items-center justify-center rounded-xl border border-[#34465F] bg-[#111923] text-[#A7C9FF]">
            <Users size={16} />
          </div>

          <div className="absolute bottom-2 right-3 flex h-8 w-8 items-center justify-center rounded-xl border border-[#34465F] bg-[#111923] text-[#A7C9FF]">
            <Terminal size={16} />
          </div>

          {/* Original developer-at-laptop symbol */}
          <svg
            viewBox="0 0 100 100"
            className="relative z-10 h-[88px] w-[88px] drop-shadow-[0_0_16px_rgba(37,99,235,0.35)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="loaderBlue" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#DCEBFF" />
                <stop offset="55%" stopColor="#6FA8FF" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>

            {/* Head */}
            <circle
              cx="50"
              cy="25"
              r="10"
              fill="url(#loaderBlue)"
              stroke="#BBD7FF"
              strokeWidth="1.5"
            />

            {/* Hair accent */}
            <path
              d="M43 12 Q51 3 59 10"
              stroke="url(#loaderBlue)"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Shoulders */}
            <path
              d="M28 49 Q31 36 50 36 Q69 36 72 49"
              fill="url(#loaderBlue)"
              stroke="#8DBAFF"
              strokeWidth="1.5"
            />

            {/* Laptop screen */}
            <rect
              x="20"
              y="46"
              width="60"
              height="35"
              rx="5"
              fill="#101B2B"
              stroke="url(#loaderBlue)"
              strokeWidth="2"
            />

            {/* Code mark */}
            <path
              d="M42 57 L35 63 L42 69 M58 57 L65 63 L58 69 M54 55 L47 71"
              stroke="#DCEBFF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Laptop base */}
            <path
              d="M15 83 H85 L80 88 H20 Z"
              fill="url(#loaderBlue)"
              stroke="#BBD7FF"
              strokeWidth="1"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-[#F0F2F5]">
          Dev<span className="text-[#4D8DFF]">Tinder</span>
        </h1>

        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.3em] text-[#829AB8]">
          Connecting developers
        </p>

        <p className="mt-7 text-sm text-[#A7B7CD]">{label}</p>

        {/* Animated progress track */}
        <div className="mt-5 h-1 w-52 overflow-hidden rounded-full bg-[#202B3A]">
          <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#BBD7FF] animate-[loader-progress_1.6s_ease-in-out_infinite]" />
        </div>

        <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#65758A]">
          Building meaningful connections
        </p>
      </div>
    </main>
  );
};

export default DevTinderLoader;

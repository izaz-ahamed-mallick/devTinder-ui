
import { useEffect } from "react";
import {
  X,
  MapPin,
  Code2,
  UserRound,
  Quote,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ProfileDetailsModal = ({ user, onClose }) => {
  useEffect(() => {
    if (!user) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [user, onClose]);

  if (!user) return null;

  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    "Developer";

  const location = user.location;
  const locationText =
    typeof location === "string"
      ? location
      : [location?.city, location?.state, location?.country]
          .filter(Boolean)
          .join(", ");

  const skills = Array.isArray(user.skills) ? user.skills : [];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#05070B]/80 p-3 backdrop-blur-xl sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${name}'s profile details`}
        className="relative flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0E1219] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-[#526DFF]/15 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-28 -left-20 size-64 rounded-full bg-[#F06A8C]/10 blur-[100px]" />

        {/* Header */}
        <header className="relative flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl border border-[#718DFF]/20 bg-[#718DFF]/10 text-[#A7B7FF]">
              <Sparkles size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#F0F2F5]">
                Developer profile
              </p>
              <p className="mt-0.5 text-[11px] text-[#7F8CA0]">
                Get to know the person behind the code
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile details"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-[#9BA8BA] transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            <X size={19} />
          </button>
        </header>

        {/* Scrollable profile content */}
        <div className="relative overflow-y-auto overscroll-contain">
          {/* Profile hero */}
          <div className="relative p-5 sm:p-7">
            <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#718DFF]/[0.08] to-transparent" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
              {/* Avatar */}
              <div className="relative mx-auto shrink-0 sm:mx-0">
                <div className="absolute -inset-1 rounded-[25px] bg-gradient-to-br from-[#718DFF] via-[#526DFF]/40 to-[#F06A8C]/70 opacity-80 blur-[2px]" />

                <div className="relative size-32 overflow-hidden rounded-[22px] border border-white/10 bg-[#171D26] sm:size-36">
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={name}
                      className="size-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center">
                      <UserRound
                        size={54}
                        strokeWidth={1.2}
                        className="text-[#718DFF]"
                      />
                    </div>
                  )}
                </div>

                <div className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-xl border border-[#0E1219] bg-[#171F2C] text-[#A7B7FF]">
                  <Code2 size={16} />
                </div>
              </div>

              {/* Name and social links */}
              <div className="min-w-0 flex-1 text-center sm:text-left">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8298FF]">
                  THE DEVELOPER
                </p>

                <h2 className="break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {name}
                </h2>

                {user.age != null && user.age !== "" && (
                  <p className="mt-1 text-sm text-[#9BA8BA]">
                    {user.age} years old
                  </p>
                )}

                {locationText && (
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-[#9BA8BA] sm:justify-start">
                    <MapPin size={15} className="shrink-0 text-[#8298FF]" />
                    <span>{locationText}</span>
                  </p>
                )}

                <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                  {user.githubUrl && (
                    <a
                      href={user.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open GitHub profile"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-medium text-[#D6DDE8] transition hover:border-[#8298FF]/50 hover:bg-[#718DFF]/10 hover:text-white"
                    >
                      <FaGithub size={16} />
                      GitHub
                      <ArrowUpRight size={13} />
                    </a>
                  )}

                  {user.linkedinUrl && (
                    <a
                      href={user.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Open LinkedIn profile"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-medium text-[#D6DDE8] transition hover:border-[#718DFF]/50 hover:bg-[#718DFF]/10 hover:text-white"
                    >
                      <FaLinkedin size={16} />
                      LinkedIn
                      <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent sm:mx-7" />

          <div className="space-y-7 p-5 sm:p-7">
            {/* About */}
            <section>
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl border border-[#718DFF]/15 bg-[#718DFF]/[0.08] text-[#8298FF]">
                  <Quote size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F0F2F5]">
                    A little about me
                  </h3>
                  <p className="text-[11px] text-[#718096]">
                    Beyond the code
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 sm:p-5">
                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-[#B1BDCD]">
                  {user.about?.trim() ||
                    "This developer hasn't shared their introduction yet."}
                </p>
              </div>
            </section>

            {/* Skills */}
            <section>
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl border border-[#F06A8C]/15 bg-[#F06A8C]/[0.07] text-[#F18CA5]">
                  <Code2 size={17} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F0F2F5]">
                    Skills & technologies
                  </h3>
                  <p className="text-[11px] text-[#718096]">
                    Tools they enjoy working with
                  </p>
                </div>
                <span className="ml-auto rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-xs text-[#9BA8BA]">
                  {skills.length}
                </span>
              </div>

              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={`${skill}-${index}`}
                      className="rounded-xl border border-[#343E50] bg-gradient-to-br from-[#1A2230] to-[#131923] px-3.5 py-2.5 text-xs font-medium text-[#D2DCEB] transition hover:border-[#718DFF]/50 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center">
                  <Code2
                    size={22}
                    className="mx-auto mb-2 text-[#68788D]"
                  />
                  <p className="text-sm text-[#9BA8BA]">
                    No skills added yet.
                  </p>
                </div>
              )}
            </section>

            {/* Closing note */}
            <div className="relative overflow-hidden rounded-2xl border border-[#718DFF]/15 bg-gradient-to-r from-[#718DFF]/[0.08] via-[#171D29] to-[#F06A8C]/[0.06] p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#718DFF]/10 text-[#9BABFF]">
                  <Sparkles size={17} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#E4EAF5]">
                    Every developer has a story.
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8F9DB1]">
                    Explore their interests, experience, and ideas. Great
                    collaborations start with getting to know each other.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative flex shrink-0 items-center justify-between gap-3 border-t border-white/[0.07] bg-[#0E1219]/95 px-5 py-4 sm:px-7">
          <p className="text-[11px] text-[#718096]">
            <span className="text-[#8298FF]">●</span> Profile preview
          </p>
        </footer>
      </section>
    </div>
  );
};

export default ProfileDetailsModal;

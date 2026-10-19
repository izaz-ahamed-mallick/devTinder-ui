import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Heart,
  MapPin,
  Sparkles,
  X,
  Users,
  Zap,
  Star,
  Lightbulb,
  UserRound,
  Quote,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import DevTinderLoader from "../common/DevTinderLoader";
import { useFeedConnectionRequest, useSendConnectionRequest } from "../hooks/useRequest";
import ProfileDetailsModal from "../common/ProfileDetailsModal";

const FeedPage = () => {
  const [page, setPage] = useState(1);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [profileIndex, setProfileIndex] = useState(0);
  const { data, isLoading, isError } = useFeedConnectionRequest(page);
  const { mutate, isPending } = useSendConnectionRequest();

  const users = Array.isArray(data) ? data : [];
  const user = users[profileIndex];

  const name = user
    ? [user.firstName, user.lastName].filter(Boolean).join(" ")
    : "Developer";

  const location = user?.location;
  const locationText =
    typeof location === "string"
      ? location
      : [location?.city, location?.state, location?.country]
        .filter(Boolean)
        .join(", ");

  const skills = Array.isArray(user?.skills) ? user.skills : [];

  const handleAction = (status) => {
    if (!user?._id || isPending) return;
    console.log(user)
    mutate(
      {
        status,
        toUserId: user._id,
      },
      {
        onSuccess: () => {
          console.log(profileIndex)
          console.log(users.length - 1)
          console.log(page)
          if (profileIndex < users.length - 1) {
            setProfileIndex((index) => index + 1);
          } else {
            setProfileIndex(0);
            setPage((currentPage) => currentPage + 1);
          }
        },
      }
    );
  };


  if (isLoading) {
    return <DevTinderLoader />;
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-[#292F39] bg-[#11151B] p-10 text-center">
        <p className="text-sm text-[#E4AAB3]">
          Couldn't load developers. Please try again.
        </p>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-6 pb-10 text-[#F0F2F5]">
      {/* Header */}
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#849CB9]">
            <Sparkles size={14} />
            Find your people
          </div>

          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Discover{" "}
            <span className="bg-gradient-to-r from-[#A7B7CD] to-[#718DFF] bg-clip-text text-transparent">
              developers.
            </span>
          </h1>

          <p className="mt-2 text-sm text-[#8995A6]">
            Good code is better when you build it together.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-[#292F39] bg-[#11151B] px-4 py-3">
          <Users size={17} className="text-[#A7B7CD]" />
          <span className="text-sm text-[#C5CFDD]">
            {users.length ? profileIndex + 1 : 0}
            <span className="text-[#687486]"> / {users.length}</span>
          </span>
        </div>
      </header>

      {/* Main discovery layout */}
      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(190px,0.65fr)_minmax(0,1.8fr)_minmax(180px,0.6fr)]">
        {/* Left introduction */}
        <aside className="hidden space-y-7 pt-8 xl:block">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7184A0]">
              The experience
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-8">
              Meet people.
              <br />
              <span className="text-[#718DFF]">Build things.</span>
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#8995A6]">
              Discover developers who share your curiosity, interests, and
              ambition.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#343B4D] bg-[#171D29] text-[#A7B7CD]">
                <Zap size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">Real connections</p>
                <p className="mt-1 text-xs leading-5 text-[#7D8999]">
                  Connect with developers, not just profiles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#3C3151] bg-[#211A32] text-[#B7A0FF]">
                <Code2 size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">Shared interests</p>
                <p className="mt-1 text-xs leading-5 text-[#7D8999]">
                  Find people who enjoy your tech stack.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#4A3D2D] bg-[#292218] text-[#E6C58C]">
                <Star size={18} />
              </div>
              <div>
                <p className="text-sm font-medium">Meaningful growth</p>
                <p className="mt-1 text-xs leading-5 text-[#7D8999]">
                  Make room for your next collaboration.
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* Profile card */}
        <section className="min-w-0">
          {!user ? (
            <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-[#292F39] bg-[#11151B] px-6 text-center">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-[#3B4560] bg-[#1A2232] text-[#A7B7CD]">
                <Sparkles size={28} />
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                You've seen everyone for now.
              </h2>

              <p className="mt-2 max-w-sm text-sm leading-6 text-[#8995A6]">
                New developers will appear here when they're available to
                discover.
              </p>

              {page > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setPage(1);
                    setProfileIndex(0);
                  }}
                  className="mt-6 rounded-xl border border-[#3A4658] px-4 py-2.5 text-sm text-[#C8D4E2] transition hover:bg-[#1B2430]"
                >
                  Start exploring again
                </button>
              )}
            </div>
          ) : (
            <article
              key={user._id}
              className="group relative overflow-hidden rounded-[28px] border border-[#303744] bg-[#11151B] shadow-[0_25px_80px_rgba(0,0,0,0.3)] transition duration-300 hover:border-[#414D60]"
            >
              {/* Ambient accent */}
              <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-[#526DFF]/10 blur-[90px]" />

              {/* Photo */}
              <div className="relative h-[320px] overflow-hidden bg-[#171D26] sm:h-[430px]">
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={name}
                    className="size-full object-cover object-center transition duration-700 group-hover:scale-[1.025]"
                  />
                ) : (
                  <div className="flex size-full items-center justify-center">
                    <UserRound
                      size={90}
                      strokeWidth={1}
                      className="text-[#65768B]"
                    />
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/10 to-[#0B0D10]/20" />

                <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-[#0B0D10]/65 px-3 py-2 backdrop-blur-xl sm:left-5 sm:top-5">
                  <span className="size-2 rounded-full bg-[#8BC9A6]" />
                  <span className="text-xs font-medium text-white">
                    Available to discover
                  </span>
                </div>

                <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-[#0B0D10]/65 px-3 py-2 text-xs text-white backdrop-blur-xl sm:right-5 sm:top-5">
                  {profileIndex + 1} / {users.length}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7">
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        {name}
                        {user.age ? (
                          <span className="ml-2 font-medium text-white/80">
                            {user.age}
                          </span>
                        ) : null}
                      </h2>

                      {locationText && (
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-[#D1D9E5]">
                          <MapPin size={15} />
                          {locationText}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {user.githubUrl && (
                        <a
                          href={user.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub profile"
                          className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-lg transition hover:bg-white/15"
                        >
                          <FaGithub size={18} />
                        </a>
                      )}

                      {user.linkedinUrl && (
                        <a
                          href={user.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn profile"
                          className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white backdrop-blur-lg transition hover:bg-white/15"
                        >
                          <FaLinkedin size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="relative space-y-6 p-5 sm:p-7">
                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <Quote size={16} className="text-[#718DFF]" />
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A7B7CD]">
                      A little about me
                    </h3>
                  </div>

                  <p className="text-sm leading-7 text-[#AFBAC9]">
                    {user.about ||
                      "This developer hasn't added an introduction yet."}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedProfile(user)}
                    className="group/profile relative mt-4 inline-flex items-center gap-3 overflow-hidden rounded-full border border-[#718DFF]/30 bg-[#111722] py-2 pl-2 pr-5 text-left text-sm font-medium text-[#DCE5FF] shadow-[0_0_24px_rgba(113,141,255,0.08)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#8298FF]/70 hover:shadow-[0_0_32px_rgba(113,141,255,0.2)] active:translate-y-0"
                  >
                    <span className="relative flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#718DFF] to-[#5262D9] text-white shadow-[0_0_16px_rgba(113,141,255,0.3)]">
                      <UserRound
                        size={17}
                        className="transition-transform duration-300 group-hover/profile:scale-110"
                      />
                    </span>

                    <span className="flex flex-col items-start">
                      <span className="leading-5">Explore profile</span>
                      <span className="text-[10px] font-normal text-[#8998B5]">
                        Get to know this developer
                      </span>
                    </span>

                    <ArrowUpRight
                      size={17}
                      className="ml-1 shrink-0 text-[#8298FF] transition-transform duration-300 group-hover/profile:translate-x-0.5 group-hover/profile:-translate-y-0.5"
                    />
                  </button>
                </section>

                <section>
                  <div className="mb-3 flex items-center gap-2">
                    <Code2 size={16} className="text-[#718DFF]" />
                    <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A7B7CD]">
                      Tech stack
                    </h3>
                  </div>

                  {skills.length ? (
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <span
                          key={`${skill}-${index}`}
                          className="rounded-xl border border-[#303744] bg-[#191F29] px-3 py-2 text-xs font-medium text-[#CFD8E5] transition hover:border-[#52627B] hover:bg-[#202A38]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#7D8999]">
                      No skills added yet.
                    </p>
                  )}
                </section>

                {/* Actions */}
                <div className="border-t border-[#292F39] pt-6">
                  <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[#68788D]">
                    Make your move
                  </p>

                  <div className="flex items-center justify-center gap-5 sm:gap-8">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleAction("ignored")}
                      aria-label="Ignore developer"
                      className="group/action flex flex-col items-center gap-2 disabled:opacity-50"
                    >
                      <span className="flex size-[62px] items-center justify-center rounded-full border border-[#F06A8C]/40 bg-[#211720] text-[#F47B9A] shadow-[0_0_0_rgba(240,106,140,0)] transition duration-300 group-hover/action:border-[#F06A8C] group-hover/action:bg-[#3A1D2A] group-hover/action:shadow-[0_0_30px_rgba(240,106,140,0.22)] sm:size-[72px]">
                        <X size={28} strokeWidth={2.5} />
                      </span>
                      <span className="text-xs font-medium text-[#B4A0AA] transition group-hover/action:text-[#F47B9A]">
                        Ignore
                      </span>
                    </button>

                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleAction("interested")}
                      className="group/action flex flex-col items-center gap-2 disabled:opacity-50"
                    >
                      <span className="flex size-[86px] items-center justify-center rounded-full border border-[#718DFF]/70 bg-gradient-to-br from-[#6D84FF] to-[#4762DF] text-white shadow-[0_0_30px_rgba(93,117,255,0.25)] transition duration-300 group-hover/action:scale-105 group-hover/action:shadow-[0_0_45px_rgba(93,117,255,0.42)] sm:size-[98px]">
                        <Heart size={34} fill="currentColor" strokeWidth={1.5} />
                      </span>
                      <span className="text-xs font-semibold text-[#D9E0FF] transition group-hover/action:text-white">
                        Interested
                      </span>
                    </button>
                  </div>

                  {isPending && (
                    <p className="mt-4 text-center text-xs text-[#8FA7C2]">
                      Saving your decision...
                    </p>
                  )}
                </div>
              </div>
            </article>
          )}
        </section>

        {/* Right-side inspiration */}
        <aside className="hidden space-y-5 pt-10 xl:block">
          <div className="px-2">
            <Quote size={27} className="text-[#718DFF]" />
            <p className="mt-3 text-lg font-medium leading-7 text-[#B8C5D7]">
              Great developers
              <br />
              build great things
              <br />
              together.
            </p>
            <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#718DFF] to-transparent" />
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-[#292F39] bg-gradient-to-br from-[#151C29] to-[#10141A] p-4">
              <Users size={21} className="text-[#8298FF]" />
              <p className="mt-3 text-lg font-semibold">Your network</p>
              <p className="mt-1 text-xs leading-5 text-[#8491A4]">
                Every connection starts with a hello.
              </p>
            </div>

            <div className="rounded-2xl border border-[#292F39] bg-gradient-to-br from-[#201827] to-[#10141A] p-4">
              <Heart size={21} className="text-[#F47B9A]" />
              <p className="mt-3 text-lg font-semibold">Your next collab</p>
              <p className="mt-1 text-xs leading-5 text-[#8491A4]">
                You never know what one connection can unlock.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-[#3D382C] bg-[#1A1915] p-4">
            <div className="flex items-center gap-2 text-[#E6C58C]">
              <Lightbulb size={17} />
              <p className="text-xs font-semibold">A little tip</p>
            </div>
            <p className="mt-2 text-xs leading-6 text-[#B3AA97]">
              Look beyond the tech stack. The best connections often begin
              with shared curiosity.
            </p>
          </div>
        </aside>
      </div>
      <ProfileDetailsModal
        user={selectedProfile}
        onClose={() => setSelectedProfile(null)}
      />
      {/* Compact mobile-friendly footer */}
      <footer className="flex items-center justify-between border-t border-[#242B35] pt-4 text-xs text-[#68788D]">
        <span className="flex items-center gap-2">
          <CheckCircle2 size={14} />
          One connection can change everything.
        </span>
      </footer>
    </main>
  );
};

export default FeedPage;

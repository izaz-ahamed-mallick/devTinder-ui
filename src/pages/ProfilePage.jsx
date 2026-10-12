
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Globe,
  Mail,
  MapPin,
  Pencil,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { toast } from "sonner";
import { useCurrentUser } from "../hooks/useCurrentUser";
import DevTinderLoader from "../common/DevTinderLoader";
import CommonError from "../common/CommonError";

const ProfilePage = () => {
  const {
    data: user,
    isPending,
    isError,
    refetch,
  } = useCurrentUser();

  if (isPending) {
    return <DevTinderLoader label="Loading your profile..." />;
  }

  if (isError || !user) {
    return (
      <CommonError
        title="Unable to load your profile"
        message="Something went wrong while fetching your profile. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    "Your Name";

  const initials = fullName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const skills = Array.isArray(user.skills) ? user.skills : [];

  const socialLinks = [
    {
      label: "GitHub",
      value: user.githubUrl,
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      value: user.linkedinUrl,
      icon: FaLinkedin,
    },
    {
      label: "Portfolio",
      value: user.portfolioUrl,
      icon: Globe,
    },
  ].filter((item) => item.value);

  const getExternalUrl = (value) => {
    if (!value) return null;

    const trimmed = value.trim();

    return /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`;
  };

  return (
    <main className="min-h-screen bg-[#0B0D10] px-4 py-8 text-[#F0F2F5] sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8B929E]">
              <UserRound size={14} />
              Your account
            </div>

            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm leading-6 text-[#8B929E] sm:text-base">
              Your developer identity, all in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              toast.info("Profile editing is coming soon.")
            }
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-[#343B47] bg-[#151920] px-4 py-2.5 text-sm font-medium text-[#F0F2F5] transition hover:border-[#59677A] hover:bg-[#1A2029] sm:self-auto"
          >
            <Pencil size={15} />
            Edit profile
          </button>
        </div>

        {/* Profile card */}
        <section className="overflow-hidden rounded-2xl border border-[#2B3039] bg-[#11151B]">
          <div className="relative h-32 overflow-hidden bg-gradient-to-br from-[#202A38] via-[#151B24] to-[#0E1217] sm:h-44">
            <div className="absolute -right-10 -top-24 size-64 rounded-full border border-white/[0.05]" />
            <div className="absolute -right-1 -top-16 size-48 rounded-full border border-white/[0.06]" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-[#64758B]/40 to-transparent" />
          </div>

          <div className="relative z-10 px-5 pb-6 sm:px-8 sm:pb-8">
            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="grid size-24 shrink-0 place-items-center overflow-hidden rounded-2xl border-4 border-[#11151B] bg-[#202A38] text-2xl font-semibold text-[#D9E3F0] sm:size-28 sm:text-3xl">
                  {user.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={`${fullName}'s profile`}
                      className="size-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="min-w-0 pb-1">
                  <h2 className="break-words text-xl font-semibold sm:text-2xl">
                    {fullName}
                  </h2>

                  <p className="mt-1 break-all text-sm text-[#8B929E]">
                    {user.emailId || "Add your email"}
                  </p>
                </div>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-[#303B49] bg-[#18202A] px-3 py-1.5 text-xs font-medium text-[#C1D0E2]">
                <ShieldCheck size={14} />
                My account
              </div>
            </div>

            {/* About */}
            <div className="mt-7 border-t border-[#2B3039] pt-6">
              <div className="flex items-center gap-2 text-sm font-medium text-[#A7B7CD]">
                <BriefcaseBusiness size={16} />
                Developer overview
              </div>

              <p className="mt-3 max-w-3xl whitespace-pre-line text-sm leading-7 text-[#B1B7C1]">
                {user.about ||
                  user.bio ||
                  "Your profile is your introduction to the DevTinder community. Add a bio to tell other developers about yourself, your interests, and what you're building."}
              </p>
            </div>

            {/* Contact information */}
            <div className="mt-6 grid gap-3 border-t border-[#2B3039] pt-6 sm:grid-cols-2">
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#252B34] bg-[#0E1217] p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#1A2029] text-[#A7B7CD]">
                  <Mail size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-[#8B929E]">Email address</p>
                  <p className="mt-1 break-all text-sm font-medium">
                    {user.emailId || "Not added"}
                  </p>
                </div>
              </div>

              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#252B34] bg-[#0E1217] p-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#1A2029] text-[#A7B7CD]">
                  <MapPin size={17} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-[#8B929E]">Location</p>
                  <p className="mt-1 break-words text-sm font-medium">
                    {user.location || "Add your location"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="mt-6 rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#1A2029] text-[#A7B7CD]">
              <Code2 size={19} />
            </div>

            <div>
              <h3 className="font-semibold">Technical skills</h3>
              <p className="mt-1 text-xs text-[#8B929E]">
                Technologies and tools you work with
              </p>
            </div>
          </div>

          {skills.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2.5">
              {skills.map((skill, index) => {
                const skillName =
                  typeof skill === "string"
                    ? skill
                    : skill?.name;

                if (!skillName) return null;

                return (
                  <span
                    key={`${skillName}-${index}`}
                    className="rounded-lg border border-[#303B49] bg-[#171E27] px-3 py-2 text-sm font-medium text-[#C4D0DF]"
                  >
                    {skillName}
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-[#343B47] px-4 py-6 text-center">
              <p className="text-sm text-[#B1B7C1]">
                No skills added yet.
              </p>
              <p className="mt-1 text-xs leading-5 text-[#8B929E]">
                Add your technical skills so other developers can learn about your expertise.
              </p>
            </div>
          )}
        </section>

        {/* Developer links */}
        <section className="mt-6 rounded-2xl border border-[#2B3039] bg-[#11151B] p-5 sm:p-7">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-[#1A2029] text-[#A7B7CD]">
              <Globe size={19} />
            </div>

            <div>
              <h3 className="font-semibold">Developer links</h3>
              <p className="mt-1 text-xs text-[#8B929E]">
                Your work and professional presence
              </p>
            </div>
          </div>

          {socialLinks.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {socialLinks.map(
                ({ label, value, icon: Icon }) => (
                  <a
                    key={label}
                    href={getExternalUrl(value)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-[#2B3039] bg-[#0E1217] p-4 transition hover:border-[#53647A] hover:bg-[#151B24]"
                  >
                    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#1A2029] text-[#A7B7CD] transition group-hover:text-[#F0F2F5]">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium">
                        {label}
                      </p>
                      <p className="mt-1 truncate text-xs text-[#8B929E]">
                        {value}
                      </p>
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="shrink-0 text-[#8B929E] transition group-hover:text-[#F0F2F5]"
                    />
                  </a>
                )
              )}
            </div>
          ) : (
            <div className="mt-5 rounded-xl border border-dashed border-[#343B47] px-4 py-6 text-center">
              <p className="text-sm text-[#B1B7C1]">
                No developer links added yet.
              </p>
              <p className="mt-1 text-xs leading-5 text-[#8B929E]">
                Connect your GitHub, LinkedIn, or portfolio to showcase your work.
              </p>
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-[#626B78]">
          Your developer journey starts with a great introduction.
        </p>
      </div>
    </main>
  );
};

export default ProfilePage;

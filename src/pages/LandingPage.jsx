import {
  ArrowRight,
  Code2,
  Users,
  MessageCircle,
  Sparkles,
  Heart,
  Network,
  ChevronRight,
  Check,
  MapPin,
  Terminal,
} from "lucide-react";
import { Link } from "react-router";
import { FaGithub } from "react-icons/fa";

const features = [
  {
    icon: Users,
    title: "Meet developers",
    description:
      "Discover developers who share your interests, goals, and passion for technology.",
  },
  {
    icon: Code2,
    title: "Show your skills",
    description:
      "Showcase your tech stack, experience, and interests through your developer profile.",
  },
  {
    icon: MessageCircle,
    title: "Build connections",
    description:
      "Connect with like-minded developers and find opportunities to learn and build together.",
  },
];

const skills = ["React", "Node.js", "TypeScript", "PostgreSQL"];

const LandingPage = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0D10] text-[#F0F2F5]">
      {/* Hero */}
      <section
        id="about"
        className="relative isolate px-5 pb-20 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:px-12 lg:pt-20"
      >
        {/* Ambient background */}
        <div className="pointer-events-none absolute left-[15%] top-10 -z-10 h-72 w-72 rounded-full bg-[#A7B7CD]/10 blur-[110px]" />
        <div className="pointer-events-none absolute right-[5%] top-32 -z-10 h-64 w-64 rounded-full bg-[#465365]/10 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* Hero content */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#2B3039] bg-[#11151B] px-4 py-2.5">
              <Sparkles size={15} className="text-[#A7B7CD]" />
              <span className="text-xs font-medium tracking-wide text-[#C4CAD3] sm:text-sm">
                Your next connection starts here
              </span>
            </div>

            <h1 className="text-5xl leading-[1.08] font-bold tracking-tight sm:text-6xl lg:text-[4.5rem]">
              Good code.
              <br />
              Great people.
              <br />
              <span className="bg-gradient-to-r from-[#E0E7F0] via-[#A7B7CD] to-[#74869F] bg-clip-text text-transparent">
                Better together.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-[#969EAA] sm:text-lg">
              Meet developers who think like you, discover new skills, and
              build meaningful connections with people who share your passion
              for technology.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#A7B7CD] px-6 py-3.5 font-semibold text-[#0B0D10] shadow-lg shadow-black/20 transition hover:bg-[#C5D0DF]"
              >
                Create your profile
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/login"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#303743] bg-[#11151B]/80 px-6 py-3.5 font-medium text-[#E0E5EC] transition hover:border-[#A7B7CD]/60 hover:bg-[#171D26]"
              >
                Already a member?
                <ChevronRight size={17} />
              </Link>
            </div>

            {/* Community details */}
            <div className="mt-10 flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B0D10] bg-[#28313D]">
                  <Code2 size={16} />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B0D10] bg-[#394453]">
                  <FaGithub size={16} />
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#0B0D10] bg-[#4B5868]">
                  <Network size={16} />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-[#D7DDE6]">
                  Made for developers
                </p>
                <p className="mt-0.5 text-xs text-[#818A97]">
                  Connect beyond the code
                </p>
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#2B3039] pt-6 text-xs text-[#969EAA]">
              <span className="flex items-center gap-2">
                <Check size={14} className="text-[#A7B7CD]" />
                Developer profiles
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-[#A7B7CD]" />
                Skill discovery
              </span>
              <span className="flex items-center gap-2">
                <Check size={14} className="text-[#A7B7CD]" />
                Meaningful connections
              </span>
            </div>
          </div>

          {/* Developer discovery preview */}
          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#A7B7CD]/5 blur-2xl" />

            <div className="relative rounded-3xl border border-[#303743] bg-[#11151B] p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="flex items-center justify-between border-b border-[#2B3039] pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A7B7CD]" />
                    <p className="text-xs font-medium tracking-[0.2em] text-[#969EAA] uppercase">
                      Developer discovery
                    </p>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold">
                    Find your people.
                  </h2>
                  <p className="mt-1 text-sm text-[#818A97]">
                    Discover your next collaborator.
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#303743] bg-[#1A2029]">
                  <Network className="text-[#A7B7CD]" size={21} />
                </div>
              </div>

              {/* Example profile */}
              <article className="mt-6 rounded-2xl border border-[#303743] bg-[#0D1116] p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="h-[68px] w-[68px] shrink-0 overflow-hidden rounded-2xl border border-[#465365] bg-[#202A37]">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=180&h=180&fit=crop&crop=faces"
                      alt="Example developer"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="truncate text-lg font-semibold">
                      Alex Morgan
                    </h3>
                    <p className="mt-1 text-sm text-[#969EAA]">
                      Full-Stack Developer
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-[#465365]/60 bg-[#171D26] px-2.5 py-1 text-xs text-[#C4D0DF]">
                      <Sparkles size={12} />
                      Example profile
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs text-[#818A97]">
                  <MapPin size={14} />
                  <span>Passionate about building great products</span>
                </div>

                <p className="mt-4 text-sm leading-6 text-[#969EAA]">
                  I enjoy solving challenging problems, exploring new
                  technologies, and collaborating with other developers.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-[#303743] bg-[#151A21] px-3 py-1.5 text-xs font-medium text-[#D0D6E0]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to="/signup"
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#303743] py-3 text-sm font-medium text-[#D0D6E0] transition hover:bg-[#1A2029]"
                  >
                    <Users size={16} />
                    Discover developers
                  </Link>

                  <Link
                    to="/signup"
                    aria-label="Join DevTinder to connect"
                    className="flex h-11 w-12 cursor-pointer items-center justify-center rounded-xl bg-[#A7B7CD] text-[#0B0D10] transition hover:bg-[#C5D0DF]"
                  >
                    <Heart size={19} />
                  </Link>
                </div>
              </article>

              {/* Connection preview */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#303743] bg-[#151A21] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#222B37]">
                    <MessageCircle
                      size={19}
                      className="text-[#A7B7CD]"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Build your developer network
                    </p>
                    <p className="mt-1 text-xs text-[#818A97]">
                      Sign up to discover and connect with developers
                    </p>
                  </div>
                </div>
                <ArrowRight size={18} className="text-[#969EAA]" />
              </div>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#737D8A]">
                <Terminal size={14} />
                Preview of the DevTinder experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="border-t border-[#2B3039]/70 bg-[#0E1217] px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#A7B7CD] uppercase">
              Why DevTinder?
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Your developer journey is better together.
            </h2>

            <p className="mt-5 leading-7 text-[#969EAA]">
              A place to showcase what you build, discover what others create,
              and grow through meaningful professional connections.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <article
                key={title}
                className="group rounded-2xl border border-[#2B3039] bg-[#11151B] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#A7B7CD]/50 hover:bg-[#141922]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#303743] bg-[#1A2029] transition group-hover:border-[#465365]">
                  <Icon size={23} className="text-[#A7B7CD]" />
                </div>

                <p className="mt-7 text-xs font-medium tracking-widest text-[#737D8A]">
                  0{index + 1}
                </p>

                <h3 className="mt-2 text-xl font-semibold">{title}</h3>

                <p className="mt-3 leading-7 text-[#969EAA]">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#303743] bg-[#11151B] px-6 py-14 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-[#A7B7CD]/10 blur-[90px]" />

          <div className="relative">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#465365] bg-[#1A2029]">
              <Sparkles size={23} className="text-[#A7B7CD]" />
            </div>

            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Your next great connection is out there.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-[#969EAA]">
              Create your developer profile and start meeting people who
              share your passion for technology.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#A7B7CD] px-6 py-3.5 font-semibold text-[#0B0D10] transition hover:bg-[#C5D0DF]"
            >
              Join DevTinder
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer — no additional navbar */}
      <footer className="border-t border-[#2B3039]/70 px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="DevTinder"
              className="h-10 w-auto object-contain"
            />
          </Link>

          <p className="text-center text-sm text-[#737D8A]">
            Built for developers, by developers.
          </p>

          <p className="text-xs text-[#737D8A]">
            © {new Date().getFullYear()} DevTinder
          </p>
        </div>
      </footer>
    </main>
  );
};

export default LandingPage;

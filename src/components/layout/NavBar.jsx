
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useLogOut } from "../../hooks/useLogin";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const { mutate, isPending, isError } = useLogOut()

  const { data: user } = useCurrentUser();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsProfileOpen(false);
    mutate();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.07] bg-[#0B0D10]/95 backdrop-blur-xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          to="/"
          aria-label="DevTinder home"
          className="flex min-w-0 shrink items-center"
        >
          <img
            src="/logo.png"
            alt="DevTinder"
            className="block h-auto max-h-10 w-auto max-w-full object-contain sm:max-h-12"
          />
        </Link>

        {/* User actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-10 place-items-center rounded-xl text-[#8B929E] transition-colors hover:bg-[#151920] hover:text-[#F0F2F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7B7CD]"
          >
            <Bell size={20} strokeWidth={1.7} />

            <span
              aria-hidden="true"
              className="absolute right-[9px] top-[8px] size-2 rounded-full bg-[#A7B7CD] ring-2 ring-[#0B0D10]"
            />
          </button>

          {/* Profile dropdown */}
          {user && (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                aria-label="Open profile menu"
                aria-expanded={isProfileOpen}
                onClick={() => setIsProfileOpen((open) => !open)}
                className="flex items-center gap-2 rounded-xl border border-transparent p-1.5 transition hover:border-[#2B3039] hover:bg-[#151920] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A7B7CD]"
              >
                {user.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt=""
                    className="size-8 rounded-lg object-cover"
                  />
                ) : (
                  <span className="grid size-8 place-items-center rounded-lg bg-[#202B3A] text-sm font-semibold text-[#A7B7CD]">
                    {user.firstName?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                )}

                <span className="hidden max-w-28 truncate text-sm font-medium text-[#F0F2F5] sm:block">
                  {user.firstName || "My Account"}
                </span>

                <ChevronDown
                  size={16}
                  className={`hidden text-[#8B929E] transition-transform sm:block ${isProfileOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-3 w-60 overflow-hidden rounded-2xl border border-[#2B3039] bg-[#11151B] p-2 shadow-2xl shadow-black/30">
                  <div className="border-b border-[#2B3039] px-3 py-3">
                    <p className="truncate text-sm font-semibold text-[#F0F2F5]">
                      {[user.firstName, user.lastName]
                        .filter(Boolean)
                        .join(" ") || "Developer"}
                    </p>

                    <p className="mt-1 truncate text-xs text-[#8B929E]">
                      {user.emailId}
                    </p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#B8C0CC] transition hover:bg-[#1B222C] hover:text-[#F0F2F5]"
                    >
                      <UserRound size={17} />
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#B8C0CC] transition hover:bg-[#1B222C] hover:text-[#F0F2F5]"
                    >
                      <Settings size={17} />
                      Settings
                    </Link>
                  </div>

                  <div className="border-t border-[#2B3039] pt-2">
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isPending}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-[#E7A0A0] transition hover:bg-[#2A191C] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <LogOut size={17} />

                      {isPending ? "Logging out..." : "Logout"}
                    </button>

                    {isError && (
                      <p className="mt-2 px-3 text-xs text-red-400">
                        Logout failed. Please try again.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

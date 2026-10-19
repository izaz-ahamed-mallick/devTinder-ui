
import { useState } from "react";
import { NavLink } from "react-router";
import {
  Compass,
  Users,
  UserRoundCheck,
  MessageCircle,
  Menu,
  X,
  Code2,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

const navigationItems = [
  {
    label: "Discover",
    description: "Find developers",
    path: "/feed",
    icon: Compass,
  },
  {
    label: "Connections",
    description: "Your network",
    path: "/connections",
    icon: Users,
  },
  {
    label: "Requests",
    description: "Connection requests",
    path: "/requests",
    icon: UserRoundCheck,
  },
  {
    label: "Messages",
    description: "Your conversations",
    path: "/messages",
    icon: MessageCircle,
  },
];

const Sidebar = ({ isCollapsed, onToggleCollapse }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileOpen(false);

  const linkClass = ({ isActive }) =>
    `group relative flex items-center gap-3 overflow-hidden rounded-xl border px-3.5 py-3 transition-colors duration-200 lg:transition-[background-color,border-color,color,padding] ${
      isCollapsed ? "lg:justify-center lg:px-0" : "lg:justify-start"
    } ${
      isActive
        ? "border-[#344154] bg-[#202B3A] text-[#F0F2F5]"
        : "border-transparent text-[#929BA9] hover:bg-[#191F28] hover:text-[#F0F2F5]"
    }`;

  const desktopTextClass = `min-w-0 overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-in-out ${
    isCollapsed
      ? "lg:max-w-0 lg:-translate-x-2 lg:opacity-0"
      : "lg:max-w-[180px] lg:translate-x-0 lg:opacity-100"
  }`;

  return (
    <>
      {/* Mobile menu button */}
      <div className="mb-4 flex justify-end lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen((prev) => !prev)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          className="flex size-10 items-center justify-center rounded-xl border border-[#303744] bg-[#11151B] text-[#D4DAE3] transition hover:bg-[#202630]"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={closeMobileMenu}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-hidden border-r border-[#292F39] bg-[#11151B] p-4 transition-transform duration-300 ease-in-out lg:sticky lg:top-24 lg:z-0 lg:h-[calc(100vh-7rem)] lg:w-full lg:translate-x-0 lg:rounded-2xl lg:border lg:p-3`}
      >
        {/* Sidebar heading */}
        <div
          className={`mb-6 flex min-h-10 items-center pt-2 lg:mb-5 ${
            isCollapsed
              ? "justify-center lg:px-0"
              : "justify-between px-2"
          }`}
        >
          <div
            className={`min-w-0 overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-in-out ${
              isCollapsed
                ? "lg:max-w-0 lg:-translate-x-2 lg:opacity-0"
                : "max-w-[220px] translate-x-0 opacity-100 lg:max-w-[220px]"
            }`}
          >
            <p className="whitespace-nowrap text-xs font-semibold tracking-[0.16em] text-[#7F8A9A]">
              YOUR SPACE
            </p>
            <h2 className="mt-2 whitespace-nowrap text-lg font-semibold text-[#F0F2F5]">
              Explore DevTinder
            </h2>
          </div>

          {/* Desktop collapse button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!isCollapsed}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden size-9 shrink-0 items-center justify-center rounded-lg text-[#929BA9] transition-colors hover:bg-[#202630] hover:text-white lg:flex"
          >
            {isCollapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}
          </button>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={closeMobileMenu}
            aria-label="Close navigation"
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#929BA9] hover:bg-[#202630] hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation links */}
        <nav aria-label="Main navigation" className="space-y-1.5">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                onClick={closeMobileMenu}
                title={isCollapsed ? item.label : undefined}
                aria-label={item.label}
                className={linkClass}
              >
                <Icon size={19} className="shrink-0" />

                <span className={`${desktopTextClass} flex-1`}>
                  <span className="block whitespace-nowrap text-sm font-medium">
                    {item.label}
                  </span>
                  <span className="mt-0.5 block whitespace-nowrap text-xs text-[#7F8A9A]">
                    {item.description}
                  </span>
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom note */}
        <div className="mt-auto min-w-0 pt-6">
          <div
            className={`overflow-hidden transition-[max-height,opacity,transform] duration-300 ease-in-out ${
              isCollapsed
                ? "lg:max-h-0 lg:translate-y-2 lg:opacity-0"
                : "max-h-40 translate-y-0 opacity-100"
            }`}
          >
            <div className="rounded-xl border border-[#292F39] bg-[#0D1015] p-3.5">
              <div className="flex items-center gap-2">
                <Code2 size={17} className="shrink-0 text-[#C4D0E0]" />
                <span className="whitespace-nowrap text-xs font-medium text-[#D4DAE3]">
                  Built for developers
                </span>
              </div>
              <p className="mt-2 text-xs leading-5 text-[#7F8A9A]">
                Discover people. Share knowledge. Build connections.
              </p>
            </div>
          </div>

          {/* Icon shown when collapsed */}
          <div
            className={`hidden justify-center transition-opacity duration-300 lg:flex ${
              isCollapsed ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <div
              title="Built for developers"
              className="flex size-10 items-center justify-center rounded-xl border border-[#292F39] bg-[#0D1015] text-[#C4D0E0]"
            >
              <Code2 size={18} />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

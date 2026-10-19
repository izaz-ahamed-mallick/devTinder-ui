
import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const AuthenticatedLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-[calc(100vh-72px)] bg-[#0B0D10] text-[#F0F2F5]">
      <div
        className={`mx-auto grid max-w-[1600px] grid-cols-1 gap-5 px-4 py-5 sm:px-6 lg:gap-6 lg:px-8 lg:py-6 ${
          isCollapsed
            ? "lg:grid-cols-[76px_minmax(0,1fr)]"
            : "lg:grid-cols-[250px_minmax(0,1fr)]"
        } transition-[grid-template-columns] duration-300 ease-in-out`}
      >
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
        />

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;

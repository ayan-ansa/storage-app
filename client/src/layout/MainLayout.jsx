import Header from "@/components/Header";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-blue-950">
      <Header />
      <div className="flex-1 overflow-hidden">
        <Suspense fallback={<div>Loading....</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MainLayout;

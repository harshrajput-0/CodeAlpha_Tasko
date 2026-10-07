import { Header } from './Header';
// import { useState } from "react";
import { Sidebar } from './Sidebar';

import { Outlet } from 'react-router-dom';

export function Layout() {
  return (
    <div className="flex min-h-screen w-screen">
      <Sidebar className="hidden sm:flex" />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto pb-16 phone:pb-0 no-scrollbar p-6">
          <Outlet />
        </main>

        {/* <MobileNav className="phone:hidden text-text" /> */}
      </div>
    </div>

    // <>
    // </>
  );
}

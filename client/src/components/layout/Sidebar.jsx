import { useState } from "react";
import {
  Bell,
  ChevronLeft,
  Home,
  CircleCheck,
  ClipboardList,
  BriefcaseBusiness,
} from "lucide-react";
import { TaskoSymbol } from "../smaill-items/TaskoSymbol";
import { TaskoLogo } from "../smaill-items/Tasko";
import { Separator } from "../ui/separator";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const width = collapsed ? "w-[76px]" : "w-[264px]";

  function handleSidebarClick(event) {
    if (!collapsed) return;

    // If the click came from an interactive/component inside the sidebar,
    // don't expand it.
    if (event.target.closest("button, a, input, textarea, select")) {
      return;
    }
    setCollapsed(false);
  }

  return (
    <aside
      onClick={handleSidebarClick}
      className={`sticky top-0 h-screen shrink-0 ${width} border-r bg-background transition-[width] duration-200`}
    >
      {/* Header */}
      <div
        className={`flex h-16 items-center ${
          collapsed ? "justify-center" : "justify-between"
        } px-3`}
      >
        {!collapsed && <TaskoLogo size={34} className="pl-3" />}

        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="flex h-9 w-9 items-center justify-center rounded-md hover:bg-accent"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <TaskoSymbol size={28} />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1 p-3">
        <SidebarItem icon={<Home />} label="Home" collapsed={collapsed} />

        <SidebarItem
          icon={<Bell />}
          label="Notification"
          collapsed={collapsed}
        />

        <Separator />

        <SidebarItem
          icon={<CircleCheck />}
          label="My Tasks"
          collapsed={collapsed}
        />

        <SidebarItem
          icon={<ClipboardList />}
          label="Projects"
          collapsed={collapsed}
        />

        <SidebarItem
          icon={<BriefcaseBusiness />}
          label="Workspace"
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, collapsed }) {
  return (
    <button
      type="button"
      className={`flex w-full items-center rounded-md px-3 py-2 text-sm hover:bg-accent ${
        collapsed ? "justify-center" : "gap-3"
      }`}
      title={collapsed ? label : undefined}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>

      {!collapsed && <span className="truncate">{label}</span>}
    </button>
  );
}

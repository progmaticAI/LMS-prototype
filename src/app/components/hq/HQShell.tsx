import { useState } from "react";
import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router";
import {
  LayoutDashboard, School, Library, Users, BookOpen, Package,
  TrendingUp, GitCompare, FileBarChart, ShieldCheck, Bell,
  ClipboardList, Settings, ChevronDown, Search, LogOut,
  BarChart3, ArrowLeft, Menu, X
} from "lucide-react";

type HQCtx = { query: string; setQuery: (q: string) => void; notify: (msg: string) => void };
export function useHQCtx() { return useOutletContext<HQCtx>(); }

const navItems = [
  { section: "Overview", items: [
    { to: "/hq", label: "Dashboard", Icon: LayoutDashboard, end: true },
    { to: "/hq/schools", label: "Schools", Icon: School },
    { to: "/hq/libraries", label: "Libraries", Icon: Library },
    { to: "/hq/librarians", label: "Librarians", Icon: Users },
  ]},
  { section: "Analytics", items: [
    { to: "/hq/books", label: "Books Overview", Icon: BookOpen },
    { to: "/hq/inventory", label: "Inventory Overview", Icon: Package },
    { to: "/hq/analytics", label: "Borrowing Analytics", Icon: TrendingUp },
    { to: "/hq/comparison", label: "Branch Comparison", Icon: GitCompare },
    { to: "/hq/reports", label: "Reports", Icon: FileBarChart },
  ]},
  { section: "Administration", items: [
    { to: "/hq/users", label: "Users", Icon: Users },
    { to: "/hq/permissions", label: "Permissions", Icon: ShieldCheck },
    { to: "/hq/notifications", label: "Notifications", Icon: Bell },
    { to: "/hq/audit", label: "Audit Logs", Icon: ClipboardList },
    { to: "/hq/settings", label: "Settings", Icon: Settings },
  ]},
];

export function HQShell() {
  const nav = useNavigate();
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string|null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex" style={{fontFamily:"'DM Sans', sans-serif"}}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-[260px] flex-col bg-[#0f2419] flex transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#f4d77f] flex items-center justify-center shrink-0">
              <BarChart3 size={20} className="text-[#0f2419]"/>
            </div>
            <div>
              <p className="text-white text-[15px] leading-5" style={{fontFamily:"'DM Serif Display', serif"}}>APS Headquarters</p>
              <p className="text-[#4c7a5a] text-[9px] font-bold uppercase tracking-[.16em] mt-0.5">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {navItems.map(({ section, items }) => (
            <div key={section}>
              <p className="px-3 mb-2 text-[9px] font-bold uppercase tracking-[.18em] text-[#3d6348]">{section}</p>
              <div className="space-y-0.5">
                {items.map(({ to, label, Icon, end }) => (
                  <NavLink
                    key={to} to={to} end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] transition-colors ${isActive
                        ? "bg-[#f4d77f]/10 text-[#f4d77f] font-semibold border-l-2 border-[#f4d77f]"
                        : "text-[#7da88a] hover:bg-white/5 hover:text-white"}`
                    }
                  >
                    <Icon size={15}/>{label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-white/8 p-4 space-y-2">
          <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5">
            <div className="size-8 rounded-full bg-[#f4d77f]/10 border border-[#f4d77f]/20 flex items-center justify-center text-[10px] font-bold text-[#f4d77f] shrink-0">AH</div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[12px] font-semibold truncate">Ayesha Habib</p>
              <p className="text-[#4c7a5a] text-[10px]">HQ Administrator</p>
            </div>
            <ChevronDown size={13} className="text-[#4c7a5a]"/>
          </div>
          <button onClick={() => nav("/")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#4c7a5a] hover:text-[#f4d77f] hover:bg-white/5 text-[12px] transition-colors">
            <ArrowLeft size={13}/> Switch App
          </button>
          <button onClick={() => nav("/")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#4c7a5a] hover:text-red-400 hover:bg-red-400/5 text-[12px] transition-colors">
            <LogOut size={13}/> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)}/>}

      {/* Main */}
      <div className="flex-1 lg:pl-[260px] flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-[#e2e8e0] flex items-center gap-4 px-5 md:px-8 h-[68px]">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden size-9 rounded-lg flex items-center justify-center hover:bg-[#f0f4f8]">
            {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
          <div className="relative flex-1 max-w-[420px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9e8e]"/>
            <input
              value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search schools, books, librarians…"
              className="w-full h-10 rounded-xl border border-[#dde4da] bg-[#f6f8f4] pl-9 pr-4 text-[12px] outline-none focus:border-[#4c8056] focus:bg-white transition-colors"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => notify("3 new network alerts")} className="relative size-9 rounded-full hover:bg-[#f0f4f8] flex items-center justify-center">
              <Bell size={17} className="text-[#5a7263]"/>
              <i className="absolute top-2 right-2 size-1.5 rounded-full bg-[#e8540e]"/>
            </button>
            <div className="hidden md:flex items-center gap-2 border-l border-[#e2e8e0] pl-4 ml-2">
              <div className="size-8 rounded-full bg-[#0f2419] flex items-center justify-center text-[10px] font-bold text-[#f4d77f]">AH</div>
              <span className="text-[12px] font-semibold text-[#1c392b]">Ayesha Habib</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 py-8 md:px-8 lg:px-10 max-w-[1480px] mx-auto w-full">
          <Outlet context={{ query, setQuery, notify } satisfies HQCtx}/>
        </main>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#0f2419] border border-[#f4d77f]/20 px-4 py-3 text-[12px] font-semibold text-white shadow-2xl flex items-center gap-2">
          <Bell size={13} className="text-[#f4d77f]"/>{toast}
        </div>
      )}
    </div>
  );
}

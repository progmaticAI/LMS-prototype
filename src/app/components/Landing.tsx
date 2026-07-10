import { useNavigate } from "react-router";
import { BookOpen, BarChart3, ArrowRight, Shield, Users, Building2 } from "lucide-react";

export function Landing() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-[#0f2419] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage:"linear-gradient(rgba(244,215,127,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(244,215,127,.04) 1px,transparent 1px)", backgroundSize:"48px 48px" }}/>
      {/* Gold accents */}
      <div className="absolute top-[-80px] right-[-80px] w-[400px] h-[400px] rounded-full bg-[#f4d77f]/5 blur-3xl"/>
      <div className="absolute bottom-[-80px] left-[-80px] w-[400px] h-[400px] rounded-full bg-[#4c8056]/20 blur-3xl"/>

      <div className="relative z-10 w-full max-w-4xl">
        {/* Logo */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="size-14 rounded-2xl bg-[#f4d77f] flex items-center justify-center">
              <BookOpen size={28} className="text-[#0f2419]"/>
            </div>
          </div>
          <h1 className="text-white" style={{fontFamily:"'DM Serif Display', serif",fontSize:"clamp(32px,5vw,52px)",letterSpacing:"-0.02em",lineHeight:1.15}}>
            APS Library Network
          </h1>
          <p className="mt-3 text-[#7da88a]" style={{fontFamily:"'DM Sans', sans-serif",fontSize:"15px"}}>
            Army Public Schools — Pakistan
          </p>
          <div className="mt-4 inline-flex items-center gap-5 text-[#4c7a5a] text-[12px]" style={{fontFamily:"'DM Sans', sans-serif"}}>
            <span className="flex items-center gap-1.5"><Building2 size={12}/> 14 campuses</span>
            <span className="w-px h-3 bg-[#2d5038]"/>
            <span className="flex items-center gap-1.5"><BookOpen size={12}/> 92,480 books</span>
            <span className="w-px h-3 bg-[#2d5038]"/>
            <span className="flex items-center gap-1.5"><Users size={12}/> 31,870 members</span>
          </div>
        </div>

        {/* Two app cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* HQ Portal */}
          <button
            onClick={() => nav("/hq")}
            className="group text-left rounded-3xl border border-[#f4d77f]/20 bg-[#f4d77f]/5 p-8 hover:bg-[#f4d77f]/10 hover:border-[#f4d77f]/40 transition-all duration-200 focus:outline-none"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="size-12 rounded-xl bg-[#f4d77f]/10 border border-[#f4d77f]/20 flex items-center justify-center">
                <BarChart3 size={22} className="text-[#f4d77f]"/>
              </div>
              <div className="size-8 rounded-full border border-[#f4d77f]/20 flex items-center justify-center group-hover:border-[#f4d77f]/50 transition-colors">
                <ArrowRight size={14} className="text-[#f4d77f]/60 group-hover:text-[#f4d77f] transition-colors"/>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#f4d77f]/60" style={{fontFamily:"'DM Sans', sans-serif"}}>Application 1</span>
              <h2 className="mt-1.5 text-white text-[24px] leading-tight" style={{fontFamily:"'DM Serif Display', serif"}}>
                Headquarters<br/>Admin Portal
              </h2>
            </div>
            <p className="text-[#7da88a] text-[13px] leading-relaxed mb-6" style={{fontFamily:"'DM Sans', sans-serif"}}>
              Monitor all 14 school libraries network-wide. Analytics, branch performance, inventory oversight, and system administration.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Dashboard","Schools","Analytics","Reports","Users"].map(t =>
                <span key={t} className="rounded-full border border-[#f4d77f]/15 px-2.5 py-1 text-[10px] text-[#f4d77f]/60" style={{fontFamily:"'DM Sans', sans-serif"}}>{t}</span>
              )}
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#f4d77f] text-[12px] font-semibold" style={{fontFamily:"'DM Sans', sans-serif"}}>
              <Shield size={13}/> Ayesha Habib · HQ Administrator
            </div>
          </button>

          {/* Library App */}
          <button
            onClick={() => nav("/lib")}
            className="group text-left rounded-3xl border border-[#4c8056]/30 bg-[#4c8056]/8 p-8 hover:bg-[#4c8056]/15 hover:border-[#4c8056]/50 transition-all duration-200 focus:outline-none"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="size-12 rounded-xl bg-[#4c8056]/15 border border-[#4c8056]/20 flex items-center justify-center">
                <BookOpen size={22} className="text-[#7dc48d]"/>
              </div>
              <div className="size-8 rounded-full border border-[#4c8056]/20 flex items-center justify-center group-hover:border-[#4c8056]/50 transition-colors">
                <ArrowRight size={14} className="text-[#7dc48d]/60 group-hover:text-[#7dc48d] transition-colors"/>
              </div>
            </div>
            <div className="mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[.16em] text-[#7dc48d]/60" style={{fontFamily:"'DM Sans', sans-serif"}}>Application 2</span>
              <h2 className="mt-1.5 text-white text-[24px] leading-tight" style={{fontFamily:"'DM Serif Display', serif"}}>
                School Library<br/>Management
              </h2>
            </div>
            <p className="text-[#7da88a] text-[13px] leading-relaxed mb-6" style={{fontFamily:"'DM Sans', sans-serif"}}>
              Day-to-day library operations. Issue &amp; return books, manage members, catalog, circulation, inventory and reports.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Dashboard","Catalog","Members","Circulation","Inventory"].map(t =>
                <span key={t} className="rounded-full border border-[#4c8056]/25 px-2.5 py-1 text-[10px] text-[#7dc48d]/60" style={{fontFamily:"'DM Sans', sans-serif"}}>{t}</span>
              )}
            </div>
            <div className="mt-6 flex items-center gap-2 text-[#7dc48d] text-[12px] font-semibold" style={{fontFamily:"'DM Sans', sans-serif"}}>
              <BookOpen size={13}/> APS Lahore Cantt · Branch Librarian
            </div>
          </button>
        </div>

        <p className="text-center mt-10 text-[#3d6348] text-[11px]" style={{fontFamily:"'DM Mono', monospace"}}>
          APS LIBRARY NETWORK · PAKISTAN · PROTOTYPE v1.0
        </p>
      </div>
    </div>
  );
}

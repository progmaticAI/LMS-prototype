import { useState } from "react";
import { useNavigate } from "react-router";
import { useHQCtx } from "./HQShell";
import { schools } from "../../data/mockData";
import { Building2, Search, Filter, ArrowUpDown, Eye, AlertTriangle, CheckCircle2 } from "lucide-react";

export function HQSchools() {
  const nav = useNavigate();
  const { query } = useHQCtx();
  const [localQ, setLocalQ] = useState(query);
  const [sortBy, setSortBy] = useState<"name"|"health"|"books"|"overdue">("health");
  const [cityFilter, setCityFilter] = useState("All");

  const cities = ["All", ...Array.from(new Set(schools.map(s => s.city)))];

  const filtered = schools
    .filter(s =>
      (cityFilter === "All" || s.city === cityFilter) &&
      (s.name.toLowerCase().includes(localQ.toLowerCase()) ||
       s.city.toLowerCase().includes(localQ.toLowerCase()) ||
       s.librarian.toLowerCase().includes(localQ.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "health") return b.healthScore - a.healthScore;
      if (sortBy === "books") return b.totalBooks - a.totalBooks;
      return b.overdue - a.overdue;
    });

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><Building2 size={12}/> Network Management</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Schools</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">All 14 APS campuses across Pakistan. Click any row to view the library summary.</p>
      </div>

      {/* Controls */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] overflow-hidden shadow-sm">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[#e8ece5]">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9e8e]"/>
            <input value={localQ} onChange={e => setLocalQ(e.target.value)}
              placeholder="Search schools…"
              className="w-full h-9 rounded-xl border border-[#dde4da] bg-[#f6f8f4] pl-8 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-[#78897c]"/>
            {cities.map(c => (
              <button key={c} onClick={() => setCityFilter(c)}
                className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors ${cityFilter===c?"bg-[#0f2419] text-white":"bg-[#f0f4f0] text-[#5a7263] hover:bg-[#e4ece4]"}`}
              >{c}</button>
            ))}
          </div>
          <button onClick={() => setSortBy(s => s==="health"?"books":s==="books"?"overdue":s==="overdue"?"name":"health")}
            className="ml-auto flex items-center gap-1.5 rounded-lg border border-[#dde4da] px-3 py-1.5 text-[11px] text-[#5a7263] hover:bg-[#f0f4f0]">
            <ArrowUpDown size={12}/> Sort: {sortBy}
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#f6f8f4] border-b border-[#e8ece5]">
              <tr className="text-[9px] font-bold uppercase tracking-[.14em] text-[#78897c]">
                <th className="px-6 py-3">School</th>
                <th>Librarian</th>
                <th>Books</th>
                <th>Borrowed</th>
                <th>Overdue</th>
                <th>Members</th>
                <th>Health</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f0]">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-[#f8faf6] cursor-pointer" onClick={() => nav(`/hq/schools/${s.id}`)}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-xl bg-[#0f2419]/8 flex items-center justify-center shrink-0">
                        <Building2 size={15} className="text-[#0f2419]"/>
                      </div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0f2419]">{s.name}</p>
                        <p className="text-[10px] text-[#78897c]">{s.location}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-[12px] text-[#2d4030]">{s.librarian}</p>
                    <p className="text-[10px] text-[#8a9e8e]">{s.email}</p>
                  </td>
                  <td className="text-[12px] font-semibold text-[#1c392b]">{s.totalBooks.toLocaleString()}</td>
                  <td className="text-[12px] text-[#4c6854]">{s.borrowed.toLocaleString()}</td>
                  <td>
                    <span className={`text-[11px] font-semibold ${s.overdue > 40 ? "text-[#c0392b]" : s.overdue > 20 ? "text-[#e8943a]" : "text-[#4c8056]"}`}>
                      {s.overdue > 30 && <AlertTriangle size={11} className="inline mr-1"/>}
                      {s.overdue}
                    </span>
                  </td>
                  <td className="text-[12px] text-[#4c6854]">{s.members.toLocaleString()}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-[#e8ece5]">
                        <div className="h-full rounded-full" style={{width:`${s.healthScore}%`,background:s.healthScore>=93?"#4c8056":s.healthScore>=88?"#e8943a":"#c0392b"}}/>
                      </div>
                      <span className="text-[11px] font-bold" style={{color:s.healthScore>=93?"#2d7a4a":s.healthScore>=88?"#8a5a1a":"#c0392b"}}>{s.healthScore}%</span>
                    </div>
                  </td>
                  <td className="pr-6">
                    <button className="flex items-center gap-1.5 text-[11px] font-bold text-[#4c8056] hover:text-[#0f2419] transition-colors">
                      <Eye size={13}/> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-[#f6f8f4] border-t border-[#e8ece5] text-[11px] text-[#78897c]">
          Showing {filtered.length} of {schools.length} schools
        </div>
      </div>
    </div>
  );
}

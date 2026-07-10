import { useState } from "react";
import { useNavigate } from "react-router";
import { schools } from "../../data/mockData";
import { Users, Mail, Phone, Search, Eye, Star } from "lucide-react";

export function HQLibrarians() {
  const nav = useNavigate();
  const [q, setQ] = useState("");

  const librarians = schools
    .map(s => ({ ...s, score: s.healthScore }))
    .filter(s => s.librarian.toLowerCase().includes(q.toLowerCase()) || s.name.toLowerCase().includes(q.toLowerCase()))
    .sort((a, b) => b.score - a.score);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><Users size={12}/> Network Management</p>
          <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Librarians</h1>
          <p className="mt-2 text-[#5a7263] text-[13px]">All active librarians across the APS network.</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#0f2419] text-[#f4d77f] text-[12px] font-semibold hover:bg-[#1a3526] transition-colors">
          + Add Librarian
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9e8e]"/>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search librarians…"
          className="w-full h-10 rounded-xl border border-[#dde4da] bg-white pl-9 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
      </div>

      <div className="rounded-2xl bg-white border border-[#e2e8e0] overflow-hidden shadow-sm">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-[#f6f8f4] border-b border-[#e8ece5] text-[9px] font-bold uppercase tracking-[.14em] text-[#78897c]">
            <tr>
              <th className="px-6 py-3">Librarian</th>
              <th>School</th>
              <th>Contact</th>
              <th>Books managed</th>
              <th>Overdue</th>
              <th>Performance</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f0f4f0]">
            {librarians.map((s, i) => {
              const initials = s.librarian.split(" ").map(n=>n[0]).join("").slice(0,2);
              const colors = ["#d7e5d6","#d4e6f1","#fae3d9","#e8d5f5","#d5f5e3","#fef9e7","#e4e9f3","#fdedec","#eaf2ff","#e8f8f5"];
              const color = colors[i % colors.length];
              return (
                <tr key={s.id} className="hover:bg-[#f8faf6]">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full flex items-center justify-center text-[11px] font-bold text-[#2d5038]" style={{background:color}}>{initials}</div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0f2419]">{s.librarian}</p>
                        {i === 0 && <div className="flex items-center gap-1 text-[9px] text-[#b8943a] font-bold mt-0.5"><Star size={9} fill="currentColor"/> Top performer</div>}
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-[12px] text-[#2d4030]">{s.name}</p>
                    <p className="text-[10px] text-[#8a9e8e]">{s.city}</p>
                  </td>
                  <td>
                    <div className="space-y-0.5">
                      <p className="text-[11px] flex items-center gap-1.5 text-[#5a7263]"><Mail size={10}/>{s.email}</p>
                      <p className="text-[11px] flex items-center gap-1.5 text-[#5a7263]"><Phone size={10}/>{s.phone}</p>
                    </div>
                  </td>
                  <td className="text-[12px] font-semibold text-[#1c392b]">{s.totalBooks.toLocaleString()}</td>
                  <td>
                    <span className={`text-[11px] font-semibold ${s.overdue>40?"text-[#c0392b]":s.overdue>20?"text-[#e8943a]":"text-[#4c8056]"}`}>{s.overdue}</span>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#e8ece5]">
                        <div className="h-full rounded-full" style={{width:`${s.healthScore}%`,background:s.healthScore>=93?"#4c8056":s.healthScore>=88?"#e8943a":"#c0392b"}}/>
                      </div>
                      <span className="text-[11px] font-bold" style={{color:s.healthScore>=93?"#2d7a4a":"#1c392b"}}>{s.healthScore}%</span>
                    </div>
                  </td>
                  <td className="pr-6">
                    <button onClick={() => nav(`/hq/schools/${s.id}`)} className="flex items-center gap-1 text-[11px] font-bold text-[#4c8056]">
                      <Eye size={12}/> View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

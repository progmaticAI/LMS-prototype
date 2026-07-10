import { useNavigate } from "react-router";
import { schools } from "../../data/mockData";
import { Library, BookOpen, Clock3, Users, Eye, TrendingUp } from "lucide-react";

export function HQLibraries() {
  const nav = useNavigate();
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><Library size={12}/> Network Management</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Libraries</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">Library-specific inventory, policies, and operational data for all campuses.</p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {schools.map(s => {
          const availPct = Math.round(s.available / s.totalBooks * 100);
          return (
            <div key={s.id} className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm hover:border-[#4c8056]/40 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#b8943a]">{s.code}</p>
                  <h3 className="text-[14px] font-semibold text-[#0f2419] mt-1 leading-tight">{s.name}</h3>
                  <p className="text-[11px] text-[#78897c] mt-0.5">{s.location}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${s.healthScore>=93?"bg-[#e8f5e9] text-[#2e7d32]":s.healthScore>=88?"bg-[#fff8e1] text-[#f57f17]":"bg-[#ffebee] text-[#c62828]"}`}>
                  {s.healthScore}%
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label:"Books", value: s.totalBooks.toLocaleString(), Icon: BookOpen, color:"#4c8056" },
                  { label:"Borrowed", value: s.borrowed.toLocaleString(), Icon: Clock3, color:"#b8943a" },
                  { label:"Members", value: s.members.toLocaleString(), Icon: Users, color:"#1a5276" },
                ].map(item => (
                  <div key={item.label} className="text-center rounded-xl bg-[#f6f8f4] p-2.5">
                    <item.Icon size={13} className="mx-auto mb-1" style={{color:item.color}}/>
                    <p className="text-[13px] font-bold" style={{color:item.color}}>{item.value}</p>
                    <p className="text-[9px] text-[#8a9e8e]">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#78897c]">Availability</span>
                  <span className="font-semibold text-[#2d7a4a]">{availPct}%</span>
                </div>
                <div className="h-2 rounded-full bg-[#e8ece5]">
                  <div className="h-full rounded-full bg-[#4c8056]" style={{width:`${availPct}%`}}/>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#e8ece5]">
                <div>
                  <p className="text-[10px] text-[#78897c]">Librarian</p>
                  <p className="text-[12px] font-semibold text-[#1c392b]">{s.librarian}</p>
                </div>
                <button onClick={() => nav(`/hq/schools/${s.id}`)}
                  className="flex items-center gap-1.5 text-[11px] font-bold text-[#4c8056] hover:text-[#0f2419] transition-colors">
                  <Eye size={13}/> View
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

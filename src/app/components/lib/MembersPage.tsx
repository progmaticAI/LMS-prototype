import { useState } from "react";
import { useNavigate } from "react-router";
import { useLibCtx } from "./LibShell";
import { students, teachers } from "../../data/mockData";
import { Users, GraduationCap, Briefcase, Search, Plus, Download, Upload, Eye, AlertTriangle, Filter } from "lucide-react";

export function MembersPage() {
  const nav = useNavigate();
  const { notify } = useLibCtx();
  const [tab, setTab] = useState<"students"|"teachers">("students");
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [classFilter, setClassFilter] = useState("All");

  const classes = ["All","Grade 6","Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12"];

  const filteredStudents = students.filter(s =>
    (statusFilter==="All" || s.status===statusFilter) &&
    (classFilter==="All" || s.class===classFilter) &&
    (s.name.toLowerCase().includes(q.toLowerCase()) || s.admissionNo.toLowerCase().includes(q.toLowerCase()) || s.class.toLowerCase().includes(q.toLowerCase()))
  );

  const filteredTeachers = teachers.filter(t =>
    t.name.toLowerCase().includes(q.toLowerCase()) || t.department.toLowerCase().includes(q.toLowerCase()) || t.employeeId.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><Users size={12}/> Librarian workspace · Members</p>
          <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Students & staff.</h1>
          <p className="mt-2 text-[13px] text-[#718174]">Manage library members, borrowing history, and fines.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => notify("Bulk import opened")} className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#dce3d8] text-[12px] text-[#617265] hover:bg-[#f0f4ee]">
            <Upload size={13}/> Bulk import
          </button>
          <button onClick={() => notify("Register member form opened")} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
            <Plus size={14}/> Register member
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        <button onClick={()=>setTab("students")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold transition-all ${tab==="students"?"bg-[#1d5139] text-white":"bg-[#fcfdf9] border border-[#dde4da] text-[#617265] hover:bg-[#f0f4ee]"}`}>
          <GraduationCap size={15}/> Students ({students.length})
        </button>
        <button onClick={()=>setTab("teachers")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[12px] font-semibold transition-all ${tab==="teachers"?"bg-[#1d5139] text-white":"bg-[#fcfdf9] border border-[#dde4da] text-[#617265] hover:bg-[#f0f4ee]"}`}>
          <Briefcase size={15}/> Teaching staff ({teachers.length})
        </button>
      </div>

      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[#e6ebe4]">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748277]"/>
            <input value={q} onChange={e=>setQ(e.target.value)}
              placeholder={tab==="students"?"Name or admission number…":"Name or employee ID…"}
              className="w-full h-9 rounded-xl border border-[#dce3d8] bg-[#f6f8f4] pl-8 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
          </div>
          {tab==="students" && (
            <>
              <div className="flex items-center gap-1 flex-wrap">
                {["All","Active","Inactive","Suspended"].map(s=>(
                  <button key={s} onClick={()=>setStatusFilter(s)}
                    className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all ${statusFilter===s?"bg-[#1d5139] text-white":"text-[#617265] hover:bg-[#f0f4ee]"}`}>{s}</button>
                ))}
              </div>
              <select value={classFilter} onChange={e=>setClassFilter(e.target.value)}
                className="h-9 rounded-xl border border-[#dce3d8] bg-white px-3 text-[11px] outline-none">
                {classes.map(c=><option key={c}>{c}</option>)}
              </select>
            </>
          )}
          <button onClick={() => notify("Members exported")} className="ml-auto flex items-center gap-1.5 text-[11px] font-bold text-[#2d6243]">
            <Download size={12}/> Export
          </button>
        </div>

        {tab === "students" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
                <tr><th className="px-6 py-3">Student</th><th>Admission No.</th><th>Class</th><th>Current loans</th><th>Total borrowed</th><th>Fines</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {filteredStudents.map(s=>(
                  <tr key={s.id} className="border-b border-[#edf0ec] last:border-0 hover:bg-[#f8faf6] cursor-pointer" onClick={()=>nav(`/lib/members/${s.id}`)}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold text-[#28563d] shrink-0" style={{background:s.color}}>{s.initials}</div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#1c392b]">{s.name}</p>
                          <p className="text-[10px] text-[#78897c]">Guardian: {s.guardianName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-[10px] text-[#4c8056]">{s.admissionNo}</td>
                    <td className="text-[11px] text-[#5a7263]">{s.class} · {s.section}</td>
                    <td className="text-[11px] font-semibold text-[#b8943a]">{s.currentBorrowed}</td>
                    <td className="text-[11px] text-[#5a7263]">{s.totalBorrowed}</td>
                    <td>
                      {s.pendingFines > 0 ? (
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-[#c0392b]">
                          <AlertTriangle size={10}/> PKR {s.pendingFines}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#4c8056]">Clear</span>
                      )}
                    </td>
                    <td>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.status==="Active"?"bg-[#e8f5e9] text-[#2e7d32]":s.status==="Suspended"?"bg-[#ffebee] text-[#c0392b]":"bg-[#f5f5f5] text-[#9e9e9e]"}`}>{s.status}</span>
                    </td>
                    <td className="pr-5">
                      <button className="flex items-center gap-1 text-[11px] font-bold text-[#2d6243]"><Eye size={12}/>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
                <tr><th className="px-6 py-3">Teacher</th><th>Employee ID</th><th>Department</th><th>Current loans</th><th>Total borrowed</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {filteredTeachers.map(t=>(
                  <tr key={t.id} className="border-b border-[#edf0ec] last:border-0 hover:bg-[#f8faf6] cursor-pointer" onClick={()=>nav(`/lib/members/t-${t.id}`)}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold text-[#28563d] shrink-0" style={{background:t.color}}>{t.initials}</div>
                        <div>
                          <p className="text-[12px] font-semibold text-[#1c392b]">{t.name}</p>
                          <p className="text-[10px] text-[#78897c]">{t.designation}</p>
                        </div>
                      </div>
                    </td>
                    <td className="font-mono text-[10px] text-[#4c8056]">{t.employeeId}</td>
                    <td className="text-[11px] text-[#5a7263]">{t.department}</td>
                    <td className="text-[11px] font-semibold text-[#b8943a]">{t.currentBorrowed}</td>
                    <td className="text-[11px] text-[#5a7263]">{t.totalBorrowed}</td>
                    <td><span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${t.status==="Active"?"bg-[#e8f5e9] text-[#2e7d32]":"bg-[#f5f5f5] text-[#9e9e9e]"}`}>{t.status}</span></td>
                    <td className="pr-5">
                      <button className="flex items-center gap-1 text-[11px] font-bold text-[#2d6243]"><Eye size={12}/>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="px-6 py-3 bg-[#f6f8f4] border-t border-[#e6ebe4] text-[11px] text-[#78897c]">
          Showing {tab==="students"?filteredStudents.length:filteredTeachers.length} {tab}
        </div>
      </div>
    </div>
  );
}

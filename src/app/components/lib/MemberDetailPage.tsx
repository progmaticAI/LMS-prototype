import { useParams, useNavigate } from "react-router";
import { students, teachers, loans, fmtDate } from "../../data/mockData";
import { useLibCtx } from "./LibShell";
import { ArrowLeft, Edit, Phone, Mail, BookOpen, Clock3, AlertTriangle, CreditCard } from "lucide-react";
import { useState } from "react";

export function MemberDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { notify, openIssue } = useLibCtx();
  const [activeTab, setActiveTab] = useState<"current"|"history"|"fines">("current");

  const isTeacher = id?.startsWith("t-");
  const realId = isTeacher ? id!.replace("t-","") : id;

  const member = isTeacher
    ? teachers.find(t => t.id === realId)
    : students.find(s => s.id === realId);

  if (!member) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <BookOpen size={32} className="text-[#c0d0c0]"/>
      <p className="text-[#78897c]">Member not found.</p>
      <button onClick={() => nav("/lib/members")} className="text-[#4c8056] font-semibold text-sm">← Back to members</button>
    </div>
  );

  const memberLoans = loans.filter(l => l.memberId === realId || (isTeacher && l.memberType==="Teacher" && l.memberName.includes((member as any).name?.split(" ")[1]||"")));
  const activeLoans = memberLoans.filter(l => l.status !== "Returned");
  const returnedLoans = memberLoans.filter(l => l.status === "Returned");
  const overdueLoans = memberLoans.filter(l => l.status === "Overdue");

  const isStudent = !isTeacher;
  const s = member as any;

  const initials = (s.name||"").split(" ").map((n:string)=>n[0]).join("").slice(0,2);

  return (
    <div>
      <div className="flex items-center gap-2 mb-6 text-[12px] text-[#78897c]">
        <button onClick={()=>nav("/lib/members")} className="flex items-center gap-1.5 hover:text-[#4c8056] font-semibold transition-colors">
          <ArrowLeft size={13}/> Members
        </button>
        <span>/</span>
        <span className="text-[#1c392b] font-semibold">{s.name}</span>
      </div>

      {/* Profile card */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-6 mb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="size-16 rounded-2xl flex items-center justify-center text-[18px] font-bold text-[#28563d] shrink-0" style={{background:s.color||"#d7e5d6"}}>{initials}</div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-[22px] text-[#1c392b]" style={{fontFamily:"'DM Serif Display', serif"}}>{s.name}</h1>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.status==="Active"?"bg-[#e8f5e9] text-[#2e7d32]":s.status==="Suspended"?"bg-[#ffebee] text-[#c0392b]":"bg-[#f5f5f5] text-[#9e9e9e]"}`}>{s.status}</span>
              </div>
              {isStudent ? (
                <p className="text-[13px] text-[#618165]">Student · {s.class} · Section {s.section}</p>
              ) : (
                <p className="text-[13px] text-[#618165]">{s.designation} · {s.department} Dept.</p>
              )}
              <div className="flex flex-wrap gap-4 mt-3 text-[12px] text-[#78897c]">
                {isStudent ? (
                  <>
                    <span>Adm. No: <b className="text-[#1c392b] font-mono">{s.admissionNo}</b></span>
                    <span>Guardian: <b className="text-[#1c392b]">{s.guardianName}</b></span>
                    <span className="flex items-center gap-1"><Phone size={11}/>{s.guardianPhone}</span>
                  </>
                ) : (
                  <>
                    <span>Emp. ID: <b className="text-[#1c392b] font-mono">{s.employeeId}</b></span>
                    <span className="flex items-center gap-1"><Mail size={11}/>{s.email}</span>
                    <span className="flex items-center gap-1"><Phone size={11}/>{s.phone}</span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={openIssue} className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
              Issue book
            </button>
            <button onClick={() => notify("Edit member form opened")} className="size-9 rounded-xl border border-[#dce3d8] flex items-center justify-center hover:bg-[#f0f4ee] text-[#617265]">
              <Edit size={14}/>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-[#e8ece5]">
          {[
            { label:"Currently borrowed", value: s.currentBorrowed?.toString()||"0", color:"#b8943a" },
            { label:"Total borrowed", value: s.totalBorrowed?.toString()||"0", color:"#4c8056" },
            { label:"Pending fines", value: s.pendingFines > 0 ? `PKR ${s.pendingFines}` : "None", color:s.pendingFines>0?"#c0392b":"#4c8056" },
          ].map(item=>(
            <div key={item.label} className="rounded-xl bg-[#f6f8f4] p-3">
              <p className="text-[10px] text-[#78897c] mb-1">{item.label}</p>
              <p className="text-[20px] leading-none font-semibold" style={{fontFamily:"'DM Serif Display', serif",color:item.color}}>{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(["current","history","fines"] as const).map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)}
            className={`rounded-xl px-4 py-2 text-[12px] font-semibold capitalize transition-all ${activeTab===t?"bg-[#1d5139] text-white":"bg-[#fcfdf9] border border-[#dde4da] text-[#617265] hover:bg-[#f0f4ee]"}`}>
            {t==="current"?"Current loans":"history"===t?"Borrowing history":"Fine history"}
            {t==="current"?` (${activeLoans.length})`:t==="history"?` (${returnedLoans.length})`:"" }
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden">
        {activeTab === "current" && (
          activeLoans.length === 0 ? (
            <div className="text-center p-10"><BookOpen size={28} className="text-[#c0d0c0] mx-auto mb-3"/><p className="text-[#78897c]">No active loans.</p></div>
          ) : (
            <table className="w-full text-left">
              <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
                <tr><th className="px-6 py-3">Book</th><th>Loan ID</th><th>Issued</th><th>Due</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {activeLoans.map(l => {
                  const statusCls = l.status === "Overdue" ? "bg-[#ffebee] text-[#c0392b]" : "bg-[#e8f1e7] text-[#347246]";
                  return (
                  <tr key={l.id} className="border-b border-[#edf0ec] last:border-0">
                    <td className="px-6 py-3.5">
                      <p className="text-[12px] font-semibold text-[#1c392b]">{l.bookTitle}</p>
                      <p className="text-[10px] text-[#78897c]">{l.accessionNo} · {l.copyNo}</p>
                    </td>
                    <td className="font-mono text-[10px] text-[#4c8056]">{l.id}</td>
                    <td className="text-[11px] text-[#5a7263]">{l.issueDate}</td>
                    <td className="text-[11px] text-[#5a7263]">{l.dueDate}</td>
                    <td><span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${statusCls}`}>{l.status}</span></td>
                    <td className="pr-6">
                      <button onClick={() => notify(`Renew initiated for ${l.bookTitle}`)} className="text-[11px] font-bold text-[#4c8056]">Renew</button>
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          )
        )}
        {activeTab === "history" && (
          returnedLoans.length === 0 ? (
            <div className="text-center p-10"><Clock3 size={28} className="text-[#c0d0c0] mx-auto mb-3"/><p className="text-[#78897c]">No returned loans yet.</p></div>
          ) : (
            <table className="w-full text-left">
              <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
                <tr><th className="px-6 py-3">Book</th><th>Issued</th><th>Due</th><th>Returned</th><th>Fine</th></tr>
              </thead>
              <tbody>
                {returnedLoans.map(l=>(
                  <tr key={l.id} className="border-b border-[#edf0ec] last:border-0">
                    <td className="px-6 py-3.5">
                      <p className="text-[12px] font-semibold text-[#1c392b]">{l.bookTitle}</p>
                      <p className="text-[10px] text-[#78897c]">{l.accessionNo}</p>
                    </td>
                    <td className="text-[11px] text-[#5a7263]">{l.issueDate}</td>
                    <td className="text-[11px] text-[#5a7263]">{l.dueDate}</td>
                    <td className="text-[11px] text-[#5a7263]">{l.returnDate||"—"}</td>
                    <td className="text-[11px]">{l.fine>0?<span className="text-[#c0392b] font-semibold">PKR {l.fine}</span>:<span className="text-[#4c8056]">None</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
        {activeTab === "fines" && (
          <div className="p-6">
            {overdueLoans.length === 0 && (s.pendingFines||0) === 0 ? (
              <div className="text-center py-6"><CreditCard size={28} className="text-[#c0d0c0] mx-auto mb-3"/><p className="text-[#78897c]">No pending fines.</p></div>
            ) : (
              <div className="space-y-3">
                {overdueLoans.map(l=>(
                  <div key={l.id} className="flex items-center justify-between rounded-xl border border-[#ffe5cc] bg-[#fff8f0] p-4">
                    <div>
                      <p className="text-[12px] font-semibold text-[#1c392b]">{l.bookTitle}</p>
                      <p className="text-[10px] text-[#78897c]">Due: {l.dueDate} · Overdue</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[14px] font-bold text-[#c0392b]">PKR {l.fine}</p>
                      <button onClick={() => notify(`Fine collected for ${l.bookTitle}`)} className="text-[10px] font-bold text-[#4c8056] mt-1">Mark collected</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

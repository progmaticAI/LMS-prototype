import { useState } from "react";
import { useLibCtx } from "./LibShell";
import { loans } from "../../data/mockData";
import { ArrowLeftRight, RefreshCw, BookMarked, Clock3, AlertTriangle, Search, Filter, Download } from "lucide-react";

const tabs = [
  { id:"active", label:"Active loans" },
  { id:"overdue", label:"Overdue" },
  { id:"returned", label:"Returned today" },
  { id:"all", label:"All transactions" },
] as const;

export function CirculationPage() {
  const { notify, openIssue, openReturn } = useLibCtx();
  const [tab, setTab] = useState<"active"|"overdue"|"returned"|"all">("active");
  const [q, setQ] = useState("");
  const [showRenew, setShowRenew] = useState<typeof loans[0]|null>(null);

  const filtered = loans.filter(l => {
    const qMatch = l.bookTitle.toLowerCase().includes(q.toLowerCase()) || l.memberName.toLowerCase().includes(q.toLowerCase()) || l.id.toLowerCase().includes(q.toLowerCase());
    if (!qMatch) return false;
    if (tab === "active") return l.status === "Active";
    if (tab === "overdue") return l.status === "Overdue";
    if (tab === "returned") return l.status === "Returned";
    return true;
  });

  const counts = {
    active: loans.filter(l=>l.status==="Active").length,
    overdue: loans.filter(l=>l.status==="Overdue").length,
    returned: loans.filter(l=>l.status==="Returned").length,
    all: loans.length,
  };

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><ArrowLeftRight size={12}/> Librarian workspace · Circulation</p>
          <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Issue & Return.</h1>
          <p className="mt-2 text-[13px] text-[#718174]">Manage all book loans, returns, renewals, and fines.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={openReturn} className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#dce3d8] text-[12px] text-[#617265] hover:bg-[#f0f4ee]">
            <RefreshCw size={13}/> Return
          </button>
          <button onClick={openIssue} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
            <ArrowLeftRight size={14}/> Issue book
          </button>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label:"Active loans", value: counts.active.toString(), sub:"Currently with borrowers", color:"#4c8056", Icon:Clock3 },
          { label:"Overdue", value: counts.overdue.toString(), sub:"Past due date", color:"#c0392b", Icon:AlertTriangle },
          { label:"Returned today", value:"5", sub:"Processed this session", color:"#2d7a4a", Icon:RefreshCw },
          { label:"Issued today", value:"8", sub:"New loans today", color:"#1a5276", Icon:ArrowLeftRight },
        ].map(item=>(
          <div key={item.label} className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-4 shadow-[0_4px_12px_rgba(25,55,38,.04)]">
            <div className="size-9 rounded-xl flex items-center justify-center mb-3" style={{background:item.color+"15"}}>
              <item.Icon size={16} style={{color:item.color}}/>
            </div>
            <p className="text-[11px] text-[#748277] mb-1">{item.label}</p>
            <p className="text-[26px] leading-none text-[#1c392b]" style={{fontFamily:"'DM Serif Display', serif",color:item.color}}>{item.value}</p>
            <p className="text-[10px] text-[#8a9e8e] mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden">
        {/* Tabs */}
        <div className="flex gap-0 border-b border-[#e6ebe4]">
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`flex-1 py-3 text-[11px] font-semibold transition-all ${tab===t.id?"border-b-2 border-[#1d5139] text-[#1d5139]":"text-[#617265] hover:bg-[#f0f4ee]"}`}>
              {t.label} ({counts[t.id]})
            </button>
          ))}
        </div>

        {/* Search + filter row */}
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[#e6ebe4]">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748277]"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by book, borrower or loan ID…"
              className="w-full h-9 rounded-xl border border-[#dce3d8] bg-[#f6f8f4] pl-8 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
          </div>
          <button onClick={() => notify("Filters opened")} className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#dce3d8] text-[11px] text-[#617265]">
            <Filter size={12}/> Filters
          </button>
          <button onClick={() => notify("Exported")} className="flex items-center gap-1.5 text-[11px] font-bold text-[#2d6243] ml-auto">
            <Download size={12}/> Export
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
              <tr>
                <th className="px-6 py-3">Loan ID</th>
                <th>Book</th>
                <th>Borrower</th>
                <th>Issued</th>
                <th>Due date</th>
                <th>Status</th>
                <th>Fine</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l=>(
                <tr key={l.id} className="border-b border-[#edf0ec] last:border-0 hover:bg-[#f8faf6]">
                  <td className="px-6 py-3.5 font-mono text-[10px] text-[#4c8056]">{l.id}</td>
                  <td>
                    <p className="text-[12px] font-semibold text-[#1c392b]">{l.bookTitle}</p>
                    <p className="text-[10px] text-[#78897c]">{l.accessionNo} · {l.copyNo}</p>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0" style={{background:l.initColor,color:"#28563d"}}>{l.initials}</div>
                      <div>
                        <p className="text-[11px] font-semibold text-[#1c392b]">{l.memberName}</p>
                        <p className="text-[9px] text-[#78897c]">{l.memberClass}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-[11px] text-[#5a7263]">{l.issueDate}</td>
                  <td className={`text-[11px] ${l.status==="Overdue"?"font-semibold text-[#c0392b]":"text-[#5a7263]"}`}>{l.dueDate}</td>
                  <td><span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${l.status==="Overdue"?"bg-[#ffebee] text-[#c0392b]":l.status==="Returned"?"bg-[#edf0ec] text-[#66756a]":"bg-[#e8f1e7] text-[#347246]"}`}>{l.status}</span></td>
                  <td className="text-[11px]">
                    {l.fine > 0 ? <span className="text-[#c0392b] font-semibold">PKR {l.fine}</span> : <span className="text-[#78897c]">—</span>}
                  </td>
                  <td className="pr-6">
                    <div className="flex items-center gap-2">
                      {l.status !== "Returned" && (
                        <>
                          <button onClick={openReturn} className="text-[10px] font-bold text-[#4c8056]">Return</button>
                          <button onClick={() => setShowRenew(l)} className="text-[10px] font-bold text-[#1a5276]">Renew</button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-[#f6f8f4] border-t border-[#e6ebe4] text-[11px] text-[#78897c]">
          {filtered.length} records
        </div>
      </div>

      {/* Renew dialog */}
      {showRenew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-[17px] font-semibold text-[#1c392b] mb-4" style={{fontFamily:"'DM Serif Display', serif"}}>Renew loan</h2>
            <div className="rounded-xl bg-[#f0f8f4] border border-[#dde9dd] p-4 mb-4">
              <p className="text-[12px] font-semibold text-[#1c392b]">{showRenew.bookTitle}</p>
              <p className="text-[11px] text-[#78897c] mt-1">Borrower: {showRenew.memberName}</p>
              <p className="text-[11px] text-[#78897c]">Current due: <b className="text-[#b8943a]">{showRenew.dueDate}</b></p>
              <p className="text-[11px] text-[#4c8056] mt-2 font-semibold">New due date: {(() => { const d = new Date(showRenew.dueDate); d.setDate(d.getDate()+7); return d.toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"}); })()}</p>
            </div>
            <p className="text-[11px] text-[#78897c] mb-4">Renewals used: {showRenew.renewals}/2 maximum renewals.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowRenew(null); notify(`Loan renewed for ${showRenew.bookTitle}`); }}
                className="flex-1 h-10 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
                Confirm renewal
              </button>
              <button onClick={() => setShowRenew(null)} className="flex-1 h-10 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

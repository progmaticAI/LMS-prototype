import { useState } from "react";
import { useLibCtx } from "./LibShell";
import { reservations, books, students } from "../../data/mockData";
import { BookMarked, Plus, Check, X, Clock3 } from "lucide-react";

export function ReservationsPage() {
  const { notify, openIssue } = useLibCtx();
  const [filter, setFilter] = useState("All");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = reservations.filter(r => filter==="All" || r.status===filter);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><BookMarked size={12}/> Librarian workspace · Reservations</p>
          <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Reservations.</h1>
          <p className="mt-2 text-[13px] text-[#718174]">Manage book reservations and queue positions for members.</p>
        </div>
        <button onClick={() => setShowAdd(true)} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
          <Plus size={14}/> New reservation
        </button>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["All","Active","Fulfilled","Expired","Cancelled"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)}
            className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${filter===f?"bg-[#1d5139] text-white":"bg-[#fcfdf9] border border-[#dde4da] text-[#617265] hover:bg-[#f0f4ee]"}`}>
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-10 text-center">
            <BookMarked size={28} className="text-[#c0d0c0] mx-auto mb-3"/>
            <p className="text-[#78897c]">No reservations matching this filter.</p>
          </div>
        )}
        {filtered.map(r=>{
          const book = books.find(b=>b.id===r.bookId);
          return (
            <div key={r.id} className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5 flex flex-wrap items-start gap-4">
              <div className="flex items-center gap-3 flex-1 min-w-[200px]">
                <div className="w-10 h-14 rounded-lg shrink-0" style={{background:book?.coverColor||"#e0e0e0"}}/>
                <div>
                  <p className="text-[13px] font-semibold text-[#1c392b]">{r.bookTitle}</p>
                  <p className="text-[11px] text-[#78897c] mt-1">{r.memberName} · {r.memberClass}</p>
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-[#8a9e8e]">
                    <span className="flex items-center gap-1"><Clock3 size={10}/> Queue #{r.queuePosition}</span>
                    <span>Req: {r.requestDate}</span>
                    <span>Exp: {r.expiryDate}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${r.status==="Active"?"bg-[#e8f5e9] text-[#2e7d32]":r.status==="Fulfilled"?"bg-[#e8eaf6] text-[#3949ab]":r.status==="Expired"?"bg-[#fff8e1] text-[#f57f17]":"bg-[#ffebee] text-[#c0392b]"}`}>{r.status}</span>
                {r.status === "Active" && (
                  <>
                    <button onClick={openIssue} className="flex items-center gap-1.5 h-8 px-3 rounded-xl bg-[#1d5139] text-white text-[11px] font-semibold hover:bg-[#194330]">
                      <Check size={12}/> Issue now
                    </button>
                    <button onClick={() => notify("Reservation cancelled")} className="size-8 rounded-xl border border-[#dce3d8] flex items-center justify-center text-[#617265] hover:bg-red-50 hover:text-red-500">
                      <X size={13}/>
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add reservation dialog */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-[17px] font-semibold text-[#1c392b] mb-5" style={{fontFamily:"'DM Serif Display', serif"}}>New reservation</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">Book</label>
                <select className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056]">
                  {books.map(b=><option key={b.id}>{b.title}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">Member</label>
                <select className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056]">
                  {students.map(s=><option key={s.id}>{s.name} — {s.admissionNo}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">Hold for (days)</label>
                <input type="number" defaultValue="3" className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056]"/>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowAdd(false); notify("Reservation created successfully"); }}
                className="flex-1 h-10 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
                Create reservation
              </button>
              <button onClick={() => setShowAdd(false)} className="flex-1 h-10 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

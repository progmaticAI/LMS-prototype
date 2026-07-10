import { useState } from "react";
import { useLibCtx } from "./LibShell";
import { inventoryItems, books, fmtDate } from "../../data/mockData";
import { Package, AlertTriangle, BookX, RefreshCw, Plus, Search, ClipboardCheck } from "lucide-react";

export function InventoryPage() {
  const { notify } = useLibCtx();
  const [conditionFilter, setConditionFilter] = useState("All");
  const [q, setQ] = useState("");
  const [showAuditDialog, setShowAuditDialog] = useState(false);

  const conditions = ["All","Good","Fair","Poor","Damaged","Lost"];

  const filteredItems = inventoryItems.filter(item =>
    (conditionFilter==="All" || item.condition===conditionFilter) &&
    (item.bookTitle.toLowerCase().includes(q.toLowerCase()) || item.accessionNo.toLowerCase().includes(q.toLowerCase()))
  );

  const totalBooks = books.reduce((s,b)=>s+b.copies,0);
  const goodBooks = books.reduce((s,b)=>s+b.available+b.issued,0);
  const lostBooks = books.reduce((s,b)=>s+b.lost,0);
  const damagedBooks = books.reduce((s,b)=>s+b.damaged,0);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><Package size={12}/> Librarian workspace · Inventory</p>
          <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Inventory.</h1>
          <p className="mt-2 text-[13px] text-[#718174]">Track physical stock, damaged items, lost books, and shelf audits.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => notify("Stock adjustment form opened")} className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#dce3d8] text-[12px] text-[#617265] hover:bg-[#f0f4ee]">
            <Plus size={13}/> Stock adjustment
          </button>
          <button onClick={() => setShowAuditDialog(true)} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
            <ClipboardCheck size={14}/> Start shelf audit
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label:"Total copies", value:totalBooks.toString(), color:"#4c8056", Icon:Package },
          { label:"In good condition", value:goodBooks.toString(), color:"#2d7a4a", Icon:Package },
          { label:"Lost", value:lostBooks.toString(), color:"#7f8c8d", Icon:BookX },
          { label:"Damaged / flagged", value:(damagedBooks+filteredItems.length).toString(), color:"#d35400", Icon:AlertTriangle },
        ].map(item=>(
          <div key={item.label} className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-4">
            <div className="size-9 rounded-xl flex items-center justify-center mb-3" style={{background:item.color+"15"}}>
              <item.Icon size={16} style={{color:item.color}}/>
            </div>
            <p className="text-[11px] text-[#748277] mb-1">{item.label}</p>
            <p className="text-[26px] leading-none" style={{fontFamily:"'DM Serif Display', serif",color:item.color}}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Flagged items */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden mb-5">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[#e6ebe4]">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748277]"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search flagged items…"
              className="w-full h-9 rounded-xl border border-[#dce3d8] bg-[#f6f8f4] pl-8 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
          </div>
          <div className="flex gap-1 flex-wrap">
            {conditions.map(c=>(
              <button key={c} onClick={()=>setConditionFilter(c)}
                className={`rounded-lg px-2.5 py-1.5 text-[10px] font-semibold transition-all ${conditionFilter===c?"bg-[#1d5139] text-white":"text-[#617265] hover:bg-[#f0f4ee]"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-[#edf0ec]">
          {filteredItems.length === 0 && (
            <div className="text-center p-10">
              <Package size={28} className="text-[#c0d0c0] mx-auto mb-3"/>
              <p className="text-[#78897c]">No flagged items found.</p>
            </div>
          )}
          {filteredItems.map(item=>(
            <div key={item.id} className="flex items-start gap-4 p-5">
              <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${item.condition==="Lost"?"bg-[#ffebee]":item.condition==="Damaged"?"bg-[#fff3e0]":"bg-[#fff8e1]"}`}>
                <BookX size={16} className={item.condition==="Lost"?"text-[#c0392b]":item.condition==="Damaged"?"text-[#d35400]":"text-[#7f8c8d]"}/>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-[13px] font-semibold text-[#1c392b]">{item.bookTitle}</p>
                    <p className="text-[11px] text-[#78897c] mt-0.5">{item.accessionNo} · Copy {item.copyNo} · Shelf {item.shelf}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${item.condition==="Lost"?"bg-[#ffebee] text-[#c0392b]":item.condition==="Damaged"?"bg-[#fff3e0] text-[#d35400]":item.condition==="Poor"?"bg-[#fff8e1] text-[#f57f17]":"bg-[#e8f5e9] text-[#2e7d32]"}`}>
                    {item.condition}
                  </span>
                </div>
                {item.notes && <p className="mt-1.5 text-[11px] text-[#5a7263]">{item.notes}</p>}
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <span className="text-[10px] text-[#a0b0a0]">Purchased: {fmtDate(item.purchaseDate)} · Last audit: {fmtDate(item.lastAudit)}</span>
                  <div className="flex gap-2 ml-auto">
                    <button onClick={() => notify(`${item.bookTitle} — copy ${item.copyNo} status updated`)}
                      className="h-7 px-3 rounded-lg bg-[#f0f8f4] border border-[#dde9dd] text-[10px] font-bold text-[#4c8056]">
                      Update status
                    </button>
                    <button onClick={() => notify(`Write-off initiated for ${item.bookTitle}`)}
                      className="h-7 px-3 rounded-lg bg-[#fff8f0] border border-[#ffe5cc] text-[10px] font-bold text-[#d35400]">
                      Write off
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Physical audit log */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5">
        <p className="font-semibold text-[#1c392b] mb-4">Recent shelf audits</p>
        <div className="space-y-2.5">
          {[
            { shelf:"Shelf F-01 to F-10 (Fiction)", date:"2026-06-30", by:"Ayesha Habib", found:120, missing:2, status:"Completed" },
            { shelf:"Shelf H-01 to H-10 (History)", date:"2026-06-20", by:"Ayesha Habib", found:88, missing:1, status:"Completed" },
            { shelf:"Shelf S-01 to S-10 (Science)", date:"2026-06-10", by:"Ayesha Habib", found:64, missing:0, status:"Completed" },
            { shelf:"All Urdu shelves", date:"2026-05-15", by:"Ayesha Habib", found:42, missing:2, status:"Completed" },
          ].map((a,i)=>(
            <div key={i} className="flex items-center justify-between rounded-xl border border-[#e5e9e1] px-4 py-3">
              <div>
                <p className="text-[12px] font-semibold text-[#1c392b]">{a.shelf}</p>
                <p className="text-[10px] text-[#78897c]">{fmtDate(a.date)} · {a.by}</p>
              </div>
              <div className="flex items-center gap-4 text-[11px]">
                <span className="text-[#4c8056]">{a.found} found</span>
                {a.missing > 0 && <span className="text-[#c0392b] font-semibold">{a.missing} missing</span>}
                <span className="rounded-full bg-[#e8f5e9] text-[#2e7d32] text-[9px] font-bold px-2 py-0.5">{a.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit dialog */}
      {showAuditDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <h2 className="text-[17px] font-semibold text-[#1c392b] mb-4" style={{fontFamily:"'DM Serif Display', serif"}}>Start shelf audit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">Shelf range</label>
                <select className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056]">
                  <option>All shelves (full audit)</option>
                  <option>Fiction (F-01 to F-15)</option>
                  <option>History (H-01 to H-10)</option>
                  <option>Science (S-01 to S-10)</option>
                  <option>Urdu section (UR-01 to UR-05)</option>
                  <option>Reference (REF-01 to REF-05)</option>
                  <option>Young Adult (YA-01 to YA-05)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">Assigned to</label>
                <input defaultValue="Ayesha Habib" className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056]"/>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowAuditDialog(false); notify("Shelf audit started"); }}
                className="flex-1 h-10 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
                Start audit
              </button>
              <button onClick={() => setShowAuditDialog(false)} className="flex-1 h-10 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

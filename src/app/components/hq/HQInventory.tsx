import { schools, inventoryItems, fmtDate } from "../../data/mockData";
import { Package, AlertTriangle, CheckCircle2, BookX, RefreshCw } from "lucide-react";

export function HQInventory() {
  const totalLost = schools.reduce((s, sc) => s + sc.lost, 0);
  const totalDamaged = schools.reduce((s, sc) => s + sc.damaged, 0);
  const totalBooks = schools.reduce((s, sc) => s + sc.totalBooks, 0);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><Package size={12}/> Analytics</p>
          <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Inventory Overview</h1>
          <p className="mt-2 text-[#5a7263] text-[13px]">Network-wide inventory health, missing books, and damaged items.</p>
        </div>
        <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-[#dde4da] text-[12px] text-[#5a7263] hover:bg-[#f0f4f0]">
          <RefreshCw size={14}/> Run Network Audit
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {[
          { label:"Total network books", value: totalBooks.toLocaleString(), color:"#4c8056", Icon:Package },
          { label:"In good condition", value: (totalBooks - totalLost - totalDamaged).toLocaleString(), color:"#2d7a4a", Icon:CheckCircle2 },
          { label:"Lost books", value: totalLost.toString(), color:"#7f8c8d", Icon:BookX },
          { label:"Damaged books", value: totalDamaged.toString(), color:"#d35400", Icon:AlertTriangle },
        ].map(item => (
          <div key={item.label} className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
            <div className="size-9 rounded-xl flex items-center justify-center mb-4" style={{background:item.color+"15"}}>
              <item.Icon size={16} style={{color:item.color}}/>
            </div>
            <p className="text-[11px] text-[#78897c] mb-1">{item.label}</p>
            <p className="text-[28px] leading-none" style={{fontFamily:"'DM Serif Display', serif",color:"#0f2419"}}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* Per-school inventory */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] overflow-hidden shadow-sm mb-6">
        <div className="p-5 border-b border-[#e8ece5]">
          <p className="font-semibold text-[#0f2419]">School inventory status</p>
          <p className="text-[11px] text-[#78897c] mt-1">Books breakdown by condition per campus</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-[#f6f8f4] border-b border-[#e8ece5] text-[9px] font-bold uppercase tracking-[.14em] text-[#78897c]">
              <tr>
                <th className="px-6 py-3">School</th>
                <th>Total books</th>
                <th>Available</th>
                <th>Issued</th>
                <th>Lost</th>
                <th>Damaged</th>
                <th>Last audit</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f0]">
              {schools.map(s => (
                <tr key={s.id} className="hover:bg-[#f8faf6]">
                  <td className="px-6 py-3.5">
                    <p className="text-[12px] font-semibold text-[#0f2419]">{s.name}</p>
                    <p className="text-[10px] text-[#78897c]">{s.city}</p>
                  </td>
                  <td className="text-[12px] font-semibold text-[#1c392b]">{s.totalBooks.toLocaleString()}</td>
                  <td className="text-[12px] text-[#4c8056]">{s.available.toLocaleString()}</td>
                  <td className="text-[12px] text-[#b8943a]">{s.borrowed.toLocaleString()}</td>
                  <td className={`text-[12px] font-semibold ${s.lost>12?"text-[#c0392b]":"text-[#7f8c8d]"}`}>{s.lost}</td>
                  <td className={`text-[12px] font-semibold ${s.damaged>20?"text-[#d35400]":"text-[#78897c]"}`}>{s.damaged}</td>
                  <td className="text-[11px] text-[#78897c]">{fmtDate(s.lastAudit)}</td>
                  <td>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${s.healthScore>=93?"bg-[#e8f5e9] text-[#2e7d32]":s.healthScore>=88?"bg-[#fff8e1] text-[#f57f17]":"bg-[#ffebee] text-[#c62828]"}`}>
                      {s.healthScore>=93?"Excellent":s.healthScore>=88?"Good":"Needs Review"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flagged items */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
        <p className="font-semibold text-[#0f2419] mb-1">Flagged items — APS Lahore Cantt</p>
        <p className="text-[11px] text-[#78897c] mb-5">Books requiring immediate attention (sample branch)</p>
        <div className="space-y-3">
          {inventoryItems.map(item => (
            <div key={item.id} className="flex items-start gap-4 rounded-xl border border-[#e8ece5] p-4">
              <div className={`size-9 rounded-lg flex items-center justify-center shrink-0 ${item.condition==="Lost"?"bg-[#ffebee]":item.condition==="Damaged"?"bg-[#fff3e0]":"bg-[#fff8e1]"}`}>
                <BookX size={15} className={item.condition==="Lost"?"text-[#c0392b]":item.condition==="Damaged"?"text-[#d35400]":"text-[#7f8c8d]"}/>
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="text-[12px] font-semibold text-[#0f2419]">{item.bookTitle}</p>
                    <p className="text-[10px] text-[#78897c]">{item.accessionNo} · Copy {item.copyNo} · Shelf {item.shelf}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${item.condition==="Lost"?"bg-[#ffebee] text-[#c0392b]":item.condition==="Damaged"?"bg-[#fff3e0] text-[#d35400]":"bg-[#fff8e1] text-[#f57f17]"}`}>
                    {item.condition}
                  </span>
                </div>
                {item.notes && <p className="mt-1.5 text-[11px] text-[#5a7263]">{item.notes}</p>}
                <p className="text-[10px] text-[#a0b0a0] mt-1">Last audit: {fmtDate(item.lastAudit)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

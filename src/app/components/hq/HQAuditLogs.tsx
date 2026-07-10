import { useState } from "react";
import { ClipboardList, Search, Download, Filter } from "lucide-react";
import { useHQCtx } from "./HQShell";

const logs = [
  { id:"LOG-8841", action:"Book issued", module:"Circulation", user:"Ayesha Habib", school:"APS Lahore Cantt", ip:"192.168.1.45", time:"2026-07-10 09:14:22", status:"Success" },
  { id:"LOG-8840", action:"New book added", module:"Catalog", user:"Nadia Rehman", school:"APS Model School", ip:"192.168.2.12", time:"2026-07-10 08:54:11", status:"Success" },
  { id:"LOG-8839", action:"Member updated", module:"Members", user:"Fatima Gul", school:"APS Peshawar", ip:"10.10.0.8", time:"2026-07-10 08:32:45", status:"Success" },
  { id:"LOG-8838", action:"Book return processed", module:"Circulation", user:"Amna Siddiqui", school:"APS Rawalpindi", ip:"192.168.5.21", time:"2026-07-10 08:05:19", status:"Success" },
  { id:"LOG-8837", action:"Purchase order created", module:"Purchases", user:"Rabia Zafar", school:"APS Islamabad", ip:"10.20.1.34", time:"2026-07-09 16:48:33", status:"Success" },
  { id:"LOG-8836", action:"User login", module:"Auth", user:"Mehwish Khan", school:"APS Karachi", ip:"172.16.0.55", time:"2026-07-09 16:02:07", status:"Success" },
  { id:"LOG-8835", action:"Report generated", module:"Reports", user:"Ayesha Habib", school:"HQ", ip:"192.168.1.45", time:"2026-07-09 15:30:00", status:"Success" },
  { id:"LOG-8834", action:"Bulk member import", module:"Members", user:"Zara Qureshi", school:"APS Girls Campus", ip:"10.10.5.19", time:"2026-07-09 14:22:58", status:"Success" },
  { id:"LOG-8833", action:"Book deleted", module:"Catalog", user:"Huma Arshad", school:"APS Walton", ip:"192.168.3.77", time:"2026-07-09 13:11:34", status:"Success" },
  { id:"LOG-8832", action:"Permission modified", module:"Users", user:"Ayesha Habib", school:"HQ", ip:"192.168.1.45", time:"2026-07-09 12:45:22", status:"Success" },
  { id:"LOG-8831", action:"Failed login attempt", module:"Auth", user:"unknown", school:"—", ip:"203.45.67.89", time:"2026-07-09 11:32:01", status:"Failed" },
  { id:"LOG-8830", action:"Settings updated", module:"Settings", user:"IT Support APS", school:"HQ", ip:"192.168.1.10", time:"2026-07-09 10:00:00", status:"Success" },
  { id:"LOG-8829", action:"Fine collected", module:"Circulation", user:"Saima Naz", school:"APS Askari XI", ip:"10.30.2.41", time:"2026-07-08 17:44:12", status:"Success" },
  { id:"LOG-8828", action:"Book catalog exported", module:"Catalog", user:"Rubina Malik", school:"APS Fortress Stadium", ip:"192.168.4.33", time:"2026-07-08 16:15:09", status:"Success" },
];

const modules = ["All","Auth","Catalog","Circulation","Members","Purchases","Reports","Settings","Users"];

export function HQAuditLogs() {
  const { notify } = useHQCtx();
  const [q, setQ] = useState("");
  const [mod, setMod] = useState("All");

  const filtered = logs.filter(l =>
    (mod==="All" || l.module===mod) &&
    (l.action.toLowerCase().includes(q.toLowerCase()) || l.user.toLowerCase().includes(q.toLowerCase()) || l.school.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><ClipboardList size={12}/> Administration</p>
          <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Audit Logs</h1>
          <p className="mt-2 text-[#5a7263] text-[13px]">Complete activity trail for all user actions across the network.</p>
        </div>
        <button onClick={() => notify("Audit log exported")} className="flex items-center gap-2 h-9 px-4 rounded-xl border border-[#dde4da] text-[12px] text-[#5a7263] hover:bg-[#f0f4f0]">
          <Download size={13}/> Export logs
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9e8e]"/>
          <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search logs…"
            className="w-full h-10 rounded-xl border border-[#dde4da] bg-white pl-9 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={13} className="text-[#78897c]"/>
          {modules.map(m=>(
            <button key={m} onClick={()=>setMod(m)}
              className={`rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${mod===m?"bg-[#0f2419] text-white":"bg-white border border-[#e2e8e0] text-[#5a7263] hover:bg-[#f0f4f0]"}`}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#e2e8e0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left">
            <thead className="bg-[#f6f8f4] border-b border-[#e8ece5] text-[9px] font-bold uppercase tracking-[.14em] text-[#78897c]">
              <tr>
                <th className="px-6 py-3">Log ID</th>
                <th>Action</th>
                <th>Module</th>
                <th>User</th>
                <th>School</th>
                <th>IP Address</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f0]">
              {filtered.map(log => (
                <tr key={log.id} className="hover:bg-[#f8faf6]">
                  <td className="px-6 py-3.5 font-mono text-[10px] text-[#4c8056]">{log.id}</td>
                  <td className="text-[11px] font-semibold text-[#0f2419]">{log.action}</td>
                  <td><span className="rounded-full bg-[#f0f4ee] px-2 py-0.5 text-[9px] font-semibold text-[#5a7263]">{log.module}</span></td>
                  <td className="text-[11px] text-[#2d4030]">{log.user}</td>
                  <td className="text-[11px] text-[#5a7263]">{log.school}</td>
                  <td className="font-mono text-[10px] text-[#8a9e8e]">{log.ip}</td>
                  <td className="font-mono text-[10px] text-[#78897c]">{log.time}</td>
                  <td>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${log.status==="Success"?"bg-[#e8f5e9] text-[#2e7d32]":"bg-[#ffebee] text-[#c0392b]"}`}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 bg-[#f6f8f4] border-t border-[#e8ece5] text-[11px] text-[#78897c]">
          Showing {filtered.length} of {logs.length} log entries
        </div>
      </div>
    </div>
  );
}

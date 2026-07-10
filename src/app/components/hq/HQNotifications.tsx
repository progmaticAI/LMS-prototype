import { useState } from "react";
import { Bell, Check, Trash2, AlertTriangle, Info, CheckCircle2, BookX } from "lucide-react";
import { useHQCtx } from "./HQShell";

const allNotifs = [
  { id:"n01", type:"error", title:"Overdue alert — APS Walton", body:"31 books overdue, 12+ days outstanding. 8 require immediate follow-up.", school:"APS Walton", time:"2h ago", read:false },
  { id:"n02", type:"warning", title:"Inventory audit due — APS Peshawar", body:"Annual physical verification due in 3 days. Last audit: Jan 2026.", school:"APS Peshawar", time:"4h ago", read:false },
  { id:"n03", type:"info", title:"New purchase order submitted", body:"PO-2026-047 submitted by APS Islamabad librarian. PKR 126,500 pending approval.", school:"APS Islamabad", time:"5h ago", read:false },
  { id:"n04", type:"ok", title:"Shelf audit completed", body:"APS Fortress Stadium completed June shelf audit with 97% accuracy.", school:"APS Fortress Stadium", time:"1d ago", read:true },
  { id:"n05", type:"info", title:"New librarian registered", body:"Bushra Aslam registered as librarian for APS Sialkot campus.", school:"APS Sialkot", time:"2d ago", read:true },
  { id:"n06", type:"warning", title:"Budget threshold reached — APS Multan", body:"APS Multan has consumed 87% of FY2026 library budget.", school:"APS Multan", time:"3d ago", read:true },
  { id:"n07", type:"ok", title:"Catalog import completed", body:"145 new members bulk imported to APS Girls Campus Lahore.", school:"APS Girls Campus", time:"4d ago", read:true },
  { id:"n08", type:"error", title:"Lost book report — APS Rawalpindi", body:"3 books reported lost during shelf audit. Total estimated value PKR 7,800.", school:"APS Rawalpindi", time:"5d ago", read:true },
];

const iconMap: Record<string,any> = { error:AlertTriangle, warning:AlertTriangle, info:Info, ok:CheckCircle2 };
const colorMap: Record<string,string> = { error:"text-[#c0392b] bg-[#ffebee]", warning:"text-[#d35400] bg-[#fff3e0]", info:"text-[#1a5276] bg-[#e8f4fd]", ok:"text-[#2d7a4a] bg-[#e8f5e9]" };

export function HQNotifications() {
  const { notify } = useHQCtx();
  const [notifs, setNotifs] = useState(allNotifs);
  const [filter, setFilter] = useState("All");

  const markAll = () => setNotifs(n => n.map(x => ({...x, read:true})));
  const markRead = (id: string) => setNotifs(n => n.map(x => x.id===id?{...x,read:true}:x));
  const remove = (id: string) => setNotifs(n => n.filter(x => x.id!==id));

  const filtered = notifs.filter(n => filter==="All" || (filter==="Unread"&&!n.read) || n.type===filter.toLowerCase());
  const unread = notifs.filter(n => !n.read).length;

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><Bell size={12}/> Administration</p>
          <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Notifications</h1>
          <p className="mt-2 text-[#5a7263] text-[13px]">{unread} unread alerts from across the network.</p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="flex items-center gap-2 h-9 px-4 rounded-xl border border-[#dde4da] text-[12px] text-[#5a7263] hover:bg-[#f0f4f0]">
            <Check size={13}/> Mark all read
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-5">
        {["All","Unread","Error","Warning","Info","Ok"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${filter===f?"bg-[#0f2419] text-white":"bg-white border border-[#e2e8e0] text-[#5a7263] hover:bg-[#f0f4f0]"}`}>
            {f} {f==="All"?`(${notifs.length})`:f==="Unread"?`(${unread})`:""}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="rounded-2xl bg-white border border-[#e2e8e0] p-10 text-center">
            <Bell size={28} className="text-[#c0d0c0] mx-auto mb-3"/>
            <p className="text-[#78897c]">No notifications matching this filter.</p>
          </div>
        )}
        {filtered.map(n => {
          const Icon = iconMap[n.type];
          const colors = colorMap[n.type];
          return (
            <div key={n.id} className={`rounded-2xl bg-white border p-4 md:p-5 transition-all ${n.read?"border-[#e8ece5]":"border-[#dde4da] shadow-sm"}`}>
              <div className="flex items-start gap-4">
                <div className={`size-10 rounded-xl flex items-center justify-center shrink-0 ${colors}`}>
                  <Icon size={17}/>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className={`text-[13px] font-semibold ${n.read?"text-[#5a7263]":"text-[#0f2419]"}`}>{n.title}</p>
                        {!n.read && <span className="size-2 rounded-full bg-[#e8943a]"/>}
                      </div>
                      <p className="text-[11px] text-[#78897c] mt-1">{n.body}</p>
                      <div className="flex items-center gap-3 mt-2 text-[10px] text-[#a0b0a0]">
                        <span>{n.school}</span>
                        <span>·</span>
                        <span>{n.time}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      {!n.read && (
                        <button onClick={() => markRead(n.id)} className="size-7 rounded-lg hover:bg-[#f0f4f0] flex items-center justify-center text-[#78897c] hover:text-[#4c8056]">
                          <Check size={13}/>
                        </button>
                      )}
                      <button onClick={() => remove(n.id)} className="size-7 rounded-lg hover:bg-[#ffebee] flex items-center justify-center text-[#78897c] hover:text-[#c0392b]">
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router";
import { useHQCtx } from "./HQShell";
import { schools } from "../../data/mockData";
import {
  BookOpen, Clock3, Users, AlertTriangle, TrendingUp, Building2,
  CheckCircle2, ArrowRight, BookX, Package
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const networkMonthly = months.map((m, i) => ({
  month: m,
  value: schools.reduce((sum, s) => sum + s.monthlyCirx[i], 0)
}));

const alerts = [
  { type:"warning", msg:"APS Walton — 31 overdue books, 12+ days", time:"2h ago" },
  { type:"error", msg:"APS Peshawar — inventory audit due in 3 days", time:"4h ago" },
  { type:"info", msg:"APS Quetta — PO-2026-047 pending approval", time:"1d ago" },
  { type:"ok", msg:"APS Fortress Stadium — June audit completed", time:"2d ago" },
];

const recentActivity = [
  { action:"Book catalog updated", school:"APS Lahore Cantt", user:"Ayesha Habib", time:"10 min ago" },
  { action:"New purchase order submitted", school:"APS Islamabad", user:"Rabia Zafar", time:"32 min ago" },
  { action:"Member registered (bulk 145)", school:"APS Peshawar", user:"Fatima Gul", time:"1h ago" },
  { action:"Overdue fine collected PKR 800", school:"APS Rawalpindi", user:"Amna Siddiqui", time:"2h ago" },
  { action:"Shelf audit completed", school:"APS Karachi", user:"Mehwish Khan", time:"3h ago" },
];

function KPI({ label, value, sub, Icon, color }: { label:string; value:string; sub:string; Icon:any; color:string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="size-9 rounded-xl flex items-center justify-center" style={{background: color+"20"}}>
          <Icon size={17} style={{color}}/>
        </div>
        <span className="text-[10px] font-bold text-[#4c8056]">{sub}</span>
      </div>
      <p className="text-[11px] text-[#78897c] mb-1">{label}</p>
      <p className="text-[28px] leading-none" style={{fontFamily:"'DM Serif Display', serif",color:"#0f2419"}}>{value}</p>
    </div>
  );
}

export function HQDashboard() {
  const nav = useNavigate();
  const { query } = useHQCtx();

  const totalBooks = schools.reduce((s, x) => s + x.totalBooks, 0);
  const totalAvail = schools.reduce((s, x) => s + x.available, 0);
  const totalBorrowed = schools.reduce((s, x) => s + x.borrowed, 0);
  const totalOverdue = schools.reduce((s, x) => s + x.overdue, 0);
  const totalLost = schools.reduce((s, x) => s + x.lost, 0);
  const totalDamaged = schools.reduce((s, x) => s + x.damaged, 0);
  const totalMembers = schools.reduce((s, x) => s + x.members, 0);

  const filteredSchools = schools.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.city.toLowerCase().includes(query.toLowerCase()) ||
    s.librarian.toLowerCase().includes(query.toLowerCase())
  );

  const sorted = [...schools].sort((a, b) => b.healthScore - a.healthScore).slice(0, 6);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2">
          <Building2 size={12}/> APS Pakistan · Headquarters Dashboard
        </p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>
          Library network overview.
        </h1>
        <p className="mt-3 text-[#5a7263] text-[13px]">14 APS campuses across Pakistan — real-time operational summary for {new Date().toLocaleDateString("en-PK",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="Total schools" value="14" sub="All active" Icon={Building2} color="#0f2419"/>
        <KPI label="Total books" value={totalBooks.toLocaleString()} sub="↗ 8.2%" Icon={BookOpen} color="#4c8056"/>
        <KPI label="Available books" value={totalAvail.toLocaleString()} sub={`${Math.round(totalAvail/totalBooks*100)}% catalog`} Icon={Package} color="#2d7a4a"/>
        <KPI label="Active borrowings" value={totalBorrowed.toLocaleString()} sub="↗ 11.4%" Icon={Clock3} color="#b8943a"/>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <KPI label="Overdue books" value={totalOverdue.toString()} sub="Needs attention" Icon={AlertTriangle} color="#c0392b"/>
        <KPI label="Lost books" value={totalLost.toString()} sub="Under review" Icon={BookX} color="#7f8c8d"/>
        <KPI label="Damaged books" value={totalDamaged.toString()} sub="Flagged" Icon={BookX} color="#d35400"/>
        <KPI label="Registered members" value={totalMembers.toLocaleString()} sub="↗ 6.1%" Icon={Users} color="#1a5276"/>
      </div>

      <div className="grid xl:grid-cols-[1.6fr_1fr] gap-6 mb-6">
        {/* Monthly chart */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="font-semibold text-[#0f2419]">Network circulation</p>
              <p className="text-[11px] text-[#78897c] mt-1">Monthly borrowings across all 14 campuses</p>
            </div>
            <span className="text-[11px] font-semibold text-[#4c8056]">2026 · Jan–Dec</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={networkMonthly} barSize={22}>
              <CartesianGrid vertical={false} stroke="#f0f4f0" strokeDasharray="3 3"/>
              <XAxis dataKey="month" tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
              <Tooltip
                contentStyle={{background:"#0f2419",border:"none",borderRadius:"10px",color:"white",fontSize:"11px"}}
                formatter={(v:number) => [v.toLocaleString(), "Borrowings"]}
              />
              <Bar dataKey="value" fill="#4c8056" radius={[4,4,0,0]}
                   label={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top performing libraries */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-semibold text-[#0f2419]">Top performing</p>
              <p className="text-[11px] text-[#78897c] mt-1">By health score</p>
            </div>
            <button onClick={() => nav("/hq/comparison")} className="text-[11px] font-bold text-[#4c8056]">Full comparison →</button>
          </div>
          <div className="space-y-3">
            {sorted.map((s, i) => (
              <button key={s.id} onClick={() => nav(`/hq/schools/${s.id}`)} className="w-full flex items-center gap-3 hover:bg-[#f6f8f4] rounded-xl p-2 -mx-2 transition-colors text-left">
                <span className="text-[11px] font-bold text-[#bdc3be] w-4">{i+1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-semibold text-[#1c392b] truncate">{s.name}</p>
                  <div className="mt-1 h-1.5 rounded-full bg-[#e8ece5]">
                    <div className="h-full rounded-full bg-[#4c8056]" style={{width:`${s.healthScore}%`}}/>
                  </div>
                </div>
                <span className="text-[13px] font-bold text-[#2d7a4a] shrink-0">{s.healthScore}%</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid xl:grid-cols-[2fr_1fr] gap-6">
        {/* Schools grid */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="font-semibold text-[#0f2419]">School network</p>
              <p className="text-[11px] text-[#78897c] mt-1">Click any school to view library summary</p>
            </div>
            <button onClick={() => nav("/hq/schools")} className="text-[11px] font-bold text-[#4c8056]">View all →</button>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {filteredSchools.slice(0, 8).map(s => (
              <button key={s.id} onClick={() => nav(`/hq/schools/${s.id}`)}
                className="text-left rounded-xl border border-[#e8ece5] p-4 hover:border-[#4c8056]/30 hover:bg-[#f6f8f4] transition-all group">
                <div className="flex items-start justify-between mb-3">
                  <div className="size-8 rounded-lg bg-[#0f2419]/8 flex items-center justify-center">
                    <Building2 size={14} className="text-[#0f2419]"/>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.healthScore >= 93 ? "bg-[#e8f5e9] text-[#2e7d32]" : s.healthScore >= 88 ? "bg-[#fff8e1] text-[#f57f17]" : "bg-[#ffebee] text-[#c62828]"}`}>
                    {s.healthScore}%
                  </span>
                </div>
                <p className="text-[12px] font-semibold text-[#0f2419] leading-tight">{s.name}</p>
                <p className="text-[10px] text-[#7a8e7c] mt-0.5">{s.city}</p>
                <div className="flex gap-3 mt-3 text-[10px] text-[#78897c]">
                  <span>{s.totalBooks.toLocaleString()} books</span>
                  <span>·</span>
                  <span className={s.overdue > 30 ? "text-[#c62828]" : "text-[#78897c]"}>{s.overdue} overdue</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alerts + Recent */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
            <p className="font-semibold text-[#0f2419] mb-4 flex items-center gap-2"><AlertTriangle size={15} className="text-[#c0392b]"/> Alerts</p>
            <div className="space-y-2.5">
              {alerts.map((a, i) => (
                <div key={i} className={`rounded-xl p-3 text-[11px] border-l-3 ${a.type==="error"?"bg-[#fff5f5] border-[#c0392b] text-[#c0392b]":a.type==="warning"?"bg-[#fffbf0] border-[#e8943a] text-[#8a5a1a]":a.type==="ok"?"bg-[#f0fff4] border-[#4c8056] text-[#2d6040]":"bg-[#f0f4ff] border-[#4a6fa5] text-[#2a4a7a]"}`}>
                  <p className="font-semibold">{a.msg}</p>
                  <p className="mt-0.5 opacity-60">{a.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
            <p className="font-semibold text-[#0f2419] mb-4 flex items-center gap-2"><TrendingUp size={15} className="text-[#4c8056]"/> Recent activity</p>
            <div className="space-y-3">
              {recentActivity.map((a, i) => (
                <div key={i} className="flex gap-3">
                  <div className="size-1.5 rounded-full bg-[#4c8056] mt-1.5 shrink-0"/>
                  <div>
                    <p className="text-[11px] font-semibold text-[#1c392b]">{a.action}</p>
                    <p className="text-[10px] text-[#78897c]">{a.school} · {a.user}</p>
                    <p className="text-[10px] text-[#a0b0a0]">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

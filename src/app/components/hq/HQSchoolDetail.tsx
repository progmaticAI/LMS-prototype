import { useParams, useNavigate } from "react-router";
import { schools, loans, purchases, pkr, fmtDate } from "../../data/mockData";
import { ArrowLeft, Building2, BookOpen, Clock3, AlertTriangle, Users, Mail, Phone, MapPin, Calendar, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function Stat({ label, value, note, color="#1c392b" }: { label:string; value:string; note?:string; color?:string }) {
  return (
    <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5">
      <p className="text-[11px] text-[#78897c] mb-1">{label}</p>
      <p className="text-[26px] leading-none" style={{fontFamily:"'DM Serif Display', serif",color}}>{value}</p>
      {note && <p className="text-[10px] text-[#a0b0a0] mt-1">{note}</p>}
    </div>
  );
}

export function HQSchoolDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const school = schools.find(s => s.id === id);

  if (!school) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <Building2 size={32} className="text-[#c0d0c0]"/>
      <p className="text-[#78897c]">School not found.</p>
      <button onClick={() => nav("/hq/schools")} className="text-[#4c8056] font-semibold text-sm">← Back to schools</button>
    </div>
  );

  const chartData = months.map((m, i) => ({ month: m, value: school.monthlyCirx[i] }));
  const budgetPct = Math.round(school.budgetUsed / school.budget * 100);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-[12px] text-[#78897c]">
        <button onClick={() => nav("/hq/schools")} className="flex items-center gap-1.5 hover:text-[#4c8056] transition-colors font-semibold">
          <ArrowLeft size={13}/> Schools
        </button>
        <span>/</span>
        <span className="text-[#0f2419] font-semibold">{school.name}</span>
      </div>

      {/* School header */}
      <div className="rounded-2xl bg-[#0f2419] p-6 md:p-8 mb-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[300px] h-[300px] rounded-full bg-[#f4d77f]/5 -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"/>
        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold uppercase tracking-[.18em] text-[#f4d77f]/60 mb-2 block">{school.code}</span>
              <h1 className="text-white text-[28px] md:text-[36px] leading-tight" style={{fontFamily:"'DM Serif Display', serif"}}>{school.name}</h1>
              <div className="flex flex-wrap gap-4 mt-3 text-[12px] text-[#7da88a]">
                <span className="flex items-center gap-1.5"><MapPin size={12}/> {school.location}</span>
                <span className="flex items-center gap-1.5"><Calendar size={12}/> Est. {school.established}</span>
                <span className="flex items-center gap-1.5"><Users size={12}/> {school.students.toLocaleString()} students</span>
              </div>
            </div>
            <div className="text-right">
              <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 border text-[12px] font-bold mb-2"
                style={{borderColor:`${school.healthScore>=93?"#4c8056":school.healthScore>=88?"#e8943a":"#c0392b"}60`,
                        color:school.healthScore>=93?"#7dc48d":school.healthScore>=88?"#f4c470":"#f08080"}}>
                {school.healthScore}% health
              </div>
              <p className="text-[10px] text-[#4c7a5a]">Last audit: {fmtDate(school.lastAudit)}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            {[
              { label:"Principal", value: school.principal },
              { label:"Librarian", value: school.librarian },
              { label:"Email", value: school.email },
              { label:"Phone", value: school.phone },
            ].map(item => (
              <div key={item.label}>
                <p className="text-[10px] text-[#4c7a5a] mb-1">{item.label}</p>
                <p className="text-white text-[12px] font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <Stat label="Total books" value={school.totalBooks.toLocaleString()} note="In catalog"/>
        <Stat label="Available" value={school.available.toLocaleString()} note={`${Math.round(school.available/school.totalBooks*100)}% available`} color="#2d7a4a"/>
        <Stat label="Currently borrowed" value={school.borrowed.toLocaleString()} color="#b8943a"/>
        <Stat label="Overdue" value={school.overdue.toString()} note="Needs follow-up" color={school.overdue>30?"#c0392b":"#1c392b"}/>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <Stat label="Lost books" value={school.lost.toString()} color="#7f8c8d"/>
        <Stat label="Damaged" value={school.damaged.toString()} color="#d35400"/>
        <Stat label="Members" value={school.members.toLocaleString()} note="Students & staff"/>
        <Stat label="Budget used" value={`${budgetPct}%`} note={`${pkr(school.budgetUsed)} of ${pkr(school.budget)}`} color={budgetPct>80?"#c0392b":"#2d7a4a"}/>
      </div>

      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6">
        {/* Circulation chart */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div>
              <p className="font-semibold text-[#0f2419]">Monthly circulation — 2026</p>
              <p className="text-[11px] text-[#78897c] mt-1">Books issued per month</p>
            </div>
            <TrendingUp size={16} className="text-[#4c8056]"/>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={chartData} barSize={20}>
              <XAxis dataKey="month" tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#0f2419",border:"none",borderRadius:"10px",color:"white",fontSize:"11px"}}
                       formatter={(v:number) => [v.toLocaleString(),"Borrowings"]}/>
              <Bar dataKey="value" fill="#4c8056" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick info */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
            <p className="font-semibold text-[#0f2419] mb-4">Budget overview</p>
            <div className="mb-3">
              <div className="flex justify-between text-[12px] mb-2">
                <span className="text-[#78897c]">Spent</span>
                <span className="font-semibold text-[#0f2419]">{pkr(school.budgetUsed)}</span>
              </div>
              <div className="h-2.5 rounded-full bg-[#e8ece5]">
                <div className="h-full rounded-full transition-all" style={{width:`${budgetPct}%`,background:budgetPct>80?"#c0392b":"#4c8056"}}/>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-[#a0b0a0]">
                <span>PKR 0</span>
                <span>{pkr(school.budget)}</span>
              </div>
            </div>
            <p className="text-[11px] text-[#4c8056] font-semibold">{pkr(school.budget - school.budgetUsed)} remaining</p>
          </div>

          <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
            <p className="font-semibold text-[#0f2419] mb-4">Inventory health</p>
            {[
              { label:"Available", count: school.available, total: school.totalBooks, color:"#4c8056" },
              { label:"Issued", count: school.borrowed, total: school.totalBooks, color:"#b8943a" },
              { label:"Lost", count: school.lost, total: school.totalBooks, color:"#7f8c8d" },
              { label:"Damaged", count: school.damaged, total: school.totalBooks, color:"#d35400" },
            ].map(item => (
              <div key={item.label} className="mb-3">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#78897c]">{item.label}</span>
                  <span className="font-semibold" style={{color:item.color}}>{item.count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-[#e8ece5]">
                  <div className="h-full rounded-full" style={{width:`${Math.min(100,Math.round(item.count/item.total*100))}%`,background:item.color}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

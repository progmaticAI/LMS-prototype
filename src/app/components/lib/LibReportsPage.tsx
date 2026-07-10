import { useState } from "react";
import { useLibCtx } from "./LibShell";
import { FileBarChart, Download, BarChart3, Users, BookOpen, Calendar, Filter, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { loans } from "../../data/mockData";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul"];
const monthlyData = months.map((m, i) => ({
  month: m,
  issued: [45,62,51,71,60,82,68][i],
  returned: [40,58,48,66,58,78,62][i],
}));

const reportTypes = [
  { id:"daily", label:"Daily circulation", desc:"Today's issues and returns", Icon:BarChart3, color:"#4c8056" },
  { id:"overdue", label:"Overdue books", desc:"All overdue with fine calculations", Icon:TrendingUp, color:"#c0392b" },
  { id:"student", label:"Student borrowing", desc:"Per-student activity and history", Icon:Users, color:"#1a5276" },
  { id:"staff", label:"Staff borrowing", desc:"Teacher loan records", Icon:Users, color:"#7b241c" },
  { id:"inventory", label:"Inventory status", desc:"Copies by condition and shelf", Icon:BookOpen, color:"#b8943a" },
  { id:"purchase", label:"Purchase register", desc:"All vendor orders and invoices", Icon:FileBarChart, color:"#2e4057" },
  { id:"class", label:"Class-wise report", desc:"Borrowing by grade and section", Icon:Users, color:"#145a32" },
  { id:"category", label:"Category report", desc:"Borrowings by book category", Icon:BookOpen, color:"#78281f" },
];

export function LibReportsPage() {
  const { notify } = useLibCtx();
  const [period, setPeriod] = useState("This month");
  const [generating, setGenerating] = useState<string|null>(null);

  function generate(id: string, fmt: string) {
    setGenerating(id);
    setTimeout(() => { setGenerating(null); notify(`Report exported as ${fmt}`); }, 1000);
  }

  const overdueLoans = loans.filter(l => l.status === "Overdue");
  const totalFines = overdueLoans.reduce((s,l) => s + l.fine, 0);

  return (
    <div>
      <div className="mb-7">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><FileBarChart size={12}/> Librarian workspace · Reports</p>
        <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Library reports.</h1>
        <p className="mt-2 text-[13px] text-[#718174]">Generate, filter, and export reports on lending, inventory, and finances.</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label:"Total issued (month)", value:"68", color:"#4c8056" },
          { label:"Total returned (month)", value:"62", color:"#2d7a4a" },
          { label:"Overdue books", value:overdueLoans.length.toString(), color:"#c0392b" },
          { label:"Fines outstanding", value:`PKR ${totalFines}`, color:"#b8943a" },
        ].map(s=>(
          <div key={s.label} className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-4">
            <p className="text-[11px] text-[#748277] mb-1">{s.label}</p>
            <p className="text-[22px] leading-none font-semibold" style={{fontFamily:"'DM Serif Display', serif",color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5 mb-6">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="font-semibold text-[#1c392b]">Monthly circulation — 2026</p>
            <p className="text-[11px] text-[#829083] mt-1">Books issued vs returned per month</p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#4c8056]"/>Issued</div>
            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#b8943a]"/>Returned</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyData} barGap={4} barSize={20}>
            <CartesianGrid vertical={false} stroke="#f0f4f0" strokeDasharray="3 3"/>
            <XAxis dataKey="month" tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:"#1c392b",border:"none",borderRadius:"10px",color:"white",fontSize:"11px"}}/>
            <Bar dataKey="issued" fill="#4c8056" radius={[3,3,0,0]}/>
            <Bar dataKey="returned" fill="#b8943a" radius={[3,3,0,0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-4 mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <Filter size={13} className="text-[#78897c]"/>
          <select value={period} onChange={e=>setPeriod(e.target.value)}
            className="h-9 rounded-xl border border-[#dce3d8] bg-white px-3 text-[12px] outline-none">
            {["Today","This week","This month","Last 3 months","This year"].map(p=><option key={p}>{p}</option>)}
          </select>
          <span className="text-[11px] text-[#78897c]">Period: <b className="text-[#1c392b]">{period}</b></span>
        </div>
      </div>

      {/* Report cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {reportTypes.map(r=>(
          <div key={r.id} className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5 flex items-start gap-4">
            <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{background:r.color+"15"}}>
              <r.Icon size={18} style={{color:r.color}}/>
            </div>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-[#1c392b]">{r.label}</p>
              <p className="text-[11px] text-[#78897c] mt-0.5">{r.desc}</p>
              <div className="flex gap-2 mt-3">
                <button onClick={() => generate(r.id,"PDF")} disabled={generating===r.id}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#dce3d8] text-[11px] font-semibold text-[#1c392b] hover:bg-[#f0f4ee] disabled:opacity-50">
                  <Download size={11}/>{generating===r.id?"…":"PDF"}
                </button>
                <button onClick={() => generate(r.id,"Excel")} disabled={generating===r.id}
                  className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-[#dce3d8] text-[11px] font-semibold text-[#4c8056] hover:bg-[#f0f8f4] disabled:opacity-50">
                  <Download size={11}/>Excel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

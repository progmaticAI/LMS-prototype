import { useState } from "react";
import { useHQCtx } from "./HQShell";
import { FileBarChart, Download, FileText, BarChart3, Users, BookOpen, Calendar, Filter } from "lucide-react";

const reportTypes = [
  { id:"network-summary", label:"Network Summary Report", desc:"Overall KPIs for all 14 campuses", Icon:BarChart3, color:"#4c8056" },
  { id:"borrowing-report", label:"Borrowing Report", desc:"Circulation data by school, class, and period", Icon:BookOpen, color:"#1a5276" },
  { id:"inventory-report", label:"Inventory Report", desc:"Book availability, lost, and damaged across network", Icon:FileText, color:"#b8943a" },
  { id:"overdue-report", label:"Overdue Books Report", desc:"All overdue items with fine calculations", Icon:FileBarChart, color:"#c0392b" },
  { id:"member-report", label:"Member Activity Report", desc:"Student and staff borrowing patterns", Icon:Users, color:"#2e4057" },
  { id:"librarian-report", label:"Librarian Performance", desc:"Per-librarian statistics and benchmarks", Icon:Users, color:"#78281f" },
  { id:"purchase-report", label:"Purchase & Acquisitions", desc:"All POs, vendors, and budget utilization", Icon:FileText, color:"#145a32" },
  { id:"annual-report", label:"Annual Library Report", desc:"Full year summary for all schools", Icon:Calendar, color:"#7d6608" },
];

const periods = ["This week","This month","Last 3 months","Last 6 months","This year","Custom range"];

export function HQReports() {
  const { notify } = useHQCtx();
  const [period, setPeriod] = useState("This month");
  const [school, setSchool] = useState("All schools");
  const [generating, setGenerating] = useState<string|null>(null);

  function generate(reportId: string, format: string) {
    setGenerating(reportId);
    setTimeout(() => {
      setGenerating(null);
      notify(`${reportTypes.find(r=>r.id===reportId)?.label} (${format}) generated`);
    }, 1200);
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><FileBarChart size={12}/> Analytics</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Reports</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">Generate, filter, and export comprehensive reports for the APS library network.</p>
      </div>

      {/* Filters */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 mb-6 shadow-sm">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#0f2419]">
            <Filter size={14}/> Filters:
          </div>
          <select value={period} onChange={e=>setPeriod(e.target.value)}
            className="h-9 rounded-xl border border-[#dde4da] bg-[#f6f8f4] px-3 text-[12px] outline-none">
            {periods.map(p=><option key={p}>{p}</option>)}
          </select>
          <select value={school} onChange={e=>setSchool(e.target.value)}
            className="h-9 rounded-xl border border-[#dde4da] bg-[#f6f8f4] px-3 text-[12px] outline-none">
            <option>All schools</option>
            {["APS Lahore Cantt","APS Peshawar","APS Rawalpindi","APS Karachi","APS Islamabad"].map(s=><option key={s}>{s}</option>)}
          </select>
          <div className="ml-auto text-[11px] text-[#78897c]">Period: <b className="text-[#0f2419]">{period}</b> · Scope: <b className="text-[#0f2419]">{school}</b></div>
        </div>
      </div>

      {/* Report grid */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-2 gap-4">
        {reportTypes.map(report => (
          <div key={report.id} className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm hover:border-[#4c8056]/30 transition-all">
            <div className="flex items-start gap-4">
              <div className="size-11 rounded-xl flex items-center justify-center shrink-0" style={{background:report.color+"15"}}>
                <report.Icon size={19} style={{color:report.color}}/>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-[#0f2419]">{report.label}</p>
                <p className="text-[11px] text-[#78897c] mt-1">{report.desc}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => generate(report.id, "PDF")}
                    disabled={generating===report.id}
                    className="flex items-center gap-1.5 rounded-lg border border-[#dde4da] px-3 py-1.5 text-[11px] font-semibold text-[#0f2419] hover:bg-[#f0f4f0] transition-colors disabled:opacity-50">
                    <Download size={12}/>{generating===report.id?"Generating…":"PDF"}
                  </button>
                  <button onClick={() => generate(report.id, "Excel")}
                    disabled={generating===report.id}
                    className="flex items-center gap-1.5 rounded-lg border border-[#dde4da] px-3 py-1.5 text-[11px] font-semibold text-[#4c8056] hover:bg-[#f0f8f4] transition-colors disabled:opacity-50">
                    <Download size={12}/>Excel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent generated */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm mt-6">
        <p className="font-semibold text-[#0f2419] mb-4">Recently generated</p>
        <div className="space-y-2">
          {[
            { name:"Network Summary Report", format:"PDF", date:"Today, 09:14", size:"2.4 MB" },
            { name:"Overdue Books Report", format:"Excel", date:"Today, 08:30", size:"184 KB" },
            { name:"Borrowing Report — Jun 2026", format:"PDF", date:"Yesterday", size:"3.1 MB" },
            { name:"Inventory Report — Q2 2026", format:"PDF", date:"03 Jul 2026", size:"4.8 MB" },
          ].map((r, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl border border-[#e8ece5] px-4 py-3">
              <div className="flex items-center gap-3">
                <FileText size={14} className="text-[#78897c]"/>
                <div>
                  <p className="text-[12px] font-semibold text-[#0f2419]">{r.name}</p>
                  <p className="text-[10px] text-[#78897c]">{r.format} · {r.size} · {r.date}</p>
                </div>
              </div>
              <button onClick={() => notify("Downloading report")} className="flex items-center gap-1.5 text-[11px] font-bold text-[#4c8056]">
                <Download size={12}/> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

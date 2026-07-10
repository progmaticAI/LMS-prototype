import { useState } from "react";
import { schools } from "../../data/mockData";
import { GitCompare } from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, CartesianGrid, Cell } from "recharts";

type Metric = "healthScore"|"totalBooks"|"borrowed"|"overdue"|"members";
const metrics: { key: Metric; label: string }[] = [
  { key:"healthScore", label:"Health Score" },
  { key:"totalBooks", label:"Books" },
  { key:"borrowed", label:"Borrowed" },
  { key:"overdue", label:"Overdue" },
  { key:"members", label:"Members" },
];

export function HQBranchComparison() {
  const [metric, setMetric] = useState<Metric>("healthScore");
  const [selected, setSelected] = useState<string[]>(["s01","s02","s03","s07","s08","s10"]);

  const chartData = schools
    .filter(s => selected.includes(s.id))
    .map(s => ({ name: s.name.replace("APS ","").replace(" Lahore","").slice(0,18), value: s[metric] }))
    .sort((a,b) => b.value - a.value);

  const radarData = metrics.map(m => {
    const max = Math.max(...schools.map(s => s[m.key] as number));
    const obj: Record<string,string|number> = { metric: m.label };
    schools.filter(s=>selected.slice(0,3).includes(s.id)).forEach(s => {
      obj[s.name.replace("APS ","")] = Math.round((s[m.key] as number) / max * 100);
    });
    return obj;
  });

  const COLORS = ["#4c8056","#b8943a","#1a5276","#7b241c","#2e4057","#78281f","#145a32"];

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><GitCompare size={12}/> Analytics</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Branch Comparison</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">Compare performance metrics across APS campuses.</p>
      </div>

      {/* School selector */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] p-5 mb-6 shadow-sm">
        <p className="text-[12px] font-semibold text-[#0f2419] mb-3">Select schools to compare</p>
        <div className="flex flex-wrap gap-2">
          {schools.map((s, i) => (
            <button key={s.id}
              onClick={() => setSelected(prev => prev.includes(s.id) ? prev.filter(x=>x!==s.id) : [...prev, s.id])}
              className={`rounded-xl px-3 py-1.5 text-[11px] font-semibold transition-all ${selected.includes(s.id)
                ? "text-white shadow-sm" : "bg-[#f0f4f0] text-[#5a7263] hover:bg-[#e4ece4]"}`}
              style={selected.includes(s.id)?{background:COLORS[selected.indexOf(s.id)%COLORS.length]}:{}}
            >{s.name.replace("APS ","")}</button>
          ))}
        </div>
      </div>

      {/* Metric selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map(m => (
          <button key={m.key} onClick={() => setMetric(m.key)}
            className={`rounded-xl px-4 py-2 text-[12px] font-semibold transition-all ${metric===m.key?"bg-[#0f2419] text-white":"bg-white border border-[#e2e8e0] text-[#5a7263] hover:bg-[#f0f4f0]"}`}>
            {m.label}
          </button>
        ))}
      </div>

      <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6">
        {/* Bar chart */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <p className="font-semibold text-[#0f2419] mb-1">Comparison — {metrics.find(m=>m.key===metric)?.label}</p>
          <p className="text-[11px] text-[#78897c] mb-5">Selected campuses ranked by value</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} layout="vertical" margin={{left:20}}>
              <CartesianGrid horizontal={false} stroke="#f0f4f0"/>
              <XAxis type="number" tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
              <XAxis dataKey="name" type="category" tick={{fontSize:10,fill:"#1c392b"}} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={{background:"#0f2419",border:"none",borderRadius:"10px",color:"white",fontSize:"11px"}}/>
              <Bar dataKey="value" radius={[0,4,4,0]} barSize={22}>
                {chartData.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar chart */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <p className="font-semibold text-[#0f2419] mb-1">Multi-metric radar</p>
          <p className="text-[11px] text-[#78897c] mb-3">Top 3 selected schools, normalized scores</p>
          <div className="flex flex-wrap gap-2 mb-4 text-[10px]">
            {schools.filter(s=>selected.slice(0,3).includes(s.id)).map((s,i)=>(
              <div key={s.id} className="flex items-center gap-1.5">
                <span className="size-2 rounded-full" style={{background:COLORS[i]}}/>
                {s.name.replace("APS ","")}
              </div>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart data={radarData} margin={{top:10,right:30,bottom:10,left:30}}>
              <PolarGrid gridType="polygon" stroke="#e8ece5"/>
              <PolarAngleAxis dataKey="metric" tick={{fontSize:10,fill:"#78897c"}}/>
              <Tooltip contentStyle={{background:"#0f2419",border:"none",borderRadius:"10px",color:"white",fontSize:"11px"}}/>
              {schools.filter(s=>selected.slice(0,3).includes(s.id)).map((s,i)=>(
                <Radar key={s.id} name={s.name.replace("APS ","")} dataKey={s.name.replace("APS ","")}
                  stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.15}/>
              ))}
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Data table */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] overflow-hidden shadow-sm mt-6">
        <div className="p-5 border-b border-[#e8ece5]">
          <p className="font-semibold text-[#0f2419]">Detailed comparison table</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead className="bg-[#f6f8f4] border-b border-[#e8ece5] text-[9px] font-bold uppercase tracking-[.14em] text-[#78897c]">
              <tr>
                <th className="px-6 py-3">School</th>
                <th>Health</th>
                <th>Books</th>
                <th>Borrowed</th>
                <th>Overdue</th>
                <th>Lost</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f0]">
              {schools.filter(s=>selected.includes(s.id)).sort((a,b)=>b.healthScore-a.healthScore).map(s=>(
                <tr key={s.id} className="hover:bg-[#f8faf6]">
                  <td className="px-6 py-3">
                    <p className="text-[12px] font-semibold text-[#0f2419]">{s.name}</p>
                    <p className="text-[10px] text-[#78897c]">{s.city}</p>
                  </td>
                  <td><span className={`text-[11px] font-bold ${s.healthScore>=93?"text-[#2d7a4a]":s.healthScore>=88?"text-[#b8943a]":"text-[#c0392b]"}`}>{s.healthScore}%</span></td>
                  <td className="text-[12px] text-[#1c392b]">{s.totalBooks.toLocaleString()}</td>
                  <td className="text-[12px] text-[#b8943a]">{s.borrowed.toLocaleString()}</td>
                  <td className={`text-[12px] font-semibold ${s.overdue>40?"text-[#c0392b]":s.overdue>20?"text-[#e8943a]":"text-[#4c8056]"}`}>{s.overdue}</td>
                  <td className="text-[12px] text-[#7f8c8d]">{s.lost}</td>
                  <td className="text-[12px] text-[#1a5276]">{s.members.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

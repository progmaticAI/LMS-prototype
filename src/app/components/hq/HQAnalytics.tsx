import { schools } from "../../data/mockData";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const networkData = months.map((month, i) => ({
  month,
  total: schools.reduce((s, sc) => s + sc.monthlyCirx[i], 0),
  lahore: schools.filter(s=>s.city==="Lahore").reduce((s, sc) => s + sc.monthlyCirx[i], 0),
  other: schools.filter(s=>s.city!=="Lahore").reduce((s, sc) => s + sc.monthlyCirx[i], 0),
}));

const topSchools = [...schools].sort((a,b) => b.monthlyCirx.reduce((s,v)=>s+v,0) - a.monthlyCirx.reduce((s,v)=>s+v,0)).slice(0,6);
const schoolMonthly = months.map((month, i) => {
  const obj: Record<string,string|number> = { month };
  topSchools.slice(0,3).forEach(s => { obj[s.name.replace("APS ","")] = s.monthlyCirx[i]; });
  return obj;
});

const COLORS = ["#4c8056","#b8943a","#1a5276","#7b241c","#2e4057","#78281f"];

export function HQAnalytics() {
  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><TrendingUp size={12}/> Analytics</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Borrowing Analytics</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">Circulation trends across the network for 2026.</p>
      </div>

      {/* Trend chart */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-semibold text-[#0f2419]">Network circulation trend</p>
            <p className="text-[11px] text-[#78897c] mt-1">Total borrowings across all 14 campuses · Jan–Dec 2026</p>
          </div>
          <div className="flex items-center gap-3 text-[10px]">
            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#4c8056]"/>Total</div>
            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#b8943a]"/>Lahore</div>
            <div className="flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#1a5276]"/>Other</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={networkData}>
            <defs>
              <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4c8056" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#4c8056" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="lahore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#b8943a" stopOpacity={0.12}/>
                <stop offset="95%" stopColor="#b8943a" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f0f4f0" strokeDasharray="3 3"/>
            <XAxis dataKey="month" tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false} tickFormatter={v=>v.toLocaleString()}/>
            <Tooltip contentStyle={{background:"#0f2419",border:"none",borderRadius:"10px",color:"white",fontSize:"11px"}} formatter={(v:number)=>[v.toLocaleString()]}/>
            <Area type="monotone" dataKey="total" stroke="#4c8056" strokeWidth={2} fill="url(#total)" dot={false}/>
            <Area type="monotone" dataKey="lahore" stroke="#b8943a" strokeWidth={2} fill="url(#lahore)" dot={false}/>
            <Area type="monotone" dataKey="other" stroke="#1a5276" strokeWidth={1.5} fill="none" dot={false} strokeDasharray="4 4"/>
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top 3 schools trend */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm mb-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-semibold text-[#0f2419]">Top 3 schools comparison</p>
            <p className="text-[11px] text-[#78897c] mt-1">Monthly borrowings for highest-circulation campuses</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px]">
            {topSchools.slice(0,3).map((s,i)=>(
              <div key={s.id} className="flex items-center gap-1.5">
                <span className="size-2.5 rounded-full" style={{background:COLORS[i]}}/>
                {s.name.replace("APS ","")}
              </div>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={schoolMonthly} barSize={14} barGap={2}>
            <CartesianGrid vertical={false} stroke="#f0f4f0" strokeDasharray="3 3"/>
            <XAxis dataKey="month" tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
            <YAxis tick={{fontSize:10,fill:"#8a9e8e"}} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{background:"#0f2419",border:"none",borderRadius:"10px",color:"white",fontSize:"11px"}}/>
            {topSchools.slice(0,3).map((s,i)=>(
              <Bar key={s.id} dataKey={s.name.replace("APS ","")} fill={COLORS[i]} radius={[3,3,0,0]}/>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { label:"Peak month", value:"Nov 2026", sub:`${networkData[10].total.toLocaleString()} total borrowings` },
          { label:"Avg monthly borrowings", value: Math.round(networkData.reduce((s,d)=>s+d.total,0)/12).toLocaleString(), sub:"Per month, network-wide" },
          { label:"YTD total borrowings", value: networkData.slice(0,7).reduce((s,d)=>s+d.total,0).toLocaleString(), sub:"Jan–Jul 2026" },
        ].map(item => (
          <div key={item.label} className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
            <p className="text-[11px] text-[#78897c] mb-2">{item.label}</p>
            <p className="text-[26px] leading-none text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif"}}>{item.value}</p>
            <p className="text-[11px] text-[#a0b0a0] mt-2">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

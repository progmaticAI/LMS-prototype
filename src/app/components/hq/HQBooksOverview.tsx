import { books, schools } from "../../data/mockData";
import { BookOpen, BookX, Package, TrendingUp } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const categories = Array.from(new Set(books.map(b => b.category)));
const catData = categories.map(cat => ({
  name: cat,
  value: books.filter(b => b.category === cat).reduce((s, b) => s + b.copies, 0),
  books: books.filter(b => b.category === cat).length,
})).sort((a, b) => b.value - a.value);

const COLORS = ["#4c8056","#b8943a","#1a5276","#7b241c","#2e4057","#78281f","#145a32","#7d6608","#154360","#4a235a"];

const langData = [
  { name:"English", value: books.filter(b=>b.language==="English").reduce((s,b)=>s+b.copies,0) },
  { name:"Urdu", value: books.filter(b=>b.language==="Urdu").reduce((s,b)=>s+b.copies,0) },
];

export function HQBooksOverview() {
  const totalTitles = books.length;
  const totalCopies = books.reduce((s, b) => s + b.copies, 0);
  const totalAvail = books.reduce((s, b) => s + b.available, 0);
  const totalIssued = books.reduce((s, b) => s + b.issued, 0);
  const totalLost = books.reduce((s, b) => s + b.lost, 0);
  const totalDamaged = books.reduce((s, b) => s + b.damaged, 0);

  // Network totals
  const networkTitles = schools.reduce((s, sc) => s + sc.totalBooks, 0);

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><BookOpen size={12}/> Analytics</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Books Overview</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">Network-wide catalog statistics, composition, and status tracking.</p>
      </div>

      {/* Network KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {[
          { label:"Network catalog", value: networkTitles.toLocaleString(), sub:"Total across 14 schools", Icon:BookOpen, color:"#4c8056" },
          { label:"Available", value: schools.reduce((s,sc)=>s+sc.available,0).toLocaleString(), sub:"Ready to issue", Icon:Package, color:"#2d7a4a" },
          { label:"Currently borrowed", value: schools.reduce((s,sc)=>s+sc.borrowed,0).toLocaleString(), sub:"Active loans", Icon:TrendingUp, color:"#b8943a" },
          { label:"Overdue", value: schools.reduce((s,sc)=>s+sc.overdue,0).toString(), sub:"Needs follow-up", Icon:BookX, color:"#c0392b" },
          { label:"Lost books", value: schools.reduce((s,sc)=>s+sc.lost,0).toString(), sub:"Under investigation", Icon:BookX, color:"#7f8c8d" },
          { label:"Damaged", value: schools.reduce((s,sc)=>s+sc.damaged,0).toString(), sub:"Flagged for removal", Icon:BookX, color:"#d35400" },
        ].map(item => (
          <div key={item.label} className="rounded-2xl bg-white border border-[#e2e8e0] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="size-9 rounded-xl flex items-center justify-center" style={{background:item.color+"15"}}>
                <item.Icon size={16} style={{color:item.color}}/>
              </div>
            </div>
            <p className="text-[11px] text-[#78897c] mb-1">{item.label}</p>
            <p className="text-[28px] leading-none" style={{fontFamily:"'DM Serif Display', serif",color:"#0f2419"}}>{item.value}</p>
            <p className="text-[10px] text-[#a0b0a0] mt-1">{item.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid xl:grid-cols-2 gap-6 mb-6">
        {/* Category breakdown */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <p className="font-semibold text-[#0f2419] mb-1">By category (this branch)</p>
          <p className="text-[11px] text-[#78897c] mb-5">Distribution of copies across subject categories</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={catData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                {catData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
              </Pie>
              <Tooltip formatter={(v:number) => [v+" copies"]}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Category table */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <p className="font-semibold text-[#0f2419] mb-1">Category breakdown</p>
          <p className="text-[11px] text-[#78897c] mb-4">Titles and copies per category</p>
          <div className="space-y-3">
            {catData.map((c, i) => (
              <div key={c.name}>
                <div className="flex justify-between text-[12px] mb-1">
                  <div className="flex items-center gap-2">
                    <span className="size-2.5 rounded-full shrink-0" style={{background:COLORS[i%COLORS.length]}}/>
                    <span className="text-[#1c392b] font-semibold">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-[#0f2419]">{c.value}</span>
                    <span className="text-[#78897c] ml-1">copies</span>
                    <span className="text-[10px] text-[#a0b0a0] ml-2">({c.books} titles)</span>
                  </div>
                </div>
                <div className="h-1.5 rounded-full bg-[#e8ece5]">
                  <div className="h-full rounded-full" style={{width:`${Math.round(c.value/catData[0].value*100)}%`,background:COLORS[i%COLORS.length]}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top borrowed books */}
      <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
        <p className="font-semibold text-[#0f2419] mb-1">Most popular titles</p>
        <p className="text-[11px] text-[#78897c] mb-5">Books with highest circulation across the network</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-[#f6f8f4] border-b border-[#e8ece5] text-[9px] font-bold uppercase tracking-[.14em] text-[#78897c]">
              <tr>
                <th className="px-4 py-2.5">#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Copies</th>
                <th>Issued</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f0]">
              {books.sort((a,b)=>b.issued-a.issued).slice(0,10).map((b,i)=>(
                <tr key={b.id} className="hover:bg-[#f8faf6]">
                  <td className="px-4 py-3 text-[11px] font-bold text-[#b0bdb0]">{i+1}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <span className="inline-block w-7 h-9 rounded-sm shrink-0" style={{background:b.coverColor}}/>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0f2419]">{b.title}</p>
                        <p className="text-[10px] text-[#78897c]">{b.author}</p>
                      </div>
                    </div>
                  </td>
                  <td><span className="rounded-full bg-[#f0f4ee] px-2 py-0.5 text-[10px] text-[#5a7263]">{b.category}</span></td>
                  <td className="text-[12px] font-semibold text-[#1c392b]">{b.copies}</td>
                  <td className="text-[12px] text-[#b8943a] font-semibold">{b.issued}</td>
                  <td>
                    <span className={`text-[11px] font-semibold ${b.available===0?"text-[#c0392b]":b.available<2?"text-[#e8943a]":"text-[#4c8056]"}`}>
                      {b.available}/{b.copies}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

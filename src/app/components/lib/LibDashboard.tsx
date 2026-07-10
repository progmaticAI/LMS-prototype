import { useLibCtx } from "./LibShell";
import { loans, books, students, reservations } from "../../data/mockData";
import { BookOpen, Clock3, Bell, ArrowLeftRight, Users, BookMarked, TrendingUp, AlertTriangle, Plus } from "lucide-react";

function KPI({ label, value, sub, Icon, color, onClick }: { label:string; value:string; sub:string; Icon:any; color:string; onClick?:()=>void }) {
  return (
    <div onClick={onClick} className={`rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-4 shadow-[0_10px_25px_rgba(25,55,38,.025)] ${onClick?"cursor-pointer hover:border-[#b9cfb9] transition-colors":""}`}>
      <div className="flex justify-between mb-4">
        <span className="size-9 rounded-xl flex items-center justify-center" style={{background:color+"20"}}>
          <Icon size={17} style={{color}}/>
        </span>
      </div>
      <p className="text-[11px] text-[#748277] mb-1">{label}</p>
      <p className="font-serif text-[27px] leading-none text-[#1c392b]" style={{fontFamily:"'DM Serif Display', serif"}}>{value}</p>
      <p className="text-[10px] text-[#8a9e8e] mt-1">{sub}</p>
    </div>
  );
}

const activeLoans = loans.filter(l => l.status !== "Returned");
const overdueLoans = loans.filter(l => l.status === "Overdue");
const dueToday = loans.filter(l => l.status === "Active" && l.dueDate === "2026-07-10");
const recentlyAdded = books.slice(-5).reverse();
const popularBooks = [...books].sort((a,b) => b.issued - a.issued).slice(0,5);
const inventoryAlerts = [
  { msg:"A Brief History of Time — C-002 damaged, needs replacement", level:"warning" },
  { msg:"Pakistan: A Hard Country — C-003 reported missing", level:"error" },
  { msg:"Aangan — only 1 copy available, 2 reservations waiting", level:"info" },
];

export function LibDashboard() {
  const { branch, query, notify, openIssue, openReturn } = useLibCtx();

  const quickActions = [
    { label:"Issue a book", sub:"Scan member and book", onClick: openIssue, Icon: ArrowLeftRight },
    { label:"Return a book", sub:"Process return & fines", onClick: openReturn, Icon: BookOpen },
    { label:"Register member", sub:"Add student or staff", onClick: () => notify("Member form opened"), Icon: Users },
    { label:"Record purchase", sub:"Log new acquisitions", onClick: () => notify("Purchase form opened"), Icon: BookOpen },
    { label:"New reservation", sub:"Hold book for member", onClick: () => notify("Reservation form opened"), Icon: BookMarked },
  ];

  const filteredLoans = activeLoans.filter(l =>
    l.bookTitle.toLowerCase().includes(query.toLowerCase()) ||
    l.memberName.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-7">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]">
          <BookOpen size={12}/> Librarian Workspace
        </p>
        <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Your library, today.</h1>
        <p className="mt-2 text-[13px] text-[#718174]">{branch} · {new Date().toLocaleDateString("en-PK",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <KPI label="Total issued" value={activeLoans.length.toString()} sub="active loans" Icon={Clock3} color="#4c8056"/>
        <KPI label="Issued today" value="8" sub="this session" Icon={ArrowLeftRight} color="#1a5276"/>
        <KPI label="Returned today" value="5" sub="processed" Icon={BookOpen} color="#2d7a4a"/>
        <KPI label="Overdue" value={overdueLoans.length.toString()} sub="needs follow-up" Icon={AlertTriangle} color="#c0392b" onClick={() => notify("Overdue list opened")}/>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <KPI label="Due today" value={dueToday.length.toString()} sub="remind borrowers" Icon={Bell} color="#b8943a"/>
        <KPI label="Reservations" value={reservations.filter(r=>r.status==="Active").length.toString()} sub="pending pickup" Icon={BookMarked} color="#7b241c"/>
        <KPI label="Total members" value="4,846" sub="students & staff" Icon={Users} color="#2e4057"/>
        <KPI label="Books in catalog" value="6,920" sub="total copies" Icon={BookOpen} color="#145a32"/>
      </div>

      <div className="grid xl:grid-cols-[1.5fr_.7fr] gap-5 mb-5">
        {/* Recent circulation */}
        <section className="overflow-hidden rounded-2xl border border-[#dde4da] bg-[#fcfdf9]">
          <div className="flex items-center justify-between p-5 md:px-6">
            <div>
              <p className="font-semibold text-[#1c392b]">Recent circulation</p>
              <p className="mt-1 text-[11px] text-[#829083]">Active and recent loans — {filteredLoans.length} records</p>
            </div>
            <button onClick={openIssue} className="flex items-center gap-1.5 text-[11px] font-bold text-[#2d6243] hover:text-[#1c392b]">
              <Plus size={13}/> Issue
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead className="border-y border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
                <tr><th className="px-6 py-3">Book</th><th>Borrower</th><th>Due date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filteredLoans.slice(0, 8).map(l => (
                  <tr key={l.id} className="border-b border-[#edf0ec] last:border-0 hover:bg-[#f8faf6]">
                    <td className="px-6 py-3.5">
                      <p className="text-[11px] font-semibold text-[#1c392b] truncate max-w-[200px]">{l.bookTitle}</p>
                      <p className="text-[10px] text-[#829083]">{l.copyNo} · {l.accessionNo}</p>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full flex items-center justify-center text-[8px] font-bold text-[#355f43] shrink-0" style={{background:l.initColor}}>{l.initials}</div>
                        <div>
                          <p className="text-[11px] font-semibold text-[#1c392b]">{l.memberName}</p>
                          <p className="text-[9px] text-[#839083]">{l.memberClass}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-[11px] text-[#66796a]">{l.dueDate}</td>
                    <td>
                      <span className={`rounded-full px-2 py-1 text-[9px] font-bold ${l.status==="Overdue"?"bg-[#ffebee] text-[#c0392b]":l.status==="Returned"?"bg-[#edf0ec] text-[#66756a]":"bg-[#e8f1e7] text-[#347246]"}`}>{l.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Quick desk */}
        <section className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5">
          <p className="font-semibold text-[#1c392b] mb-1">Today's desk</p>
          <p className="text-[11px] text-[#829083] mb-4">Fast access workflows</p>
          <div className="space-y-2">
            {quickActions.map(({ label, sub, onClick, Icon }) => (
              <button key={label} onClick={onClick}
                className="w-full flex items-center gap-3 rounded-xl border border-[#e1e7de] p-3 text-left hover:border-[#b9cfb9] hover:bg-[#f7faf5] transition-all">
                <div className="size-8 rounded-lg bg-[#e8f0e7] flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-[#356444]"/>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-[#1c392b]">{label}</p>
                  <p className="text-[10px] text-[#809082]">{sub}</p>
                </div>
                <Plus size={13} className="text-[#356444]"/>
              </button>
            ))}
          </div>

          {/* Inventory alerts */}
          <div className="mt-5 pt-5 border-t border-[#e5e9e1]">
            <p className="text-[11px] font-bold text-[#1c392b] mb-3 flex items-center gap-1.5"><AlertTriangle size={12}/> Inventory alerts</p>
            <div className="space-y-2">
              {inventoryAlerts.map((a, i) => (
                <div key={i} className={`rounded-lg p-2.5 text-[10px] ${a.level==="error"?"bg-[#ffebee] text-[#c0392b]":a.level==="warning"?"bg-[#fff8e1] text-[#8a5a1a]":"bg-[#e8f4fd] text-[#1a5276]"}`}>
                  {a.msg}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Popular books */}
      <section className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5 md:p-6">
        <p className="font-semibold text-[#1c392b] mb-1">Popular books</p>
        <p className="text-[11px] text-[#829083] mb-4">Most borrowed titles this month</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {popularBooks.map((b, i) => (
            <div key={b.id} className="flex items-start gap-3">
              <span className="text-[11px] font-bold text-[#bdc3be] mt-1.5 shrink-0 w-4">{i+1}</span>
              <div>
                <div className="w-10 h-14 rounded-md mb-2 shrink-0" style={{background:b.coverColor}}/>
                <p className="text-[11px] font-semibold text-[#1c392b] leading-tight">{b.title}</p>
                <p className="text-[10px] text-[#78897c] mt-0.5">{b.issued} borrows</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

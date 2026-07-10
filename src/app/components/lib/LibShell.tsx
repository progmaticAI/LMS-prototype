import { useState } from "react";
import { NavLink, Outlet, useNavigate, useOutletContext } from "react-router";
import {
  LayoutDashboard, BookCopy, Users, ArrowLeftRight, BookMarked,
  Package, FileBarChart, Settings, HelpCircle, LogOut, Bell,
  Search, ChevronDown, LibraryBig, ArrowLeft, Menu, X, Plus
} from "lucide-react";
import { books as allBooks, students, loans } from "../../data/mockData";

type LibCtx = { branch: string; query: string; notify: (msg: string) => void; openIssue: () => void; openReturn: () => void };
export function useLibCtx() { return useOutletContext<LibCtx>(); }

const navItems = [
  { section: "Main", items: [
    { to: "/lib", label: "Dashboard", Icon: LayoutDashboard, end: true },
    { to: "/lib/catalog", label: "Books", Icon: BookCopy },
    { to: "/lib/members", label: "Members", Icon: Users },
    { to: "/lib/circulation", label: "Issue & Return", Icon: ArrowLeftRight },
    { to: "/lib/reservations", label: "Reservations", Icon: BookMarked },
    { to: "/lib/inventory", label: "Inventory", Icon: Package },
    { to: "/lib/reports", label: "Reports", Icon: FileBarChart },
  ]},
  { section: "System", items: [
    { to: "/lib/settings", label: "Settings", Icon: Settings },
    { to: "/lib/help", label: "Help", Icon: HelpCircle },
  ]},
];

export function LibShell() {
  const nav = useNavigate();
  const [branch] = useState("APS Lahore Cantt");
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState<string|null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [issueOpen, setIssueOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);

  function notify(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  return (
    <div className="min-h-screen bg-[#f4f6f1] flex" style={{fontFamily:"'DM Sans', sans-serif"}}>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 w-[258px] flex-col bg-[#fcfdf9] border-r border-[#dde3d9] flex transition-transform duration-200 ${mobileOpen?"translate-x-0":"-translate-x-full"} lg:translate-x-0`}>
        {/* Brand */}
        <div className="px-4 py-5 border-b border-[#e5e9e1]">
          <div className="flex items-center gap-3 px-2">
            <div className="size-10 rounded-xl bg-[#194330] flex items-center justify-center shrink-0">
              <LibraryBig size={20} className="text-[#f4d77f]"/>
            </div>
            <div>
              <p className="text-[17px] leading-5 text-[#1c392b]" style={{fontFamily:"'DM Serif Display', serif"}}>APS Library</p>
              <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#78897c] mt-0.5">Branch Portal</p>
            </div>
          </div>
        </div>

        {/* Branch indicator */}
        <div className="px-5 py-3 border-b border-[#e5e9e1]">
          <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#98a197] mb-1.5">Active branch</p>
          <div className="flex items-center gap-2 text-[12px] font-semibold text-[#1c5237]">
            <span className="size-2 rounded-full bg-[#4c8056]"/>
            {branch}
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">
          {navItems.map(({ section, items }) => (
            <div key={section}>
              <p className="px-3 mb-1.5 text-[9px] font-bold uppercase tracking-[.18em] text-[#98a197]">{section}</p>
              <div className="space-y-0.5">
                {items.map(({ to, label, Icon, end }) => (
                  <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)}
                    className={({isActive}) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors ${isActive
                      ? "bg-[#e7efe6] font-semibold text-[#1c5237] shadow-[inset_3px_0_0_#b68d48]"
                      : "text-[#617265] hover:bg-[#f0f4ee]"}`}>
                    <Icon size={16}/>{label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-[#e0e6dd] p-3 space-y-1.5">
          <div className="rounded-2xl border border-[#e0e6dd] bg-[#f4f7f2] p-3">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-full bg-[#d7e5d6] flex items-center justify-center text-[10px] font-bold text-[#28563d]">AH</div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#1c392b]">Ayesha Habib</p>
                <p className="text-[10px] text-[#778678]">Library Administrator</p>
              </div>
              <ChevronDown size={13} className="text-[#718273] shrink-0"/>
            </div>
          </div>
          <button onClick={() => nav("/")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#617265] hover:bg-[#f0f4ee] text-[12px] transition-colors">
            <ArrowLeft size={13}/> Switch app
          </button>
          <button onClick={() => nav("/")} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#617265] hover:text-red-500 hover:bg-red-50 text-[12px] transition-colors">
            <LogOut size={13}/> Sign out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 z-20 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}/>}

      {/* Main */}
      <div className="flex-1 lg:pl-[258px] flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-[74px] items-center gap-4 border-b border-[#dde3d9] bg-[#fcfdf9]/95 px-5 md:px-8 backdrop-blur">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden size-9 rounded-lg hover:bg-[#edf2eb] flex items-center justify-center">
            {mobileOpen ? <X size={17}/> : <Menu size={17}/>}
          </button>
          <div className="relative hidden sm:flex flex-1 max-w-[400px]">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748277]"/>
            <input value={query} onChange={e=>setQuery(e.target.value)}
              placeholder="Search books, members…"
              className="w-full h-10 rounded-xl border border-[#dce3d8] bg-white pl-9 pr-4 text-[12px] outline-none focus:border-[#4c8056] transition-colors"/>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button onClick={() => setIssueOpen(true)}
              className="hidden md:flex items-center gap-2 h-9 px-3 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330] transition-colors">
              <Plus size={14}/> Issue book
            </button>
            <button onClick={() => notify("3 new alerts")} className="relative size-9 rounded-full hover:bg-[#edf2eb] flex items-center justify-center">
              <Bell size={17} className="text-[#5a7263]"/>
              <i className="absolute top-2 right-2 size-1.5 rounded-full bg-[#bd8741]"/>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 px-5 py-8 md:px-8 lg:px-10 max-w-[1460px] mx-auto w-full">
          <Outlet context={{ branch, query, notify, openIssue:()=>setIssueOpen(true), openReturn:()=>setReturnOpen(true) } satisfies LibCtx}/>
        </main>
      </div>

      {/* Dialogs */}
      {issueOpen && <IssueDialog onClose={() => setIssueOpen(false)} notify={notify}/>}
      {returnOpen && <ReturnDialog onClose={() => setReturnOpen(false)} notify={notify}/>}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-xl bg-[#17412e] px-4 py-3 text-[12px] font-semibold text-white shadow-xl">
          {toast}
        </div>
      )}
    </div>
  );
}

// ─── Issue Book Dialog ────────────────────────────────────────────────────────
function IssueDialog({ onClose, notify }: { onClose: () => void; notify: (m:string)=>void }) {
  const [step, setStep] = useState(1);
  const [studentQ, setStudentQ] = useState("");
  const [bookQ, setBookQ] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<typeof students[0]|null>(null);
  const [selectedBook, setSelectedBook] = useState<typeof allBooks[0]|null>(null);

  const matchedStudents = students.filter(s =>
    studentQ.length > 1 &&
    (s.name.toLowerCase().includes(studentQ.toLowerCase()) || s.admissionNo.toLowerCase().includes(studentQ.toLowerCase()))
  ).slice(0,4);

  const matchedBooks = allBooks.filter(b =>
    bookQ.length > 1 &&
    (b.title.toLowerCase().includes(bookQ.toLowerCase()) || b.accessionNo.toLowerCase().includes(bookQ.toLowerCase()))
    && b.available > 0
  ).slice(0,4);

  const dueDate = new Date(); dueDate.setDate(dueDate.getDate() + 14);
  const dueDateStr = dueDate.toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"});

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-[#1d5139] px-6 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-[18px]" style={{fontFamily:"'DM Serif Display', serif"}}>Issue a Book</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white text-[20px] leading-none">×</button>
          </div>
          <div className="flex items-center gap-1 mt-4">
            {["Find Member","Find Book","Confirm","Done"].map((s,i)=>(
              <div key={s} className="flex items-center gap-1 flex-1">
                <div className="flex-1 flex items-center gap-1.5">
                  <div className={`size-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${step>i+1?"bg-[#f4d77f] text-[#1d5139]":step===i+1?"bg-white text-[#1d5139]":"bg-white/20 text-white/60"}`}>{i+1}</div>
                  <span className={`text-[9px] font-semibold truncate ${step===i+1?"text-white":"text-white/50"}`}>{s}</span>
                </div>
                {i<3&&<div className={`w-4 h-px shrink-0 ${step>i+1?"bg-[#f4d77f]":"bg-white/20"}`}/>}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6">
          {step === 1 && (
            <div>
              <p className="text-[12px] font-semibold text-[#78897c] mb-4">Search by name or admission number</p>
              <input value={studentQ} onChange={e=>setStudentQ(e.target.value)} placeholder="e.g. Nora or A-2025-1042"
                className="w-full h-11 rounded-xl border border-[#dce3d8] px-4 text-[13px] outline-none focus:border-[#4c8056] mb-3"/>
              {matchedStudents.map(s=>(
                <button key={s.id} onClick={() => { setSelectedStudent(s); setStep(2); }}
                  className="w-full flex items-center gap-3 rounded-xl border border-[#e5e9e1] p-3 mb-2 hover:border-[#4c8056]/40 hover:bg-[#f6faf5] transition-all text-left">
                  <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold text-[#28563d] shrink-0" style={{background:s.color}}>{s.initials}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#1c392b]">{s.name}</p>
                    <p className="text-[10px] text-[#78897c]">{s.class} · {s.section} · {s.admissionNo}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${s.pendingFines>0?"bg-[#fff3e0] text-[#b8943a]":"bg-[#e8f5e9] text-[#2e7d32]"}`}>
                    {s.pendingFines>0?`PKR ${s.pendingFines} fine`:"Clear"}
                  </span>
                </button>
              ))}
              {studentQ.length > 1 && matchedStudents.length === 0 && (
                <p className="text-[12px] text-[#78897c] text-center py-3">No members found.</p>
              )}
            </div>
          )}
          {step === 2 && selectedStudent && (
            <div>
              <div className="flex items-center gap-3 rounded-xl bg-[#f0f8f4] border border-[#dde9dd] p-3 mb-5">
                <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold text-[#28563d] shrink-0" style={{background:selectedStudent.color}}>{selectedStudent.initials}</div>
                <div>
                  <p className="text-[12px] font-semibold text-[#1c392b]">{selectedStudent.name}</p>
                  <p className="text-[10px] text-[#78897c]">{selectedStudent.class} · {selectedStudent.admissionNo}</p>
                </div>
              </div>
              <p className="text-[12px] font-semibold text-[#78897c] mb-3">Search book by title or accession no.</p>
              <input value={bookQ} onChange={e=>setBookQ(e.target.value)} placeholder="e.g. Midnight Library or BK-000829"
                className="w-full h-11 rounded-xl border border-[#dce3d8] px-4 text-[13px] outline-none focus:border-[#4c8056] mb-3"/>
              {matchedBooks.map(b=>(
                <button key={b.id} onClick={() => { setSelectedBook(b); setStep(3); }}
                  className="w-full flex items-center gap-3 rounded-xl border border-[#e5e9e1] p-3 mb-2 hover:border-[#4c8056]/40 hover:bg-[#f6faf5] transition-all text-left">
                  <span className="inline-block w-7 h-9 rounded-sm shrink-0" style={{background:b.coverColor}}/>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#1c392b] truncate">{b.title}</p>
                    <p className="text-[10px] text-[#78897c]">{b.author} · {b.accessionNo}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-[#4c8056] shrink-0">{b.available} avail.</span>
                </button>
              ))}
              {bookQ.length > 1 && matchedBooks.length === 0 && (
                <p className="text-[12px] text-[#78897c] text-center py-3">No available books found.</p>
              )}
              <button onClick={() => setStep(1)} className="mt-3 text-[11px] text-[#78897c] hover:text-[#4c8056]">← Back</button>
            </div>
          )}
          {step === 3 && selectedStudent && selectedBook && (
            <div>
              <p className="text-[13px] font-semibold text-[#1c392b] mb-4">Confirm issue details</p>
              <div className="rounded-xl border border-[#e5e9e1] p-4 space-y-3 mb-5">
                <Row label="Borrower" value={selectedStudent.name}/>
                <Row label="Class" value={`${selectedStudent.class} · ${selectedStudent.section}`}/>
                <Row label="Admission No." value={selectedStudent.admissionNo}/>
                <div className="border-t border-[#e5e9e1]"/>
                <Row label="Book" value={selectedBook.title}/>
                <Row label="Accession No." value={selectedBook.accessionNo}/>
                <Row label="Copy" value="C-001"/>
                <div className="border-t border-[#e5e9e1]"/>
                <Row label="Issue date" value={new Date().toLocaleDateString("en-PK",{day:"2-digit",month:"short",year:"numeric"})}/>
                <Row label="Due date" value={dueDateStr} highlight/>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { notify(`Book issued to ${selectedStudent.name} — due ${dueDateStr}`); setStep(4); }}
                  className="flex-1 h-11 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
                  Confirm Issue
                </button>
                <button onClick={() => setStep(2)} className="h-11 px-4 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Back</button>
              </div>
            </div>
          )}
          {step === 4 && selectedStudent && selectedBook && (
            <div className="text-center py-4">
              <div className="size-14 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4c8056] text-[24px]">✓</span>
              </div>
              <h3 className="text-[17px] font-semibold text-[#1c392b] mb-2">Book issued!</h3>
              <p className="text-[12px] text-[#78897c] mb-5">
                {selectedBook.title} issued to <b className="text-[#1c392b]">{selectedStudent.name}</b><br/>
                Due: <b className="text-[#b8943a]">{dueDateStr}</b>
              </p>
              <div className="flex gap-3">
                <button onClick={() => notify("Receipt printed")} className="flex-1 h-10 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Print receipt</button>
                <button onClick={onClose} className="flex-1 h-10 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Return Book Dialog ───────────────────────────────────────────────────────
function ReturnDialog({ onClose, notify }: { onClose: () => void; notify: (m:string)=>void }) {
  const [step, setStep] = useState(1);
  const [q, setQ] = useState("");
  const [selectedLoan, setSelectedLoan] = useState<typeof loans[0]|null>(null);
  const [condition, setCondition] = useState("Good — no damage");

  const activeLoans = loans.filter(l => l.status !== "Returned");
  const matched = activeLoans.filter(l =>
    q.length > 1 &&
    (l.memberName.toLowerCase().includes(q.toLowerCase()) ||
     l.bookTitle.toLowerCase().includes(q.toLowerCase()) ||
     l.id.toLowerCase().includes(q.toLowerCase()))
  ).slice(0,4);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="bg-[#1d5139] px-6 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-white text-[18px]" style={{fontFamily:"'DM Serif Display', serif"}}>Return a Book</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white text-[20px] leading-none">×</button>
          </div>
          <div className="flex items-center gap-1 mt-4">
            {["Find Loan","Fine Calc.","Confirm","Done"].map((s,i)=>(
              <div key={s} className="flex items-center gap-1 flex-1">
                <div className="flex-1 flex items-center gap-1.5">
                  <div className={`size-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 ${step>i+1?"bg-[#f4d77f] text-[#1d5139]":step===i+1?"bg-white text-[#1d5139]":"bg-white/20 text-white/60"}`}>{i+1}</div>
                  <span className={`text-[9px] font-semibold truncate ${step===i+1?"text-white":"text-white/50"}`}>{s}</span>
                </div>
                {i<3&&<div className={`w-4 h-px shrink-0 ${step>i+1?"bg-[#f4d77f]":"bg-white/20"}`}/>}
              </div>
            ))}
          </div>
        </div>
        <div className="p-6">
          {step === 1 && (
            <div>
              <p className="text-[12px] font-semibold text-[#78897c] mb-3">Search by borrower name, book title, or loan ID</p>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="e.g. Nora or L-2026-0841"
                className="w-full h-11 rounded-xl border border-[#dce3d8] px-4 text-[13px] outline-none focus:border-[#4c8056] mb-3"/>
              {matched.map(l=>(
                <button key={l.id} onClick={() => { setSelectedLoan(l); setStep(2); }}
                  className="w-full flex items-center gap-3 rounded-xl border border-[#e5e9e1] p-3 mb-2 hover:border-[#4c8056]/40 hover:bg-[#f6faf5] transition-all text-left">
                  <div className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0" style={{background:l.initColor, color:"#28563d"}}>{l.initials}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#1c392b] truncate">{l.bookTitle}</p>
                    <p className="text-[10px] text-[#78897c]">{l.memberName} · {l.memberClass}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${l.status==="Overdue"?"bg-[#ffebee] text-[#c0392b]":"bg-[#e8f5e9] text-[#2e7d32]"}`}>{l.status}</span>
                </button>
              ))}
              {q.length > 1 && matched.length === 0 && (
                <p className="text-[12px] text-[#78897c] text-center py-3">No active loans found.</p>
              )}
            </div>
          )}
          {step === 2 && selectedLoan && (
            <div>
              <div className="rounded-xl border border-[#e5e9e1] p-4 space-y-3 mb-5">
                <Row label="Borrower" value={selectedLoan.memberName}/>
                <Row label="Book" value={selectedLoan.bookTitle}/>
                <Row label="Loan ID" value={selectedLoan.id}/>
                <Row label="Due date" value={selectedLoan.dueDate}/>
                <div className="border-t border-[#e5e9e1]"/>
                {selectedLoan.status === "Overdue" ? (
                  <Row label="Fine outstanding" value={`PKR ${selectedLoan.fine}`} highlight/>
                ) : (
                  <Row label="Fine" value="None — on time"/>
                )}
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="flex-1 h-11 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold">Proceed</button>
                <button onClick={() => setStep(1)} className="h-11 px-4 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Back</button>
              </div>
            </div>
          )}
          {step === 3 && selectedLoan && (
            <div>
              <div className="rounded-xl bg-[#f0f8f4] border border-[#dde9dd] p-4 mb-4">
                <p className="text-[12px] font-semibold text-[#1c392b] mb-1">Confirm return of</p>
                <p className="text-[13px] text-[#1c5237] font-semibold">{selectedLoan.bookTitle}</p>
                <p className="text-[11px] text-[#78897c] mt-1">from {selectedLoan.memberName}</p>
                {selectedLoan.fine > 0 && (
                  <div className="mt-3 rounded-lg bg-[#fff3e0] border border-[#f4d77f]/50 p-3">
                    <p className="text-[11px] font-bold text-[#b8943a]">Collect fine: PKR {selectedLoan.fine}</p>
                  </div>
                )}
              </div>
              <label className="block mb-4">
                <p className="text-[11px] font-semibold text-[#5a7263] mb-1.5">Book condition on return</p>
                <select value={condition} onChange={e=>setCondition(e.target.value)}
                  className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056]">
                  <option>Good — no damage</option>
                  <option>Fair — minor wear</option>
                  <option>Poor — significant wear</option>
                  <option>Damaged — requires attention</option>
                </select>
              </label>
              <div className="flex gap-3">
                <button onClick={() => { notify(`${selectedLoan.bookTitle} returned${selectedLoan.fine>0?` · Fine PKR ${selectedLoan.fine} collected`:""}`); setStep(4); }}
                  className="flex-1 h-11 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold">
                  Process return
                </button>
                <button onClick={() => setStep(2)} className="h-11 px-4 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Back</button>
              </div>
            </div>
          )}
          {step === 4 && selectedLoan && (
            <div className="text-center py-4">
              <div className="size-14 rounded-full bg-[#e8f5e9] flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4c8056] text-[24px]">✓</span>
              </div>
              <h3 className="text-[17px] font-semibold text-[#1c392b] mb-2">Return processed!</h3>
              <p className="text-[12px] text-[#78897c] mb-5">
                <b className="text-[#1c392b]">{selectedLoan.bookTitle}</b> returned.<br/>
                Condition: {condition}
              </p>
              <div className="flex gap-3">
                <button onClick={() => notify("Receipt printed")} className="flex-1 h-10 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px]">Print receipt</button>
                <button onClick={onClose} className="flex-1 h-10 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold">Done</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight=false }: { label:string; value:string; highlight?:boolean }) {
  return (
    <div className="flex items-center justify-between text-[12px]">
      <span className="text-[#78897c]">{label}</span>
      <span className={`font-semibold ${highlight?"text-[#b8943a]":"text-[#1c392b]"}`}>{value}</span>
    </div>
  );
}

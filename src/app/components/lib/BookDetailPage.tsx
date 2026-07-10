import { useParams, useNavigate } from "react-router";
import { books, loans, fmtDate } from "../../data/mockData";
import { useLibCtx } from "./LibShell";
import { ArrowLeft, Edit, Trash2, Copy, Barcode, BookOpen, Clock3, BookX, Tag } from "lucide-react";
import { useState } from "react";

export function BookDetailPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const { notify, openIssue } = useLibCtx();
  const book = books.find(b => b.id === id);
  const [activeTab, setActiveTab] = useState<"info"|"copies"|"history">("info");
  const [showDelete, setShowDelete] = useState(false);

  if (!book) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <BookOpen size={32} className="text-[#c0d0c0]"/>
      <p className="text-[#78897c]">Book not found.</p>
      <button onClick={() => nav("/lib/catalog")} className="text-[#4c8056] font-semibold text-sm">← Back to catalog</button>
    </div>
  );

  const bookLoans = loans.filter(l => l.bookId === book.id);
  const mockCopies = Array.from({length:book.copies}, (_,i) => ({
    copy:`C-00${i+1}`,
    condition:i < book.available ? "Good" : i < book.available + book.issued ? "Issued" : i < book.available+book.issued+book.reserved ? "Reserved" : "Good",
    status: i < book.available ? "Available" : i < book.available+book.issued ? "Issued" : "Available",
  }));

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 text-[12px] text-[#78897c]">
        <button onClick={()=>nav("/lib/catalog")} className="flex items-center gap-1.5 hover:text-[#4c8056] font-semibold transition-colors">
          <ArrowLeft size={13}/> Book catalog
        </button>
        <span>/</span>
        <span className="text-[#1c392b] font-semibold truncate">{book.title}</span>
      </div>

      {/* Book header */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-6 md:p-8 mb-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Cover */}
          <div className="w-32 h-44 rounded-xl shrink-0 shadow-lg" style={{background:book.coverColor}}/>
          <div className="flex-1">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="rounded-full bg-[#f0f3ee] px-2 py-0.5 text-[9px] font-semibold text-[#637263]">{book.category}</span>
                  <span className="rounded-full bg-[#f0f3ee] px-2 py-0.5 text-[9px] font-semibold text-[#637263]">{book.language}</span>
                </div>
                <h1 className="text-[#1c392b] text-[28px] leading-tight" style={{fontFamily:"'DM Serif Display', serif"}}>{book.title}</h1>
                <p className="text-[15px] text-[#618165] mt-1">{book.author}</p>
                <p className="text-[12px] text-[#78897c] mt-1">{book.publisher} · {book.year} · {book.edition} edition</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={openIssue} className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
                  Issue this book
                </button>
                <button onClick={() => notify("Edit book form opened")} className="size-9 rounded-xl border border-[#dce3d8] flex items-center justify-center hover:bg-[#f0f4ee] text-[#617265]"><Edit size={14}/></button>
                <button onClick={() => notify("Book duplicated")} className="size-9 rounded-xl border border-[#dce3d8] flex items-center justify-center hover:bg-[#f0f4ee] text-[#617265]"><Copy size={14}/></button>
                <button onClick={() => notify("Barcode printed")} className="size-9 rounded-xl border border-[#dce3d8] flex items-center justify-center hover:bg-[#f0f4ee] text-[#617265]"><Barcode size={14}/></button>
                <button onClick={() => setShowDelete(true)} className="size-9 rounded-xl border border-red-200 flex items-center justify-center hover:bg-red-50 text-red-400"><Trash2 size={14}/></button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
              {[
                { label:"Available", value: book.available.toString(), color:"#4c8056" },
                { label:"Issued", value: book.issued.toString(), color:"#b8943a" },
                { label:"Reserved", value: book.reserved.toString(), color:"#1a5276" },
                { label:"Total copies", value: book.copies.toString(), color:"#1c392b" },
              ].map(s=>(
                <div key={s.label} className="rounded-xl bg-[#f6f8f4] p-3">
                  <p className="text-[10px] text-[#78897c] mb-1">{s.label}</p>
                  <p className="text-[22px] leading-none font-semibold" style={{fontFamily:"'DM Serif Display', serif",color:s.color}}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5">
        {(["info","copies","history"] as const).map(t=>(
          <button key={t} onClick={()=>setActiveTab(t)}
            className={`rounded-xl px-4 py-2 text-[12px] font-semibold capitalize transition-all ${activeTab===t?"bg-[#1d5139] text-white":"bg-[#fcfdf9] border border-[#dde4da] text-[#617265] hover:bg-[#f0f4ee]"}`}>
            {t === "info" ? "Book info" : t === "copies" ? `Copies (${book.copies})` : `Borrowing history (${bookLoans.length})`}
          </button>
        ))}
      </div>

      {activeTab === "info" && (
        <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-6">
          <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { label:"ISBN", value:book.isbn },
              { label:"Accession No.", value:book.accessionNo },
              { label:"Dewey Decimal", value:book.dewey },
              { label:"Shelf location", value:book.shelf },
              { label:"Genre", value:book.genre },
              { label:"Language", value:book.language },
              { label:"Added to catalog", value:fmtDate(book.addedDate) },
              { label:"Tags", value:book.tags.join(", ") },
            ].map(item=>(
              <div key={item.label} className="flex flex-col gap-1 py-3 border-b border-[#e8ece5]">
                <span className="text-[10px] font-bold uppercase tracking-[.12em] text-[#8a9e8e]">{item.label}</span>
                <span className="text-[13px] text-[#1c392b] font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
          {book.description && (
            <div className="mt-5 pt-5 border-t border-[#e8ece5]">
              <p className="text-[11px] font-bold uppercase tracking-[.12em] text-[#8a9e8e] mb-2">Description</p>
              <p className="text-[13px] text-[#5a7263] leading-relaxed">{book.description}</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "copies" && (
        <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden">
          <table className="w-full text-left">
            <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
              <tr><th className="px-6 py-3">Copy No.</th><th>Status</th><th>Condition</th><th>Shelf</th><th></th></tr>
            </thead>
            <tbody>
              {mockCopies.map((c,i)=>(
                <tr key={i} className="border-b border-[#edf0ec] last:border-0">
                  <td className="px-6 py-3.5 font-mono text-[11px] text-[#4c8056]">{c.copy}</td>
                  <td>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${c.status==="Available"?"bg-[#e8f5e9] text-[#2e7d32]":c.status==="Issued"?"bg-[#fff8e1] text-[#f57f17]":"bg-[#e8eaf6] text-[#3949ab]"}`}>{c.status}</span>
                  </td>
                  <td className="text-[11px] text-[#5a7263]">{c.condition}</td>
                  <td className="font-mono text-[10px] text-[#78897c]">{book.shelf}</td>
                  <td className="pr-6">
                    {c.status === "Available" && (
                      <button onClick={openIssue} className="text-[11px] font-bold text-[#4c8056]">Issue</button>
                    )}
                    {c.status === "Issued" && (
                      <button onClick={() => notify(`Return initiated for ${c.copy}`)} className="text-[11px] font-bold text-[#b8943a]">Return</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "history" && (
        <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden">
          {bookLoans.length === 0 ? (
            <div className="text-center p-10">
              <Clock3 size={28} className="text-[#c0d0c0] mx-auto mb-3"/>
              <p className="text-[#78897c]">No borrowing history for this book.</p>
            </div>
          ) : (
            <table className="w-full text-left">
              <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
                <tr><th className="px-6 py-3">Loan ID</th><th>Borrower</th><th>Issued</th><th>Due</th><th>Returned</th><th>Status</th></tr>
              </thead>
              <tbody>
                {bookLoans.map(l=>(
                  <tr key={l.id} className="border-b border-[#edf0ec] last:border-0">
                    <td className="px-6 py-3.5 font-mono text-[10px] text-[#4c8056]">{l.id}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0" style={{background:l.initColor,color:"#28563d"}}>{l.initials}</div>
                        <div>
                          <p className="text-[11px] font-semibold text-[#1c392b]">{l.memberName}</p>
                          <p className="text-[9px] text-[#78897c]">{l.memberClass}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-[11px] text-[#5a7263]">{l.issueDate}</td>
                    <td className="text-[11px] text-[#5a7263]">{l.dueDate}</td>
                    <td className="text-[11px] text-[#5a7263]">{l.returnDate || "—"}</td>
                    <td><span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${l.status==="Overdue"?"bg-[#ffebee] text-[#c0392b]":l.status==="Returned"?"bg-[#edf0ec] text-[#66756a]":"bg-[#e8f1e7] text-[#347246]"}`}>{l.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Delete confirmation */}
      {showDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="size-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500"/>
            </div>
            <h2 className="text-[17px] font-semibold text-[#1c392b] text-center mb-2">Delete book?</h2>
            <p className="text-[12px] text-[#78897c] text-center mb-5">This will remove <b className="text-[#1c392b]">{book.title}</b> and all {book.copies} copies from the catalog.</p>
            <div className="flex gap-3">
              <button onClick={() => { setShowDelete(false); nav("/lib/catalog"); notify("Book deleted"); }}
                className="flex-1 h-10 rounded-xl bg-red-500 text-white text-[12px] font-semibold hover:bg-red-600">Delete</button>
              <button onClick={() => setShowDelete(false)} className="flex-1 h-10 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px] hover:bg-[#f0f4ee]">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

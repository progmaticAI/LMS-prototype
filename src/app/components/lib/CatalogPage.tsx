import { useState } from "react";
import { useNavigate } from "react-router";
import { useLibCtx } from "./LibShell";
import { books } from "../../data/mockData";
import { BookCopy, Search, Filter, Plus, Download, Barcode, Grid, List, Eye } from "lucide-react";

const categories = ["All", ...Array.from(new Set(books.map(b => b.category)))];
const statuses = ["All","Available","Issued","Reserved"];

export function CatalogPage() {
  const nav = useNavigate();
  const { query, notify, openIssue } = useLibCtx();
  const [localQ, setLocalQ] = useState(query);
  const [catFilter, setCatFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"list"|"grid">("list");
  const [lang, setLang] = useState("All");

  const filtered = books.filter(b => {
    const qMatch = b.title.toLowerCase().includes(localQ.toLowerCase()) ||
      b.author.toLowerCase().includes(localQ.toLowerCase()) ||
      b.accessionNo.toLowerCase().includes(localQ.toLowerCase()) ||
      b.isbn.includes(localQ);
    const catMatch = catFilter === "All" || b.category === catFilter;
    const statusMatch = statusFilter === "All" ||
      (statusFilter === "Available" && b.available > 0) ||
      (statusFilter === "Issued" && b.issued > 0) ||
      (statusFilter === "Reserved" && b.reserved > 0);
    const langMatch = lang === "All" || b.language === lang;
    return qMatch && catMatch && statusMatch && langMatch;
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><BookCopy size={12}/> Librarian workspace · Books</p>
          <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Book catalog.</h1>
          <p className="mt-2 text-[13px] text-[#718174]">Search, manage copies, shelves, and availability. {filtered.length} titles shown.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => notify("Excel import opened")} className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#dce3d8] text-[12px] text-[#617265] hover:bg-[#f0f4ee]">
            <Download size={13}/> Import
          </button>
          <button onClick={() => notify("Barcode printer opened")} className="flex items-center gap-1.5 h-9 px-3 rounded-xl border border-[#dce3d8] text-[12px] text-[#617265] hover:bg-[#f0f4ee]">
            <Barcode size={13}/> Print barcodes
          </button>
          <button onClick={() => notify("Add book wizard opened")} className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
            <Plus size={14}/> Add book
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden">
        <div className="flex flex-wrap items-center gap-3 p-4 border-b border-[#e6ebe4]">
          <div className="relative flex-1 min-w-[180px]">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#748277]"/>
            <input value={localQ} onChange={e=>setLocalQ(e.target.value)} placeholder="Title, author, accession no. or ISBN…"
              className="w-full h-9 rounded-xl border border-[#dce3d8] bg-[#f6f8f4] pl-8 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
          </div>
          <select value={lang} onChange={e=>setLang(e.target.value)} className="h-9 rounded-xl border border-[#dce3d8] bg-white px-3 text-[11px] outline-none">
            <option>All</option><option>English</option><option>Urdu</option>
          </select>
          <div className="flex items-center gap-1.5">
            {statuses.map(s=>(
              <button key={s} onClick={()=>setStatusFilter(s)}
                className={`rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition-all ${statusFilter===s?"bg-[#1d5139] text-white":"text-[#617265] hover:bg-[#f0f4ee]"}`}>{s}</button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <button onClick={()=>setViewMode("list")} className={`size-8 rounded-lg flex items-center justify-center ${viewMode==="list"?"bg-[#1d5139] text-white":"text-[#617265] hover:bg-[#f0f4ee]"}`}><List size={14}/></button>
            <button onClick={()=>setViewMode("grid")} className={`size-8 rounded-lg flex items-center justify-center ${viewMode==="grid"?"bg-[#1d5139] text-white":"text-[#617265] hover:bg-[#f0f4ee]"}`}><Grid size={14}/></button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-1 px-4 py-2 border-b border-[#e6ebe4] overflow-x-auto">
          {categories.map(c=>(
            <button key={c} onClick={()=>setCatFilter(c)}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-all ${catFilter===c?"bg-[#e7efe6] text-[#1c5237]":"text-[#617265] hover:bg-[#f0f4ee]"}`}
            >{c} {c==="All"?`(${books.length})`:""}</button>
          ))}
        </div>

        {viewMode === "list" ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left">
              <thead className="border-b border-[#e6ebe4] bg-[#f6f8f4] text-[9px] uppercase tracking-[.13em] text-[#89948a]">
                <tr><th className="px-6 py-3">Title</th><th>Author</th><th>Category</th><th>Language</th><th>Acc. No.</th><th>Shelf</th><th>Copies</th><th></th></tr>
              </thead>
              <tbody>
                {filtered.map(b=>(
                  <tr key={b.id} className="border-b border-[#edf0ec] last:border-0 hover:bg-[#f8faf6] cursor-pointer" onClick={()=>nav(`/lib/catalog/${b.id}`)}>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="inline-block h-10 w-7 rounded-sm shrink-0" style={{background:b.coverColor}}/>
                        <div>
                          <p className="text-[12px] font-semibold text-[#1c392b]">{b.title}</p>
                          <p className="text-[10px] text-[#829083]">{b.edition} edition · {b.year}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-[11px] text-[#68796b]">{b.author}</td>
                    <td><span className="rounded-full bg-[#f0f3ee] px-2 py-0.5 text-[9px] text-[#637263]">{b.category}</span></td>
                    <td className="text-[11px] text-[#68796b]">{b.language}</td>
                    <td className="font-mono text-[10px] text-[#738273]">{b.accessionNo}</td>
                    <td className="font-mono text-[10px] text-[#738273]">{b.shelf}</td>
                    <td>
                      <span className={`text-[11px] font-semibold ${b.available===0?"text-[#c0392b]":b.available<2?"text-[#e8943a]":"text-[#337145]"}`}>{b.available}/{b.copies}</span>
                    </td>
                    <td className="pr-5">
                      <button className="text-[11px] font-bold text-[#2d6243] flex items-center gap-1 hover:text-[#1c392b]">
                        <Eye size={12}/>View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map(b=>(
              <button key={b.id} onClick={()=>nav(`/lib/catalog/${b.id}`)}
                className="text-left group">
                <div className="w-full aspect-[3/4] rounded-xl mb-2 group-hover:shadow-lg transition-shadow" style={{background:b.coverColor}}/>
                <p className="text-[11px] font-semibold text-[#1c392b] leading-tight line-clamp-2">{b.title}</p>
                <p className="text-[10px] text-[#78897c] mt-0.5">{b.author}</p>
                <p className={`text-[10px] font-semibold mt-1 ${b.available===0?"text-[#c0392b]":"text-[#4c8056]"}`}>{b.available} avail.</p>
              </button>
            ))}
          </div>
        )}

        <div className="px-6 py-3 bg-[#f6f8f4] border-t border-[#e6ebe4] flex items-center justify-between text-[11px] text-[#78897c]">
          <span>Showing {filtered.length} of {books.length} titles</span>
          <button onClick={() => notify("Catalog exported")} className="flex items-center gap-1.5 font-bold text-[#2d6243] hover:text-[#1c392b]">
            <Download size={12}/> Export
          </button>
        </div>
      </div>
    </div>
  );
}

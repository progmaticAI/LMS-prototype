import { useLibCtx } from "./LibShell";
import { HelpCircle, BookOpen, ArrowLeftRight, Users, Package, FileBarChart, MessageSquare, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const faqs = [
  { q:"How do I issue a book to a student?", a:'Click "Issue book" from the header or Dashboard. Search for the student by name or admission number, then search for the available book, confirm the details, and complete the issue. A receipt can be printed at the end.' },
  { q:"How do I process a book return?", a:'Click "Return" in the Circulation page or use the Return button in the header menu. Search for the active loan by book title, borrower name, or loan ID. Review any outstanding fines, then confirm the return.' },
  { q:"How do I renew a loan?", a:'Go to Circulation → find the active loan → click "Renew". A loan can be renewed up to 2 times (7-day extensions each). Renewals are not allowed for overdue books or if another member has reserved the same book.' },
  { q:"How do I register a new student or staff member?", a:'Go to Members → click "Register member". Fill in the required details: name, admission number (or employee ID), class/section, and guardian information for students.' },
  { q:"How do I add a new book to the catalog?", a:'Go to Books → click "Add book". The wizard will guide you through: basic information, classification (Dewey, category), adding copies, and confirming. You can also bulk import books via Excel.' },
  { q:"How is the fine calculated for overdue books?", a:'Fines are calculated at PKR 10 per day after the due date. The maximum fine per book is PKR 300. For lost books, the penalty is 3× the original book price.' },
  { q:"How do I create a reservation for an unavailable book?", a:'Go to Reservations → click "New reservation". Select the book and the requesting member. The member will be notified when the book becomes available.' },
  { q:"How do I run a shelf audit?", a:'Go to Inventory → click "Start shelf audit". Select the shelf range, assign it to a staff member, and begin scanning. The system will flag missing or misplaced items automatically.' },
];

const guides = [
  { title:"Quick issue & return guide", desc:"Step-by-step walkthrough of daily circulation workflows", Icon:ArrowLeftRight },
  { title:"Book catalog management", desc:"Adding, editing, importing, and organizing your collection", Icon:BookOpen },
  { title:"Member management guide", desc:"Registering, editing, and managing student and staff records", Icon:Users },
  { title:"Inventory & audit guide", desc:"Physical verification, stock adjustment, and loss reporting", Icon:Package },
  { title:"Reports & analytics", desc:"Generating and exporting reports for all library activities", Icon:FileBarChart },
];

export function HelpPage() {
  const { notify } = useLibCtx();
  const [openFaq, setOpenFaq] = useState<number|null>(0);

  return (
    <div>
      <div className="mb-7">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><HelpCircle size={12}/> Librarian workspace · Help</p>
        <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Help centre.</h1>
        <p className="mt-2 text-[13px] text-[#718174]">Guides, FAQs, and support resources for APS Library Management.</p>
      </div>

      <div className="grid xl:grid-cols-[1.4fr_1fr] gap-6">
        {/* FAQs */}
        <div>
          <p className="text-[13px] font-semibold text-[#1c392b] mb-4">Frequently asked questions</p>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq===i?null:i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-[12px] font-semibold text-[#1c392b] pr-4">{faq.q}</span>
                  {openFaq===i ? <ChevronUp size={15} className="text-[#4c8056] shrink-0"/> : <ChevronDown size={15} className="text-[#78897c] shrink-0"/>}
                </button>
                {openFaq===i && (
                  <div className="px-5 pb-4 text-[12px] text-[#5a7263] leading-relaxed border-t border-[#e5e9e1]">
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Guides + Contact */}
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5">
            <p className="text-[13px] font-semibold text-[#1c392b] mb-4">User guides</p>
            <div className="space-y-2">
              {guides.map(g=>(
                <button key={g.title} onClick={() => notify(`Opening: ${g.title}`)}
                  className="w-full flex items-center gap-3 rounded-xl border border-[#e5e9e1] p-3 text-left hover:border-[#b9cfb9] hover:bg-[#f7faf5] transition-all">
                  <div className="size-9 rounded-lg bg-[#e8f0e7] flex items-center justify-center shrink-0">
                    <g.Icon size={15} className="text-[#356444]"/>
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-[#1c392b]">{g.title}</p>
                    <p className="text-[10px] text-[#78897c] mt-0.5">{g.desc}</p>
                  </div>
                  <ExternalLink size={12} className="text-[#78897c]"/>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-5">
            <p className="text-[13px] font-semibold text-[#1c392b] mb-3 flex items-center gap-2"><MessageSquare size={14}/> Contact support</p>
            <p className="text-[12px] text-[#78897c] mb-4">Need help with something not covered here? Contact the APS HQ technical team.</p>
            <div className="space-y-3">
              <div className="rounded-xl bg-[#f6f8f4] border border-[#e5e9e1] p-3">
                <p className="text-[11px] font-semibold text-[#1c392b]">APS IT Support</p>
                <p className="text-[11px] text-[#78897c]">it@aps-hq.edu.pk · +92-51-9272300</p>
                <p className="text-[10px] text-[#a0b0a0] mt-1">Response time: 1–2 business days</p>
              </div>
              <textarea rows={3} placeholder="Describe your issue…"
                className="w-full rounded-xl border border-[#dce3d8] px-3 py-2.5 text-[12px] outline-none focus:border-[#4c8056] resize-none"/>
              <button onClick={() => notify("Support request sent")}
                className="w-full h-10 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">
                Send support request
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[#dde4da] bg-[#eff4ed] p-5">
            <p className="text-[12px] font-bold text-[#1c5237] mb-2">System version</p>
            <p className="font-mono text-[11px] text-[#5a7263]">APS Library Management v2.1.0</p>
            <p className="font-mono text-[11px] text-[#5a7263]">Last updated: 01 Jul 2026</p>
            <p className="font-mono text-[11px] text-[#5a7263]">Database: healthy · Backup: current</p>
          </div>
        </div>
      </div>
    </div>
  );
}

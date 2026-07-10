import { useState } from "react";
import { useLibCtx } from "./LibShell";
import { Settings, Library, Clock3, CreditCard, Barcode, Mail, User, Database } from "lucide-react";

const sections = [
  { id:"library", label:"Library info", Icon:Library },
  { id:"policies", label:"Borrowing policies", Icon:Clock3 },
  { id:"fines", label:"Fine rules", Icon:CreditCard },
  { id:"barcode", label:"Barcode config", Icon:Barcode },
  { id:"email", label:"Email templates", Icon:Mail },
  { id:"account", label:"My account", Icon:User },
  { id:"backup", label:"Backup & restore", Icon:Database },
];

export function LibSettingsPage() {
  const { notify, branch } = useLibCtx();
  const [active, setActive] = useState("library");

  return (
    <div>
      <div className="mb-7">
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#9b743b]"><Settings size={12}/> Librarian workspace · Settings</p>
        <h1 className="text-[#173e2c]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"34px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Settings.</h1>
        <p className="mt-2 text-[13px] text-[#718174]">Configure your branch library operations and preferences.</p>
      </div>

      <div className="grid xl:grid-cols-[220px_1fr] gap-5">
        {/* Nav */}
        <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-3 h-fit">
          {sections.map(s=>(
            <button key={s.id} onClick={()=>setActive(s.id)}
              className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] transition-colors text-left mb-0.5 ${active===s.id?"bg-[#e7efe6] font-semibold text-[#1c5237]":"text-[#617265] hover:bg-[#f0f4ee]"}`}>
              <s.Icon size={14}/>{s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-2xl border border-[#dde4da] bg-[#fcfdf9] p-6">
          {active === "library" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1c392b] mb-5">Library information</h2>
              <div className="space-y-4">
                <Field label="Branch name" defaultValue={branch}/>
                <Field label="Branch code" defaultValue="APS-LHC"/>
                <Field label="Address" defaultValue="Lahore Cantonment, Punjab, Pakistan"/>
                <Field label="Email" type="email" defaultValue="library@apslahore.edu.pk"/>
                <Field label="Phone" type="tel" defaultValue="042-35721100"/>
                <Field label="Opening hours" defaultValue="Mon–Fri: 7:30 AM – 3:30 PM"/>
                <Field label="Library administrator" defaultValue="Ayesha Habib"/>
              </div>
            </div>
          )}
          {active === "policies" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1c392b] mb-5">Borrowing policies</h2>
              <div className="space-y-4">
                <Field label="Student loan period (days)" type="number" defaultValue="14"/>
                <Field label="Teacher loan period (days)" type="number" defaultValue="21"/>
                <Field label="Max books per student" type="number" defaultValue="2"/>
                <Field label="Max books per teacher" type="number" defaultValue="5"/>
                <Field label="Max renewals allowed" type="number" defaultValue="2"/>
                <Field label="Renewal period (days)" type="number" defaultValue="7"/>
                <Field label="Reservation hold period (days)" type="number" defaultValue="3"/>
              </div>
            </div>
          )}
          {active === "fines" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1c392b] mb-5">Fine rules</h2>
              <div className="space-y-4">
                <Field label="Fine per overdue day (PKR)" type="number" defaultValue="10"/>
                <Field label="Maximum fine per book (PKR)" type="number" defaultValue="300"/>
                <Field label="Lost book penalty multiplier" defaultValue="3× original price"/>
                <Field label="Damaged book fine (PKR)" type="number" defaultValue="200"/>
                <Field label="Grace period (days before fining)" type="number" defaultValue="0"/>
              </div>
              <div className="mt-5 rounded-xl bg-[#eff4ed] p-4">
                <p className="text-[11px] font-bold text-[#315d41]">Current fine structure</p>
                <p className="text-[10px] text-[#718173] mt-1">PKR 10/day overdue · Max PKR 300 per book · Lost = 3× book price</p>
              </div>
            </div>
          )}
          {active === "barcode" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1c392b] mb-5">Barcode configuration</h2>
              <div className="space-y-4">
                <Field label="Barcode format" type="select" options={["Code 128","Code 39","QR Code","EAN-13"]} defaultValue="Code 128"/>
                <Field label="Barcode prefix" defaultValue="BK-"/>
                <Field label="Starting accession number" type="number" defaultValue="1000"/>
                <Field label="Label size" type="select" options={["25×15mm","38×25mm","50×25mm"]} defaultValue="38×25mm"/>
              </div>
            </div>
          )}
          {active === "account" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1c392b] mb-5">My account</h2>
              <div className="flex items-center gap-4 rounded-xl bg-[#f6f8f4] border border-[#e5e9e1] p-4 mb-5">
                <div className="size-14 rounded-2xl bg-[#d7e5d6] flex items-center justify-center text-[16px] font-bold text-[#28563d]">AH</div>
                <div>
                  <p className="text-[14px] font-semibold text-[#1c392b]">Ayesha Habib</p>
                  <p className="text-[12px] text-[#78897c]">Library Administrator · APS Lahore Cantt</p>
                  <p className="text-[11px] text-[#78897c]">ayesha@apslahore.edu.pk</p>
                </div>
              </div>
              <div className="space-y-4">
                <Field label="Full name" defaultValue="Ayesha Habib"/>
                <Field label="Email" type="email" defaultValue="ayesha@apslahore.edu.pk"/>
                <Field label="Phone" type="tel" defaultValue="0300-1234567"/>
                <Field label="New password" type="password" defaultValue=""/>
                <Field label="Confirm new password" type="password" defaultValue=""/>
              </div>
            </div>
          )}
          {(active==="email"||active==="backup") && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#1c392b] mb-5">{sections.find(s=>s.id===active)?.label}</h2>
              <div className="rounded-xl border border-[#e5e9e1] p-8 text-center">
                <Settings size={28} className="text-[#c0d0c0] mx-auto mb-3"/>
                <p className="text-[#78897c] text-[13px]">This section is under configuration.</p>
                <button onClick={() => notify("Configure opened")} className="mt-4 h-9 px-4 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold">Configure</button>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-6 border-t border-[#e5e9e1]">
            <button onClick={() => notify("Settings saved")} className="h-10 px-5 rounded-xl bg-[#1d5139] text-white text-[12px] font-semibold hover:bg-[#194330]">Save changes</button>
            <button className="h-10 px-5 rounded-xl border border-[#dce3d8] text-[#617265] text-[12px] hover:bg-[#f0f4ee]">Discard</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, type="text", defaultValue, options }: { label:string; type?:string; defaultValue:string; options?:string[] }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">{label}</label>
      {type==="select" ? (
        <select defaultValue={defaultValue} className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056] bg-white">
          {options?.map(o=><option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} defaultValue={defaultValue} className="w-full h-10 rounded-xl border border-[#dce3d8] px-3 text-[12px] outline-none focus:border-[#4c8056]"/>
      )}
    </div>
  );
}

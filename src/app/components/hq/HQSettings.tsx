import { useState } from "react";
import { useHQCtx } from "./HQShell";
import { Settings, Building2, Bell, Shield, Database, Mail, Clock } from "lucide-react";

const sections = [
  { id:"general", label:"General", Icon:Building2 },
  { id:"notifications", label:"Notifications", Icon:Bell },
  { id:"security", label:"Security", Icon:Shield },
  { id:"backup", label:"Backup & Restore", Icon:Database },
  { id:"email", label:"Email Templates", Icon:Mail },
  { id:"policies", label:"Borrowing Policies", Icon:Clock },
];

export function HQSettings() {
  const { notify } = useHQCtx();
  const [active, setActive] = useState("general");
  const [saved, setSaved] = useState(false);

  function save() {
    setSaved(true);
    notify("Settings saved successfully");
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><Settings size={12}/> Administration</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Settings</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">Global configuration for the APS library network.</p>
      </div>

      <div className="grid xl:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar nav */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-3 shadow-sm h-fit">
          {sections.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[12px] transition-colors text-left ${active===s.id?"bg-[#0f2419] text-white font-semibold":"text-[#5a7263] hover:bg-[#f0f4f0]"}`}>
              <s.Icon size={14}/>{s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          {active === "general" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#0f2419] mb-5">General settings</h2>
              <div className="space-y-5">
                <Field label="Organization name" defaultValue="Army Public Schools (APS) Pakistan"/>
                <Field label="Headquarters address" defaultValue="GHQ Rawalpindi, Pakistan"/>
                <Field label="Admin email" type="email" defaultValue="admin@aps.edu.pk"/>
                <Field label="Support phone" type="tel" defaultValue="+92-51-9272300"/>
                <Field label="Network timezone" type="select" options={["PKT (UTC+5)","UTC"]} defaultValue="PKT (UTC+5)"/>
                <Field label="Default language" type="select" options={["English","Urdu","Both"]} defaultValue="English"/>
              </div>
            </div>
          )}
          {active === "notifications" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#0f2419] mb-5">Notification settings</h2>
              <div className="space-y-4">
                {[
                  { label:"Overdue alerts", sub:"Notify HQ when books exceed due date by X days" },
                  { label:"Budget threshold alerts", sub:"Alert when branch reaches 80% of annual budget" },
                  { label:"Audit reminders", sub:"Send reminder 7 days before scheduled audit" },
                  { label:"New purchase orders", sub:"Notify HQ for all purchase orders above PKR 50,000" },
                  { label:"System errors", sub:"Alert IT admin on system errors" },
                  { label:"Weekly summary email", sub:"Send weekly network summary every Monday" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between rounded-xl border border-[#e8ece5] p-4">
                    <div>
                      <p className="text-[12px] font-semibold text-[#0f2419]">{item.label}</p>
                      <p className="text-[11px] text-[#78897c] mt-0.5">{item.sub}</p>
                    </div>
                    <Toggle defaultOn/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {active === "security" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#0f2419] mb-5">Security settings</h2>
              <div className="space-y-5">
                <Field label="Session timeout (minutes)" type="number" defaultValue="60"/>
                <Field label="Max login attempts" type="number" defaultValue="5"/>
                <Field label="Password minimum length" type="number" defaultValue="8"/>
                {["Require uppercase characters","Require numbers","Require special characters","Two-factor authentication","IP whitelist enabled"].map(item=>(
                  <div key={item} className="flex items-center justify-between rounded-xl border border-[#e8ece5] p-4">
                    <p className="text-[12px] font-semibold text-[#0f2419]">{item}</p>
                    <Toggle defaultOn={item.includes("uppercase")||item.includes("numbers")}/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {active === "policies" && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#0f2419] mb-5">Default borrowing policies</h2>
              <p className="text-[11px] text-[#78897c] mb-5">These are network-wide defaults. Individual branches can override within allowed ranges.</p>
              <div className="space-y-5">
                <Field label="Student loan period (days)" type="number" defaultValue="14"/>
                <Field label="Teacher loan period (days)" type="number" defaultValue="21"/>
                <Field label="Max books per student" type="number" defaultValue="2"/>
                <Field label="Max books per teacher" type="number" defaultValue="5"/>
                <Field label="Fine per day (PKR)" type="number" defaultValue="10"/>
                <Field label="Max renewal per book" type="number" defaultValue="2"/>
                <Field label="Renewal period (days)" type="number" defaultValue="7"/>
                <Field label="Reservation hold period (days)" type="number" defaultValue="3"/>
              </div>
            </div>
          )}
          {(active==="backup"||active==="email") && (
            <div>
              <h2 className="text-[17px] font-semibold text-[#0f2419] mb-5">{sections.find(s=>s.id===active)?.label}</h2>
              <div className="rounded-xl border border-[#e8ece5] p-8 text-center">
                <Settings size={28} className="text-[#c0d0c0] mx-auto mb-3"/>
                <p className="text-[#78897c] text-[13px]">This section is under configuration.</p>
                <button onClick={() => notify("Connecting to backup service")} className="mt-4 h-9 px-4 rounded-xl bg-[#0f2419] text-[#f4d77f] text-[12px] font-semibold">
                  Configure
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-3 mt-8 pt-6 border-t border-[#e8ece5]">
            <button onClick={save} className="h-10 px-5 rounded-xl bg-[#0f2419] text-[#f4d77f] text-[12px] font-semibold hover:bg-[#1a3526] transition-colors">
              {saved ? "✓ Saved" : "Save changes"}
            </button>
            <button className="h-10 px-5 rounded-xl border border-[#dde4da] text-[#5a7263] text-[12px] hover:bg-[#f0f4f0]">
              Discard
            </button>
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
        <select defaultValue={defaultValue} className="w-full h-10 rounded-xl border border-[#dde4da] px-3 text-[12px] outline-none focus:border-[#4c8056] bg-white">
          {options?.map(o=><option key={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} defaultValue={defaultValue} className="w-full h-10 rounded-xl border border-[#dde4da] px-3 text-[12px] outline-none focus:border-[#4c8056]"/>
      )}
    </div>
  );
}

function Toggle({ defaultOn=false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button onClick={() => setOn(!on)} className={`relative w-10 h-5 rounded-full transition-colors shrink-0 ${on?"bg-[#4c8056]":"bg-[#c0d0c0]"}`}>
      <span className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-all ${on?"left-5":"left-0.5"}`}/>
    </button>
  );
}

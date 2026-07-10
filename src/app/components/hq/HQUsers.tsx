import { useState } from "react";
import { useHQCtx } from "./HQShell";
import { Users, Plus, Search, Edit, Trash2, Shield, Eye } from "lucide-react";

const users = [
  { id:"u01", name:"Ayesha Habib", email:"ayesha@aps-hq.edu.pk", role:"HQ Administrator", scope:"All 14 schools", status:"Active", lastLogin:"Today, 09:14", initials:"AH", color:"#d7e5d6" },
  { id:"u02", name:"Nadia Rehman", email:"nadia@apsmodel.edu.pk", role:"Branch Librarian", scope:"APS Model School", status:"Active", lastLogin:"Today, 08:02", initials:"NR", color:"#d4e6f1" },
  { id:"u03", name:"Fatima Gul", email:"fatima@apspeshawar.edu.pk", role:"Branch Librarian", scope:"APS Peshawar", status:"Active", lastLogin:"Yesterday", initials:"FG", color:"#fae3d9" },
  { id:"u04", name:"Amna Siddiqui", email:"amna@apsrawalpindi.edu.pk", role:"Branch Librarian", scope:"APS Rawalpindi", status:"Active", lastLogin:"Today, 07:55", initials:"AS", color:"#e8d5f5" },
  { id:"u05", name:"Mehwish Khan", email:"mehwish@apskarachi.edu.pk", role:"Branch Librarian", scope:"APS Karachi", status:"Active", lastLogin:"2 days ago", initials:"MK", color:"#d5f5e3" },
  { id:"u06", name:"Rabia Zafar", email:"rabia@apsislamabad.edu.pk", role:"Branch Librarian", scope:"APS Islamabad", status:"Active", lastLogin:"Today, 10:22", initials:"RZ", color:"#fef9e7" },
  { id:"u07", name:"Huma Arshad", email:"huma@apswalton.edu.pk", role:"Branch Librarian", scope:"APS Walton", status:"Active", lastLogin:"Yesterday", initials:"HA", color:"#e4e9f3" },
  { id:"u08", name:"Col. Riaz Ahmad (Supervisor)", email:"riaz@aps-hq.edu.pk", role:"Network Supervisor", scope:"All 14 schools", status:"Active", lastLogin:"3 days ago", initials:"RA", color:"#fdedec" },
  { id:"u09", name:"IT Support APS", email:"it@aps-hq.edu.pk", role:"IT Admin", scope:"System-wide", status:"Active", lastLogin:"Today, 11:00", initials:"IT", color:"#eaf2ff" },
  { id:"u10", name:"Sobia Baloch (inactive)", email:"sobia@apsquetta.edu.pk", role:"Branch Librarian", scope:"APS Quetta", status:"Inactive", lastLogin:"2 weeks ago", initials:"SB", color:"#f0f0f0" },
];

export function HQUsers() {
  const { notify } = useHQCtx();
  const [q, setQ] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  const filtered = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()) || u.email.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><Users size={12}/> Administration</p>
          <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Users</h1>
          <p className="mt-2 text-[#5a7263] text-[13px]">Manage all system accounts across the APS library network.</p>
        </div>
        <button onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-[#0f2419] text-[#f4d77f] text-[12px] font-semibold hover:bg-[#1a3526] transition-colors">
          <Plus size={15}/> Add User
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label:"Total users", value:`${users.length}`, color:"#4c8056" },
          { label:"Active", value:`${users.filter(u=>u.status==="Active").length}`, color:"#2d7a4a" },
          { label:"Inactive", value:`${users.filter(u=>u.status==="Inactive").length}`, color:"#7f8c8d" },
        ].map(s => (
          <div key={s.label} className="rounded-2xl bg-white border border-[#e2e8e0] p-4 shadow-sm">
            <p className="text-[11px] text-[#78897c] mb-1">{s.label}</p>
            <p className="text-[28px] leading-none" style={{fontFamily:"'DM Serif Display', serif",color:s.color}}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-white border border-[#e2e8e0] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#e8ece5]">
          <div className="relative max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9e8e]"/>
            <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search users…"
              className="w-full h-9 rounded-xl border border-[#dde4da] bg-[#f6f8f4] pl-9 pr-4 text-[12px] outline-none focus:border-[#4c8056]"/>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-[#f6f8f4] border-b border-[#e8ece5] text-[9px] font-bold uppercase tracking-[.14em] text-[#78897c]">
              <tr>
                <th className="px-6 py-3">User</th>
                <th>Role</th>
                <th>Scope</th>
                <th>Status</th>
                <th>Last login</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f0f4f0]">
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#f8faf6]">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full flex items-center justify-center text-[10px] font-bold text-[#2d5038] shrink-0" style={{background:u.color}}>{u.initials}</div>
                      <div>
                        <p className="text-[12px] font-semibold text-[#0f2419]">{u.name}</p>
                        <p className="text-[10px] text-[#78897c]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <Shield size={11} className={u.role.includes("Admin")||u.role.includes("Supervisor")?"text-[#b8943a]":"text-[#78897c]"}/>
                      <span className="font-semibold text-[#2d4030]">{u.role}</span>
                    </div>
                  </td>
                  <td className="text-[11px] text-[#5a7263]">{u.scope}</td>
                  <td>
                    <span className={`text-[9px] font-bold px-2 py-1 rounded-full ${u.status==="Active"?"bg-[#e8f5e9] text-[#2e7d32]":"bg-[#f5f5f5] text-[#9e9e9e]"}`}>{u.status}</span>
                  </td>
                  <td className="text-[11px] text-[#78897c]">{u.lastLogin}</td>
                  <td className="pr-6">
                    <div className="flex items-center gap-2">
                      <button onClick={() => notify(`Editing ${u.name}`)} className="size-7 rounded-lg hover:bg-[#f0f4f0] flex items-center justify-center text-[#78897c] hover:text-[#0f2419]"><Edit size={13}/></button>
                      <button onClick={() => notify(`${u.name} deleted`)} className="size-7 rounded-lg hover:bg-[#ffebee] flex items-center justify-center text-[#78897c] hover:text-[#c0392b]"><Trash2 size={13}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add user dialog */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-[18px] font-semibold text-[#0f2419] mb-5" style={{fontFamily:"'DM Serif Display', serif"}}>Add new user</h2>
            <div className="space-y-4">
              {[{label:"Full name",type:"text"},{label:"Email",type:"email"},{label:"Phone",type:"tel"}].map(f=>(
                <div key={f.label}>
                  <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">{f.label}</label>
                  <input type={f.type} className="w-full h-10 rounded-xl border border-[#dde4da] px-3 text-[12px] outline-none focus:border-[#4c8056]"/>
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-semibold text-[#5a7263] mb-1.5">Role</label>
                <select className="w-full h-10 rounded-xl border border-[#dde4da] px-3 text-[12px] outline-none focus:border-[#4c8056]">
                  <option>Branch Librarian</option>
                  <option>HQ Administrator</option>
                  <option>Network Supervisor</option>
                  <option>IT Admin</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowAdd(false); notify("User created successfully"); }}
                className="flex-1 h-10 rounded-xl bg-[#0f2419] text-[#f4d77f] text-[12px] font-semibold hover:bg-[#1a3526]">
                Create user
              </button>
              <button onClick={() => setShowAdd(false)}
                className="flex-1 h-10 rounded-xl border border-[#dde4da] text-[#5a7263] text-[12px] hover:bg-[#f0f4f0]">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useHQCtx } from "./HQShell";
import { ShieldCheck, Check, X } from "lucide-react";

const roles = ["HQ Administrator","Network Supervisor","Branch Librarian","IT Admin","Read-only Viewer"];
const permissions = [
  { group:"Dashboard", items:["View network dashboard","View school dashboards","Download dashboard reports"] },
  { group:"Schools", items:["View all schools","Edit school details","Add/remove schools"] },
  { group:"Libraries", items:["View library data","Edit library settings","Transfer books"] },
  { group:"Books", items:["View catalog","Add/edit books","Delete books","Import/export catalog"] },
  { group:"Members", items:["View members","Add/edit members","Delete members","View member history"] },
  { group:"Circulation", items:["View circulation","Issue books","Process returns","Override fines"] },
  { group:"Reports", items:["View reports","Generate reports","Export reports"] },
  { group:"Users", items:["View users","Add/edit users","Delete users","Manage roles"] },
  { group:"Settings", items:["View settings","Edit settings","System configuration"] },
];

const defaults: Record<string,Record<string,boolean>> = {
  "HQ Administrator":{"View network dashboard":true,"View school dashboards":true,"Download dashboard reports":true,"View all schools":true,"Edit school details":true,"Add/remove schools":true,"View library data":true,"Edit library settings":true,"Transfer books":true,"View catalog":true,"Add/edit books":true,"Delete books":true,"Import/export catalog":true,"View members":true,"Add/edit members":true,"Delete members":true,"View member history":true,"View circulation":true,"Issue books":true,"Process returns":true,"Override fines":true,"View reports":true,"Generate reports":true,"Export reports":true,"View users":true,"Add/edit users":true,"Delete users":true,"Manage roles":true,"View settings":true,"Edit settings":true,"System configuration":true},
  "Branch Librarian":{"View network dashboard":false,"View school dashboards":true,"Download dashboard reports":true,"View all schools":false,"Edit school details":false,"Add/remove schools":false,"View library data":true,"Edit library settings":false,"Transfer books":false,"View catalog":true,"Add/edit books":true,"Delete books":false,"Import/export catalog":true,"View members":true,"Add/edit members":true,"Delete members":false,"View member history":true,"View circulation":true,"Issue books":true,"Process returns":true,"Override fines":false,"View reports":true,"Generate reports":true,"Export reports":true,"View users":false,"Add/edit users":false,"Delete users":false,"Manage roles":false,"View settings":true,"Edit settings":false,"System configuration":false},
};

export function HQPermissions() {
  const { notify } = useHQCtx();
  const [selectedRole, setSelectedRole] = useState("Branch Librarian");
  const [perms, setPerms] = useState<Record<string,boolean>>(defaults["Branch Librarian"] || {});

  function toggle(perm: string) {
    setPerms(p => ({ ...p, [perm]: !p[perm] }));
  }

  function loadRole(role: string) {
    setSelectedRole(role);
    setPerms(defaults[role] || {});
  }

  return (
    <div>
      <div className="mb-8">
        <p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#b8943a] mb-2 flex items-center gap-2"><ShieldCheck size={12}/> Administration</p>
        <h1 className="text-[#0f2419]" style={{fontFamily:"'DM Serif Display', serif",fontSize:"36px",lineHeight:1.1,letterSpacing:"-0.02em"}}>Permissions</h1>
        <p className="mt-2 text-[#5a7263] text-[13px]">Configure what each role can access and modify across the system.</p>
      </div>

      <div className="grid xl:grid-cols-[240px_1fr] gap-6">
        {/* Role list */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-4 shadow-sm h-fit">
          <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#78897c] mb-3">Roles</p>
          <div className="space-y-1">
            {roles.map(role => (
              <button key={role} onClick={() => loadRole(role)}
                className={`w-full text-left rounded-xl px-3 py-2.5 text-[12px] transition-colors ${selectedRole===role?"bg-[#0f2419] text-white font-semibold":"text-[#5a7263] hover:bg-[#f0f4f0]"}`}>
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Permission matrix */}
        <div className="rounded-2xl bg-white border border-[#e2e8e0] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="font-semibold text-[#0f2419] text-[15px]">{selectedRole}</p>
              <p className="text-[11px] text-[#78897c] mt-1">
                {Object.values(perms).filter(Boolean).length} permissions active
              </p>
            </div>
            <button onClick={() => notify(`Permissions saved for ${selectedRole}`)}
              className="h-9 px-4 rounded-xl bg-[#0f2419] text-[#f4d77f] text-[12px] font-semibold hover:bg-[#1a3526] transition-colors">
              Save changes
            </button>
          </div>
          <div className="space-y-6">
            {permissions.map(group => (
              <div key={group.group}>
                <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#78897c] mb-3">{group.group}</p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {group.items.map(perm => (
                    <button key={perm} onClick={() => toggle(perm)}
                      className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-all ${perms[perm]?"border-[#4c8056]/30 bg-[#f0f8f4]":"border-[#e8ece5] bg-[#f9fbf8]"}`}>
                      <div className={`size-5 rounded-md flex items-center justify-center shrink-0 transition-colors ${perms[perm]?"bg-[#4c8056]":"bg-[#e8ece5]"}`}>
                        {perms[perm] ? <Check size={11} className="text-white"/> : <X size={10} className="text-[#a0b0a0]"/>}
                      </div>
                      <span className={`text-[11px] ${perms[perm]?"font-semibold text-[#1c392b]":"text-[#78897c]"}`}>{perm}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

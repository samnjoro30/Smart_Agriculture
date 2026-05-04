import {
  LayoutDashboard,
  Users,
  BarChart3,
  Wallet,
  Milk
} from "lucide-react";

// Define the valid keys for our tabs
export type AdminTab = "Overview" | "Livestock" | "Farmers" | "Finance" | "Reports" | "Settings";

interface SidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const sections = [
  {
    title: "Main",
    items: [
      { name: "Overview", icon: LayoutDashboard },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Livestock", icon: Milk }, // Changed to Milk for livestock context
      { name: "Farmers", icon: Users },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "Finance", icon: Wallet },
    ],
  },
  {
    title: "Reports",
    items: [
      { name: "Reports", icon: BarChart3 },
    ],
  },
 
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white border-r flex flex-col sticky top-0">
      
      {/* Sidebar Header */}
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-xl font-extrabold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
          Smart Farm
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-7">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-2">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map(({ name, icon: Icon }) => {
                const isActive = activeTab === name;
                return (
                  <button
                    key={name}
                    onClick={() => setActiveTab(name as AdminTab)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
                    ${
                      isActive
                        ? "bg-green-50 text-green-700 shadow-sm"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon size={20} className={isActive ? "text-green-600" : "text-gray-400"} />
                    <span>{name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 bg-green-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t m-4 rounded-xl">
        <p className="text-xs font-bold text-gray-800">Admin Environment</p>
        <p className="text-[10px] text-gray-500 uppercase">Production v1.0.4</p>
      </div>
    </aside>
  );
}
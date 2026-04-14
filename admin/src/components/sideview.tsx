import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bell,
  BarChart3,
  Settings,
  Wallet,
  CreditCard,
} from "lucide-react";

const sections = [
  {
    title: "Main",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Livestock", path: "/dashboard/livestock", icon: LayoutDashboard },
      { name: "Farmers", path: "/dashboard/farmers", icon: Users },
      { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
    ],
  },
  {
    title: "Business",
    items: [
      { name: "Finance", path: "/dashboard/finance", icon: Wallet },
      { name: "Subscriptions", path: "/dashboard/subscriptions", icon: CreditCard },
    ],
  },
  {
    title: "Analytics",
    items: [
      { name: "Reports", path: "/dashboard/reports", icon: BarChart3 },
    ],
  },
  {
    title: "System",
    items: [
      { name: "Settings", path: "/dashboard/settings", icon: Settings },
    ],
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-auto l-1 bg-green-50 border-r mb-10 flex flex-col">

      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b">
        <h1 className="text-lg font-bold text-gray-800">
          🌱 Smart Farm
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3 px-2">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-gray-100 text-green-600"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon size={18} />
                  <span>{name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="border-t p-4 text-sm text-gray-500">
        <p>Smart Farm Admin</p>
        <p className="text-xs text-gray-400">v1.0</p>
      </div>

    </aside>
  );
}
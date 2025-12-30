import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bell,
  BarChart3,
  Settings,
  HelpCircle
} from "lucide-react";

const sections = [
  {
    title: "Overview",
    items: [
      { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "Management",
    items: [
      { name: "Farmers", path: "/dashboard/farmers", icon: Users },
      { name: "Notifications", path: "/dashboard/notifications", icon: Bell },
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
    <div className="fixed w-64 h-[calc(100vh-10rem)] bg-white rounded-xl shadow-md flex flex-col">

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs uppercase text-gray-400 font-semibold mb-2">
              {section.title}
            </p>

            <div className="space-y-1">
              {section.items.map(({ name, path, icon: Icon }) => (
                <NavLink
                  key={path}
                  to={path}
                  end
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition relative
                    ${isActive
                      ? "bg-green-100 text-green-700 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-green-600 rounded-r" />
                      )}
                      <Icon size={18} />
                      <span>{name}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="border-t p-4 text-sm text-gray-500">
        <div className="flex items-center space-x-2 hover:text-green-600 cursor-pointer">
          <HelpCircle size={16} />
          <span>Help & Support</span>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Smart Farm Admin v1.0
        </p>
      </div>

    </div>
  );
}

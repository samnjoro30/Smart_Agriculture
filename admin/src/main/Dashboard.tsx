import { useState } from "react";
import Sidebar from "../components/sideview";
import type { AdminTab } from "../components/sideview";
import Header from "../components/header";
import Overview from "../components/overview";
import Livestock from "../components/livestock";
import Farmers  from "../components/farmer";
import Finance from "../components/finance";
import Reports from "../components/report";
// import Farmers from "./pages/Farmers"; // Import your other pages here

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState<AdminTab>("Overview");

  // Function to render the correct component based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
      case "Farmers":
        return <Farmers />;
      case "Livestock":
        return <Livestock />;
      case "Reports":
        return <Reports />;
      case "Finance":
        return <Finance />;
      default:
        return <Overview />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Passing state props */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
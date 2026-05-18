
import { useState } from "react";
import ReportsDashboard from "./report/report"
import ReportTabs from "./report/tabs";

export default function Reports() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
      <div className="p-4">
        <ReportTabs activeTab={activeTab} setActiveTab={setActiveTab} />
  
        <div className="mt-4">
          {activeTab === 'overview' && <ReportsDashboard />}
          {activeTab === 'milk' && <h1>Comming soon</h1>}
          {activeTab === 'finance' &&  <h1>Comming soon</h1>}
          {activeTab === 'livestock' && <h1>Comming soon</h1>}
        </div>
      </div>
    );
  }
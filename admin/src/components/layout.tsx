import Overview from "./overview";
// import Livestock from "./livestock";
// import Farmers from "./farmers";
// import Finance from "./finance";
// import Reports from "./reports";
// import SettingsPage from "./settings";

import type { AdminTab } from "./sideview";

interface Props {
  activeTab: AdminTab;
}

export default function AdminContent({ activeTab }: Props) {
    switch (activeTab) {
      case "Overview":
        return <Overview />;
  
      case "Livestock":
        return <h2>Coming soon</h2>;
  
      case "Farmers":
        return <h2>Coming soon</h2>;
  
      case "Finance":
        return <h2>Coming soon</h2>;
  
      case "Reports":
        return <h2>Coming soon</h2>;
  
      case "Settings":
        return <h2>Coming soon</h2>;
  
      default:
        return <Overview />;
    }
  }
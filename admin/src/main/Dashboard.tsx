import Header from "../components/header";
import Sidebar from "../components/sideview";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen flex bg-gray-100">
      
      {/* 🔹 Sidebar */}
      <Sidebar />

      {/* 🔹 Main Area */}
      <div className="flex-1 flex flex-col">
        
        <Header />

        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>

        <Footer />
      </div>

    </div>
  );
};

export default Dashboard;
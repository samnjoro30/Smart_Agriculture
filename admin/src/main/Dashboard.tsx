import Header from "../components/header";
import Sidebar from "../components/sideview";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return( 
        <div>
            <Header />
            <div className="pt-16 flex">
            <aside className="relative left-0 mt-5">
                <Sidebar />
            </aside>

            <main>
                <Outlet />
                <h2 className="text-xl font-semibold text-center mt-6">Welcome to the Smart Farm Admin Dashboard</h2>
            </main>
            </div>
        </div>

    )
}

export default Dashboard;
import Header from "../components/header";
import Sidebar from "../components/sideview";
import Footer from "../components/footer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return( 
        <div  className='min-h-screen flex flex-col'>
            <Header />
            <div className="pt-16 flex flex-1 pb-10">
            <aside className="relative left-0 mt-5">
                <Sidebar />
            </aside>

            <main>
                <Outlet />
                <h2 className="text-xl font-semibold text-center mt-6">Welcome to the Smart Farm Admin Dashboard</h2>
            </main>
            
            </div>
            < Footer />
        </div>

    )
}

export default Dashboard;
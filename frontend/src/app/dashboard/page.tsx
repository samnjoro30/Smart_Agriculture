

import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

export default function Dashboard(){
    return(
        <div className="bg-green-50 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Sidebar />
            </main>
            <Footer />
        </div>
    )
}


import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

export default function Dashboard(){
    return(
        <div className="bg-green-50 flex flex-col min-h-screen">
            <Header />
            {/* <main className="flex-grow">
                <Sidebar />
            </main> */}
            
+           <div className="flex flex-grow">
+               <Sidebar />
+               <main className="flex-1 p-4">
+                   {/* your routed children or page content */}
+               </main>
+           </div>
            <Footer />
        </div>
    )
}
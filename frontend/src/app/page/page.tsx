"use client"

import FooterHome from '../components/footerHome';
import HeaderHome from '../components/headerHomepage';
import dynamic from 'next/dynamic';

const Gallery = dynamic(() => import('../components/FarmerGallery'),{
    ssr: false,
    loading: () => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"
                >
                </div>
            ))}
        </div>
    ),
})

const Service = dynamic(() => import('../components/service'),{
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center py-10">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    ),
})
const PoweredTrusted = dynamic(() => import("../components/homepagepowered"), {
    ssr: false,
    loading: () => (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
            {[...Array(4)].map((_, i) => (
                <div
                    key={i}
                    className="w-full h-40 bg-gray-200 rounded-lg animate-pulse"
                >
                </div>
            ))}
        </div>
    ),
})

export  default function Homepage() {

    const currentYear = new Date().getFullYear();

    const pFarmersSay = "text-gray-800 italic mb-4";
    const pFarmerName = "text-green-800 font-semibold text-sm";

    const Description ="This is a platform designed to help farmers track and improve productiivity in there farms by simple clicks where you enjoy seamless advantages of AI, ML prediction and timely production"

    return(
        <div className="min-h-screen flex flex-col">
            <header className="">
                < HeaderHome />
                
            </header>
            <main>
                <section className="relative h-[50vh] w-full mt-1 overflow-hidden">
                    <video 
                        autoPlay 
                        muted 
                        loop
                        preload="none"
                        playsInline
                        poster="/farmer5.jpg"
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    >
                        <source src="/background.mp4" type="video/mp4" />
                    </video>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center backdrop-blur-sm bg-white/10 rounded-xl">


                        <h1 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-md">
                        🌿 Empowering Farmers with Smart Technology
                        </h1>
                        <p className="max-w-3xl text-base md:text-lg font-medium leading-relaxed text-green-100 mb-2 drop-shadow">{Description}</p>
                        <p className="text-green-200 font-semibold text-lg md:text-xl animate-pulse">
                            🌱 Make Chaguo Smart for your Farm — Register with us!
                        </p>
                    </div>
                </section>
                <Gallery />
                
                <Service />

                <section className="py-12 px-4 bg-white">
                    <h3 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">What Farmers are saying</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className={pFarmersSay}>&quot;Since I started using Smart Farm, managing my crops and livestock has become easier and more productive. The AI insights have helped me plan better.&quot;</p>
                            <p className={pFarmerName}>- Nancy .W., Smallholder Farmer in Muranga</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className={pFarmersSay}>&quot;The platform's real-time analytics allowed me to identify water stress in my farm early. Smart Irrigation suggestions saved my entire season.&quot;</p>
                            <p className={pFarmerName}>- John K., Farmer in Nyandarua</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className={pFarmersSay}>&quot;Breeding tracking has never been this accurate. Now I have a predictable cycle for my dairy cows, and milk production has increased.&quot;</p>
                            <p className={pFarmerName}>- Agnes M., Dairy Farmer in Nyeri</p>
                        </div>
                    </div>
                </section>
                <PoweredTrusted/>

            </main>
            <footer>
                <FooterHome />
                <div className="border-t bg-green-700 border-white-700 h-10 px-6 pt-2 text-center text-sm text-green-400">
                    <p> &copy; {currentYear} Smart Farm. All Rights reserved </p>
                </div>
            </footer>
        </div>
    )
} 
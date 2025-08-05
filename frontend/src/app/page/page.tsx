
import Image from 'next/image';
import FooterHome from '../components/footerHome';
import HeaderHome from '../components/headerHomepage';

export  default function Homepage() {

    const currentYear = new Date().getFullYear();

    const serviceDiv ="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300";
    const Hdiv = "text-xl font-semibold text-green-800 mb-2";
    const pservice = "text-gray-700 text-sm";
    const ImageDiv = "w-80 h-50 relative mb-4 overflow-hidden rounded-md";
    const pFarmersSay = "text-gray-800 italic mb-4";
    const pFarmerName = "text-green-800 font-semibold text-sm";

    const Description ="This is a platform designed to help farmers track and improve productiivity in there farms by simple clicks where you enjoy seamless advantages of AI, ML prediction and timely production"

    return(
        <div className="min-h-screen flex flex-col">
            <header className="">
                < HeaderHome />
                
            </header>
            <main>
                <section className="relative h-[50vh] w-full overflow-hidden">
                    <video 
                        autoPlay 
                        muted 
                        loop
                        className="absolute top-0 left-0 w-full h-full object-cover z-0"
                    >
                        <source src="/background.mp4" type="video/mp4" />
                    </video>
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center bg-black bg-opacity-40">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4 drop-shadow-md">
                            Empowering Farmers with Smart Technology
                        </h1>
                        <p className="max-w-3xl text-base md:text-lg font-medium leading-relaxed text-green-100 mb-2 drop-shadow">{Description}</p>
                        <p className="text-green-200 font-semibold text-lg md:text-xl animate-pulse">
                            🌱 Make Chaguo Smart for your Farm — Register with us!
                        </p>
                    </div>
                </section>

                <section className="py-12 px-4 bg-green-100 ">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        <div className={serviceDiv}>
                            <div className={ImageDiv}>
                                <Image  src="/agri_cow.jpg" alt="Inventory" layout="fill" objectFit="cover" />
                            </div>
                            <h3 className={Hdiv}>Farm Inventory</h3>
                            <p className={pservice}>You get your record well architectured and simplified for you to understand. The inventory helps you to plan for the farm management </p>
                        </div>

                        <div className={serviceDiv}>
                            <div className={ImageDiv}>
                                <Image  src="/Agri4.jpg" alt="AI image" layout="fill" objectFit="cover"/>
                            </div>
                            <h3 className={Hdiv}>AI-powered Insights on your farm</h3>
                            <p className={pservice}>Help analyze upto 97% correct prediction of the outcome of your produce and recommendation on how on steps to take to have a higher yield outcome</p>
                            
                        </div>

                        <div className={serviceDiv}>
                            <div className={ImageDiv}>
                                <Image  src="/Agri5.png" alt="Real-analytics" layout="fill" objectFit="cover"/>
                            </div>
                            <h3 className={Hdiv}>Real-time Farm Analytics</h3>
                            <p className={pservice}>You get real-time updates on  your farm management and where to put more effort for higher productivity</p>
                        </div>

                        <div className={serviceDiv}>
                            <div className={ImageDiv}>
                                <Image  src="/agri2.jpg" alt="Irrigation" layout="fill" objectFit="cover"/>
                            </div>
                            <h3 className={Hdiv}>Smart Irrigation</h3>
                            <p className={pservice}>The Platform is designed to help you as a farmer migrate  and get started with modern and emerging  Agricultural technology form irrifation to dairy farming and many more</p>
                        </div>

                        <div className={serviceDiv}>
                            <div className={ImageDiv}>
                                <Image  src="/cow3.jpg" alt="breeding" layout="fill" objectFit="cover"/>
                            </div>
                            <h3 className={Hdiv}>Breeding Tracking</h3>
                            <p className={pservice}>Track breeding cycles with up to 99% accuracy, ensuring optimal timing and better breed management.</p>
                        </div>
                        <div className={serviceDiv}>
                            <div className={ImageDiv}>
                                <Image src="/Agri3.jpg" alt="Animal health" layout="fill" objectFit="cover"/>
                            </div>
                            <h3 className={Hdiv}>Animal health</h3>
                            <p className={pservice}></p>

                        </div>
                        
                    </div>
                </section>

                {/* <section>
                    <h2>Farm Management Resources</h2>
                    <div>

                    </div>

                </section> */}

                <section className="py-12 px-4 bg-white">
                    <h3 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-10">What Farmers are saying</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className={pFarmersSay}>"Since I started using Smart Farm, managing my crops and livestock has become easier and more productive. The AI insights have helped me plan better."</p>
                            <p className={pFarmerName}>- Nancy .W., Smallholder Farmer in Muranga</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className={pFarmersSay}>"The platform's real-time analytics allowed me to identify water stress in my farm early. Smart Irrigation suggestions saved my entire season."</p>
                            <p className={pFarmerName}>- John K., Dairy Farmer in Nyandarua</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                            <p className={pFarmersSay}>"Breeding tracking has never been this accurate. Now I have a predictable cycle for my dairy cows, and milk production has increased."</p>
                            <p className={pFarmerName}>- Agnes M., Dairy Farmer in Nyeri</p>
                        </div>
                    </div>
                </section>

                <section className="">
                    <h2>Trusted By and Powered by/Partners</h2>
                    <div className="">

                    </div>
                </section>
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
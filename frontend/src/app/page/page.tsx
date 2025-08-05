
import Image from 'next/image';
import FooterHome from '../components/footerHome';
import Link from 'next/link';

export  default function Homepage() {

    const currentYear = new Date().getFullYear();

    const liStyling = "hover:text-green hover:underline transition duration-200 cursor-pointer";
    const serviceDiv ="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300";
    const Hdiv = "text-xl font-semibold text-green-800 mb-2";
    const pservice = "text-gray-700 text-sm";
    const ImageDiv = "w-80 h-50 relative mb-4 overflow-hidden rounded-md";

    return(
        <div className="min-h-screen flex flex-col">
            <header className="bg-green-500 shadow-md py-4 px-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Image src="/logo.png" alt="Logo" width={80} height={40} className="rounded-full" />
                    <h1 className="text-xl md:text-2xl font-bold text-green-700">Smart Farm Agriculture </h1>
                </div>
                <nav>
                    <ul className="flex space-x-6 text-green-800 font-medium">
                        <li className={liStyling}>Home</li>
                        <li className={liStyling}>services</li>
                        <li className={liStyling}>Impact</li>
                        <li className={liStyling}><Link href="/auth/login">login</Link></li>
                        <li className={liStyling}><Link href="/auth/register">Register</Link></li>
                        <li className={liStyling}>Contact</li>
                    </ul>
                </nav>
            </header>
            <main>
                <section className="relative h-screen w-full overflow-hidden">
                   <h1>Empowering Farmers with Smart Technology</h1>
                    <div>
                        <div>
                            <video 
                              autoPlay 
                              muted 
                              loop
                              className="absolute top-0 left-0 w-full h-full object-cover z-0"
                            >
                                <source src="/background.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-white space-y-6">
                            <p className="max-w-2xl text-lg md:text-xl">This is a platform designed to help farmers track and improve productiivity in there farms by simple clicks where you enjoy seamless advantages of AI, ML prediction and timely production</p>

                            <p className="text-green-200 font-semibold text-lg">Make Chaguo Smart for your Farm, Register with us </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-4 bg-green-100 ">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">services</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        <div className={serviceDiv}>
                            <Image  src="/agri_cow.jpg" alt="Inventory" width={100} height={40} className={ImageDiv}/>
                            <h3 className={Hdiv}>Farm Inventory</h3>
                            <p className={pservice}>You get your record well architectured and simplified for you to understand. The inventory helps you to plan for the farm management </p>
                        </div>

                        <div className={serviceDiv}>
                            <Image  src="/Agri4.jpg" alt="AI image" width={100} height={40} className={ImageDiv} />
                            <h3 className={Hdiv}>AI-powered Insights on your farm</h3>
                            <p className={pservice}>Help analyze upto 97% correct prediction of the outcome of your produce and recommendation on how on steps to take to have a higher yield outcome</p>
                            
                        </div>

                        <div className={serviceDiv}>
                            <Image  src="/Agri5.png" alt="Real-analytics" width={100} height={40} className={ImageDiv}/>
                            <h3 className={Hdiv}>Real-time Farm Analytics</h3>
                            <p className={pservice}>You get real-time updates on  your farm management and where to put more effort for higher productivity</p>
                        </div>

                        <div className={serviceDiv}>
                            <Image  src="/agri2.jpg" alt="Irrigation" width={100} height={40} className={ImageDiv}/>
                            <h3 className={Hdiv}>Smart Irrigation</h3>
                            <p className={pservice}>The Platform is designed to help you as a farmer migrate  and get started with modern and emerging  Agricultural technology form irrifation to dairy farming and many more</p>
                        </div>

                        <div className={serviceDiv}>
                            <Image  src="/cow3.jpg" alt="breeding" width={100} height={40} className={ImageDiv} />
                            <h3 className={Hdiv}>Breeding Tracking</h3>
                            <p className={pservice}>Track breeding cycles with up to 99% accuracy, ensuring optimal timing and better breed management.</p>
                        </div>
                        
                    </div>
                </section>
                <section>
                    <h2>Farm Management Resources</h2>
                    <div>

                    </div>

                </section>
                <section>
                    <h3>What Farmers are saying</h3>
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
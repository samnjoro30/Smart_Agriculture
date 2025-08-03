
import Image from 'next/image';
import FooterHome from '../components/footerHome';
import Link from 'next/link';

export  default function Homepage() {

    const currentYear = new Date().getFullYear();

    const liStyling = "hover:text-green hover:underline transition duration-200 cursor-pointer";

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
                              className="absolute top-0 left-0 w-full h-50 object-cover z-0"
                            >
                                <source src="/background.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center text-white space-y-6">
                            <p className="max-w-2xl text-lg md:text-xl">This is a platform designed to help farmers track and improve productiivity in there farms by simple clicks where you enjoy seamless advantages of AI, ML prediction and timely production</p>

                            <p className="text-green-200 font-semibold text-lg"> Farmers First choice</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>services</h2>
                    <div>
                        <h3>Farm Inventory</h3>

                    </div>
                    <div>
                        <h3>AI-powered Insights on your farm</h3>

                    </div>
                    <div>
                        <h3>Real-time Farm Analytics</h3>

                    </div>
                    <div>
                        <h3>Samrt Irrigation</h3>

                    </div>
                    <div>
                        <h3>Breeding Tracking</h3>

                    </div>
                </section>
                <section>
                    <h2>Farm Management Resources</h2>

                </section>
                <section>
                    <h3>What Farmers are saying</h3>
                </section>
                <section className="">
                    <h2>Trusted By and Powered by/Partners</h2>
                </section>
                

            </main>
            <footer>
                <FooterHome />
                <div className="border-t bg-green-200 border-green-700 h-10 pt-2 text-center text-sm text-green-400">
                    <p> &copy; {currentYear} Smart Farm. All Rights reserved </p>
                </div>
            </footer>
        </div>
    )
}
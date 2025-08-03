
import Image from 'next/image';
import FooterHome from '../components/footerHome';
import Link from 'next/link';

export  default function Homepage() {

    const currentYear = new Date().getFullYear();
    return(
        <div>
            <header>
                <div>
                    <Image src="/logo.png" alt="Logo" width={80} height={40} className="rounded-full" />
                </div>
                <h1>Smart Farm Agriculture </h1>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>services</li>
                        <li>Impact</li>
                        <li><Link href="/auth/login">login</Link></li>
                        <li><Link href="/auth/register">Register</Link></li>
                        <li>Contact</li>
                    </ul>
                </nav>
            </header>
            <main>
                <section>
                   <h1>Empowering Farmers with Smart Technology</h1>
                    <div>
                        <div>
                            <video autoPlay muted loop>
                                <source src="/background.mp4" type="video/mp4" />
                            </video>
                        </div>
                        <p>This is a platform designed to help farmers track and improve productiivity in there farms by simple clicks where you enjoy seamless advantages of AI, ML prediction and timely production</p>

                        <p> Farmers First choice</p>
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
                <section>
                    <h2>Trusted By and Powered by/Partners</h2>
                </section>
                

            </main>
            <footer>
                <FooterHome />
                <div className="">
                    <p> &copy; {currentYear} Smart Farm. All Rights reserved </p>
                </div>
            </footer>
        </div>
    )
}
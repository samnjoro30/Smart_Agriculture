
import Image from 'next/image';
import FooterHome from '../components/footerHome';

export  default function Homepage() {

    const currentYear = new Date().getFullYear();
    return(
        <div>
            <header>
                <div>
                    <Image src="/logo.png" alt="Logo" width={80} height={40} className="rounded-full" />
                </div>
                <h1>Smart Agriculture </h1>
                <nav>
                    <li>
                        <ul>Home</ul>
                        <ul>services</ul>
                        <ul>Impact</ul>
                        <ul>Contact</ul>
                    </li>
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

                    </div>
                    <div>

                    </div>
                </section>
                <section>
                    <h2>impact</h2>

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
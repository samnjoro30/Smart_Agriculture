
import Image from 'next/image';

export  default function Homepage() {
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
                <div>
                    <p>This is a platform designed to help farmers track and improve productiivity in there farms by simple clicks where you enjoy seamless advantages of AI, ML prediction and timely production</p>
                </div>
                <div>

                </div>
                <div>

                </div>
                <div>
                    
                </div>

            </main>
            <footer>

            </footer>
        </div>
    )
}
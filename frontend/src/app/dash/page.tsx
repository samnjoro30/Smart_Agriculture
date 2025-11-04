"use client";

import {useState, useEffect} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

interface BeforeInstallPromptEvent extends Event{
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function Dashboard({ data }: { data: any }){
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        const handleBeforeInstall = async (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setIsInstalled(false);
        }
        window.addEventListener("beforeinstallprompt", handleBeforeInstall);

        if (window.matchMedia('(display-mode: standalone)').matches){
            setIsInstalled(true);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
          };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        setDeferredPrompt(null);

        if (outcome === "accepted") {
            console.log("✅ User accepted the install prompt.");
        } else {
            console.log("❌ User dismissed the install prompt.");
        }
    }
    return(
        <div className="bg-green-50 flex flex-col min-h-screen">
            <Header />
            {!isInstalled && deferredPrompt && (
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 bg-green-400 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-4 animate-slideDown">
                    <span className="font-medium">📱 Install this app for quicker access!</span>
                    <button
                       onClick={handleInstall}
                       className="bg-white text-green-700 font-semibold px-3 py-1 rounded-lg hover:bg-green-100 transition"
                    >
                       Install
                    </button>
                </div>
            )}
            <main className="flex-grow">
                <Sidebar />
                {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            </main>
            <Footer />
        </div>
    )
}
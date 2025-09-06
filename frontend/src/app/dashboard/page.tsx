"use client";

import {useState, useEffect} from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import Sidebar from '../components/sidebar';

interface BeforeInstallPromptEvent extends Event{
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export default function Dashboard(){
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
                <div className="p-4">
                    <button
                      onClick={handleInstall}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                        Install App
                    </button>
                </div>
            )}
            <main className="flex-grow">
                <Sidebar />
            </main>
            <Footer />
        </div>
    )
}
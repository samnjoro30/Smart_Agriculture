"use client";

import Image from 'next/image';

export default function ServiceHome() {
    const serviceDiv ="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300";
    const Hdiv = "text-xl font-semibold text-green-800 mb-2";
    const pservice = "text-gray-700 text-sm";
    const ImageDiv = "w-80 h-50 relative mb-4 overflow-hidden rounded-md";
    return(
        <section className="py-12 px-4 bg-green-100 ">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-12">services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
                <div className={serviceDiv}>
                    <div className={ImageDiv}>
                        <Image  src="/agri_cow.jpg" alt="Inventory" loading="lazy" fill className="cover"/>
                    </div>
                    <h3 className={Hdiv}>Farm Inventory</h3>
                    <p className={pservice}>You get your record well architectured and simplified for you to understand. The inventory helps you to plan for the farm management </p>
                </div>

                <div className={serviceDiv}>
                    <div className={ImageDiv}>
                        <Image  src="/Agri4.jpg" alt="AI image" loading="lazy" fill className="cover"/>
                    </div>
                    <h3 className={Hdiv}>AI-powered Insights on your farm</h3>
                    <p className={pservice}>Help analyze upto 97% correct prediction of the outcome of your produce and recommendation on how on steps to take to have a higher yield outcome</p>
                </div>

                <div className={serviceDiv}>
                    <div className={ImageDiv}>
                        <Image  src="/Agri5.png" alt="Real-analytics" loading="lazy" fill className="cover"/>
                    </div>
                    <h3 className={Hdiv}>Real-time Farm Analytics</h3>
                    <p className={pservice}>You get real-time updates on  your farm management and where to put more effort for higher productivity</p>
                </div>

                <div className={serviceDiv}>
                    <div className={ImageDiv}>
                        <Image  src="/Agri3.jpg" alt="Irrigation" loading="lazy" fill className="cover"/>
                    </div>
                    <h3 className={Hdiv}>Farm Production</h3>
                    <p className={pservice}>The Platform is designed to help you as a farmer migrate  and get started with modern and emerging  Agricultural technology form irrifation to dairy farming and many more</p>
                </div>

                <div className={serviceDiv}>
                    <div className={ImageDiv}>
                        <Image  src="/cow3.jpg" alt="breeding" loading="lazy" fill className="cover"/>
                    </div>
                    <h3 className={Hdiv}>Breeding Tracking</h3>
                    <p className={pservice}>Track breeding cycles with up to 99% accuracy, ensuring optimal timing and better breed management.</p>
                </div>

                <div className={serviceDiv}>
                    <div className={ImageDiv}>
                        <Image src="/AgriDoc.png" alt="Animal health" loading="lazy" fill className="cover"/>
                    </div>
                    <h3 className={Hdiv}>Farm health Insights</h3>
                    <p className={pservice}> We offer recommendation for farms in controlling pesticide and how to fight animal diseases</p>
                </div>
                        
            </div>
        </section>
    )
}
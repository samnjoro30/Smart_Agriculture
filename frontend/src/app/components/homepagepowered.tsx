"use client"

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

export default function TrustedPowered (){
    const logos =[
        {src: '/logo.png',  alt: 'logo' },
        {src: '/log1.jpeg',  alt: 'logo' },
        {src: '/cow3.jpg',  alt: 'logo' },
        {src: '/logo.png',  alt: 'logo' },
        {src: '/logo.png',  alt: 'logo' },
       
    ]
    return(
        <section className="bg-green-100 py-12 px-4">
            <div className="relative z-10 text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
                    🤝 Trusted By & Powered By
                </h2>
                <p className="text-gray-600 max-w-xl mx-auto">
                    Our technology is backed by industry leaders and trusted by farmers worldwide.
                </p>
            </div>
            <div className="max-w-6xl mx-auto">
                <Swiper 
                    modules ={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={2}
                    breakpoints ={{
                        640: { slidesPerView: 3},
                        768: { slidesPerView: 4},
                        1024: { slidesPerView: 5},
                    }}
                    loop ={true}
                    autoplay={{ delay: 2000, disableOnInteraction: false}}
                >
                    {logos.map((logo, index)=> (
                        <SwiperSlide key ={index}  className="flex justify-center items-center">
                            <Image 
                                src={logo.src}
                                alt={logo.alt}
                                width={90}
                                height={80}
                                className="object-contain grayscale hover:grayscale-0 transition duration-300 rounded-4xl"
                                loading="lazy"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>

    )
}

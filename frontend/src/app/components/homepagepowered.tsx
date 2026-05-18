'use client';

import Image from 'next/image';

import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function TrustedPowered() {
  const logos = [
    { src: '/l1.jpeg', alt: 'Partner Logo 1' },
    { src: '/l2.png', alt: 'Partner Logo 2' },
    { src: '/l3.png', alt: 'Partner Logo 3' },
    { src: '/l4.png', alt: 'Partner Logo 4' },
    { src: '/l5.png', alt: 'Partner Logo 5' },
    { src: '/cow3.jpg', alt: 'Partner Logo 6' },
    { src: '/logo.png', alt: 'Partner Logo 7' }
  ];

  return (
    <section className="bg-green-50/50 py-16 px-4 overflow-hidden">
      {/* Header Section */}
      <div className="relative z-10 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-4 tracking-tight">
          🤝 Trusted By & Powered By
        </h2>
        <p className="text-gray-600 max-w-xl mx-auto text-base md:text-lg">
          Our technology is backed by industry leaders and trusted by farmers
          worldwide.
        </p>
      </div>

      {/* Slider Container with Smooth Edge-Fade Gradients */}
      <div className="relative max-w-6xl mx-auto mask-gradient">
        {/* Left & Right Faders for CSS-driven smoothness */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-green-50/50 to-transparent z-20 pointer-events-none hidden sm:block" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-green-50/50 to-transparent z-20 pointer-events-none hidden sm:block" />

        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          speed={4000} // The duration of transition between slides (in ms)
          allowTouchMove={false} // Prevents user drag from breaking the linear flow
          autoplay={{
            delay: 0, // 0 delay forces immediate, continuous movement
            disableOnInteraction: false,
          }}
          breakpoints={{
            480: { slidesPerView: 3, spaceBetween: 40 },
            768: { slidesPerView: 4, spaceBetween: 50 },
            1024: { slidesPerView: 5, spaceBetween: 60 },
          }}
          className="premium-marquee-swiper flex items-center"
        >
          {logos.map((logo, index) => (
            <SwiperSlide
              key={index}
              className="!flex justify-center items-center my-auto"
            >
              <div className="relative h-16 w-32 flex items-center justify-center filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-w-7xl) 20vw, 120px"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
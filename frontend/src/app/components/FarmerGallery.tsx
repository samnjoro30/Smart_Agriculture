"use client"

import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"

export default function GalleryFarmer() {
  const farmersImages = [
    { id: 1, name: "Cow Snoofing", image: "/c.jpg" },
    { id: 2, name: "Milk Production", image: "/milking.jpg" },
    { id: 3, name: "Goat", image: "/gaot.jpg" },
    { id: 4, name: "Calf", image: "/_.jpeg" },
    { id: 5, name: "Shelter for Cows", image: "/cowsInShelter.jpg" },
    { id: 6, name: "Milk", image: "/milk.jpeg" },
  ]

  function Auto(slider: any) {
    let timeout: NodeJS.Timeout
    let mouseOver = false

    function clearNextTimeout() {
      clearTimeout(timeout)
    }

    function nextTimeout() {
      clearTimeout(timeout)
      if (mouseOver) return
      timeout = setTimeout(() => {
        slider.next()
      }, 2500)
    }

    slider.on("created", () => {
      slider.container.addEventListener("mouseover", () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.container.addEventListener("mouseout", () => {
        mouseOver = false
        nextTimeout()
      })
      nextTimeout()
    })

    slider.on("dragStarted", clearNextTimeout)
    slider.on("animationEnded", nextTimeout)
    slider.on("updated", nextTimeout)
  }

  const [sliderRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: true,
      mode: "free-snap",
      slides: {
        perView: 1.2,
        spacing: 20,
      },
      breakpoints: {
        "(min-width: 768px)": {
          slides: { perView: 2.3, spacing: 25 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3.2, spacing: 30 },
        },
      },
    },
    [Auto]
  )

  return (
    <section className="relative py-5 bg-gradient-to-b from-green-100 via-green-50 to-green-100 overflow-hidden">

      {/* 🌊 Top Wave */}
      <div className="absolute top-0 left-0 w-full -translate-y-full">
        <svg viewBox="0 0 1440 200" className="w-full">
          <path
            fill="#dcfce7"
            d="M0,64L60,80C120,96,240,128,360,138.7C480,149,600,139,720,128C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,0L0,0Z"
          />
        </svg>
      </div>

      <h3 className="text-center text-4xl font-bold text-green-800 mb-14">
        Farmers Gallery
      </h3>

      <div ref={sliderRef} className="keen-slider px-6">
        {farmersImages.map((item) => (
          <div
            key={item.id}
            className="keen-slider__slide"
          >
            <div className="relative group bg-white/70 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl">

              <Image
                src={item.image}
                alt={item.name}
                width={500}
                height={400}
                className="w-full h-64 object-cover"
                loading="lazy"
              />

              {/* Overlay */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-green-900/70 to-transparent p-4">
                <p className="text-white font-semibold text-lg">
                  {item.name}
                </p>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 🌊 Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full translate-y-full">
        <svg viewBox="0 0 1440 200" className="w-full rotate-180">
          <path
            fill="#bbf7d0"
            d="M0,64L60,80C120,96,240,128,360,138.7C480,149,600,139,720,128C840,117,960,107,1080,117.3C1200,128,1320,160,1380,176L1440,192L1440,0L0,0Z"
          />
        </svg>
      </div>

    </section>
  )
}
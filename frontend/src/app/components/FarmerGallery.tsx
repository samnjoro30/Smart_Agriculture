"use client"

import Image from 'next/image';
import { useRef } from 'react';
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

export default function GalleryFarmer(){
    const farmersImages = [
        { id: 1, name: "crop framing", image: '/farmer6.jpg' },
        { id: 2, name: "soil", image: '/farmer2.jpg' },
        { id: 3, name: "crop farming", image: '/farmer3.jpg' },
        { id: 4, name: "spinach farming", image: '/farmer4.jpg' },
        { id: 6, name: "Irrigation", image: '/farmer5.jpg' },
        { id: 5, name: "Watering", image: '/farmer1.jpg'}
    ]
    function Auto(slider:any){
        let timeout: NodeJS.Timeout
        let mouseOver = false;

        function clearNextTimeout() {
            clearTimeout(timeout)
        }

        function nextTimeout() {
            clearTimeout(timeout)
            if (mouseOver) return
            timeout = setTimeout(() => {
                slider.next()
            }, 2000) 
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

    const [slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        mode: "free-snap",
        slides:{
            perView: 1.2,
            spacing: 15,
        },
        breakpoints: {
            "(min-width: 768px)": { slides: { perView: 2.5, spacing: 20 },},
            "(min-width: 1024px)": { slides: {perView: 3.5, spacing: 25}, },
        }
    }, [Auto])
    return(
        <section className="bg-green-50 py-12 px-4">
            <h3 className="text-center text-2xl text-green-700 font-bold mb-6">Farmers gallery</h3>
            <div ref={slider} className="keen-slider">
                {farmersImages.map((images) => (
                    <div
                      key={images.id}
                      className="keen-slider__slide bg-white rounded-xl shadow-md overflow-hidden"
                    >
                        <Image 
                            src= {images.image} 
                            alt= {images.name}
                            width ={300}
                            height ={300}
                            className="w-full h-48 object-cover"
                            loading="lazy"
                        />
                                
                    </div>
                ))}
            </div>
        </section>
    )
}
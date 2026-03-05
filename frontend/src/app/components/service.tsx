"use client";

import { ReactNode } from "react";
import { FaHeartbeat, FaSeedling, FaChartLine, FaWallet, FaClipboardList, FaBabyCarriage } from "react-icons/fa";

type ServiceItem = {
  title: string;
  description: string;
  icon: ReactNode;
};

const services: ServiceItem[] = [
  {
    title: "Reproduction & Heat Tracking",
    description:
      "Track breeding cycles with up to 99% accuracy, ensuring optimal timing and better breed management.",
    icon: <FaBabyCarriage size={48} className="text-green-700" />,
  },
  {
    title: "Health & Welfare",
    description:
      "Recommendations for controlling pesticide use and fighting animal diseases to maintain healthy livestock.",
    icon: <FaHeartbeat size={48} className="text-green-700" />,
  },
  {
    title: "Precision Nutrition",
    description:
      "Optimize feed and nutrition for higher productivity and better animal health outcomes.",
    icon: <FaSeedling size={48} className="text-green-700" />,
  },
  {
    title: "Production & Quality Control",
    description:
      "Monitor real-time farm production and implement quality control for higher yields.",
    icon: <FaChartLine size={48} className="text-green-700" />,
  },
  {
    title: "Financial Analytics",
    description:
      "Get insights into farm financials for better planning, budgeting, and profit optimization.",
    icon: <FaWallet size={48} className="text-green-700" />,
  },
  {
    title: "Inventory Management",
    description:
      "Well-structured inventory management to simplify farm operations and planning.",
    icon: <FaClipboardList size={48} className="text-green-700" />,
  },
];

function ServiceCard({ title, description, icon }: ServiceItem) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center text-center transform transition-transform duration-500 hover:-translate-y-3 hover:shadow-2xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-green-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

export default function ServiceHome() {
  return (
    <section className="relative py-10 bg-green-50">
      {/* Wavy Background */}
      <div className="absolute inset-x-0 top-0 -z-10 overflow-hidden">
        <svg
          className="w-full h-40 md:h-60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#d1fae5"
            d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,96C1120,85,1280,107,1360,117.3L1440,128L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          ></path>
        </svg>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-700 mb-16 z-10 relative">
        Our Services
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto z-10 relative">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>

      {/* Bottom Wavy Edge */}
      <div className="absolute inset-x-0 bottom-0 -z-10 overflow-hidden">
        <svg
          className="w-full h-40 md:h-60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#dcfce7"
            d="M0,224L80,213.3C160,203,320,181,480,176C640,171,800,181,960,181.3C1120,181,1280,171,1360,165.3L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
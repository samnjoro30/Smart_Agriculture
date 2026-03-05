"use client"

import { FaBookOpen, FaStethoscope, FaLeaf, FaFlask } from "react-icons/fa"
import Link from 'next/link';

type LearningItem = {
  title: string
  description: string
  icon: React.ReactNode
}

const learningTopics: LearningItem[] = [
  {
    title: "How to Cure Mastitis",
    description:
      "Early detection, antibiotic protocols, hygiene practices, and milking routines to prevent and treat mastitis effectively.",
    icon: <FaStethoscope size={32} className="text-green-700" />,
  },
  {
    title: "Salt & Mineral Nutrition Intake",
    description:
      "Understand proper sodium and mineral balance for better milk yield and livestock health.",
    icon: <FaLeaf size={32} className="text-green-700" />,
  },
  {
    title: "Feed Optimization",
    description:
      "Maximize productivity using balanced feed ratios and AI-supported nutrition planning.",
    icon: <FaFlask size={32} className="text-green-700" />,
  },
]

export default function LearningHub() {
  return (
    <section className="relative py-5 bg-gradient-to-b from-green-50 via-white to-green-100 overflow-hidden">

      {/* Curved Top */}
      <div className="absolute top-0 left-0 w-full -translate-y-full">
        <svg viewBox="0 0 1440 200" className="w-full">
          <path
            fill="#dcfce7"
            d="M0,96L80,112C160,128,320,160,480,154.7C640,149,800,107,960,96C1120,85,1280,107,1360,117.3L1440,128L1440,0L0,0Z"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6">

        {/* <h2 className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-16">
          Smart Farming Learning Hub
        </h2> */}

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Featured Card */}
          <div className="lg:col-span-2 bg-green-700 text-white rounded-3xl p-10 shadow-2xl relative overflow-hidden">

            <div className="flex items-center gap-4 mb-6">
              <FaBookOpen size={36} />
              <h3 className="text-2xl font-bold">
                Master Modern Dairy Management
              </h3>
            </div>

            <p className="text-green-100 mb-6 leading-relaxed">
              Learn proven techniques in disease control, nutritional balance,
              production optimization, and herd welfare to increase farm
              profitability sustainably.
            </p>

            <button className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition">
              <Link href="/auth/register">Explore Learning Center by registering now </Link>
            </button>

            {/* Decorative circle */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-green-600 rounded-full opacity-40"></div>
          </div>

          {/* Side Cards */}
          <div className="flex flex-col gap-8">
            {learningTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="mb-4">{topic.icon}</div>
                <h4 className="text-lg font-semibold text-green-800 mb-2">
                  {topic.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Curved Bottom */}
      <div className="absolute bottom-0 left-0 w-full translate-y-full">
        <svg viewBox="0 0 1440 200" className="w-full rotate-180">
          <path
            fill="#bbf7d0"
            d="M0,64L80,80C160,96,320,128,480,138.7C640,149,800,139,960,128C1120,117,1280,107,1360,112L1440,117L1440,0L0,0Z"
          />
        </svg>
      </div>

    </section>
  )
}
import React from 'react';

import { Activity, Check, ShieldCheck, Star, Zap } from 'lucide-react';

const tiers = [
  {
    name: 'Basic',
    price: '0',
    limit: '3 Animals',
    description: 'Perfect for small household needs.',
    features: ['Animal Registration', 'Tracking History', 'Basic Dashboard'],
    //cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Starter',
    price: '250',
    limit: '8 Animals',
    description: 'Essential tools for growing farms.',
    features: ['Heat Prediction', 'Feed Stock Calculation', 'Animal History'],
    //cta: 'Select Starter',
    featured: false,
  },
  {
    name: 'Standard',
    price: '450',
    limit: '15 Animals',
    description: 'The complete management suite.',
    features: [
      'Heat Prediction',
      'Feed Stock Calculation',
      'Mobile Alerts (SMS)',
      'Breeding Records',
    ],
    cta: 'Most Popular',
    featured: true, // Highlights this card
  },
  {
    name: 'Premium',
    price: '950',
    limit: '32 Animals',
    description: 'AI-powered precision farming.',
    features: [
      'Disease Tracking',
      'AI Vet Insights',
      'Full AI Integration',
      'All Standard Features',
    ],
    //cta: 'Go Premium',
    featured: false,
  },
];

export default function PricingTable() {
  return (
    <div className="bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">
          Choose Your Plan
        </h2>
        <p className="text-gray-500 mt-2">
          Scale your dairy farm with precision technology
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative flex flex-col p-6 rounded-3xl transition-all duration-300 ${
              tier.featured
                ? 'bg-green-600 text-white shadow-xl scale-105 z-10'
                : 'bg-gray-50 text-gray-900 border border-gray-100 hover:shadow-lg'
            }`}
          >
            {tier.featured && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-[10px] font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1">
                <Star size={10} fill="currentColor" /> Recommended
              </div>
            )}

            <div className="mb-8">
              <h3
                className={`text-xl font-bold ${tier.featured ? 'text-white' : 'text-gray-900'}`}
              >
                {tier.name}
              </h3>
              <p
                className={`text-xs mt-1 ${tier.featured ? 'text-green-100' : 'text-gray-500'}`}
              >
                {tier.description}
              </p>
              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-black">Ksh {tier.price}</span>
                <span className="ml-1 text-sm opacity-70">/mo</span>
              </div>
              <div
                className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  tier.featured
                    ? 'bg-green-700 text-green-100'
                    : 'bg-green-100 text-green-700'
                }`}
              >
                {tier.limit} Limit
              </div>
            </div>

            <ul className="flex-1 space-y-4 mb-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <Check
                    size={18}
                    className={
                      tier.featured ? 'text-green-200' : 'text-green-500'
                    }
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-3 rounded-xl font-bold text-sm transition-transform active:scale-95 ${
                tier.featured
                  ? 'bg-white text-green-600 hover:bg-gray-100'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

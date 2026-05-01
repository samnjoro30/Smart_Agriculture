'use client';

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const tabs = [
  // { id: 'overview', label: 'Overview' },
  
  { id: 'register', label: 'Register Animal' },
  { id: 'milk production', label: 'Milk Production' },
  { id: 'categories', label: 'Categories' },
  { id: 'Feed stock', label: 'Feed stock' },
  { id: 'animals', label: 'All Animals' },
 // { id: 'reports', label: 'Reports' },
];

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="w-full border-b border-gray-200 mb-4 ml-2">
      <div className="flex space-x-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-2 text-sm font-medium whitespace-nowrap
              border-b-2 transition
              ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-green-600'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

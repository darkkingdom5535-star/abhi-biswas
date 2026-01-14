
import React from 'react';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabClick(tab)}
          className={`flex-1 py-3 text-center font-semibold transition-colors duration-300
            ${activeTab === tab 
              ? 'text-flipkart-blue border-b-2 border-flipkart-blue' 
              : 'text-gray-500'
            }`
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

'use client';

import React from 'react';
import profileData from '@/data/user_profile_data.json';

const Extracurricular = () => {
  return (
    <div className="space-y-8">
      {profileData.extracurricular.map((activity, index) => (
        <div 
          key={index} 
          className="p-6 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--secondary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
        >
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-pattern"></div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[rgb(var(--secondary-accent))]">{activity.name}</h3>
              <div className="text-[rgb(var(--primary-accent))] mt-1">({activity.year})</div>
              <div className="mt-4 text-gray-300">{activity.description}</div>
            </div>
            
            {/* Year badge with animated border */}
            <div className="flex items-start">
              <div className="px-3 py-1 rounded-full bg-[rgba(var(--secondary-accent),0.2)] text-[rgb(var(--secondary-accent))] border border-[rgba(var(--secondary-accent),0.3)] relative">
                <span>{activity.year}</span>
                <div className="absolute inset-0 rounded-full border border-[rgba(var(--secondary-accent),0.5)] animate-ping opacity-75"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Extracurricular;

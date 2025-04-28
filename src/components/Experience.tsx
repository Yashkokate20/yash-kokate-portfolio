'use client';

import React from 'react';
import profileData from '@/data/user_profile_data.json';

const Experience = () => {
  return (
    <div className="space-y-8">
      {profileData.experience.map((exp, index) => (
        <div 
          key={index} 
          className="p-6 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--primary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <h3 className="text-xl font-bold text-[rgb(var(--secondary-accent))]">
                {exp.title} 
                <span className="text-gray-400 text-base font-normal ml-2">({exp.employment_type})</span>
              </h3>
              <div className="text-[rgb(var(--primary-accent))] mt-1">{exp.company}</div>
              <div className="text-gray-400 text-sm mt-1">
                {exp.start_date} - {exp.end_date} ({exp.duration}) | {exp.location}
              </div>
            </div>
            
            {/* Animated mini chart for each experience entry */}
            <div className="w-24 h-12 relative overflow-hidden rounded">
              <MiniChart type={index % 2 === 0 ? 'up' : 'down'} />
            </div>
          </div>
          
          <div className="mt-4 text-gray-300">{exp.description}</div>
          
          {exp.skills && exp.skills.length > 0 && (
            <div className="mt-4">
              <div className="text-sm font-semibold text-gray-400 mb-2">Skills:</div>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="px-3 py-1 text-sm rounded-full bg-[rgba(var(--primary-accent),0.2)] text-[rgb(var(--primary-accent))] border border-[rgba(var(--primary-accent),0.3)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// Mini animated chart component for visual interest
const MiniChart = ({ type }: { type: 'up' | 'down' }) => {
  const color = type === 'up' ? 'rgba(0, 200, 100, 0.8)' : 'rgba(255, 80, 80, 0.8)';
  const bgColor = type === 'up' ? 'rgba(0, 200, 100, 0.1)' : 'rgba(255, 80, 80, 0.1)';
  
  return (
    <div className="w-full h-full relative" style={{ backgroundColor: bgColor }}>
      <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
        {/* Grid lines */}
        <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="25" y1="0" x2="25" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="50" y1="0" x2="50" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        <line x1="75" y1="0" x2="75" y2="50" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
        
        {/* Chart line */}
        <path 
          d={type === 'up' 
            ? "M0,40 C10,35 20,30 30,25 S50,15 70,10 S90,5 100,5" 
            : "M0,10 C10,15 20,20 30,25 S50,35 70,40 S90,45 100,45"}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="animate-pulse"
        />
        
        {/* Candlesticks */}
        {type === 'up' ? (
          <>
            <rect x="10" y="32" width="4" height="6" fill={color} />
            <rect x="30" y="22" width="4" height="8" fill={color} />
            <rect x="50" y="12" width="4" height="10" fill={color} />
            <rect x="70" y="7" width="4" height="6" fill={color} />
            <rect x="90" y="5" width="4" height="5" fill={color} />
          </>
        ) : (
          <>
            <rect x="10" y="12" width="4" height="6" fill={color} />
            <rect x="30" y="22" width="4" height="8" fill={color} />
            <rect x="50" y="32" width="4" height="10" fill={color} />
            <rect x="70" y="37" width="4" height="6" fill={color} />
            <rect x="90" y="40" width="4" height="5" fill={color} />
          </>
        )}
      </svg>
    </div>
  );
};

export default Experience;

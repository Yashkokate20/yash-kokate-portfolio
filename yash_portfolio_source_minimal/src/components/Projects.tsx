'use client';

import React, { useState, useEffect } from 'react';
import profileData from '@/data/user_profile_data.json';

const Projects = () => {
  return (
    <div className="space-y-8">
      {profileData.projects.map((project, index) => (
        <div 
          key={index} 
          className="p-6 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--secondary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-bold text-[rgb(var(--secondary-accent))]">{project.name}</h3>
          
          {/* Add animated project visualization */}
          <div className="mt-4 h-16 w-full overflow-hidden rounded-md">
            <ProjectVisualization index={index} />
          </div>
          
          <div className="mt-4 text-gray-300">{project.description}</div>
        </div>
      ))}
    </div>
  );
};

// Project visualization component - creates different finance-themed visualizations
const ProjectVisualization = ({ index }: { index: number }) => {
  const type = index % 3; // 0, 1, or 2 for different visualization types
  const [barHeights, setBarHeights] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Colors based on our theme
  const primaryColor = 'rgb(var(--primary-accent))';
  const secondaryColor = 'rgb(var(--secondary-accent))';
  const tertiaryColor = 'rgb(100, 150, 255)';

  // Generate random heights only on the client-side after mount
  useEffect(() => {
    setIsClient(true);
    if (type === 0) {
      const heights = [...Array(12)].map(() => 20 + Math.random() * 60);
      setBarHeights(heights);
    }
  }, [type]);

  // Render placeholder or nothing on server/initial client render for type 0
  if (!isClient && type === 0) {
    return <div className="w-full h-full bg-[rgba(var(--background-start-rgb),0.8)] relative"></div>; // Or null
  }
  
  return (
    <div className="w-full h-full bg-[rgba(var(--background-start-rgb),0.8)] relative">
      {type === 0 && (
        // Bar chart visualization - Use state for heights
        <div className="flex items-end justify-around h-full w-full px-2">
          {barHeights.map((height, i) => (
            <div 
              key={i}
              className="w-[5%] animate-pulse"
              style={{ 
                height: `${height}%`, 
                backgroundColor: i % 3 === 0 ? primaryColor : i % 3 === 1 ? secondaryColor : tertiaryColor,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
      
      {type === 1 && (
        // Line chart visualization
        <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          
          {/* Multiple lines */}
          <path 
            d="M0,40 C20,35 40,20 60,15 S80,25 100,10" 
            fill="none"
            stroke={primaryColor}
            strokeWidth="2"
            className="animate-pulse"
          />
          <path 
            d="M0,30 C20,40 40,30 60,35 S80,15 100,20" 
            fill="none"
            stroke={secondaryColor}
            strokeWidth="2"
            className="animate-pulse"
            style={{ animationDelay: '0.5s' }}
          />
        </svg>
      )}
      
      {type === 2 && (
        // Pie/Donut chart visualization
        <div className="flex items-center justify-center h-full">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-[rgb(var(--primary-accent))]" style={{ clipPath: 'polygon(50% 50%, 0 0, 0 100%, 100% 100%, 100% 0)' }}></div>
            <div className="absolute inset-0 bg-[rgb(var(--secondary-accent))]" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 50% 100%)' }}></div>
            <div className="absolute inset-0 bg-[rgb(100,150,255)]" style={{ clipPath: 'polygon(50% 50%, 0 0, 100% 0, 100% 50%)' }}></div>
            <div className="absolute inset-0 rounded-full bg-[rgba(var(--card-bg),0.8)]" style={{ transform: 'scale(0.6)' }}></div>
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s' }}>
              <div className="absolute top-0 left-[calc(50%-2px)] w-1 h-1 rounded-full bg-white"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;


import React from 'react';
import profileData from '@/data/user_profile_data.json';

const Education = () => {
  return (
    <div className="space-y-8">
      {profileData.education.map((edu, index) => (
        <div 
          key={index} 
          className="p-6 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--primary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1"
        >
          <h3 className="text-xl font-bold text-[rgb(var(--secondary-accent))]">{edu.institution}</h3>
          <div className="text-[rgb(var(--primary-accent))] mt-1">{edu.degree}</div>
          <div className="text-gray-400 text-sm mt-1">
            {edu.start_date} - {edu.end_date}
          </div>
          <div className="mt-4 text-gray-300">{edu.details}</div>
          
          {/* Optional: Add a subtle icon or visual element related to education/finance */}
          <div className="mt-4 text-right text-xs text-gray-500">
            {/* Placeholder for a small icon or graphic */}
            🎓
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;


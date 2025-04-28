'use client';

import React from 'react';
import profileData from '@/data/user_profile_data.json';

const Certifications = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {profileData.certifications.map((cert, index) => (
        <div 
          key={index} 
          className="p-5 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--primary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
        >
          {/* Animated gradient background */}
          <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[rgb(var(--primary-accent))] to-[rgb(var(--secondary-accent))]"></div>
          
          {/* Animated corner accent */}
          <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-[rgb(var(--secondary-accent))] rotate-45 transform origin-bottom-left translate-y-[-50%] translate-x-[50%] animate-pulse"></div>
          </div>
          
          <h3 className="text-lg font-bold text-[rgb(var(--secondary-accent))] mb-2 pr-10">{cert.name}</h3>
          <div className="text-[rgb(var(--primary-accent))] text-sm">{cert.issuer}</div>
          <div className="text-gray-400 text-xs mt-1">
            Issued: {cert.date}
            {cert.expiry && <span> · Expires: {cert.expiry}</span>}
          </div>
          
          {cert.credential_id && (
            <div className="text-gray-400 text-xs mt-1">
              ID: {cert.credential_id}
            </div>
          )}
          
          {cert.skills && cert.skills.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {cert.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className="px-2 py-0.5 text-xs rounded-full bg-[rgba(var(--primary-accent),0.2)] text-[rgb(var(--primary-accent))] border border-[rgba(var(--primary-accent),0.3)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Certificate icon */}
          <div className="absolute bottom-2 right-2 text-[rgba(var(--secondary-accent),0.3)] text-xl">
            🏆
          </div>
        </div>
      ))}
    </div>
  );
};

export default Certifications;

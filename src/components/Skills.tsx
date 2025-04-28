
import React from 'react';
import profileData from '@/data/user_profile_data.json';

// Import some icons (assuming lucide-react or similar is available/installed)
// If not, we can use simple text symbols or skip icons
// import { Code, BarChart } from 'lucide-react'; 

const Skills = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Technical Skills Card */}
      <div className="p-6 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--primary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-4 text-[rgb(var(--secondary-accent))] flex items-center gap-2">
          {/* <Code size={20} /> Placeholder for icon */}
          💻 Technical Skills
        </h3>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          {profileData.skills.technical.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Financial Skills Card */}
      <div className="p-6 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--secondary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1">
        <h3 className="text-xl font-bold mb-4 text-[rgb(var(--primary-accent))] flex items-center gap-2">
          {/* <BarChart size={20} /> Placeholder for icon */}
          📈 Financial Skills & Expertise
        </h3>
        <ul className="space-y-2 list-disc list-inside text-gray-300">
          {profileData.skills.financial.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Skills;


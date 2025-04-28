
import React from 'react';
import profileData from '@/data/user_profile_data.json';

// Import icons (optional)
// import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div 
      className="p-8 rounded-lg border border-[rgba(var(--border-color),0.6)] bg-[rgba(var(--card-bg),0.8)] backdrop-blur-sm hover:shadow-[0_0_15px_rgba(var(--primary-accent),0.3)] transition-all duration-300 transform hover:-translate-y-1 max-w-2xl mx-auto"
    >
      <h3 className="text-2xl font-bold text-center mb-6 text-[rgb(var(--primary-accent))]">Feel free to reach out!</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          {/* <Mail size={18} className="text-[rgb(var(--secondary-accent))]" /> Placeholder */}
          <span className="text-[rgb(var(--secondary-accent))] text-xl">📧</span>
          <a 
            href={`mailto:${profileData.contact.email}`}
            className="text-gray-300 hover:text-[rgb(var(--primary-accent))] transition-colors"
          >
            {profileData.contact.email}
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          {/* <Phone size={18} className="text-[rgb(var(--secondary-accent))]" /> Placeholder */}
          <span className="text-[rgb(var(--secondary-accent))] text-xl">📞</span>
          <span className="text-gray-300">{profileData.contact.phone}</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* <Linkedin size={18} className="text-[rgb(var(--secondary-accent))]" /> Placeholder */}
          <span className="text-[rgb(var(--secondary-accent))] text-xl">🔗</span>
          <a 
            href={profileData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[rgb(var(--primary-accent))] transition-colors"
          >
            {profileData.contact.linkedin.replace('https://www.', '')}
          </a>
        </div>
        
        <div className="flex items-center gap-3">
          {/* <MapPin size={18} className="text-[rgb(var(--secondary-accent))]" /> Placeholder */}
          <span className="text-[rgb(var(--secondary-accent))] text-xl">📍</span>
          <span className="text-gray-300">{profileData.contact.location}</span>
        </div>
      </div>
      
      {/* Optional: Add a subtle animated graphic */}
      <div className="mt-6 h-2 w-full bg-[rgba(var(--border-color),0.3)] rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[rgb(var(--primary-accent))] to-[rgb(var(--secondary-accent))] animate-pulse"
          style={{ width: '60%', animationDuration: '3s' }}
        ></div>
      </div>
    </div>
  );
};

export default Contact;


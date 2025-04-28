
'use client'; // <-- Added this directive

import React, { useState, useEffect } from 'react';
import profileDataInitial from '@/data/user_profile_data.json'; // Load initial data

// Helper function for deep cloning
const deepClone = (obj: any) => JSON.parse(JSON.stringify(obj));

const AdminInterface = () => {
  // Use state to hold the editable profile data, initialized from the JSON
  const [profileData, setProfileData] = useState(deepClone(profileDataInitial));
  const [activeTab, setActiveTab] = useState('profile');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle basic input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, section: string, field: string) => {
    setProfileData((prevData: any) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: e.target.value,
      },
    }));
  };

  // Handle changes in nested arrays (like experience, education, etc.)
  const handleArrayItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: string,
    index: number,
    field: string
  ) => {
    setProfileData((prevData: any) => {
      const updatedArray = [...prevData[section]];
      updatedArray[index] = {
        ...updatedArray[index],
        [field]: e.target.value,
      };
      return {
        ...prevData,
        [section]: updatedArray,
      };
    });
  };
  
  // Handle changes in skills arrays
  const handleSkillChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    skillType: 'technical' | 'financial',
    index: number
  ) => {
     setProfileData((prevData: any) => {
      const updatedSkills = [...prevData.skills[skillType]];
      updatedSkills[index] = e.target.value;
      return {
        ...prevData,
        skills: {
            ...prevData.skills,
            [skillType]: updatedSkills
        }
      };
    });
  };

  // Add item to an array section
  const addArrayItem = (section: string, newItemTemplate: any) => {
    setProfileData((prevData: any) => ({
      ...prevData,
      [section]: [...prevData[section], deepClone(newItemTemplate)],
    }));
  };

  // Remove item from an array section
  const removeArrayItem = (section: string, index: number) => {
    setProfileData((prevData: any) => ({
      ...prevData,
      [section]: prevData[section].filter((_: any, i: number) => i !== index),
    }));
  };
  
  // Add skill
  const addSkill = (skillType: 'technical' | 'financial') => {
      setProfileData((prevData: any) => ({
          ...prevData,
          skills: {
              ...prevData.skills,
              [skillType]: [...prevData.skills[skillType], "New Skill"] // Add placeholder
          }
      }));
  };

  // Remove skill
  const removeSkill = (skillType: 'technical' | 'financial', index: number) => {
      setProfileData((prevData: any) => ({
          ...prevData,
          skills: {
              ...prevData.skills,
              [skillType]: prevData.skills[skillType].filter((_: any, i: number) => i !== index)
          }
      }));
  };

  // Handle image upload preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        // In a real app, you'd upload the file here
        console.log("Simulating image upload for preview.");
      };
      reader.readAsDataURL(file);
    }
  };

  // Simulate saving changes
  const handleSaveChanges = () => {
    // In a real application, you would send the updated `profileData` 
    // state to your backend API to save it persistently.
    console.log('Simulating save:', profileData);
    alert('Changes saved (simulated)! Data logged to console. In a real app, this would save to a database.');
    // Optionally, could save to localStorage for simple persistence in preview
    // localStorage.setItem('userProfileData', JSON.stringify(profileData));
  };

  // Templates for adding new items
  const newExperienceTemplate = { title: "", company: "", employment_type: "", start_date: "", end_date: "", duration: "", location: "", description: "", skills: [] };
  const newEducationTemplate = { institution: "", degree: "", start_date: "", end_date: "", details: "" };
  const newProjectTemplate = { name: "", description: "" };
  const newCertificationTemplate = { name: "", issuer: "", date: "", expiry: "", credential_id: "", skills: [] };
  const newExtracurricularTemplate = { name: "", year: "", description: "" };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Profile Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[rgb(var(--primary-accent))] file:text-[rgb(var(--background-start-rgb))] hover:file:bg-[rgba(var(--primary-accent),0.8)]"/>
              {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-20 h-20 rounded-full object-cover"/>}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input type="text" id="name" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))] focus:border-[rgb(var(--primary-accent))] focus:ring-[rgb(var(--primary-accent))]" />
            </div>
            <div>
              <label htmlFor="headline" className="block text-sm font-medium text-gray-300 mb-1">Headline</label>
              <input type="text" id="headline" value={profileData.headline} onChange={(e) => setProfileData({...profileData, headline: e.target.value})} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))] focus:border-[rgb(var(--primary-accent))] focus:ring-[rgb(var(--primary-accent))]" />
            </div>
            <h3 className="text-lg font-semibold mt-6 mb-2">Contact Information</h3>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input type="email" id="email" value={profileData.contact.email} onChange={(e) => handleInputChange(e, 'contact', 'email')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))] focus:border-[rgb(var(--primary-accent))] focus:ring-[rgb(var(--primary-accent))]" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone</label>
              <input type="tel" id="phone" value={profileData.contact.phone} onChange={(e) => handleInputChange(e, 'contact', 'phone')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))] focus:border-[rgb(var(--primary-accent))] focus:ring-[rgb(var(--primary-accent))]" />
            </div>
            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-1">LinkedIn</label>
              <input type="url" id="linkedin" value={profileData.contact.linkedin} onChange={(e) => handleInputChange(e, 'contact', 'linkedin')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))] focus:border-[rgb(var(--primary-accent))] focus:ring-[rgb(var(--primary-accent))]" />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
              <input type="text" id="location" value={profileData.contact.location} onChange={(e) => handleInputChange(e, 'contact', 'location')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))] focus:border-[rgb(var(--primary-accent))] focus:ring-[rgb(var(--primary-accent))]" />
            </div>
          </div>
        );
      // Add cases for 'education', 'experience', 'projects', 'skills', 'certifications', 'extracurricular'
      // Example for Experience:
      case 'experience':
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Experience</h2>
            {profileData.experience.map((exp: any, index: number) => (
              <div key={index} className="p-4 border border-[rgb(var(--border-color))] rounded space-y-2 relative">
                <button onClick={() => removeArrayItem('experience', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs">Remove</button>
                <input type="text" placeholder="Title" value={exp.title} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'title')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Company" value={exp.company} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'company')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Employment Type" value={exp.employment_type} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'employment_type')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Start Date" value={exp.start_date} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'start_date')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="End Date" value={exp.end_date} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'end_date')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Duration" value={exp.duration} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'duration')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Location" value={exp.location} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'location')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <textarea placeholder="Description" value={exp.description} onChange={(e) => handleArrayItemChange(e, 'experience', index, 'description')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                {/* Skills for experience could be a comma-separated input or more complex UI */}
              </div>
            ))}
            <button onClick={() => addArrayItem('experience', newExperienceTemplate)} className="mt-4 px-4 py-2 rounded bg-[rgb(var(--primary-accent))] text-[rgb(var(--background-start-rgb))] hover:bg-[rgba(var(--primary-accent),0.8)]">Add Experience</button>
          </div>
        );
      case 'education':
         return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {profileData.education.map((edu: any, index: number) => (
              <div key={index} className="p-4 border border-[rgb(var(--border-color))] rounded space-y-2 relative">
                <button onClick={() => removeArrayItem('education', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs">Remove</button>
                <input type="text" placeholder="Institution" value={edu.institution} onChange={(e) => handleArrayItemChange(e, 'education', index, 'institution')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Degree" value={edu.degree} onChange={(e) => handleArrayItemChange(e, 'education', index, 'degree')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Start Date" value={edu.start_date} onChange={(e) => handleArrayItemChange(e, 'education', index, 'start_date')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="End Date" value={edu.end_date} onChange={(e) => handleArrayItemChange(e, 'education', index, 'end_date')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <textarea placeholder="Details" value={edu.details} onChange={(e) => handleArrayItemChange(e, 'education', index, 'details')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
              </div>
            ))}
            <button onClick={() => addArrayItem('education', newEducationTemplate)} className="mt-4 px-4 py-2 rounded bg-[rgb(var(--primary-accent))] text-[rgb(var(--background-start-rgb))] hover:bg-[rgba(var(--primary-accent),0.8)]">Add Education</button>
          </div>
        );
      case 'projects':
         return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Projects</h2>
            {profileData.projects.map((proj: any, index: number) => (
              <div key={index} className="p-4 border border-[rgb(var(--border-color))] rounded space-y-2 relative">
                <button onClick={() => removeArrayItem('projects', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs">Remove</button>
                <input type="text" placeholder="Project Name" value={proj.name} onChange={(e) => handleArrayItemChange(e, 'projects', index, 'name')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <textarea placeholder="Description" value={proj.description} onChange={(e) => handleArrayItemChange(e, 'projects', index, 'description')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
              </div>
            ))}
            <button onClick={() => addArrayItem('projects', newProjectTemplate)} className="mt-4 px-4 py-2 rounded bg-[rgb(var(--primary-accent))] text-[rgb(var(--background-start-rgb))] hover:bg-[rgba(var(--primary-accent),0.8)]">Add Project</button>
          </div>
        );
      case 'skills':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div>
                <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
                {profileData.skills.technical.map((skill: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input type="text" value={skill} onChange={(e) => handleSkillChange(e, 'technical', index)} className="flex-grow p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                        <button onClick={() => removeSkill('technical', index)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                    </div>
                ))}
                <button onClick={() => addSkill('technical')} className="mt-4 px-4 py-2 rounded bg-[rgb(var(--primary-accent))] text-[rgb(var(--background-start-rgb))] hover:bg-[rgba(var(--primary-accent),0.8)]">Add Technical Skill</button>
             </div>
             <div>
                <h2 className="text-xl font-semibold mb-4">Financial Skills</h2>
                {profileData.skills.financial.map((skill: string, index: number) => (
                     <div key={index} className="flex items-center gap-2 mb-2">
                        <input type="text" value={skill} onChange={(e) => handleSkillChange(e, 'financial', index)} className="flex-grow p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                        <button onClick={() => removeSkill('financial', index)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                    </div>
                ))}
                <button onClick={() => addSkill('financial')} className="mt-4 px-4 py-2 rounded bg-[rgb(var(--primary-accent))] text-[rgb(var(--background-start-rgb))] hover:bg-[rgba(var(--primary-accent),0.8)]">Add Financial Skill</button>
             </div>
          </div>
        );
      case 'certifications':
         return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Certifications</h2>
            {profileData.certifications.map((cert: any, index: number) => (
              <div key={index} className="p-4 border border-[rgb(var(--border-color))] rounded space-y-2 relative">
                <button onClick={() => removeArrayItem('certifications', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs">Remove</button>
                <input type="text" placeholder="Certification Name" value={cert.name} onChange={(e) => handleArrayItemChange(e, 'certifications', index, 'name')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Issuer" value={cert.issuer} onChange={(e) => handleArrayItemChange(e, 'certifications', index, 'issuer')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Date Issued" value={cert.date} onChange={(e) => handleArrayItemChange(e, 'certifications', index, 'date')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Expiry Date (Optional)" value={cert.expiry} onChange={(e) => handleArrayItemChange(e, 'certifications', index, 'expiry')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Credential ID (Optional)" value={cert.credential_id} onChange={(e) => handleArrayItemChange(e, 'certifications', index, 'credential_id')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                 {/* Skills for certs could be added similarly */}
              </div>
            ))}
            <button onClick={() => addArrayItem('certifications', newCertificationTemplate)} className="mt-4 px-4 py-2 rounded bg-[rgb(var(--primary-accent))] text-[rgb(var(--background-start-rgb))] hover:bg-[rgba(var(--primary-accent),0.8)]">Add Certification</button>
          </div>
        );
      case 'extracurricular':
         return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Extracurricular Activities</h2>
            {profileData.extracurricular.map((activity: any, index: number) => (
              <div key={index} className="p-4 border border-[rgb(var(--border-color))] rounded space-y-2 relative">
                <button onClick={() => removeArrayItem('extracurricular', index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xs">Remove</button>
                <input type="text" placeholder="Activity Name" value={activity.name} onChange={(e) => handleArrayItemChange(e, 'extracurricular', index, 'name')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <input type="text" placeholder="Year" value={activity.year} onChange={(e) => handleArrayItemChange(e, 'extracurricular', index, 'year')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
                <textarea placeholder="Description" value={activity.description} onChange={(e) => handleArrayItemChange(e, 'extracurricular', index, 'description')} className="w-full p-2 rounded bg-[rgba(var(--background-end-rgb),0.8)] border border-[rgb(var(--border-color))]" />
              </div>
            ))}
            <button onClick={() => addArrayItem('extracurricular', newExtracurricularTemplate)} className="mt-4 px-4 py-2 rounded bg-[rgb(var(--primary-accent))] text-[rgb(var(--background-start-rgb))] hover:bg-[rgba(var(--primary-accent),0.8)]">Add Activity</button>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="p-6 md:p-12 min-h-screen bg-[rgb(var(--background-start-rgb))] text-[rgb(var(--foreground-rgb))]">
      <h1 className="text-3xl font-bold mb-8 text-[rgb(var(--primary-accent))]">Admin Dashboard</h1>
      
      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2 border-b border-[rgb(var(--border-color))]">
        {['profile', 'education', 'experience', 'projects', 'skills', 'certifications', 'extracurricular'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg text-sm font-medium transition-colors capitalize ${activeTab === tab ? 'bg-[rgb(var(--card-bg))] border border-b-0 border-[rgb(var(--border-color))] text-[rgb(var(--primary-accent))]' : 'text-gray-400 hover:text-gray-200'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 rounded-b-lg rounded-r-lg bg-[rgb(var(--card-bg))] border border-t-0 border-[rgb(var(--border-color))]">
        {renderTabContent()}
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <button 
          onClick={handleSaveChanges} 
          className="px-6 py-3 rounded-lg bg-[rgb(var(--secondary-accent))] text-[rgb(var(--background-start-rgb))] font-bold hover:bg-[rgba(var(--secondary-accent),0.8)] transition-colors"
        >
          Save Changes (Simulated)
        </button>
        <p className="text-xs text-gray-500 mt-2">Note: Changes are only simulated in this preview and not saved permanently.</p>
      </div>
    </div>
  );
};

export default AdminInterface;


import Image from 'next/image'
import Experience from '@/components/Experience'
import Education from '@/components/Education'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Extracurricular from '@/components/Extracurricular'
import Contact from '@/components/Contact'
import DynamicBackground from '@/components/DynamicBackground'
import profileData from '@/data/user_profile_data.json'

export default function Home() {
  return (
    <DynamicBackground>
      <main className="min-h-screen">
        {/* Hero Section - Moved up to be immediately visible */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 py-12 text-center">
          <div className="relative w-40 h-40 mb-6 overflow-hidden rounded-full border-4 border-[rgb(var(--primary-accent))] shadow-[0_0_20px_rgba(var(--primary-accent),0.5)]">
            <Image 
              src="/images/profile.png" 
              alt="Yash Kokate" 
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">
            <span className="text-[rgb(var(--primary-accent))]">{profileData.name}</span>
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-300">{profileData.headline}</p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="#experience" className="px-6 py-2 rounded-full bg-[rgba(var(--primary-accent),0.2)] text-[rgb(var(--primary-accent))] border border-[rgb(var(--primary-accent))] hover:bg-[rgba(var(--primary-accent),0.3)] transition-all">Experience</a>
            <a href="#education" className="px-6 py-2 rounded-full bg-[rgba(var(--primary-accent),0.2)] text-[rgb(var(--primary-accent))] border border-[rgb(var(--primary-accent))] hover:bg-[rgba(var(--primary-accent),0.3)] transition-all">Education</a>
            <a href="#skills" className="px-6 py-2 rounded-full bg-[rgba(var(--primary-accent),0.2)] text-[rgb(var(--primary-accent))] border border-[rgb(var(--primary-accent))] hover:bg-[rgba(var(--primary-accent),0.3)] transition-all">Skills</a>
            <a href="#projects" className="px-6 py-2 rounded-full bg-[rgba(var(--primary-accent),0.2)] text-[rgb(var(--primary-accent))] border border-[rgb(var(--primary-accent))] hover:bg-[rgba(var(--primary-accent),0.3)] transition-all">Projects</a>
            <a href="#certifications" className="px-6 py-2 rounded-full bg-[rgba(var(--primary-accent),0.2)] text-[rgb(var(--primary-accent))] border border-[rgb(var(--primary-accent))] hover:bg-[rgba(var(--primary-accent),0.3)] transition-all">Certifications</a>
            <a href="#contact" className="px-6 py-2 rounded-full bg-[rgba(var(--secondary-accent),0.3)] text-[rgb(var(--secondary-accent))] border border-[rgb(var(--secondary-accent))] hover:bg-[rgba(var(--secondary-accent),0.4)] transition-all">Contact</a>
          </div>
          
          <div className="flex gap-4 mb-8">
            <a href={profileData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-[rgba(var(--card-bg),0.5)] hover:bg-[rgba(var(--card-bg),0.8)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(var(--primary-accent))]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a href={`mailto:${profileData.contact.email}`} className="p-3 rounded-full bg-[rgba(var(--card-bg),0.5)] hover:bg-[rgba(var(--card-bg),0.8)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(var(--primary-accent))]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <a href={`tel:${profileData.contact.phone}`} className="p-3 rounded-full bg-[rgba(var(--card-bg),0.5)] hover:bg-[rgba(var(--card-bg),0.8)] transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(var(--primary-accent))]">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </a>
          </div>
          
          <div className="animate-bounce mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[rgb(var(--primary-accent))]">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
            </svg>
          </div>
        </section>
        
        {/* Content Sections */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <section id="experience" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--secondary-accent))] border-b border-[rgba(var(--border-color),0.3)] pb-2">Experience</h2>
            <Experience />
          </section>
          
          <section id="education" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--secondary-accent))] border-b border-[rgba(var(--border-color),0.3)] pb-2">Education</h2>
            <Education />
          </section>
          
          <section id="skills" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--secondary-accent))] border-b border-[rgba(var(--border-color),0.3)] pb-2">Skills</h2>
            <Skills />
          </section>
          
          <section id="projects" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--secondary-accent))] border-b border-[rgba(var(--border-color),0.3)] pb-2">Projects</h2>
            <Projects />
          </section>
          
          <section id="certifications" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--secondary-accent))] border-b border-[rgba(var(--border-color),0.3)] pb-2">Certifications</h2>
            <Certifications />
          </section>
          
          <section id="extracurricular" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--secondary-accent))] border-b border-[rgba(var(--border-color),0.3)] pb-2">Extracurricular Activities</h2>
            <Extracurricular />
          </section>
          
          <section id="contact" className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-[rgb(var(--secondary-accent))] border-b border-[rgba(var(--border-color),0.3)] pb-2">Contact</h2>
            <Contact />
          </section>
        </div>
        
        {/* Footer */}
        <footer className="py-8 text-center text-gray-400 border-t border-[rgba(var(--border-color),0.3)]">
          <p>© {new Date().getFullYear()} {profileData.name}. All rights reserved.</p>
          <p className="text-sm mt-2">Aspiring Trader | BFM Graduate | Market Enthusiast</p>
        </footer>
      </main>
    </DynamicBackground>
  )
}

import React from 'react';
import { Mail, Phone, MapPin, Download } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';
import { personalInfo } from '../data/personal';

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-white dark:bg-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contact Us"
          title="Hire Ashish or Start a Collaboration"
          description="Available for Python Full Stack engineering roles, backend consulting, full-stack contracts, and client projects. Send a message directly below."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Contact Info & Channels (5 cols) */}
          <div className="reveal lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-50/80 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Direct Contact Information
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Reach out directly via email, phone, or professional networks.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-brand-500/50 hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-4 group"
                  title="Send Email"
                >
                  <div className="p-3 rounded-xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Email Address
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors truncate block">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href={`tel:${personalInfo.phone}`}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 hover:border-brand-500/50 hover:-translate-y-0.5 hover:shadow-md transition-all flex items-center gap-4 group"
                  title="Call Directly"
                >
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Phone Number
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors block">
                      {personalInfo.phoneDisplay}
                    </span>
                  </div>
                </a>

                {/* Location */}
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      Location
                    </span>
                    <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white block">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Profiles & Links */}
              <div className="pt-4 border-t border-slate-200/70 dark:border-slate-800">
                <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                  Online Profiles &amp; Code
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-800 hover:shadow-md text-xs font-bold flex items-center justify-center gap-2.5 group transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    title="View GitHub Profile: ashishsingh2b"
                  >
                    <Github className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span className="truncate">GitHub</span>
                  </a>

                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#0077b5] text-white hover:bg-[#006097] hover:shadow-md text-xs font-bold flex items-center justify-center gap-2.5 group transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                    title="Connect on LinkedIn: ashsihsing"
                  >
                    <Linkedin className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                    <span className="truncate">LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* Resume Download Action */}
              <div className="pt-2">
                <Button
                  href={personalInfo.resumeDownloadPath}
                  download="Ashish_Singh_Resume.pdf"
                  variant="primary"
                  size="md"
                  className="w-full shadow-md"
                  icon={Download}
                >
                  Download Complete Resume (PDF)
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="reveal lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

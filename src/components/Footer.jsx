import React from 'react';
import { Mail, Phone, MapPin, Download } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/personal';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand & Bio (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.svg?v=2"
                alt={`${personalInfo.name} Logo`}
                className="w-10 h-10 rounded-xl shadow-md"
              />
              <div>
                <span className="font-extrabold text-white text-lg tracking-tight block">
                  {personalInfo.name}
                </span>
                <span className="text-xs text-brand-400 font-medium">
                  {personalInfo.headline}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Engineering high-performance Python Full Stack web applications, scalable REST APIs, and modern AI-integrated digital systems for startups and international businesses.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-[#0077b5] transition-colors"
                title="LinkedIn Profile: ashsihsing"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                title="GitHub Profile: ashishsingh2b"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-brand-600 transition-colors"
                title="Email Directly"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.resumeDownloadPath}
                download="Ashish_Singh_Resume.pdf"
                className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-emerald-600 transition-colors"
                title="Download Resume (PDF)"
                aria-label="Download Resume"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#hero" className="hover:text-brand-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-brand-400 transition-colors">About Ashish</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-brand-400 transition-colors">Technical Skills</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-brand-400 transition-colors">Featured Projects</a>
              </li>
              <li>
                <a href="#education" className="hover:text-brand-400 transition-colors">Education &amp; Experience</a>
              </li>
            </ul>
          </div>

          {/* Portfolio & Credentials */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Profiles &amp; Credentials
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-400 transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={personalInfo.resumeDownloadPath}
                  download="Ashish_Singh_Resume.pdf"
                  className="text-brand-400 hover:text-brand-300 transition-colors font-medium flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resume (PDF)</span>
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-brand-400 transition-colors">Education (BE CSE)</a>
              </li>
              <li>
                <a href="#certifications" className="hover:text-brand-400 transition-colors">Python Certification</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-brand-400 transition-colors">Contact / Hire</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Location &amp; Inquiries
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`mailto:${personalInfo.email}`} className="text-slate-300 hover:text-white transition-colors truncate">
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <a href={`tel:${personalInfo.phone}`} className="text-slate-300 hover:text-white transition-colors">
                  {personalInfo.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {personalInfo.name}. All rights reserved. Python Full Stack Engineering.
          </p>
          <p className="text-[11px] text-slate-500/90 tracking-wide">
            Developed by <span className="font-semibold text-slate-400">Krish Lad</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

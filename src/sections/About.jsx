import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { personalInfo } from '../data/personal';

export default function About() {
  const highlights = [
    { title: 'Python Full Stack Core', desc: 'Enterprise architecture with Python, Django, DRF, FastAPI & Flask' },
    { title: 'REST API Optimization', desc: 'Engineered 100+ production APIs with high throughput and low latency' },
    { title: 'Full-Stack Delivery', desc: 'Bridging Python backend architectures with modern responsive frontends' },
    { title: 'AI & Voice Integrations', desc: 'OpenAI API, Speech-to-Text (STT), and Text-to-Speech (TTS) pipelines' },
    { title: 'Payment Gateways', desc: 'Production integrations with Stripe and Apple Pay with idempotent webhooks' },
    { title: 'Production DevOps', desc: 'Docker containerization, DigitalOcean, Heroku, and Redis caching' }
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-850 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About Me"
          title="Engineering Reliable Systems &amp; Scalable Architectures"
          description="A background rooted in Computer Science engineering, production Python backends, and scalable full-stack web applications."
        />

        {/* Main Grid with spacious gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Text Column (7 cols) */}
          <div className="reveal lg:col-span-7 space-y-6">
            {/* Properly sized, refined narrative text */}
            <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                I am a motivated <strong className="text-slate-900 dark:text-white font-semibold">Python Full Stack Developer</strong> based in <span className="text-brand-600 dark:text-brand-400 font-medium">{personalInfo.location}</span> with hands-on experience developing scalable web applications, RESTful APIs, and AI-integrated systems.
              </p>
              <p>
                Currently, I work as a Python Full Stack Developer at <strong className="text-slate-900 dark:text-white font-semibold">Globalia Soft LLP</strong> (April 2024 – Present), where I design and optimize production REST APIs, integrate third-party payment gateways like Stripe and Apple Pay, and build AI services into live client applications within an Agile engineering team.
              </p>
              <p>
                My professional journey began with a full-stack internship at <strong className="text-slate-900 dark:text-white font-semibold">Positive Infotech</strong> (Feb 2022 – May 2022), focusing on database schema design, full-stack features, and deployment workflows, backed by my Bachelor of Engineering in Computer Science from Pacific School of Engineering.
              </p>
            </div>

            {/* Core Competency Highlights Grid */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-brand-500/40 hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Statistics & Credentials Column (5 cols) */}
          <div className="reveal lg:col-span-5 space-y-5">
            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4">
              {personalInfo.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-brand-500/50 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 text-center flex flex-col justify-center"
                >
                  <span className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mt-1.5">
                    {stat.label}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {stat.detail}
                  </span>
                </div>
              ))}
            </div>

            {/* Current Position Snapshot Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-brand-900 to-slate-900 text-white shadow-xl space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-brand-300">Current Role</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Active
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">
                  Python Full Stack Developer
                </h4>
                <p className="text-sm text-brand-200 font-medium mt-0.5">
                  {personalInfo.currentCompany} &bull; {personalInfo.currentSince} – Present
                </p>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Contributing to high-throughput Python REST APIs, full-stack features, AI pipelines, and Stripe payment rails in an Agile environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

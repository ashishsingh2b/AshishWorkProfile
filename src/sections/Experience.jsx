import React from 'react';
import { Briefcase, GraduationCap, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { experiences } from '../data/experience';
import { educationList } from '../data/education';

export default function Experience() {
  // Naturally and strictly ordered by year (Recent to earlier)
  const sortedEducation = [...educationList].sort((a, b) => b.sortYear - a.sortYear);
  const sortedExperiences = [...experiences].sort((a, b) => b.sortYear - a.sortYear);

  return (
    <section id="education" className="py-24 lg:py-32 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-850 scroll-mt-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Academic &amp; Career Journey"
          title="Education &amp; Work Experience"
          description="Formal computer science engineering training followed by production full-stack software development deliverables."
        />

        {/* ========================================================= */}
        {/* PART 1: EDUCATION & QUALIFICATIONS (FIRST)                */}
        {/* ========================================================= */}
        <div className="reveal mb-20">
          {/* Subheader */}
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200/70 dark:border-slate-800">
            <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Education &amp; Qualifications
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Academic engineering credentials and foundational training
              </p>
            </div>
          </div>

          {/* Education Timeline Structure */}
          <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {sortedEducation.map((edu) => (
              <div key={edu.id} className="relative group">
                {/* Timeline Pin Node */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600 group-hover:scale-110 transition-all flex items-center justify-center">
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-indigo-600" />
                </div>

                {/* Education Card */}
                <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-indigo-500/40 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 mb-3 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800">
                          {edu.year || edu.duration}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                          {edu.badge}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mt-1.5">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-mono font-medium self-start sm:self-center">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" />
                      <span>{edu.duration}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {edu.details}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PART 2: PROFESSIONAL WORK EXPERIENCE (THEN)               */}
        {/* ========================================================= */}
        <div id="experience" className="reveal pt-6 scroll-mt-20">
          {/* Subheader */}
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200/70 dark:border-slate-800">
            <div className="p-2.5 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-brand-800/60">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Work Experience
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Commercial software engineering &amp; enterprise application delivery
              </p>
            </div>
          </div>

          {/* Timeline Structure */}
          <div className="relative pl-6 sm:pl-10 space-y-10 before:absolute before:left-[11px] sm:before:left-[19px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {sortedExperiences.map((exp) => (
              <div key={exp.id} className="relative group">
                {/* Timeline Pin Node */}
                <div
                  className={`absolute -left-[30px] sm:-left-[46px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 flex items-center justify-center group-hover:scale-110 transition-all ${
                    exp.current
                      ? 'border-brand-600 bg-white dark:bg-slate-900 text-brand-600 shadow-md shadow-brand-600/30 ring-4 ring-brand-100 dark:ring-brand-950'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 group-hover:border-brand-500'
                  }`}
                >
                  <div
                    className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${
                      exp.current ? 'bg-brand-600 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                </div>

                {/* Experience Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-brand-500/40 transition-all duration-300">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-brand-50 text-brand-700 border border-brand-200 dark:bg-brand-950/60 dark:text-brand-300 dark:border-brand-800">
                          {exp.year || exp.duration}
                        </span>
                        {exp.current && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                            Current Position
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1.5">
                        {exp.role}
                      </h4>
                      <p className="text-sm sm:text-base font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                        {exp.company}
                      </p>
                    </div>

                    {/* Metadata Pills */}
                    <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <span className="inline-flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-brand-500" />
                        {exp.duration}
                      </span>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-brand-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {exp.summary}
                  </p>

                  {/* Responsibilities */}
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                      Key Responsibilities &amp; Achievements
                    </h5>
                    <ul className="space-y-2.5">
                      {exp.responsibilities.map((item, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                          <span className="leading-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Used */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-50 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-slate-750"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

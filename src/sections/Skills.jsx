import React, { useState } from 'react';
import {
  Server,
  Layout,
  Database,
  Sparkles,
  Cloud,
  Wrench,
  Code,
  Cpu,
  CreditCard,
  ShieldCheck,
  Clock,
  Layers
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { skillCategories, coreCapabilities } from '../data/skills';

const iconMap = {
  Server,
  Layout,
  Database,
  Sparkles,
  Cloud,
  Wrench,
  Code,
  Cpu,
  CreditCard,
  ShieldCheck,
  Clock,
  Layers
};

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const displayedCategories =
    selectedCategory === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" className="py-24 lg:py-32 bg-slate-50/50 dark:bg-slate-950/50 border-y border-slate-200/60 dark:border-slate-850 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Technical Proficiency"
          title="Battle-Tested Technologies &amp; Architecture"
          description="Verified production competencies across backend Python systems, scalable full-stack web applications, and modern AI integrations. Every skill meter displays 100% proficiency."
        />

        {/* Airy, Clean Proficiency Indicator Strip */}
        <div className="max-w-2xl mx-auto mb-12 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Verified Production Proficiency: <strong className="text-brand-600 dark:text-brand-400">100% Across All Stack Disciplines</strong>
            </span>
          </div>
          <span className="font-mono font-extrabold px-2.5 py-1 rounded-lg bg-brand-600 text-white shadow-sm shrink-0">
            100%
          </span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
            }`}
          >
            All Disciplines
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === category.id
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                  : 'bg-white dark:bg-slate-850 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Clean, De-congested Skills Grid */}
        <div key={selectedCategory} className="reveal is-visible grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {displayedCategories.map((category) => {
            const Icon = iconMap[category.icon] || Server;
            return (
              <div
                key={category.id}
                className="animate-scale-in rounded-3xl p-7 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-200/60 dark:border-indigo-800/60 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {category.name}
                      </h3>
                    </div>

                    {/* Category 100% Badge */}
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/80 text-[11px] font-mono font-bold">
                      100%
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                    {category.description}
                  </p>

                  {/* Clean, Airy Skill Meters (No heavy nested box borders) */}
                  <div className="space-y-4">
                    {category.skills.map((skill, sIdx) => (
                      <div key={sIdx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {skill.level && (
                              <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                                {skill.level}
                              </span>
                            )}
                            <span className="font-mono font-bold text-brand-600 dark:text-brand-400 text-xs">
                              100%
                            </span>
                          </div>
                        </div>

                        {/* Smooth 100% Progress Bar */}
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-500 dark:to-indigo-400 h-full rounded-full transition-all duration-700"
                            style={{ width: '100%' }}
                            title={`${skill.name}: 100%`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Core Architectural Capabilities Showcase with Spacious Layout */}
        <div className="reveal p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Architecture &amp; Delivery
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Core Engineering Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
                Demonstrated across commercial products, high-throughput microservices, and AI integrations.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 text-brand-700 dark:bg-brand-950/60 dark:text-brand-300 border border-brand-200/70 dark:border-brand-800 text-xs font-bold font-mono self-start sm:self-auto">
              <span>All Meters: 100%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreCapabilities.map((cap, idx) => {
              const CapIcon = iconMap[cap.icon] || Code;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50/70 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 shadow-sm hover:-translate-y-1 hover:shadow-md hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 shrink-0">
                      <CapIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {cap.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        {cap.description}
                      </p>
                    </div>
                  </div>

                  {/* 100% Progress Meter */}
                  <div className="mt-5 pt-4 border-t border-slate-200/60 dark:border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1.5 font-semibold">
                      <span className="text-slate-400 dark:text-slate-500">Mastery</span>
                      <span className="font-mono text-brand-600 dark:text-brand-400 font-bold">100%</span>
                    </div>
                    <div className="w-full bg-slate-200/70 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-500 dark:to-indigo-400 h-full rounded-full"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

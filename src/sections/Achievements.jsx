import React from 'react';
import { Rocket, Cpu, Sparkles, CreditCard, ShieldAlert, Award } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { achievements } from '../data/achievements';

const iconMap = {
  Rocket,
  Cpu,
  Sparkles,
  CreditCard,
  ShieldAlert,
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 lg:py-32 bg-slate-50/60 dark:bg-slate-950/60 border-y border-slate-200/60 dark:border-slate-850 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Key Achievements"
          title="Milestones &amp; Production Deliverables"
          description="Verified accomplishments delivering scalable backends, real-time speech AI integrations, and mission-critical cloud deployments."
        />

        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((item) => {
            const Icon = iconMap[item.icon] || Award;
            return (
              <div
                key={item.id}
                className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-slate-750">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Category */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1 group-hover:text-brand-600 transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Metric */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span>Scope:</span>
                  <span className="text-brand-600 dark:text-brand-400 font-mono font-bold">
                    {item.metrics}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

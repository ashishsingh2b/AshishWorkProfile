import React from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignClass = {
    center: 'text-center mx-auto',
    left: 'text-left',
    right: 'text-right ml-auto',
  }[align] || 'text-center mx-auto';

  return (
    <div className={`reveal max-w-3xl mb-12 lg:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-50 text-brand-700 border border-brand-200/60 dark:bg-brand-950/50 dark:text-brand-300 dark:border-brand-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-600 animate-pulse" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}

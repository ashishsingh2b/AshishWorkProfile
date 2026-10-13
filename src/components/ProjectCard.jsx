import React from 'react';
import { ExternalLink, ArrowRight, Star, Eye } from 'lucide-react';

export default function ProjectCard({ project, onSelect }) {
  const isFeatured = project.id === 'timepe-services' || project.isFeatured;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(project);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onKeyDown={handleKeyDown}
      className={`group relative flex flex-col h-full rounded-3xl bg-white dark:bg-slate-900 border transition-all duration-300 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 ${
        isFeatured
          ? 'border-brand-500/40 dark:border-brand-500/50 shadow-md hover:shadow-2xl hover:border-brand-500 hover:-translate-y-2 ring-1 ring-brand-500/10'
          : 'border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-brand-500/60 hover:-translate-y-2'
      }`}
      title={`Click to view details for ${project.title}`}
    >
      {/* Screenshot / Image Preview Container */}
      <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer">
        <img
          src={project.heroImage}
          alt={`${project.title} dashboard preview`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity pointer-events-none" />

        {/* Featured Ribbon / Badge */}
        {isFeatured ? (
          <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-white font-bold text-[11px] shadow-md tracking-wide">
            <Star className="w-3 h-3 fill-current" />
            <span>FEATURED</span>
          </div>
        ) : (
          <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-sm">
            {project.categoryLabel.split('/')[0]}
          </div>
        )}

        {/* Quick View Details on Image */}
        <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-medium flex items-center gap-1.5 opacity-90 group-hover:opacity-100 group-hover:bg-brand-600 transition-all">
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Category Subtitle & Live Status */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-brand-600 dark:text-brand-400 truncate">
              {project.categoryLabel}
            </span>
            {project.liveUrl && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live Product
              </span>
            )}
          </div>

          {/* Project Title & Tagline */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 transition-colors leading-snug">
              {project.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Technology Badges */}
          <div className="pt-2">
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-[11px] font-medium rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200/60 dark:border-slate-750"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-1 text-[11px] font-medium rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:translate-x-1 transition-transform">
            <span>Explore Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 rounded-xl text-slate-600 hover:text-white hover:bg-brand-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white dark:hover:bg-brand-600 transition-colors cursor-pointer"
                title="Open Live Application in New Tab"
                aria-label={`Open live project ${project.title}`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

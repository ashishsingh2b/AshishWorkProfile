import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Layers, Cpu, ShieldAlert, Sparkles } from 'lucide-react';
import Button from './Button';
import ProjectGallery from './ProjectGallery';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 my-auto p-6 sm:p-8 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors z-10 cursor-pointer"
          aria-label="Close Project Details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-10 mb-6">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded-full bg-brand-50 text-brand-700 border border-brand-200/60 dark:bg-brand-950/50 dark:text-brand-300 dark:border-brand-800/60">
              {project.categoryLabel}
            </span>
            {project.isFeatured && (
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800">
                ⭐ Featured Production Project
              </span>
            )}
          </div>

          <h3 id="modal-project-title" className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {project.title}
          </h3>
          <p className="mt-1 text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
            {project.tagline}
          </p>
        </div>

        {/* Screenshot Gallery */}
        <div className="mb-8">
          <ProjectGallery screenshots={project.screenshots} projectTitle={project.title} />
          {project.screenshotPlaceholderNotice && (
            <div className="mt-2.5 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-300">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Verification Note:</strong> {project.screenshotPlaceholderNotice}
              </span>
            </div>
          )}
        </div>

        {/* Actions Bar */}
        {project.liveUrl && (
          <div className="flex flex-wrap items-center gap-3 pb-6 mb-6 border-b border-slate-100 dark:border-slate-800">
            <Button
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="md"
              icon={ExternalLink}
            >
              View Live Project
            </Button>
          </div>
        )}

        {/* Detailed Sections Grid */}
        <div className="space-y-6">
          {/* Overview */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              Project Overview
            </h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Ashish's Verified Contributions */}
          {project.contributions && project.contributions.length > 0 && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-600" />
                Key Development Contributions (Resume Verified)
              </h4>
              <ul className="space-y-2.5">
                {project.contributions.map((contribution, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 shrink-0 mt-1" />
                    <span>{contribution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Core Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-500" />
                Architectural Highlights &amp; Features
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/70 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0 mt-2" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verified Technology Stack */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-500" />
              Verified Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}

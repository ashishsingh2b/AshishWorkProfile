import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from 'lucide-react';

export default function ProjectGallery({ screenshots = [], projectTitle = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const count = screenshots ? screenshots.length : 0;

  // Reset gallery index and lightbox when switching projects
  useEffect(() => {
    setCurrentIndex(0);
    setIsLightboxOpen(false);
  }, [screenshots]);

  // Keyboard navigation for lightbox (capture phase prevents Escape from closing ProjectModal simultaneously)
  useEffect(() => {
    if (!isLightboxOpen || count === 0) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
      } else if (e.key === 'Escape') {
        e.stopImmediatePropagation();
        e.stopPropagation();
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isLightboxOpen, count]);

  if (!screenshots || count === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500">
        <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
        <p className="text-sm font-medium">Screenshot preview available in documentation</p>
      </div>
    );
  }

  const current = screenshots[currentIndex] || screenshots[0];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? count - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === count - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Main Image Display */}
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 group shadow-md">
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-slate-950 flex items-center justify-center overflow-hidden">
          <img
            src={current.url}
            alt={current.title || `${projectTitle} screenshot ${currentIndex + 1}`}
            className="w-full h-full object-contain sm:object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            loading="lazy"
          />

          {/* Quick Lightbox Zoom Trigger */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 text-white hover:bg-black/80 backdrop-blur-md opacity-80 group-hover:opacity-100 transition-opacity focus-visible:opacity-100 cursor-pointer"
            title="Expand Fullscreen Lightbox"
            aria-label="Enlarge Screenshot"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Previous / Next Controls if multiple images */}
          {count > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/55 text-white hover:bg-black/80 backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 cursor-pointer"
                aria-label="Previous Screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-black/55 text-white hover:bg-black/80 backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 transition-all duration-200 cursor-pointer"
                aria-label="Next Screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Counter Badge */}
          {screenshots.length > 1 && (
            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-mono">
              {currentIndex + 1} / {screenshots.length}
            </div>
          )}
        </div>

        {/* Caption */}
        {current.caption && (
          <div className="p-3.5 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <span className="font-semibold text-slate-800 dark:text-slate-200">{current.title}:</span>
            <span className="ml-2 truncate text-slate-500 dark:text-slate-400">{current.caption}</span>
          </div>
        )}
      </div>

      {/* Thumbnail Bar */}
      {screenshots.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto pb-1 scrollbar-none">
          {screenshots.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-brand-600 ring-2 ring-brand-500/30'
                  : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={s.url}
                alt={s.title || `Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal Lightbox */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-8 animate-fade-in"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white mb-4 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h3 className="font-bold text-lg">{current.title || projectTitle}</h3>
              <p className="text-xs text-slate-300">{current.caption}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">
                {currentIndex + 1} of {screenshots.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Container */}
          <div
            className="relative max-w-5xl max-h-[80vh] w-full flex items-center justify-center overflow-hidden rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={current.url}
              alt={current.title || projectTitle}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />

            {screenshots.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

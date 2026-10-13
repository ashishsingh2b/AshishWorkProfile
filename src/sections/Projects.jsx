import React, { useState, useMemo } from 'react';
import { AlertCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import { projects, PROJECT_CATEGORIES } from '../data/projects';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All Projects');
  const [selectedProject, setSelectedProject] = useState(null);

  // Filter projects while strictly maintaining:
  // 1. TimePe is ALWAYS first if it matches the active filter
  // 2. The remaining projects maintain their exact specified order
  const filteredProjects = useMemo(() => {
    let list = projects;
    if (activeCategory !== 'All Projects') {
      list = projects.filter((p) => p.categories.includes(activeCategory));
    }

    // Ensure TimePe Services is first if present
    const timePe = list.find((p) => p.id === 'timepe-services');
    const others = list.filter((p) => p.id !== 'timepe-services');

    if (timePe) {
      return [timePe, ...others];
    }
    return others;
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 lg:py-32 bg-white dark:bg-slate-900 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Portfolio Showcase"
          title="Featured Production Applications"
          description="Real-world commercial platforms, healthcare ERPs, cybersecurity systems, and enterprise MLOps architectures. Click any card to explore full architecture and verified screenshots."
        />

        {/* Filter Categories Bar with spacious layout */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-14 gap-2.5 scrollbar-none">
          {PROJECT_CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            const count =
              category === 'All Projects'
                ? projects.length
                : projects.filter((p) => p.categories.includes(category)).length;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25 scale-[1.02]'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-750'
                }`}
              >
                <span>{category}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive
                      ? 'bg-white/25 text-white'
                      : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects 3-in-one-line Grid */}
        {filteredProjects.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <AlertCircle className="w-8 h-8 mx-auto text-slate-400 mb-3" />
            <p className="text-slate-600 dark:text-slate-400 font-medium">
              No projects found in this category.
            </p>
          </div>
        ) : (
          <div key={activeCategory} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onSelect={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}

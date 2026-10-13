import React, { useState } from 'react';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { Github, Linkedin } from '../components/Icons';
import Button from '../components/Button';
import { personalInfo } from '../data/personal';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('django');

  const codeSnippets = {
    django: `# services/ai_reconciliation.py
class TimePeReconciliationEngine:
    """AI-powered auto ledger & GST reconciliation"""
    def __init__(self, tenant_id: str):
        self.tenant_id = tenant_id
        self.db = PostgreSQLConnection(tenant_id)
        
    async def process_bank_feed(self, transaction_batch):
        verified_entries = await self.ai_matcher.categorize(
            batch=transaction_batch,
            rules=["GST_INPUT_TAX", "EXPENSE_MATCH"]
        )
        return self.generate_ledger_entries(verified_entries)`,
    fastapi: `# api/v1/ml_studio.py
@router.post("/models/{model_id}/evaluate")
async def evaluate_model_pipeline(
    model_id: UUID, 
    dataset: DatasetStaging,
    metrics: List[str] = ["accuracy", "roc_auc", "drift"]
) -> EvaluationResponse:
    pipeline = SageMakerOrchestrator(model_id)
    report = await pipeline.compute_metrics(dataset, metrics)
    await redis_cache.set(f"model:{model_id}:metrics", report)
    return EvaluationResponse(status="success", data=report)`,
    fullstack: `// components/FullStackDashboard.jsx
export function FullStackDashboard({ tenantId }) {
  const { data: stats, isLoading } = useQuery(['metrics', tenantId], () =>
    api.fetchGSTFilings(tenantId)
  );
  
  return (
    <Card className="border-brand-500/30 shadow-lg">
      <StatusBadge status={stats?.filingStatus} />
      <FinancialChart data={stats?.monthlyPL} />
    </Card>
  );
}`
  };

  return (
    <section id="hero" className="relative pt-16 pb-24 lg:pt-24 lg:pb-36 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 scroll-mt-16">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Introductions & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            {/* Unified Status & Role Pill */}
            <div className="animate-slide-up inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/80 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Hire</span>
              <span className="text-emerald-300 dark:text-emerald-700">&bull;</span>
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Python Full Stack Developer</span>
            </div>

            {/* Name & Headline with Airy Typography */}
            <div className="animate-slide-up [animation-delay:80ms] space-y-3.5">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.12]">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-[length:200%_auto] animate-gradient-x">
                  {personalInfo.name}
                </span>
              </h1>
              <p className="text-lg sm:text-xl font-semibold text-brand-600 dark:text-brand-400">
                {personalInfo.headline}
              </p>
            </div>

            {/* Intro Bio */}
            <p className="animate-slide-up [animation-delay:150ms] text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personalInfo.bio}
            </p>

            {/* Primary Action Buttons */}
            <div className="animate-slide-up [animation-delay:220ms] flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <Button
                href="#projects"
                variant="primary"
                size="lg"
                icon={ArrowRight}
              >
                View My Projects
              </Button>

              <Button
                href={personalInfo.resumeDownloadPath}
                download="Ashish_Singh_Resume.pdf"
                variant="secondary"
                size="lg"
                icon={Download}
                className="font-semibold shadow-sm"
              >
                Download Resume
              </Button>

              <Button
                href="#contact"
                variant="outline"
                size="lg"
                icon={Mail}
              >
                Contact Me
              </Button>
            </div>

            {/* Professional External Profiles: GitHub & LinkedIn */}
            <div className="animate-slide-up [animation-delay:280ms] flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 dark:text-slate-100 hover:bg-slate-800 dark:hover:bg-slate-700 shadow-sm text-xs font-semibold hover:-translate-y-0.5 transition-all cursor-pointer group"
                title="View Ashish Singh's GitHub Profile"
              >
                <Github className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
                <span>GitHub Profile</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077b5] text-white hover:bg-[#006097] shadow-sm text-xs font-semibold hover:-translate-y-0.5 transition-all cursor-pointer group"
                title="Connect with Ashish Singh on LinkedIn"
              >
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform text-white" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            {/* Technology Preview Badges */}
            <div className="animate-slide-up [animation-delay:340ms] pt-6 border-t border-slate-200/80 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
                Core Production Stack
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {personalInfo.techPreview.map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs font-semibold text-slate-800 dark:text-slate-200 hover:border-brand-500 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-600" />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Code Visual & Developer Card (5 cols) */}
          <div className="lg:col-span-5 relative animate-slide-up [animation-delay:180ms]">
            <div className="relative rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden text-left animate-float">
              {/* Window Header */}
              <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 text-xs font-mono text-slate-400">ashish-python-fullstack</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>online</span>
                </div>
              </div>

              {/* Code File Tabs */}
              <div className="flex bg-slate-950/50 border-b border-slate-800 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('django')}
                  className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'django'
                      ? 'border-brand-500 text-brand-400 bg-slate-900 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  reconciliation.py
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('fastapi')}
                  className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'fastapi'
                      ? 'border-brand-500 text-brand-400 bg-slate-900 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  ml_studio.py
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('fullstack')}
                  className={`px-4 py-2.5 border-b-2 transition-colors cursor-pointer ${
                    activeTab === 'fullstack'
                      ? 'border-brand-500 text-brand-400 bg-slate-900 font-bold'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  fullstack_ui.jsx
                </button>
              </div>

              {/* Code Editor Body */}
              <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] text-slate-300 leading-relaxed overflow-x-auto min-h-[220px]">
                <pre key={activeTab} className="text-slate-200 animate-fade-in">
                  <code>
                    {codeSnippets[activeTab]}
                    <span className="inline-block w-2 h-4 ml-1 align-middle bg-brand-400 animate-pulse" />
                  </code>
                </pre>
              </div>

              {/* Developer Metadata Footer Banner */}
              <div className="p-4 sm:p-5 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-brand-400" />
                    {personalInfo.location}
                  </span>
                  <span className="text-brand-400 font-semibold">{personalInfo.currentCompany}</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1.5 border-t border-slate-850">
                  <span>5 Production Projects</span>
                  <span className="text-emerald-400 font-mono">100+ REST APIs Built</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

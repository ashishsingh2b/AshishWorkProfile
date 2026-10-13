/**
 * Ashish Singh - Projects Portfolio Data
 * Primary source: Ashish Singh Resume & Verified Production Deployments
 * Mandatory rule: TimePe Services is always FIRST and featured.
 */

export const PROJECT_CATEGORIES = [
  "All Projects",
  "AI and Machine Learning",
  "Full-Stack Development",
  "Healthcare",
  "E-commerce",
  "Cybersecurity",
  "Business Applications"
];

export const projects = [
  {
    id: "timepe-services",
    title: "TimePe Services",
    tagline: "India's #1 AI-Powered Accounting ERP & Compliance Platform",
    categoryLabel: "Business Applications / Full-Stack",
    categories: ["Business Applications", "Full-Stack Development", "AI and Machine Learning"],
    isFeatured: true,
    liveUrl: "https://timepeservice.com",
    heroImage: "/assets/projects/timepe-hero.png",
    logoImage: "/assets/projects/timepe-logo.png",
    screenshots: [
      {
        url: "/assets/projects/timepe-hero.png",
        title: "Main ERP Dashboard & Overview",
        caption: "Unified multi-entity financial overview, real-time GST filings status, and smart analytics."
      },
      {
        url: "/assets/projects/timepe-multicompany.png",
        title: "Multi-Company Cloud Accounting",
        caption: "Cross-company journal entries, consolidated P&L, balance sheets, and inter-company transfers."
      },
      {
        url: "/assets/projects/timepe-billing.png",
        title: "AI-Powered Smart Billing & Invoicing",
        caption: "Automated ledger detection, tax calculation, IRN e-Invoice generation, and bulk billing."
      },
      {
        url: "/assets/projects/timepe-gst.png",
        title: "Seamless GST Compliance & Portal Filing",
        caption: "Auto GSTR-1 & 3B return preparation, e-Way bills with live tracking, and direct GST portal sync."
      },
      {
        url: "/assets/projects/timepe-jobwork.png",
        title: "Job Work & Mill Management",
        caption: "End-to-end manufacturing workflows, challan tracking, raw material issuance, and mill production."
      }
    ],
    shortDescription: "A production web application focused on accounting, billing, GST, reports, dashboards, and business workflows.",
    fullDescription: "TimePe is a comprehensive, production-grade cloud accounting ERP engineered for Indian businesses, Chartered Accountants, and enterprises. The platform eliminates manual bookkeeping by leveraging AI to automatically categorize transactions, reconcile bank feeds, generate IRN-compliant e-invoices, and prepare direct GST portal returns (GSTR-1, GSTR-3B, GSTR-9). Ashish works on core backend architecture, REST API optimization, and scalable data workflows.",
    technologies: [
      "Python",
      "Django",
      "Django REST Framework",
      "React.js",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "GST API Integration",
      "Docker"
    ],
    highlights: [
      "Auto-fill GSTR-1 & GSTR-3B with one-click direct GST portal verification",
      "Multi-company cloud accounting with consolidated financial balance sheets",
      "Real-time e-Invoice IRN & QR code generation and automated e-Way bills",
      "AI-driven bank statement ingestion, reconciliations, and automated ledger postings",
      "Comprehensive CA Corner & tax practitioner multi-client management workspace"
    ],
    contributions: [
      "Engineered backend RESTful APIs for invoice creation, ledger postings, and financial balance calculations.",
      "Optimized high-volume database queries and transaction isolation across PostgreSQL for multi-company tenants.",
      "Implemented asynchronous task queues for batch reconciliation, scheduled report generation, and automated alerts.",
      "Collaborated with frontend engineering teams to deliver responsive dashboards and interactive business reporting."
    ],
    hasVerifiedScreenshot: true
  },
  {
    id: "rivergen-ai",
    title: "NeuralFlow",
    tagline: "Enterprise AI Data & Machine Learning Model Management Platform",
    categoryLabel: "AI and Machine Learning / Full-Stack",
    categories: ["AI and Machine Learning", "Full-Stack Development"],
    isFeatured: false,
    liveUrl: "https://app.rivergen.ai/",
    heroImage: "/assets/projects/rivergen-preview.png",
    logoImage: "/assets/projects/rivergen-logo.png",
    screenshots: [
      {
        url: "/assets/projects/rivergen-preview.png",
        title: "Model Studio & Training Interface",
        caption: "Architectural dashboard preview: Model lifecycle management, dataset versioning, ROC curves, and drift analytics."
      }
    ],
    shortDescription: "An AI data and model management platform designed to support machine learning workflows, model versioning, dataset integration, training pipelines, model evaluation, and monitoring.",
    fullDescription: "RiverGen provides enterprise teams with complete data intelligence and MLOps capabilities, unifying dataset staging, AutoML training, model registries, and real-time inference monitoring into a scalable microservices ecosystem. Ashish served as a key backend engineer designing over 100+ REST APIs across the Model Studio lifecycle.",
    technologies: [
      "FastAPI",
      "React.js",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Microservices",
      "JWT Auth",
      "AWS SageMaker"
    ],
    highlights: [
      "100+ REST APIs engineered specifically for the Model Studio engine",
      "End-to-end ML training pipelines with dataset staging and AutoML workflows",
      "Model evaluation metrics: real-time Accuracy, ROC-AUC, and Confusion Matrices",
      "Real-time latency, throughput, and data drift monitoring telemetry",
      "Decoupled microservices architecture with robust JWT authentication"
    ],
    contributions: [
      "Developed 100+ REST APIs for Model Studio covering full model lifecycle, versioning, dataset integration, and configuration.",
      "Built end-to-end ML training pipelines with dataset staging, AutoML workflows, and job orchestration.",
      "Implemented performance and evaluation APIs (accuracy, ROC, confusion matrix) and real-time monitoring for latency and drift.",
      "Designed Model Studio frontend components in React with interactive metric visualizations and training status dashboards.",
      "Collaborated in an Agile microservices environment with bi-weekly sprints and daily stand-ups."
    ],
    hasVerifiedScreenshot: false,
    screenshotPlaceholderNotice: "Live application requires enterprise credentials (app.rivergen.ai). Interface preview diagram shown based on verified architecture."
  },
  {
    id: "dentalnote-ai",
    title: "Dentora",
    tagline: "Next-Generation Dental Healthcare ERP & Clinical Speech AI",
    categoryLabel: "Healthcare / AI & ERP",
    categories: ["Healthcare", "AI and Machine Learning", "Full-Stack Development"],
    isFeatured: false,
    liveUrl: null, // Private clinical deployment
    heroImage: "/assets/projects/dentalnote-preview.png",
    logoImage: null,
    screenshots: [
      {
        url: "/assets/projects/dentalnote-preview.png",
        title: "Clinical Workspace & Speech-to-Text Documentation",
        caption: "Architectural preview: Hands-free voice dictation, automated clinical note synthesis via OpenAI, and multi-tenant clinic separation."
      }
    ],
    shortDescription: "A dental healthcare platform that supports clinical documentation, AI-assisted note generation, and clinic-specific workflows.",
    fullDescription: "DentalNote AI streamlines patient documentation and clinic operations for dental practitioners. By integrating AI-powered Speech-to-Text (STT) and OpenAI language models, dentists can speak their clinical observations during examinations and receive structured, standardized medical notes instantaneously.",
    technologies: [
      "Django REST Framework",
      "React.js",
      "OpenAI API",
      "Speech-to-Text (STT)",
      "Text-to-Speech (TTS)",
      "PostgreSQL",
      "Heroku",
      "Multi-Tenant Architecture"
    ],
    highlights: [
      "Hands-free clinical note generation using AI Speech-to-Text (STT)",
      "OpenAI integration for intelligent diagnostic summarization and treatment plans",
      "Multi-tenant clinic architecture with complete HIPAA-ready patient data isolation",
      "Role-based access control (RBAC) across clinic administrators, dentists, and staff",
      "Comprehensive ERP modules: patient billing, automated reminders, and appointment alerts"
    ],
    contributions: [
      "Built scalable Django REST Framework backend and dynamic React.js frontend for real-time clinical interaction and documentation.",
      "Integrated AI-based Speech-to-Text (STT) and Text-to-Speech (TTS) for hands-free clinical note generation.",
      "Designed multi-tenant database architecture enabling dental clinics to manage separate, fully isolated workspaces.",
      "Integrated OpenAI API for intelligent note generation and automated clinical workflow processing.",
      "Implemented ERP modules including payment handling, role-based access control, alerts, and notifications deployed on Heroku."
    ],
    hasVerifiedScreenshot: false,
    screenshotPlaceholderNotice: "Private clinical EHR deployment with protected patient health data. Architectural workspace preview shown."
  },
  {
    id: "earthworm-security",
    title: "SecureSphere",
    tagline: "Automated Cybersecurity, Network Scanning & Compliance Platform",
    categoryLabel: "Cybersecurity / Business Applications",
    categories: ["Cybersecurity", "Business Applications"],
    isFeatured: false,
    liveUrl: null, // Internal organizational platform
    heroImage: "/assets/projects/earthworm-preview.png",
    logoImage: null,
    screenshots: [
      {
        url: "/assets/projects/earthworm-preview.png",
        title: "Security Telemetry & Compliance Auditing",
        caption: "Architectural preview: Agent heartbeat telemetry, automated IP vulnerability scanner, and compliance audit reporting."
      }
    ],
    shortDescription: "A cybersecurity and compliance platform for organizational monitoring, vulnerability management, and automated security reporting.",
    fullDescription: "Earthworm is an enterprise security monitoring platform designed to provide IT administrators with centralized visibility across private networks. Featuring lightweight agent daemons for Windows and Ubuntu workstations, it automatically audits systems for missing patches, open ports, and configuration drift while producing audit-ready compliance documentation.",
    technologies: [
      "Python",
      "Django",
      "Celery",
      "Redis",
      "HTML",
      "CSS",
      "JavaScript",
      "SSL",
      "Agent-Based Architecture"
    ],
    highlights: [
      "Distributed Celery + Redis asynchronous task execution for recurring IP network scans",
      "Cross-platform agent daemons running on Windows and Ubuntu machines",
      "Automated compliance reporting aligned with security frameworks",
      "Network IP vulnerability detection and missing security patch tracking",
      "Secure encrypted telemetry transmission via SSL certificate verification"
    ],
    contributions: [
      "Built secure Django backend for managing compliance workflows and sensitive organizational security data.",
      "Implemented Celery + Redis asynchronous task processing for scheduled scans, automated reporting, and background worker jobs.",
      "Developed agent-based architecture with lightweight Windows and Ubuntu background agents for remote monitoring across private networks.",
      "Built IP scanning, vulnerability detection, patch management, and automated security audit report generation modules."
    ],
    hasVerifiedScreenshot: false,
    screenshotPlaceholderNotice: "Internal organizational cybersecurity infrastructure. Architectural interface preview displayed."
  },
  {
    id: "lootamo-ecommerce",
    title: "PixelCart",
    tagline: "High-Performance Digital Products & Automated License E-Commerce",
    categoryLabel: "E-commerce / Full-Stack",
    categories: ["E-commerce", "Full-Stack Development"],
    isFeatured: false,
    liveUrl: null,
    heroImage: "/assets/projects/lootamo-preview.png",
    logoImage: null,
    screenshots: [
      {
        url: "/assets/projects/lootamo-preview.png",
        title: "Storefront & Instant License Fulfillment Engine",
        caption: "Architectural preview: SEO-optimized catalog, Stripe idempotency webhook receiver, and G2A API digital key dispatch."
      }
    ],
    shortDescription: "An e-commerce platform for digital products with payment processing, automated license delivery, user authentication, and order management.",
    fullDescription: "Lootamo is a specialized digital goods storefront architected for instant software and game key delivery. Built with FastAPI on the backend and Next.js on the frontend, it integrates Stripe with strict webhook idempotency, third-party vendor APIs (G2A API), and background cron queues for zero-delay order fulfillment.",
    technologies: [
      "FastAPI",
      "Next.js",
      "React.js",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "SendGrid",
      "APScheduler",
      "OAuth",
      "DigitalOcean"
    ],
    highlights: [
      "Modular versioned REST APIs engineered in FastAPI for high-throughput concurrency",
      "SEO-friendly, server-rendered Next.js frontend with rapid search and catalog filtering",
      "Stripe payment integration with idempotent webhook processing and refund workflows",
      "Automated instant digital license key fulfillment via G2A API integration",
      "Google and Facebook OAuth authentication with SendGrid transactional retry queues"
    ],
    contributions: [
      "Developed scalable FastAPI backend with modular versioned APIs and high-performance Next.js frontend.",
      "Integrated Stripe payment gateway with webhook handling, idempotent processing, and complete order lifecycle management.",
      "Built automated license key delivery utilizing G2A API, OAuth login (Google & Facebook), and SendGrid email retry queues.",
      "Deployed the platform on DigitalOcean with APScheduler product sync, admin dashboard, error logging, and full system observability."
    ],
    hasVerifiedScreenshot: false,
    screenshotPlaceholderNotice: "Production e-commerce platform with automated payment queues. Architectural storefront preview displayed."
  }
];

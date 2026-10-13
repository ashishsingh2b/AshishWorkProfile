/**
 * Ashish Singh - Technical Skills Data
 * Python Full Stack Developer
 * Source: Resume & Verified Production Experience
 * Requirement: Every skill meter displays 100%
 */

export const skillCategories = [
  {
    id: "backend",
    name: "Backend Development",
    description: "Architecting scalable services, high-throughput RESTful APIs, and robust application backends.",
    icon: "Server",
    proficiency: 100,
    skills: [
      { name: "Python", level: "Core Expertise", proficiency: 100, meter: "100%", featured: true },
      { name: "Django", level: "Core Expertise", proficiency: 100, meter: "100%", featured: true },
      { name: "Django REST Framework", level: "Core Expertise", proficiency: 100, meter: "100%", featured: true },
      { name: "FastAPI", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "Flask", level: "Proficient", proficiency: 100, meter: "100%", featured: false }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    description: "Building responsive, user-friendly, and interactive web interfaces with modern JavaScript frameworks.",
    icon: "Layout",
    proficiency: 100,
    skills: [
      { name: "React.js", level: "Full-Stack UI", proficiency: 100, meter: "100%", featured: true },
      { name: "Next.js", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "JavaScript (ES6+)", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "HTML5 & CSS3", level: "Core Standards", proficiency: 100, meter: "100%", featured: false },
      { name: "Tailwind CSS", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "Bootstrap", level: "Proficient", proficiency: 100, meter: "100%", featured: false },
      { name: "jQuery", level: "Proficient", proficiency: 100, meter: "100%", featured: false }
    ]
  },
  {
    id: "databases",
    name: "Databases & Data Stores",
    description: "Relational database schema design, index optimization, caching layers, and vector search stores.",
    icon: "Database",
    proficiency: 100,
    skills: [
      { name: "PostgreSQL", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "MySQL", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "DynamoDB", level: "Proficient", proficiency: 100, meter: "100%", featured: false },
      { name: "Redis", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "SQLite", level: "Proficient", proficiency: 100, meter: "100%", featured: false },
      { name: "Pinecone", level: "Vector DB", proficiency: 100, meter: "100%", featured: false }
    ]
  },
  {
    id: "ai-integrations",
    name: "AI & Third-Party Integrations",
    description: "Integrating modern LLMs, automated speech pipelines, and global fintech payment rails.",
    icon: "Sparkles",
    proficiency: 100,
    skills: [
      { name: "OpenAI API", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "Speech-to-Text (STT)", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "Text-to-Speech (TTS)", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "Stripe & Apple Pay", level: "Production", proficiency: 100, meter: "100%", featured: true },
      { name: "SendGrid", level: "Production", proficiency: 100, meter: "100%", featured: false },
      { name: "OAuth 2.0", level: "Production", proficiency: 100, meter: "100%", featured: false }
    ]
  },
  {
    id: "cloud-devops",
    name: "Cloud, DevOps & Architecture",
    description: "Containerization, cloud infrastructure deployment, background tasks, and microservices.",
    icon: "Cloud",
    proficiency: 100,
    skills: [
      { name: "Docker", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "DigitalOcean", level: "Production", proficiency: 100, meter: "100%", featured: true },
      { name: "Heroku", level: "Production", proficiency: 100, meter: "100%", featured: false },
      { name: "AWS (Basics / SageMaker)", level: "Working Knowledge", proficiency: 100, meter: "100%", featured: false },
      { name: "Celery & APScheduler", level: "Advanced", proficiency: 100, meter: "100%", featured: true },
      { name: "Microservices & RBAC", level: "Advanced", proficiency: 100, meter: "100%", featured: true }
    ]
  },
  {
    id: "tools-professional",
    name: "Developer Tools & Professional Skills",
    description: "Agile collaboration, version control, technical problem-solving, and client communications.",
    icon: "Wrench",
    proficiency: 100,
    skills: [
      { name: "Git & GitHub", level: "Daily Workflow", proficiency: 100, meter: "100%", featured: true },
      { name: "Problem Solving", level: "Core Strength", proficiency: 100, meter: "100%", featured: true },
      { name: "Team Collaboration", level: "Agile Teams", proficiency: 100, meter: "100%", featured: false },
      { name: "Client Communication", level: "International", proficiency: 100, meter: "100%", featured: false },
      { name: "REST API Optimization", level: "Core Strength", proficiency: 100, meter: "100%", featured: true }
    ]
  }
];

export const coreCapabilities = [
  {
    title: "RESTful API Engineering",
    description: "Designing versioned, documented, and high-performance REST APIs (100+ endpoints built for RiverGen Model Studio).",
    icon: "Code",
    proficiency: 100
  },
  {
    title: "AI & Voice Pipeline Integration",
    description: "Integrating OpenAI LLMs, real-time Speech-to-Text (STT), and Text-to-Speech (TTS) into clinical healthcare and analytics workflows.",
    icon: "Cpu",
    proficiency: 100
  },
  {
    title: "Fintech & Payment Workflows",
    description: "Implementing end-to-end payment lifecycles with Stripe and Apple Pay, idempotent webhook processors, and e-invoicing.",
    icon: "CreditCard",
    proficiency: 100
  },
  {
    title: "Enterprise Multi-Tenancy & RBAC",
    description: "Architecting multi-tenant database schemas with strict tenant isolation, role-based permissions, and audit compliance.",
    icon: "ShieldCheck",
    proficiency: 100
  },
  {
    title: "Asynchronous Task Processing",
    description: "Orchestrating long-running jobs, distributed background scanning, automated reports, and email queues via Celery and Redis.",
    icon: "Clock",
    proficiency: 100
  },
  {
    title: "Full-Stack Web Delivery",
    description: "Bridging reliable Python/Django and FastAPI backends with modern, responsive React.js and Next.js frontends.",
    icon: "Layers",
    proficiency: 100
  }
];

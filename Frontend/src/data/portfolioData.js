// Portfolio Data for Neil Masion

export const personalInfo = {
  name: import.meta.env.VITE_DEVELOPER_NAME || "Neil Masion",
  role: import.meta.env.VITE_DEVELOPER_ROLE || "Front-End Developer & UI Engineer",
  email: import.meta.env.VITE_CONTACT_EMAIL || "neilmasion.dev@gmail.com",
  location: import.meta.env.VITE_LOCATION || "Cebu, Philippines",
  coordinates: import.meta.env.VITE_COORDINATES || "10.3157° N, 123.8854° E",
  status: "AVAILABLE FOR FREELANCE & FULL-TIME",
  bioHeadline: "Good code starts from scratch to the core with IMPACT.",
  bioDescription: "Front-end developer focused on modern web interfaces, responsive layouts, and clean code for real people.",
  corePhilosophy: "I connect the dots between what a product needs to do and what its users need to feel. No bloat. Just a polished experience.",
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com/neilmasion",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "https://linkedin.com/in/neilmasion",
  twitter: import.meta.env.VITE_TWITTER_URL || "https://twitter.com/neilmasion",
};

export const projects = [
  {
    id: "01",
    title: "Take the photo your way.",
    subtitle: "focalio studio",
    tagline: "High-end photography editorial platform & portfolio system",
    category: "web",
    tech: ["Next.js", "React", "Framer Motion", "Tailwind CSS"],
    themeColor: "from-amber-900/20 to-stone-900/40",
    accentColor: "#E53E3E",
    cardBg: "#EAE7DF",
    textColor: "#1A1A1A",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    description: "A tailored editorial experience designed for a boutique fashion studio. Features custom cursor interactions, silky-smooth horizontal image carousels, responsive grid transitions, and sub-second asset hydration.",
    metrics: ["99 Lighthouse Performance", "<0.6s LCP", "100% Fluid Responsive"],
    githubUrl: "https://github.com/neilmasion/focalio-studio",
    liveUrl: "https://focalio-studio-preview.vercel.app"
  },
  {
    id: "02",
    title: "Your next big idea starts here.",
    subtitle: "design to preview",
    tagline: "Interactive digital incubator & creative design engine",
    category: "app",
    tech: ["React 19", "Three.js", "Tailwind CSS", "Zustand"],
    themeColor: "from-lime-950/40 to-emerald-950/30",
    accentColor: "#E53E3E",
    cardBg: "#2A3620",
    textColor: "#ECFCCB",
    image: "graphic-portal",
    description: "An interactive incubator dashboard enabling creative teams to prototype 3D web concepts in real-time. Built with interactive canvas widgets, dark-mode first aesthetic, and instant state persistence.",
    metrics: ["60 FPS Smooth Canvas", "Zero Layout Shift", "Instant Reactive State"],
    githubUrl: "https://github.com/neilmasion/design-to-preview",
    liveUrl: "https://design-to-preview.vercel.app"
  },
  {
    id: "03",
    title: "Spaces for a clearer kind of life.",
    subtitle: "form & function",
    tagline: "Modern architectural catalog & space visualizer",
    category: "web",
    tech: ["Vite", "React", "Tailwind CSS", "GSAP Scroll"],
    themeColor: "from-amber-950/20 to-neutral-900/40",
    accentColor: "#E53E3E",
    cardBg: "#E3DBD1",
    textColor: "#262320",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Minimalist architectural showcase emphasizing spatial harmony, typography hierarchy, and light interaction. Clean responsive layout with bespoke imagery scaling on scroll.",
    metrics: ["100/100 Best Practices", "Accessible WCAG AAA", "Dynamic Viewport Sizing"],
    githubUrl: "https://github.com/neilmasion/form-and-function",
    liveUrl: "https://form-function-arch.vercel.app"
  },
  {
    id: "04",
    title: "Less ordinary. More you.",
    subtitle: "allin one",
    tagline: "Next-generation fintech card & personal asset dashboard",
    category: "interactive",
    tech: ["TypeScript", "Next.js", "Chart.js", "CSS Shaders"],
    themeColor: "from-orange-950/40 to-neutral-950/60",
    accentColor: "#E53E3E",
    cardBg: "#E75626",
    textColor: "#FFFFFF",
    image: "graphic-circles",
    description: "A high-octane personal finance visualizer breaking away from generic banking interfaces. Bold color blocking, kinetic geometric portals, and instant cryptographic data streaming.",
    metrics: ["Sub-50ms Transaction Latency", "End-to-end Encrypted", "Vibrant Theme Switcher"],
    githubUrl: "https://github.com/neilmasion/allin-one-finance",
    liveUrl: "https://allin-one-showcase.vercel.app"
  }
];

export const capabilities = [
  {
    id: "rapid-builds",
    title: "Rapid Builds",
    highlight: "Speed without compromise",
    description: "From wireframe to high-performing production code in record time. I eliminate red tape and bloated dependencies, delivering lean, accessible interfaces that load instantly on any network.",
    tags: ["Pixel Perfection", "Clean Code", "High Velocity", "Mobile-First"]
  },
  {
    id: "frontend-arch",
    title: "Frontend Architecture",
    highlight: "Built to scale gracefully",
    description: "Designing modular component libraries, robust state management patterns, and reusable hooks that your entire engineering team can rely on as the application grows.",
    tags: ["React / Next.js", "TypeScript", "Atomic Design", "Design Systems"]
  },
  {
    id: "frontend-direction",
    title: "Frontend Direction",
    highlight: "Engineering meets art direction",
    description: "Bridging the gap between Figma artboards and browser execution. Elevating user journeys with purposeful micro-interactions, spring physics, kinetic typography, and fluid page transitions.",
    tags: ["Framer Motion", "Micro-Interactions", "Fluid Transitions", "Sound & Haptics"]
  }
];

export const processSteps = [
  {
    step: "01",
    title: "GET BRIEFED",
    description: "Deep dive into your business goals, target user personas, and project constraints. Setting crisp performance benchmarks."
  },
  {
    step: "02",
    title: "PLAN THE SYSTEM",
    description: "Wireframing the component hierarchy, selecting optimal tooling, and crafting fluid responsive breakpoints."
  },
  {
    step: "03",
    title: "BUILD IT",
    description: "Writing clean, semantic, and maintainable code. Infusing smooth micro-animations and ensuring full keyboard accessibility."
  },
  {
    step: "04",
    title: "REVIEW & HAND OFF",
    description: "Rigorous cross-browser stress testing, Lighthouse audits, automated CI verification, and turnkey deployment."
  }
];

export const skillsCategories = [
  {
    category: "FRONTEND STACK",
    skills: [
      { name: "HTML5", icon: "html", level: "Expert", color: "#E34F26" },
      { name: "CSS3", icon: "css", level: "Expert", color: "#1572B6" },
      { name: "JavaScript", icon: "js", level: "Expert", color: "#F7DF1E" },
      { name: "TypeScript", icon: "ts", level: "Advanced", color: "#3178C6" },
      { name: "React.js", icon: "react", level: "Expert", color: "#61DAFB" },
      { name: "Tailwind CSS", icon: "tailwind", level: "Expert", color: "#06B6D4" },
      { name: "Next.js", icon: "next", level: "Advanced", color: "#FFFFFF" },
      { name: "Vite", icon: "vite", level: "Expert", color: "#646CFF" },
      { name: "Framer Motion", icon: "framer", level: "Advanced", color: "#0055FF" },
      { name: "Redux / Zustand", icon: "state", level: "Advanced", color: "#764ABC" }
    ]
  },
  {
    category: "BACKEND & RUNTIMES",
    skills: [
      { name: "Node.js", icon: "node", level: "Proficient", color: "#5FA04E" },
      { name: "Express.js", icon: "express", level: "Proficient", color: "#FFFFFF" },
      { name: "REST APIs", icon: "api", level: "Advanced", color: "#009688" },
      { name: "GraphQL", icon: "graphql", level: "Intermediate", color: "#E10098" },
      { name: "Python", icon: "python", level: "Intermediate", color: "#3776AB" }
    ]
  },
  {
    category: "DATABASES & CLOUD",
    skills: [
      { name: "Git", icon: "git", level: "Expert", color: "#F05032" },
      { name: "GitHub", icon: "github", level: "Expert", color: "#FFFFFF" },
      { name: "PostgreSQL", icon: "postgres", level: "Proficient", color: "#4169E1" },
      { name: "MongoDB", icon: "mongo", level: "Proficient", color: "#47A248" },
      { name: "Supabase", icon: "supabase", level: "Advanced", color: "#3FCF8E" },
      { name: "Firebase", icon: "firebase", level: "Proficient", color: "#FFCA28" },
      { name: "Vercel", icon: "vercel", level: "Expert", color: "#FFFFFF" }
    ]
  },
  {
    category: "DESIGN & TOOLING",
    skills: [
      { name: "Figma", icon: "figma", level: "Advanced", color: "#F24E1E" },
      { name: "Framer", icon: "framer-design", level: "Advanced", color: "#0055FF" },
      { name: "Photoshop", icon: "ps", level: "Intermediate", color: "#31A8FF" },
      { name: "Illustrator", icon: "ai", level: "Intermediate", color: "#FF9A00" },
      { name: "VS Code", icon: "vscode", level: "Expert", color: "#007ACC" },
      { name: "Postman", icon: "postman", level: "Advanced", color: "#FF6C37" }
    ]
  }
];

export const faqs = [
  {
    question: "Can we start with just a landing page?",
    answer: "Absolutely! Many high-impact client partnerships begin with a focused, razor-sharp landing page. It gives us a chance to establish the visual language, design system, and technical foundation before expanding into a full multi-page application."
  },
  {
    question: "What tech stack do you prefer to work with?",
    answer: "My battle-tested core stack is React 19, TypeScript, Tailwind CSS, Next.js or Vite, and Framer Motion. This combo delivers incredible developer velocity, tiny bundle sizes, and world-class 60fps animations. I am also comfortable adapting to your existing codebase."
  },
  {
    question: "Can you work with my existing team?",
    answer: "Yes, 100%. I integrate smoothly into engineering sprints, attend standups, follow strict Git branching workflows, write descriptive PRs, and collaborate closely with product managers, UI/UX designers, and backend engineers."
  },
  {
    question: "How do we collaborate on a project?",
    answer: "We typically start with a 30-minute discovery call to align on scope, deliverables, and timelines. We then communicate via Slack/Discord, manage tasks on Linear/Notion/GitHub Projects, and review staging builds on Vercel preview URLs with every commit."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "A standard landing page or portfolio takes 1–2 weeks from final design approval. More comprehensive web apps or SaaS dashboards typically take 3–6 weeks depending on the number of views and API integrations."
  },
  {
    question: "Do you offer post-launch maintenance?",
    answer: "Yes! Every build comes with a complimentary 30-day bug warranty. Beyond that, I offer ongoing retainers for feature additions, performance optimization, design system updates, and dependency security audits."
  }
];

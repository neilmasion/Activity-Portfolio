// Portfolio Data for Neil Masion

export const personalInfo = {
  name: import.meta.env.VITE_DEVELOPER_NAME || "Neil Masion",
  role: import.meta.env.VITE_DEVELOPER_ROLE || "4th-Year BSIT Student • Web Designer & Creative Editor",
  email: import.meta.env.VITE_CONTACT_EMAIL || "neilmasion2@gmail.com",
  location: import.meta.env.VITE_LOCATION || "Cebu, Philippines",
  coordinates: import.meta.env.VITE_COORDINATES || "10.3157° N, 123.8854° E",
  status: "OPEN FOR COMMISSIONS • WEB DESIGN, GRAPHICS & VIDEO EDITING",
  bioHeadline: "4th-Year BSIT Student, Aspiring Full-Stack Developer & Creative.",
  bioDescription: "A 4th-year BSIT student with a strong passion for design and development. Currently active as an AWS SBG Multimedia Graphics member and former IT Council Media Officer, while accepting commissions for web design, graphic design, and video editing as I work toward becoming a full-stack developer.",
  corePhilosophy: "When I take on a project, I don't just deliver it — I make sure it stands out. I believe every detail matters, and I put the same care into every project whether it's a website, a poster, or a video edit.",
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com/neilmasion",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/neil-masion-24bb282b3/",
  twitter: import.meta.env.VITE_TWITTER_URL || "https://x.com/neil4masion",
  x: import.meta.env.VITE_TWITTER_URL || "https://x.com/neil4masion",
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
    images: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A tailored editorial experience designed for a boutique fashion studio. Features custom cursor interactions, silky-smooth horizontal image carousels, responsive grid transitions, and sub-second asset hydration.",
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
    images: [
      "graphic-portal",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "An interactive incubator dashboard enabling creative teams to prototype 3D web concepts in real-time. Built with interactive canvas widgets, dark-mode first aesthetic, and instant state persistence.",
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
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Minimalist architectural showcase emphasizing spatial harmony, typography hierarchy, and light interaction. Clean responsive layout with bespoke imagery scaling on scroll.",
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
    images: [
      "graphic-circles",
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A high-octane personal finance visualizer breaking away from generic banking interfaces. Bold color blocking, kinetic geometric portals, and instant cryptographic data streaming.",
    githubUrl: "https://github.com/neilmasion/allin-one-finance",
    liveUrl: "https://allin-one-showcase.vercel.app"
  }
];

export const capabilities = [
  {
    id: "web-design",
    title: "Web Design",
    highlight: "Clean, responsive & modern web interfaces",
    description: "I design and build websites that are clean, responsive, and easy to use. Whether it's a landing page, portfolio, or a full site — I focus on making it look good while keeping it functional and user-friendly.",
    tags: ["Landing Pages", "Portfolio Sites", "Responsive Layouts", "UI/UX"]
  },
  {
    id: "graphic-pubmats",
    title: "Graphic Design",
    highlight: "Eye-catching visuals for events & brands",
    description: "From event posters and publication materials to social media graphics — I create designs that grab attention and communicate clearly. My experience as an AWS SBG Multimedia Graphics member and former IT Council Media Officer gives me solid hands-on practice in visual communication.",
    tags: ["Posters & Flyers", "Event Graphics", "Publication Materials", "Social Media"]
  },
  {
    id: "video-production",
    title: "Video Editing",
    highlight: "Polished edits that tell a story",
    description: "Video editing started as a hobby because I enjoyed seeing how clips could come together to tell a story. I turn raw footage into polished, engaging edits with the right pacing, transitions, and feel.",
    tags: ["Event Recaps", "Highlight Reels", "Cinematic Edits", "Short-Form Content"]
  }
];

export const processSteps = [
  {
    step: "01",
    title: "DISCOVER",
    deliverable: "Project Plan",
    description: "We chat about what you need, your goals, and ideas."
  },
  {
    step: "02",
    title: "WIREFRAME",
    deliverable: "Simple Layouts",
    description: "I map out the structure so everything is easy to use."
  },
  {
    step: "03",
    title: "DESIGN",
    deliverable: "Figma UI",
    description: "I create clean, modern visual designs that match your style."
  },
  {
    step: "04",
    title: "DELIVER",
    deliverable: "Ready Files",
    description: "You get the interactive prototype and all ready-to-use files."
  }
];

export const skillsCategories = [
  {
    category: "FRONTEND",
    skills: [
      { name: "HTML", icon: "html", level: "Expert", color: "#E34F26" },
      { name: "CSS", icon: "css", level: "Expert", color: "#1572B6" },
      { name: "React", icon: "react", level: "Expert", color: "#61DAFB" },
      { name: "TailwindCSS", icon: "tailwind", level: "Expert", color: "#06B6D4" },
      { name: "Javascript", icon: "js", level: "Expert", color: "#F7DF1E" },
      { name: "TypeScript", icon: "ts", level: "Advanced", color: "#3178C6" },
      { name: "Next.js", icon: "next", level: "Advanced", color: "#FFFFFF" },
      { name: "Vite", icon: "vite", level: "Expert", color: "#646CFF" }
    ]
  },
  {
    category: "BACKEND & DATABASE",
    skills: [
      { name: "Node.js", icon: "node", level: "Proficient", color: "#5FA04E" },
      { name: "Express.js", icon: "express", level: "Proficient", color: "#FFFFFF" },
      { name: "Python", icon: "python", level: "Intermediate", color: "#3776AB" },
      { name: "PostgreSQL", icon: "postgres", level: "Proficient", color: "#4169E1" }
    ]
  },
  {
    category: "VERSION CONTROL",
    skills: [
      { name: "Git", icon: "git", level: "Expert", color: "#F05032" },
      { name: "GitHub", icon: "github", level: "Expert", color: "#FFFFFF" },
      { name: "Vercel", icon: "vercel", level: "Expert", color: "#FFFFFF" },
      { name: "AWS", icon: "aws", level: "Intermediate", color: "#FF9900" }
    ]
  },
  {
    category: "DESIGN & VIDEO EDIT TOOLS",
    skills: [
      { name: "Figma", icon: "figma", level: "Advanced", color: "#F24E1E" },
      { name: "Canva", icon: "canva", level: "Expert", color: "#00C4CC" },
      { name: "Photoshop", icon: "ps", level: "Intermediate", color: "#31A8FF" },
      { name: "CapCut", icon: "capcut", level: "Advanced", color: "#00E5FF" }
    ]
  }
];

export const faqs = [
  {
    question: "What is your current status and background?",
    answer: "I'm a 4th-year Bachelor of Science in Information Technology (BSIT) student based in Cebu, Philippines. I currently serve as an AWS SBG Multimedia Graphics member, and previously served as an IT Council Media Officer. Over time, I've explored web design, graphic design, and video editing, and my goal is to become a full-stack developer while continuing to accept creative commissions."
  },
  {
    question: "What services do you offer for commissions?",
    answer: "I offer three main services: Web Design (responsive landing pages, portfolio sites, and UI designs), Graphic Design (publication materials, posters, flyers, and event graphics), and Video Editing (event recaps, highlight reels, and cinematic edits). I focus on delivering clean, polished work that stands out."
  },
  {
    question: "What tools and technologies do you use?",
    answer: "For web design and development, I work with React, Next.js, TailwindCSS, JavaScript, TypeScript, and Vite. For graphic design, I use Figma, Canva, and Photoshop. For video editing, I use CapCut. I also work with Node.js, Express.js, Python, and PostgreSQL on the backend side."
  },
  {
    question: "Do you have real project experience?",
    answer: "Yes. I've accepted web design commissions and worked on designs for real clients. Through my current role in AWS SBG Multimedia Graphics and my previous experience as an IT Council Media Officer, I've designed graphics, pubmats, and promotional materials for campus activities, tech events, and student initiatives. Video editing also started as a hobby and grew into delivering dynamic event highlights and recap videos."
  },
  {
    question: "How can I reach out for a commission?",
    answer: "You can click the 'Let's Talk' button on the site or email me directly at neilmasion2@gmail.com. Just share your project idea, timeline, and any references you have in mind. I'll get back to you as soon as I can to discuss the details."
  }
];

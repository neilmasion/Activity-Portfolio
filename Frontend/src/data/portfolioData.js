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
    title: "Ipon: Collaborative Savings Tracker",
    subtitle: "Full-Stack Web App",
    tagline: "Daily savings challenges, shared pools & streak tracking",
    category: "web",
    categories: ["web", "app", "ui-ux"],
    tech: ["React", "Node.js", "Express.js", "Neon DB", "Cloudflare", "Tailwind CSS", "Vercel"],
    themeColor: "from-pink-950/40 to-rose-950/60",
    accentColor: "#FF2D6D",
    cardBg: "#220E1A",
    textColor: "#FFE4EE",
    aspect: "1024/463",
    image: "/assets/ipon/ipon-dashboard.jpg",
    images: [
      "/assets/ipon/ipon-dashboard.jpg",
      "/assets/ipon/ipon-calendar.jpg",
      "/assets/ipon/ipon-collaborate.jpg",
      "/assets/ipon/ipon-history.jpg",
      "/assets/ipon/ipon-login.jpg"
    ],
    description: "A full-stack personal savings web app built with React, Node.js, Express, and Neon DB. Features daily target tracking (₱50/day), shared savings pools with friends, streak calendars, and transaction logs.",
    liveUrl: "https://ipon-two.vercel.app/login",
    githubUrl: "https://github.com/neilmasion/Ipon"
  },
  {
    id: "02",
    title: "eCare: Citizen Portal & Barangay Services",
    subtitle: "Full-Stack Web App",
    tagline: "Barangay services catalog, PhilSys ID verification & application tracking",
    category: "web",
    categories: ["web", "app", "ui-ux"],
    tech: ["React", "Node.js", "Express.js", "Tailwind CSS", "PhilSys ID", "Vercel"],
    themeColor: "from-blue-950/40 to-sky-950/60",
    accentColor: "#2563EB",
    cardBg: "#0B1528",
    textColor: "#DBEAFE",
    aspect: "1024/467",
    image: "/assets/ecare/ecare-dashboard.png",
    images: [
      "/assets/ecare/ecare-dashboard.png",
      "/assets/ecare/ecare-services.jpg",
      "/assets/ecare/ecare-tracker.png",
      "/assets/ecare/ecare-profile.png",
      "/assets/ecare/ecare-login.png"
    ],
    description: "A full-stack citizen portal web app for local barangay governance and public services. Features online clearance requests, financial and medical aid tracking, PhilSys National ID verification, appointment scheduling, and incident reporting.",
    liveUrl: "https://ecare-phi.vercel.app/",
    githubUrl: "https://github.com/neilmasion/ecare"
  },
  {
    id: "03",
    title: "GIYA: Smart Cane Companion & Auth UI",
    subtitle: "IoT Mobile App Design",
    tagline: "Caregiver verification, live GPS & emergency SOS alerts",
    category: "app",
    categories: ["web", "app", "ui-ux"],
    tech: ["Figma", "UI/UX Design", "Mobile App", "Design System"],
    themeColor: "from-orange-950/40 to-stone-900/60",
    accentColor: "#FA8C54",
    cardBg: "#F7ECE5",
    textColor: "#1A1715",
    aspect: "4/3",
    image: "/assets/giya/Shot.webp",
    images: [
      "/assets/giya/Shot.webp",
      "/assets/giya/Shot-1.webp",
      "/assets/giya/Shot-2.webp"
    ],
    description: "A mobile companion app interface for an IoT smart cane system. Features caregiver PIN verification, live GPS route tracking, and instant emergency SOS alerts.",
    figmaUrl: "https://www.figma.com/design/X8kgkMKNRJ68hrFIAya2LF/GIYA-Authentication-UI?node-id=0-1&t=RnzyFHbT3CFO3g10-1",
    liveUrl: "https://www.figma.com/design/X8kgkMKNRJ68hrFIAya2LF/GIYA-Authentication-UI?node-id=0-1&t=RnzyFHbT3CFO3g10-1",
    githubUrl: null
  },
  {
    id: "04",
    title: "IT Days: Celestial Showcase Pubmats",
    subtitle: "Event Graphics & Branding",
    tagline: "Official event branding, activity announcements & social pubmats",
    category: "graphics",
    categories: ["graphics"],
    tech: ["Canva", "Graphic Design", "Social Pubmats", "Branding"],
    themeColor: "from-indigo-950/40 to-purple-950/60",
    accentColor: "#00C4CC",
    cardBg: "#161329",
    textColor: "#F3F0FF",
    aspect: "1/1",
    image: "/assets/it-days/game-exhibition.webp",
    images: [
      "/assets/it-days/game-exhibition.webp",
      "/assets/it-days/infographics-contest.webp",
      "/assets/it-days/program-flow.webp",
      "/assets/it-days/schedule-update.webp",
      "/assets/it-days/it-days-frame.webp"
    ],
    description: "Official visual branding and publication materials for Cebu Eastern College's IT Days showcase. Features a cosmic space theme for game exhibitions, timelines, and announcements.",
    canvaUrl: "https://canva.link/0qd0sayk09j2yw1",
    liveUrl: "https://canva.link/0qd0sayk09j2yw1",
    githubUrl: null
  },
  {
    id: "05",
    title: "Pizza Restaurant Promo Flyer",
    subtitle: "Commissioned Print & Social Ad",
    tagline: "Bold promotional food flyer design for a local restaurant",
    category: "graphics",
    categories: ["graphics"],
    tech: ["Canva", "Graphic Design", "Print Layout", "Commission"],
    themeColor: "from-amber-950/40 to-neutral-950/60",
    accentColor: "#F59E0B",
    cardBg: "#1C1A17",
    textColor: "#FDE68A",
    aspect: "723/1024",
    image: "/assets/commissions/pizza-flyer.webp",
    images: [
      "/assets/commissions/pizza-flyer.webp"
    ],
    description: "A commissioned promotional flyer for a local pizza restaurant. Features bold hand-drawn typography, high-contrast food photos, and clear weekend delivery offers.",
    canvaUrl: "https://canva.link/yp5t80nla80c1o1",
    liveUrl: "https://canva.link/yp5t80nla80c1o1",
    githubUrl: null
  },
  {
    id: "06",
    title: "AWS Student Community Day Cebu",
    subtitle: "Official Event Campaign",
    tagline: "Social media campaign, event countdowns & teaser pubmats",
    category: "graphics",
    categories: ["graphics"],
    tech: ["Canva", "Graphic Design", "Social Pubmats", "Branding"],
    themeColor: "from-purple-950/40 to-fuchsia-950/60",
    accentColor: "#A855F7",
    cardBg: "#221133",
    textColor: "#F3E8FF",
    aspect: "1/1",
    image: "/assets/aws-community-day/event-banner.webp",
    images: [
      "/assets/aws-community-day/event-banner.webp",
      "/assets/aws-community-day/qr-invite.webp",
      "/assets/aws-community-day/registration-closed.webp",
      "/assets/aws-community-day/teaser-flashlight.webp"
    ],
    description: "Event announcement banners, countdown teasers, and registration pubmats created for AWS Student Community Day held at UP Cebu.",
    canvaUrl: "https://canva.link/4zfkg8dlg3eb3pu",
    liveUrl: "https://canva.link/4zfkg8dlg3eb3pu",
    githubUrl: null
  },
  {
    id: "07",
    title: "ToDo List Mobile UI",
    subtitle: "Mobile Task Manager",
    tagline: "Minimalist mobile task manager & calendar scheduler interface",
    category: "app",
    categories: ["web", "app", "ui-ux"],
    tech: ["Figma", "UI/UX Design", "Mobile UI", "Prototyping"],
    themeColor: "from-blue-950/40 to-indigo-950/60",
    accentColor: "#4F46E5",
    cardBg: "#17182E",
    textColor: "#E0E7FF",
    aspect: "4/3",
    image: "/assets/todo-app/todo-preview.webp",
    images: [
      "/assets/todo-app/todo-preview.webp"
    ],
    description: "A clean, minimalist mobile task manager and calendar scheduler interface designed with color-coded categories, quick search, and deadline tracking.",
    figmaUrl: "https://www.figma.com/design/9hBmQn0YRPaFCJTGI48f04/Untitled?node-id=0-1&t=UkfEr6UpPFiPUPGH-1",
    liveUrl: "https://www.figma.com/design/9hBmQn0YRPaFCJTGI48f04/Untitled?node-id=0-1&t=UkfEr6UpPFiPUPGH-1",
    githubUrl: null
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
      { name: "PostgreSQL", icon: "postgres", level: "Proficient", color: "#4169E1" },
      { name: "Neon", icon: "neon", level: "Proficient", color: "#00E599" }
    ]
  },
  {
    category: "CLOUD & DEVOPS",
    skills: [
      { name: "Git", icon: "git", level: "Expert", color: "#F05032" },
      { name: "GitHub", icon: "github", level: "Expert", color: "#FFFFFF" },
      { name: "Cloudflare", icon: "cloudflare", level: "Proficient", color: "#F38020" },
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
    answer: "For web design and development, I work with React, Next.js, TailwindCSS, JavaScript, TypeScript, and Vite. On the backend and cloud infrastructure, I use Node.js, Express.js, PostgreSQL, Neon, Cloudflare, and Vercel. For graphic design, I use Figma, Canva, and Photoshop. For video editing, I use CapCut."
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

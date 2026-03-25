import { Icons } from "@/components/icons";
import {
  BriefcaseBusiness,
  CodeIcon,
  GraduationCap,
  HomeIcon,
  NotebookIcon,
  PencilLine,
} from "lucide-react";

export const DATA = {
  name: "Siddhant",
  fullName: "Siddhant Chouksey",
  initials: "S",
  url: "https://siddhant.dev",
  location: "India",
  locationLink: "https://www.google.com/maps/place/india",
  description:
    "Full-Stack Developer, specializing in modern web technologies. Passionate about building scalable applications and creating impactful user experiences. Always exploring new technologies and best practices.",
  heroTagline: "Backend-Focused Software Engineer & B.Tech CSE Student.",
  heroDescription:
    "Architecting high-performance infrastructures and modern AI solutions.",
  summary:
    "I'm a Full-Stack Developer passionate about creating robust and user-centric web applications. With expertise in modern JavaScript frameworks and backend technologies, I've built several full-featured applications including anonymous messaging platforms, blogging systems, video sharing backends, and gym management systems. I specialize in React, Next.js, Node.js, and MongoDB, with a strong focus on authentication, API design, and scalable architecture. Outside of coding, I enjoy contributing to open-source projects and staying updated with the latest web development trends.",
  avatarUrl: "/logo-face.png",
  skills: [
    "C++",
    "Java",
    "Node.js",
    "Express",
    "PostgreSQL",
    "MongoDB",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Redux Toolkit",
  ],
  navbar: [
    { href: "#hero", icon: HomeIcon, label: "Home" },
    { href: "#projects", icon: CodeIcon, label: "Projects" },
    { href: "#stats", icon: CodeIcon, label: "Competitions" },
    { href: "#skills", icon: CodeIcon, label: "Stack" },
  ],
  contact: {
    email: "siddnt452@gmail.com",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/siddnt",
        icon: Icons.github,
        contact: true,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/siddhant-chouksey-699859299/",
        icon: Icons.linkedin,
        contact: true,
        navbar: true,
      },
      LeetCode: {
        name: "LeetCode",
        url: "https://leetcode.com/sidd_ntt",
        icon: Icons.leetcode,
        contact: true,
        navbar: true,
      },
      Codeforces: {
        name: "Codeforces",
        url: "https://codeforces.com/profile/sidd_ntt",
        icon: Icons.codeforces,
        contact: true,
        navbar: true,
      },
      Email: {
        name: "Send Email",
        url: "mailto:siddnt452@gmail.com",
        icon: Icons.email,
        contact: true,
        navbar: false,
      },
    },
  },
  leetcode: {
    username: "sidd_ntt",
    profileUrl: "https://leetcode.com/sidd_ntt",
    description:
      "I actively practice problem-solving on LeetCode to enhance my algorithmic thinking and coding skills. Check out my profile to see my progress and solutions!",
  },
  achievements: [
    {
      platform: "LeetCode",
      title: "Knight",
      stat: "Top 2.97%",
      color: "amber" as const,
      profileUrl: "https://leetcode.com/sidd_ntt",
      certificateUrl: "", // Add certificate URL here
      description: "Achieved Knight badge for consistent problem-solving performance",
    },
    {
      platform: "Codeforces",
      title: "Specialist",
      stat: "Max Rating 1422",
      color: "cyan" as const,
      profileUrl: "https://codeforces.com/profile/sidd_ntt",
      certificateUrl: "", // Add certificate URL here
      description: "Specialist rank on Codeforces competitive programming platform",
    },
    {
      platform: "ACM ICPC",
      title: "ICPC Asia West Regionalist",
      stat: "2025",
      color: "violet" as const,
      profileUrl: "", // Add ICPC profile/team URL here
      certificateUrl: "", // Add certificate URL here
      description: "Qualified for ICPC Asia West Regional round",
    },
    {
      platform: "IEEE IICPC",
      title: "Global Rank 3387",
      stat: "Global Prelims",
      color: "magenta" as const,
      profileUrl: "", // Add IICPC results URL here
      certificateUrl: "", // Add certificate URL here
      description: "Ranked in IEEE International Inter-Collegiate Programming Contest",
    },
  ],
  education: [
    {
      school: "IIIT Sricity",
      href: "#",
      degree: "B.Tech in Computer Science and Engineering",
      icon: true,
      logoUrl: "/graduation-cap.svg",
      start: "2023",
      end: "2027",
    },
  ],
  projects: [
    {
      title: "FitSync",
      href: "#",
      dates: "Jan 2025 - Present",
      active: true,
      description:
        "Multi-tenant fitness synchronization engine with real-time biometric data processing and cloud scaling.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Tailwind CSS",
        "Redux",
        "JWT",
        "Razorpay",
      ],
      category: "SaaS // Fitness",
      isBackend: false,
      links: [
        {
          type: "GitHub",
          href: "https://github.com/siddnt/fitsync",
          icon: Icons.github,
        },
        {
          type: "Live Demo",
          href: "#",
          icon: Icons.globe,
        },
      ],
      image: "/projects/fitsync.png",
      video: "",
    },
    {
      title: "Anon",
      href: "#",
      dates: "Sep 2024 - Dec 2024",
      active: true,
      description:
        "Secure, AI-driven anonymous messaging platform utilizing end-to-end encryption and automated moderation.",
      technologies: [
        "Next.js",
        "TypeScript",
        "MongoDB",
        "NextAuth",
        "Gemini AI",
        "Tailwind CSS",
        "Zod",
      ],
      category: "AI // Messaging",
      isBackend: false,
      links: [
        {
          type: "GitHub",
          href: "https://github.com/siddnt/ama-app",
          icon: Icons.github,
        },
        {
          type: "Live Demo",
          href: "#",
          icon: Icons.globe,
        },
      ],
      image: "/projects/ama-app.png",
      video: "",
    },
    {
      title: "Streamstem",
      href: "#",
      dates: "Jul 2024 - Aug 2024",
      active: true,
      description:
        "High-throughput streaming API gateway capable of managing 10k+ concurrent WebSocket connections.",
      technologies: [
        "Node.js",
        "Express",
        "MongoDB",
        "Mongoose",
        "JWT",
        "Cloudinary",
        "Multer",
      ],
      category: "Backend // API",
      isBackend: true,
      links: [
        {
          type: "GitHub",
          href: "https://github.com/siddnt/youtube-backend",
          icon: Icons.github,
        },
        {
          type: "API Docs",
          href: "#",
          icon: Icons.globe,
        },
      ],
      image: "",
      video: "",
    },
  ],
};

"use client";

import dynamic from "next/dynamic";
import {
  Typewriter,
  AnimatedCounter,
  SpotlightCard,
  TiltCard,
  RevealOnScroll,
} from "@/components/creative-effects";
import { TextScramble } from "@/components/three/text-scramble";
import { CustomCursor } from "@/components/cursor";
import { ThemeToggle } from "@/components/theme-toggle";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// Lazy-load Three.js
const ParticleField = dynamic(
  () => import("@/components/three/particle-field").then((mod) => mod.ParticleField),
  { ssr: false }
);

// ===== Nav =====
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`hover-line relative font-sans tracking-tight uppercase text-[11px] font-semibold transition-colors duration-300 py-1 ${active ? "text-[var(--color-mint)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
        }`}
    >
      {label}
      {active && (
        <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--color-mint)] to-[var(--color-amber)] rounded-full" />
      )}
    </Link>
  );
}

// ===== Achievement color map =====
const colorMap: Record<string, { bg: string; text: string; ring: string; glow: string }> = {
  amber: {
    bg: "from-amber-500/15 to-amber-600/5",
    text: "text-amber-400",
    ring: "stroke-amber-400",
    glow: "group-hover:shadow-[0_0_40px_rgba(251,191,36,0.08)]",
  },
  cyan: {
    bg: "from-cyan-500/15 to-teal-500/5",
    text: "text-teal-400",
    ring: "stroke-teal-400",
    glow: "group-hover:shadow-[0_0_40px_rgba(45,212,191,0.08)]",
  },
  violet: {
    bg: "from-violet-500/15 to-indigo-500/5",
    text: "text-violet-400",
    ring: "stroke-violet-400",
    glow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.08)]",
  },
  magenta: {
    bg: "from-rose-500/15 to-pink-500/5",
    text: "text-rose-400",
    ring: "stroke-rose-400",
    glow: "group-hover:shadow-[0_0_40px_rgba(251,113,133,0.08)]",
  },
};

// ===== Progress Ring =====
function ProgressRing({ progress, colorClass, size = 52 }: { progress: number; colorClass: string; size?: number }) {
  const radius = (size - 6) / 2;
  const circumference = 2 * Math.PI * radius;
  const ref = useRef<SVGCircleElement>(null);
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setOffset(circumference - (progress / 100) * circumference), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [circumference, progress]);

  return (
    <svg width={size} height={size} className="flex-shrink-0">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-line)" strokeWidth="2.5" opacity={0.4} />
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        className={colorClass}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 1.5s cubic-bezier(0.23,1,0.32,1)" }}
      />
    </svg>
  );
}

// ===== Achievement Icons =====
const achievementIcons: Record<string, React.ReactNode> = {
  amber: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
  ),
  cyan: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  ),
  violet: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.388V2.721" />
  ),
  magenta: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
  ),
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["hero", "projects", "achievements", "stack"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="noise">
      <CustomCursor />

      {/* ===== NAVBAR ===== */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled
          ? "bg-[var(--color-void)]/80 backdrop-blur-2xl border-b border-[var(--color-line)]/50"
          : "bg-transparent"
          }`}
      >
        <div className="flex justify-between items-center px-8 lg:px-16 h-16 max-w-[1400px] mx-auto">
          <Link href="#hero" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-mint)] to-teal-600 flex items-center justify-center text-[var(--color-void)] text-xs font-bold group-hover:shadow-[0_0_20px_rgba(100,255,218,0.4)] transition-all duration-300 group-hover:scale-110">
              S
            </div>
            <span className="text-sm font-bold text-[var(--color-text-primary)] hidden sm:block">
              siddhant.dev
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#hero" label="Home" active={activeSection === "hero"} />
            <NavLink href="#projects" label="Work" active={activeSection === "projects"} />
            <NavLink href="#achievements" label="Compete" active={activeSection === "achievements"} />
            <NavLink href="#stack" label="Stack" active={activeSection === "stack"} />
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="magnetic-btn px-5 py-2 bg-transparent border border-[var(--color-mint)] text-[var(--color-mint)] hover:bg-[var(--color-mint)]/10 text-xs font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(100,255,218,0.15)]"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-[2]">
        {/* ===== HERO — Keep text style, new colors ===== */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center px-8 lg:px-16 overflow-hidden">
          <ParticleField />
          <div className="absolute inset-0 z-[1] gradient-mesh pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[var(--color-void)] to-transparent z-[1] pointer-events-none" />

          <div className="relative z-10 max-w-[1400px] mx-auto w-full">
            <RevealOnScroll delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-panel)]/60 backdrop-blur-sm rounded-full mb-8 border border-[var(--color-line)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-mint)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-mint)]" />
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                  Available for work
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <h2 className="font-body text-[var(--color-text-secondary)] text-xl md:text-2xl font-light mb-4">
                Hi, I&apos;m{" "}
                <span className="text-gradient font-semibold">Siddhant Chouksey</span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--color-text-primary)] leading-[0.95] mb-4">
                <TextScramble text="I build things" delay={500} />
                <br />
                <TextScramble text="that " delay={800} />
                <span className="text-gradient-mint italic">
                  <TextScramble text="scale" delay={1100} />
                </span>
                <span className="text-gradient-mint">.</span>
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div className="flex items-center gap-3 mb-12 font-label text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-mint)]">$</span>{" "}
                <Typewriter
                  texts={["Backend Architect", "Distributed Systems Engineer", "Competitive Programmer", "Full-Stack Developer"]}
                />
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={500}>
              <div className="flex flex-wrap gap-3">
                {Object.entries(DATA.contact.social)
                  .filter(([_, social]) => social.navbar)
                  .map(([name, social]) => (
                    <Link
                      key={name}
                      href={social.url}
                      target="_blank"
                      className="magnetic-btn group p-3.5 bg-[var(--color-panel)]/60 backdrop-blur-sm hover:bg-[var(--color-panel-hover)] border border-[var(--color-line)] hover:border-[var(--color-mint)]/30 rounded-xl transition-all duration-400 hover:scale-110 hover:shadow-[0_0_20px_rgba(100,255,218,0.1)]"
                    >
                      <social.icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-mint)] transition-colors duration-300" />
                      <span className="sr-only">{name}</span>
                    </Link>
                  ))}
              </div>
            </RevealOnScroll>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
            <span className="text-[var(--color-text-muted)] text-[10px] font-label uppercase tracking-widest animate-pulse">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-[var(--color-line)] flex justify-center pt-1">
              <div className="w-1 h-2 bg-[var(--color-mint)] rounded-full animate-bounce" />
            </div>
          </div>
        </section>

        {/* ===== PROJECTS — Bento Grid Layout ===== */}
        <section id="projects" className="px-8 lg:px-16 py-32 relative">
          <div className="max-w-[1400px] mx-auto">
            <RevealOnScroll>
              <div className="mb-20">
                <p className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--color-mint)] mb-3">
                  Selected Work
                </p>
                <h2 className="font-headline text-4xl md:text-6xl font-bold text-[var(--color-text-primary)]">
                  <TextScramble text="Projects" delay={0} />
                </h2>
              </div>
            </RevealOnScroll>

            {/* Asymmetric Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-[270px] md:auto-rows-[290px]">
              {DATA.projects.map((project, idx) => {
                // Featured first card for stronger visual hierarchy.
                const isFeatured = idx === 0;
                const spanClass =
                  isFeatured
                    ? "md:col-span-2 lg:col-span-4 lg:row-span-2"
                    : idx === 1
                      ? "lg:col-span-2"
                      : idx === 2
                        ? "lg:col-span-2"
                        : "lg:col-span-2";

                return (
                  <RevealOnScroll key={project.title} delay={idx * 100} direction="scale" className={spanClass}>
                    <TiltCard className="h-full" intensity={6}>
                      <div className="bento-card h-full shimmer-sweep group relative overflow-hidden">
                        <div className="project-shell h-full">
                          <div className={`project-preview ${isFeatured ? "project-preview-featured" : "project-preview-compact"}`}>
                            {project.isBackend ? (
                              <div className="project-terminal-bg h-full p-4 md:p-5 pt-8 md:pt-10 flex flex-col justify-end relative">
                                <div className="absolute top-3 left-3 flex gap-1.5 opacity-60">
                                  <div className="w-2 h-2 rounded-full bg-red-500" />
                                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                </div>
                                <pre className="font-mono text-[10px] leading-relaxed text-[#64ffda] opacity-90">
                                  <code>
                                    {`> npm run start:stream\n\n[OK] TCP listening on :8080\n[OK] MongoDB Cluster Connected\n[INFO] WSS ready at /stream`}
                                  </code>
                                </pre>
                                <div className="absolute inset-0 project-shot-mask pointer-events-none" />
                              </div>
                            ) : project.image ? (
                              <div className="relative h-full w-full">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className={`project-shot ${isFeatured ? "object-cover object-center" : "object-cover object-top"}`}
                                />
                                <div className="absolute inset-0 project-shot-mask" />
                              </div>
                            ) : (
                              <div className="h-full w-full bg-gradient-to-br from-[var(--color-panel)] to-[var(--color-void)]" />
                            )}
                          </div>

                          <div
                            className={`project-meta-panel border-t border-[var(--color-line)]/70 flex flex-col justify-between ${
                              isFeatured ? "p-4 md:p-5 flex-1" : "project-meta-panel-compact p-3.5 md:p-4"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--color-mint)]">
                                {project.category}
                              </span>
                              <span className="font-label text-[9px] uppercase tracking-wider text-[var(--color-text-muted)] px-2 py-0.5 bg-[var(--color-void)]/40 rounded-full border border-[var(--color-line)]/60">
                                {project.active ? "Live" : "Archive"}
                              </span>
                            </div>

                            <div>
                              <h3 className={`font-headline font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-mint)] transition-colors duration-300 ${isFeatured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}>
                                {project.title}
                              </h3>
                              <p
                                className={`font-body text-[12px] md:text-[13px] text-[var(--color-text-secondary)] leading-relaxed ${
                                  isFeatured ? "line-clamp-2 mb-4" : "line-clamp-2 mb-3"
                                }`}
                              >
                                {project.description}
                              </p>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <div className="flex gap-1.5 flex-wrap">
                                {project.technologies.slice(0, isFeatured ? 3 : 2).map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-2 py-0.5 text-[8px] font-label uppercase tracking-wider bg-[var(--color-mint-dim)] text-[var(--color-mint)] rounded-full border border-[var(--color-mint)]/25"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                {project.links.map((link) => (
                                  <Link
                                    key={link.type}
                                    href={link.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="magnetic-btn p-1.5 rounded-md bg-[var(--color-void)]/40 border border-[var(--color-line)]/60 text-[var(--color-text-muted)] hover:text-[var(--color-mint)] hover:border-[var(--color-mint)]/40 transition-colors duration-300"
                                  >
                                    {typeof link.icon === "function" ? (
                                      <link.icon className="w-4 h-4" />
                                    ) : (
                                      link.icon
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== ACHIEVEMENTS — Horizontal Cards ===== */}
        <section id="achievements" className="px-8 lg:px-16 py-32 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-mint)]/[0.02] rounded-full blur-[150px]" />
            <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[var(--color-amber)]/[0.02] rounded-full blur-[120px]" />
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <RevealOnScroll>
              <div className="flex items-end justify-between mb-16">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-amber-400 mb-3">
                    Competitive Programming
                  </p>
                  <h2 className="font-headline text-4xl md:text-6xl font-bold text-[var(--color-text-primary)]">
                    <TextScramble text="Achievements" delay={0} />
                  </h2>
                </div>
                <p className="hidden md:block text-[var(--color-text-muted)] text-sm max-w-xs text-right leading-relaxed">
                  Consistent performer across major platforms and international contests.
                </p>
              </div>
            </RevealOnScroll>

            {/* Stacked achievement rows */}
            <div className="space-y-5">
              {DATA.achievements.map((achievement, idx) => {
                const colors = colorMap[achievement.color] || colorMap.cyan;
                const progressValues: Record<string, number> = { LeetCode: 97, Codeforces: 72, "ACM ICPC": 85, "IEEE IICPC": 68 };
                const progress = progressValues[achievement.platform] || 70;
                const primaryLink = achievement.certificateUrl || achievement.profileUrl;

                return (
                  <RevealOnScroll key={idx} delay={idx * 100} direction={idx % 2 === 0 ? "left" : "right"}>
                    <TiltCard intensity={4}>
                      <SpotlightCard
                        className={`achievement-card holo-card rounded-2xl group ${colors.glow} ${primaryLink ? "cursor-pointer" : ""}`}
                        onClick={(e) => {
                          if (!primaryLink) return;
                          if ((e.target as HTMLElement).closest("a")) return;
                          window.open(primaryLink, "_blank", "noopener,noreferrer");
                        }}
                        onKeyDown={(e) => {
                          if (!primaryLink) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            window.open(primaryLink, "_blank", "noopener,noreferrer");
                          }
                        }}
                        role={primaryLink ? "link" : undefined}
                        tabIndex={primaryLink ? 0 : -1}
                        aria-label={primaryLink ? `Open ${achievement.platform} achievement` : undefined}
                      >
                        <div className="flex items-center gap-6 p-7">
                          {/* Number */}
                          <div className="hidden sm:flex items-center justify-center w-12 text-[var(--color-line)] font-headline text-3xl font-black select-none">
                            0{idx + 1}
                          </div>

                          {/* Divider */}
                          <div className="hidden sm:block w-px h-16 bg-[var(--color-line)]" />

                          {/* Progress Ring + Icon */}
                          <div className="relative flex-shrink-0">
                            <ProgressRing progress={progress} colorClass={colors.ring} size={52} />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg
                                className={`w-4.5 h-4.5 ${colors.text} group-hover:scale-125 transition-transform duration-500`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                                width={18}
                                height={18}
                              >
                                {achievementIcons[achievement.color]}
                              </svg>
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                                {achievement.platform}
                              </span>
                            </div>
                            <h3 className="font-headline text-lg md:text-xl font-bold text-[var(--color-text-primary)]">
                              {achievement.title}
                            </h3>
                          </div>

                          {/* Stat */}
                          <div className="hidden md:block text-right">
                            <p className={`text-lg font-bold number-ticker ${colors.text}`}>
                              {achievement.stat}
                            </p>
                            <p className="text-[11px] text-[var(--color-text-muted)] mt-0.5">
                              {achievement.description}
                            </p>
                          </div>

                          {/* Links */}
                          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-[var(--color-line)]/50">
                            {achievement.profileUrl && (
                              <Link
                                href={achievement.profileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-[10px] font-label uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-mint)] transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                                Profile
                              </Link>
                            )}
                            {achievement.certificateUrl && (
                              <Link
                                href={achievement.certificateUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-[10px] font-label uppercase tracking-wider text-[var(--color-text-muted)] hover:text-[var(--color-mint)] transition-colors"
                              >
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                Cert
                              </Link>
                            )}
                            {!achievement.profileUrl && !achievement.certificateUrl && (
                              <span className="text-[10px] font-label text-[var(--color-text-muted)]/40 italic">Soon</span>
                            )}
                          </div>

                          {/* Arrow */}
                          <svg
                            className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-mint)] group-hover:translate-x-1 transition-all duration-300"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </div>
                      </SpotlightCard>
                    </TiltCard>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== STACK — Interactive Orbs + Quote ===== */}
        <section id="stack" className="px-8 lg:px-16 py-32 relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
              {/* Skills — 3 cols */}
              <div className="lg:col-span-3">
                <RevealOnScroll>
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-[var(--color-mint)] mb-3">
                    Technologies
                  </p>
                  <h2 className="font-headline text-4xl md:text-6xl font-bold text-[var(--color-text-primary)] mb-12">
                    <TextScramble text="The Stack" delay={0} />
                  </h2>
                </RevealOnScroll>

                <div className="flex flex-wrap gap-3">
                  {DATA.skills.map((skill, i) => (
                    <RevealOnScroll key={skill} delay={i * 40} direction="scale">
                      <span className="skill-orb px-5 py-2.5 bg-[var(--color-panel)] border border-[var(--color-line)] rounded-full font-label text-xs text-[var(--color-text-secondary)] cursor-default inline-block">
                        {skill}
                      </span>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              {/* Philosophy — 2 cols */}
              <div className="lg:col-span-2 flex flex-col justify-center">
                <RevealOnScroll direction="right">
                  <div className="relative p-10 bg-[var(--color-panel)]/40 backdrop-blur-sm rounded-2xl border border-[var(--color-line)]">
                    <div className="absolute -top-4 -left-2 w-8 h-8 bg-[var(--color-mint)]/10 rounded-lg flex items-center justify-center border border-[var(--color-mint)]/20">
                      <svg className="w-4 h-4 text-[var(--color-mint)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                    </div>
                    <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] italic leading-relaxed">
                      Specializing in{" "}
                      <span className="text-[var(--color-mint)] font-medium not-italic">
                        low-latency distributed systems
                      </span>{" "}
                      and{" "}
                      <span className="text-amber-400 font-medium not-italic">
                        robust API architectures
                      </span>
                      . I focus on code efficiency and mechanical sympathy.
                    </p>
                    <div className="mt-8 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-mint)] to-teal-600 flex items-center justify-center text-[var(--color-void)] font-bold text-sm">
                        SC
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                          Siddhant Chouksey
                        </div>
                        <div className="text-xs text-[var(--color-text-muted)] font-label">
                          Backend Engineer
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="relative border-t border-[var(--color-line)]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-mint)]/40 to-transparent" />
        <div className="px-8 lg:px-16 py-16 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-mint)] to-teal-600 flex items-center justify-center text-[var(--color-void)] text-xs font-bold">
                S
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--color-text-primary)]">siddhant.dev</div>
                <div className="font-label text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest">
                  &copy; 2025 &middot; Built with precision
                </div>
              </div>
            </div>
            <div className="flex gap-6">
              {Object.entries(DATA.contact.social)
                .filter(([_, social]) => social.navbar)
                .map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    className="hover-line font-label text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-[var(--color-mint)] transition-colors duration-300 py-1"
                  >
                    {name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

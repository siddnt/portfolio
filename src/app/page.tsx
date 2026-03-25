"use client";

import {
  MouseGlow,
  Typewriter,
  AnimatedCounter,
  SpotlightCard,
  TiltCard,
  RevealOnScroll,
} from "@/components/creative-effects";
import { ThemeToggle } from "@/components/theme-toggle";
import { DATA } from "@/data/resume";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// ===== Nav link =====
function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="hover-line font-sans tracking-tight uppercase text-[11px] font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors duration-300 py-1"
    >
      {label}
    </Link>
  );
}

// ===== Color mapping for achievements =====
const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  amber: {
    bg: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    text: "text-amber-500 dark:text-amber-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
  },
  cyan: {
    bg: "from-cyan-500/20 to-blue-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-600 dark:text-cyan-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
  },
  violet: {
    bg: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    text: "text-violet-600 dark:text-violet-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
  },
  magenta: {
    bg: "from-pink-500/20 to-rose-500/10",
    border: "border-pink-500/20",
    text: "text-pink-600 dark:text-pink-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]",
  },
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="noise">
      <MouseGlow />

      {/* ===== NAVBAR ===== */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-[var(--color-void)]/80 backdrop-blur-2xl border-b border-[var(--color-line)] shadow-sm"
          : "bg-transparent"
          }`}
      >
        <div className="flex justify-between items-center px-8 lg:px-16 h-16 max-w-[1400px] mx-auto">
          <Link href="#hero" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold group-hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] transition-shadow duration-300">
              S
            </div>
            <span className="text-sm font-bold text-[var(--color-text-primary)] hidden sm:block">
              siddhant.dev
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="#hero" label="Home" />
            <NavLink href="#projects" label="Work" />
            <NavLink href="#achievements" label="Achievements" />
            <NavLink href="#stack" label="Stack" />
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="magnetic-btn px-4 py-2 bg-gradient-to-r from-violet-500 to-pink-500 hover:from-violet-600 hover:to-pink-600 text-white text-xs font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(139,92,246,0.4)]"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-[2]">
        {/* ===== HERO ===== */}
        <section
          id="hero"
          className="relative min-h-screen flex flex-col justify-center px-8 lg:px-16 overflow-hidden gradient-mesh"
        >
          {/* Floating Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-[120px] animate-float" />
            <div
              className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-pink-500/8 rounded-full blur-[150px] animate-float"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute top-1/2 right-1/6 w-48 h-48 bg-cyan-500/8 rounded-full blur-[100px] animate-float"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="relative z-10 max-w-[1400px] mx-auto w-full">
            <RevealOnScroll delay={0}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--color-panel)]/60 backdrop-blur-sm rounded-full mb-8 border border-[var(--color-line)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                <span className="font-label text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                  Available for work
                </span>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={100}>
              <h2 className="font-body text-[var(--color-text-secondary)] text-xl md:text-2xl font-light mb-4">
                Hi, I&apos;m{" "}
                <span className="text-gradient font-semibold">
                  Siddhant Chouksey
                </span>
              </h2>
            </RevealOnScroll>

            <RevealOnScroll delay={200}>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-[var(--color-text-primary)] leading-[0.95] mb-8 glitch-hover cursor-default">
                I build things
                <br />
                that{" "}
                <span className="text-gradient-violet italic">scale</span>.
              </h1>
            </RevealOnScroll>

            <RevealOnScroll delay={400}>
              <div className="flex items-center gap-3 mb-12 font-label text-sm text-[var(--color-text-secondary)]">
                <span className="text-violet-500">$</span>{" "}
                <Typewriter
                  texts={[
                    "Backend Architect",
                    "Distributed Systems Engineer",
                    "Competitive Programmer",
                    "Full-Stack Developer",
                  ]}
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
                      className="magnetic-btn group p-3.5 bg-[var(--color-panel)] hover:bg-[var(--color-panel-hover)] border border-[var(--color-line)] hover:border-violet-500/30 rounded-xl transition-all duration-400"
                    >
                      <social.icon className="w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-violet-500 transition-colors duration-300" />
                      <span className="sr-only">{name}</span>
                    </Link>
                  ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <span className="text-[var(--color-text-muted)] text-[10px] font-label uppercase tracking-widest">
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-violet-500/50 to-transparent" />
          </div>
        </section>

        {/* ===== PROJECTS ===== */}
        <section id="projects" className="px-8 lg:px-16 py-32 relative">
          <div className="max-w-[1400px] mx-auto">
            <RevealOnScroll>
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-4">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-violet-500 mb-3">
                    Selected Work
                  </p>
                  <h2 className="font-headline text-4xl md:text-5xl font-bold text-[var(--color-text-primary)]">
                    Projects
                  </h2>
                </div>
                <p className="font-label text-xs text-[var(--color-text-muted)]">
                  0{DATA.projects.length} / Featured
                </p>
              </div>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {DATA.projects.map((project, idx) => (
                <RevealOnScroll
                  key={project.title}
                  delay={idx * 150}
                  direction={idx % 2 === 0 ? "up" : "scale"}
                >
                  <TiltCard className="h-full" intensity={6}>
                    <SpotlightCard className="holo-card rounded-2xl overflow-hidden h-full flex flex-col group">
                      {/* Image / Terminal Area */}
                      {project.isBackend ? (
                        <div className="h-52 relative overflow-hidden bg-[var(--color-void)] p-6 flex items-center">
                          <div className="w-full">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-3 h-3 rounded-full bg-red-500/60" />
                              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                              <div className="w-3 h-3 rounded-full bg-green-500/60" />
                              <span className="ml-2 font-label text-[9px] text-[var(--color-text-muted)] uppercase">
                                api_gateway.js
                              </span>
                            </div>
                            <pre className="font-label text-[11px] leading-relaxed">
                              <code>
                                <span className="text-violet-500">const</span>{" "}
                                <span className="text-cyan-500">stream</span>{" "}
                                <span className="text-[var(--color-text-muted)]">=</span>{" "}
                                <span className="text-pink-500">await</span>{" "}
                                <span className="text-[var(--color-text-primary)]">connect</span>
                                {"({"}
                                {"\n"}
                                {"  "}
                                <span className="text-[var(--color-text-secondary)]">node</span>:{" "}
                                <span className="text-green-400">&quot;0x4F2A&quot;</span>,{"\n"}
                                {"  "}
                                <span className="text-[var(--color-text-secondary)]">latency</span>:{" "}
                                <span className="text-cyan-500">14</span>,{"\n"}
                                {"  "}
                                <span className="text-[var(--color-text-secondary)]">status</span>:{" "}
                                <span className="text-green-400">&quot;SYNC&quot;</span>{"\n"}
                                {"});"}
                              </code>
                            </pre>
                          </div>
                        </div>
                      ) : (
                        <div className="h-52 relative overflow-hidden bg-[var(--color-panel)]">
                          {project.image && (
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-void)] via-[var(--color-void)]/30 to-transparent" />
                          <div className="absolute top-4 left-4 px-2.5 py-1 bg-[var(--color-void)]/70 backdrop-blur-sm rounded-full">
                            <span className="font-label text-[9px] uppercase tracking-widest text-violet-500">
                              {project.category}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-7 flex-1 flex flex-col">
                        {project.isBackend && (
                          <div className="font-label text-[9px] text-violet-500 uppercase tracking-widest mb-2">
                            {project.category}
                          </div>
                        )}
                        <h3 className="font-headline text-xl font-bold text-[var(--color-text-primary)] mb-3">
                          {project.title}
                        </h3>
                        <p className="font-body text-[13px] text-[var(--color-text-secondary)] mb-6 leading-relaxed flex-1">
                          {project.description}
                        </p>

                        {/* Tech pills (show on hover) */}
                        <div className="flex flex-wrap gap-1.5 mb-5 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500 ease-out">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 bg-violet-500/10 rounded text-[9px] font-label text-violet-600 dark:text-violet-400"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-[var(--color-line)]/50">
                          {project.links.map((link) => (
                            <Link
                              key={link.type}
                              href={link.href}
                              className="magnetic-btn flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-violet-500 text-xs font-label transition-colors duration-300"
                            >
                              {typeof link.icon === 'function' ? <link.icon className="w-3.5 h-3.5" /> : link.icon}
                              <span className="text-[10px] uppercase tracking-wider">
                                {link.type}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </SpotlightCard>
                  </TiltCard>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ACHIEVEMENTS ===== */}
        <section id="achievements" className="px-8 lg:px-16 py-32 relative">
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[200px]" />
          </div>

          <div className="max-w-[1400px] mx-auto relative z-10">
            <RevealOnScroll>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-pink-500 mb-3">
                Competitive Programming
              </p>
              <h2 className="font-headline text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-6">
                Achievements
              </h2>
              <p className="text-[var(--color-text-secondary)] text-sm max-w-lg mb-16 leading-relaxed">
                Consistent performer across major competitive programming platforms
                and international contests.
              </p>
            </RevealOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {DATA.achievements.map((achievement, idx) => {
                const colors = colorMap[achievement.color] || colorMap.violet;
                return (
                  <RevealOnScroll key={idx} delay={idx * 120} direction="scale">
                    <TiltCard intensity={5}>
                      <SpotlightCard className="achievement-card holo-card rounded-2xl p-8 group">
                        <div className="flex items-start gap-5">
                          {/* Icon */}
                          <div
                            className={`w-14 h-14 flex-shrink-0 rounded-2xl bg-gradient-to-br ${colors.bg} ${colors.border} border flex items-center justify-center group-hover:scale-110 ${colors.glow} transition-all duration-500`}
                          >
                            <svg
                              className={`w-6 h-6 ${colors.text}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={1.5}
                            >
                              {achievement.color === "amber" && (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                              )}
                              {achievement.color === "cyan" && (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                              )}
                              {achievement.color === "violet" && (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.388V2.721" />
                              )}
                              {achievement.color === "magenta" && (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                              )}
                            </svg>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-label text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
                                {achievement.platform}
                              </span>
                            </div>
                            <h3 className="font-headline text-xl font-bold text-[var(--color-text-primary)] mb-1.5">
                              {achievement.title}
                            </h3>
                            <p className={`text-sm font-semibold ${colors.text} mb-2`}>
                              {achievement.stat}
                            </p>
                            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                              {achievement.description}
                            </p>

                            {/* Certificate/Profile links - shown on hover */}
                            <div className="cert-link flex gap-3 mt-3 pt-3 border-t border-[var(--color-line)]/50">
                              {achievement.profileUrl && (
                                <Link
                                  href={achievement.profileUrl}
                                  target="_blank"
                                  className="flex items-center gap-1.5 text-[10px] font-label uppercase tracking-wider text-[var(--color-text-muted)] hover:text-violet-500 transition-colors"
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
                                  className="flex items-center gap-1.5 text-[10px] font-label uppercase tracking-wider text-[var(--color-text-muted)] hover:text-violet-500 transition-colors"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                  </svg>
                                  Certificate
                                </Link>
                              )}
                              {!achievement.profileUrl && !achievement.certificateUrl && (
                                <span className="text-[10px] font-label text-[var(--color-text-muted)]/50 italic">
                                  Links coming soon
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </SpotlightCard>
                    </TiltCard>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== STACK ===== */}
        <section id="stack" className="px-8 lg:px-16 py-32 relative">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Skills */}
              <div>
                <RevealOnScroll>
                  <p className="font-label text-[10px] uppercase tracking-[0.3em] text-cyan-500 mb-3">
                    Technologies
                  </p>
                  <h2 className="font-headline text-4xl md:text-5xl font-bold text-[var(--color-text-primary)] mb-12">
                    The Stack
                  </h2>
                </RevealOnScroll>

                <div className="flex flex-wrap gap-3">
                  {DATA.skills.map((skill, i) => (
                    <RevealOnScroll key={skill} delay={i * 50} direction="scale">
                      <span className="skill-orb px-5 py-2.5 bg-[var(--color-panel)] border border-[var(--color-line)] rounded-full font-label text-xs text-[var(--color-text-secondary)] cursor-default inline-block">
                        {skill}
                      </span>
                    </RevealOnScroll>
                  ))}
                </div>
              </div>

              {/* Philosophy Quote */}
              <div className="flex flex-col justify-center">
                <RevealOnScroll direction="right">
                  <div className="relative p-10 bg-[var(--color-panel)]/40 backdrop-blur-sm rounded-2xl border border-[var(--color-line)]">
                    <span className="absolute -top-6 -left-2 text-8xl text-violet-500/10 font-serif leading-none select-none">
                      &ldquo;
                    </span>
                    <p className="font-body text-lg md:text-xl text-[var(--color-text-secondary)] italic leading-relaxed relative z-10">
                      Specializing in the development of{" "}
                      <span className="text-violet-600 dark:text-violet-400 font-medium not-italic">
                        low-latency distributed systems
                      </span>{" "}
                      and{" "}
                      <span className="text-pink-600 dark:text-pink-400 font-medium not-italic">
                        robust API architectures
                      </span>
                      . I focus on code efficiency and mechanical sympathy to
                      deliver world-class backend solutions.
                    </p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
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
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

        <div className="px-8 lg:px-16 py-16 max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--color-text-primary)]">
                  siddhant.dev
                </div>
                <div className="font-label text-[9px] text-[var(--color-text-muted)] uppercase tracking-widest">
                  © 2025 · Built with precision
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
                    className="hover-line font-label text-[10px] uppercase tracking-widest text-[var(--color-text-muted)] hover:text-violet-500 transition-colors duration-300 py-1"
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

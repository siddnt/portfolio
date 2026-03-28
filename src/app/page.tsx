"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { BrutalCursor } from "@/components/brutal-cursor";
import { useState } from "react";

const ParticleField = dynamic(
  () => import("@/components/three/particle-field").then((mod) => mod.ParticleField),
  { ssr: false }
);

const PROJECT_METRICS = [
  { left: "THROUGHPUT: 10k+ req/s", right: "LATENCY: <120ms" },
  { left: "AUTH FLOW: O(1)", right: "UPTIME: 99.9%" },
  { left: "WS GATEWAY: 10k", right: "PIPELINE: STABLE" },
  { left: "SCALE: HIGH", right: "OPS: OPTIMIZED" },
];

const ACHIEVEMENT_DATES = ["2026.02", "2025.11", "2025.09", "2025.08"];
const ACHIEVEMENT_ICONS = ["emoji_events", "star", "emoji_events", "military_tech"];



const STACK_MATRIX = {
  languages: { items: ["TypeScript", "Java", "C++", "JavaScript"], icon: "code" },
  databases: { items: ["PostgreSQL", "MongoDB", "Redis", "-"], icon: "database" },
  infrastructure: { items: ["Node.js", "Express", "Next.js", "-"], icon: "cloud" },
  tools: { items: ["Git", "GitHub", "Tailwind CSS", "Redux Toolkit"], icon: "build" },
};

export default function Page() {
  const social = DATA.contact.social;
  const [openProject, setOpenProject] = useState<number | null>(null);

  return (
    <div className="brutal-site min-h-screen">
      <BrutalCursor />
      <div className="brutal-three-layer" aria-hidden>
        <ParticleField />
      </div>

      <div className="brutal-content">
        {/* ===== NAV ===== */}
        <nav className="brutal-nav">
          <div className="brutal-nav-brand">{DATA.fullName}</div>
          <div className="brutal-nav-links">
            <a href="#projects">[WORK]</a>
            <a href="#achievements">[ACHIEVEMENTS]</a>
            <a href="#stack">[STACK]</a>
            <a href="#contact">[CONTACT]</a>
            <a href={DATA.contact.social.Resume.url} target="_blank" rel="noreferrer">[RESUME]</a>
          </div>
        </nav>

        {/* ===== HERO ===== */}
        <section id="hero" className="brutal-hero">
          <div className="brutal-status">
            <span className="brutal-dot" />
            AVAILABLE FOR HIRE
          </div>

          <h1 className="brutal-hero-title">I BUILD THINGS THAT SCALE</h1>

        </section>

        {/* ===== WORK / PROJECTS — full width, seamless ===== */}
        <section id="projects" className="brutal-section">
          <div className="brutal-work-layout">
            <aside className="brutal-work-side">
              <div className="brutal-work-side-inner">
                <h2 aria-hidden>Work</h2>
              </div>
            </aside>

            <div className="brutal-work-main">
              <div className="brutal-work-head">
                <span>SYSTEM DESIGNATION</span>
                <span>CORE METRICS</span>
                <span>TECH STACK</span>
              </div>

              <div className="brutal-work-rows">
                {DATA.projects.map((project, idx) => {
                  const metrics =
                    PROJECT_METRICS[idx] ||
                    PROJECT_METRICS[PROJECT_METRICS.length - 1];
                  const isOpen = openProject === idx;

                  return (
                    <div key={project.title}>
                      <div
                        className="brutal-project-row"
                        onClick={() => setOpenProject(isOpen ? null : idx)}
                      >
                        <div className="brutal-project-title">
                          <span className="brutal-plus">
                            {isOpen ? "−" : "+"}
                          </span>
                          <span>{project.title}</span>
                        </div>
                        <div className="brutal-project-metrics">
                          <span>{metrics.left}</span>
                          <span>{metrics.right}</span>
                        </div>
                        <div className="brutal-tech-tags">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech}>{tech}</span>
                          ))}
                        </div>
                      </div>

                      {isOpen && (
                        <div className="brutal-project-detail">
                          <div className="brutal-detail-summary">
                            <h4>Architecture Summary</h4>
                            <p>{project.description}</p>
                          </div>
                          <div className="brutal-detail-actions">
                            {project.links.map((link) => (
                              <a
                                key={link.type}
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                className={`btn-brutal ${link.type.includes("Live") ||
                                  link.type.includes("Demo")
                                  ? "btn-brutal-dark"
                                  : "btn-brutal-light"
                                  }`}
                              >
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: 18 }}
                                >
                                  {link.type.includes("GitHub")
                                    ? "code"
                                    : link.type.includes("API")
                                      ? "description"
                                      : "rocket_launch"}
                                </span>
                                {link.type}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="brutal-work-foot">
                <a href={DATA.contact.social.GitHub.url} target="_blank" rel="noreferrer">
                  VIEW FULL ARCHIVE ON GITHUB →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===== COMPETE — full width ===== */}
        <section
          id="achievements"
          className="brutal-section brutal-compete-wrap"
        >
          <div className="brutal-compete-inner">
            <header className="brutal-compete-head">
              <h2>Achievements</h2>
            </header>

            <div className="brutal-ledger">
              <div className="brutal-ledger-head">
                <span>DATE</span>
                <span>EVENT</span>
                <span>RANK</span>
                <span>IMPACT</span>
              </div>

              {DATA.achievements.map((achievement, idx) => {
                const isHighlight = idx < 2;
                const iconName = ACHIEVEMENT_ICONS[idx] || "emoji_events";

                return (
                  <div
                    key={achievement.platform + achievement.title}
                    className="brutal-ledger-row"
                  >
                    <span className="brutal-muted">
                      {ACHIEVEMENT_DATES[idx] || "2025.01"}
                    </span>
                    <span className="brutal-event">{achievement.platform}</span>
                    <span>
                      {isHighlight ? (
                        <span className="brutal-rank-badge">
                          <span
                            className="material-symbols-outlined"
                            style={{
                              fontVariationSettings: "'FILL' 1",
                              fontSize: 16,
                            }}
                          >
                            {iconName}
                          </span>
                          {achievement.title}
                        </span>
                      ) : (
                        <span className="brutal-rank-plain">
                          {achievement.title}
                        </span>
                      )}
                    </span>
                    <span>{achievement.description}</span>
                  </div>
                );
              })}
            </div>

            <div className="brutal-status-line">
              <span>
                STATUS: <strong>ONLINE</strong>
              </span>
              <span>
                <i /> SYS_READY
              </span>
            </div>
          </div>
        </section>

        {/* ===== STACK — full width ===== */}
        <section id="stack" className="brutal-section brutal-stack-wrap">
          <div className="brutal-stack-inner-wrap">
            <div className="brutal-stack-head">
              <h2>Stack</h2>
              <span>SYSTEM MANIFEST V2.4</span>
            </div>

            <div className="brutal-stack-grid">
              <div className="brutal-stack-inner">
                {Object.entries(STACK_MATRIX).map(([key, { items, icon }]) => (
                  <div key={key} className="brutal-stack-col">
                    <div className="brutal-stack-col-head">
                      <span>
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </span>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 0" }}
                      >
                        {icon}
                      </span>
                    </div>
                    {items.map((item, i) => (
                      <div
                        key={item + i}
                        className={`brutal-stack-cell ${item === "-" ? "brutal-stack-cell-empty" : ""
                          }`}
                      >
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="brutal-stack-status">
              <div className="brutal-stack-status-inner">
                <div className="brutal-stack-status-dot" />
                <span className="brutal-stack-status-text">
                  ALL SYSTEMS NOMINAL
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT — full width, no floating box ===== */}
        <section id="contact" className="brutal-contact-section">
          <div className="brutal-contact-box">
            <div className="brutal-contact-grid" />

            <div className="brutal-contact-main">
              <h2>
                SYSTEM
                <br />
                READY.
              </h2>

              <a
                href={`mailto:${DATA.contact.email}`}
                className="brutal-contact-cta"
              >
                <span>INITIATE CONTACT</span>
                <span
                  className="material-symbols-outlined"
                  style={{ fontWeight: 700, fontSize: 28 }}
                >
                  terminal
                </span>
              </a>
            </div>

            <footer className="brutal-contact-foot">
              <span>© {DATA.fullName}</span>
              <div className="brutal-contact-foot-links">
                {Object.entries(social)
                  .filter(([name, info]) => ["GitHub", "LinkedIn", "LeetCode", "Codeforces"].includes(name) && info.url)
                  .map(([name, info]) => (
                    <a
                      key={name}
                      href={info.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={name}
                      className="brutal-social-icon-btn"
                    >
                      <info.icon className="brutal-social-svg" />
                    </a>
                  ))}
              </div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  );
}

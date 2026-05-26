"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─── Animation ──────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      style={{
        borderBottom: scrolled ? "1px solid #1A1A1A" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        backgroundColor: scrolled ? "rgba(0,0,0,0.88)" : "transparent",
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between">
        <a
          href="#hero"
          className="text-[16px] tracking-[-0.03em]"
          style={{ color: "#CCCCCC", fontWeight: 800 }}
        >
          Solvr.
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {[["Work","#hero"],["Services","#services"],["About","#how"],["Contact","#footer"]].map(([l,h]) => (
            <a
              key={l} href={h}
              className="text-[13px] transition-colors duration-150"
              style={{ color: "#888888" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#CCCCCC")}
              onMouseLeave={e => (e.currentTarget.style.color = "#888888")}
            >{l}</a>
          ))}
        </div>

        <a
          href="#footer"
          className="text-[13px] font-medium px-4 py-1.5 rounded-full transition-all duration-150 cursor-pointer whitespace-nowrap"
          style={{ border: "1px solid #1A1A1A", color: "#888888" }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = "#CCCCCC";
            (e.currentTarget as HTMLElement).style.borderColor = "#444444";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = "#888888";
            (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
          }}
        >
          Let&apos;s talk →
        </a>
      </div>
    </nav>
  );
}

/* ─── Hero ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 pt-28 sm:pt-32 pb-8"
      style={{ borderBottom: "1px solid #1A1A1A" }}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-1 justify-center py-8">
        <FadeUp>
          <p
            className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase mb-8 sm:mb-10 leading-relaxed"
            style={{ color: "#444444" }}
          >
            ● Digital Solutions Studio&nbsp;&nbsp;/&nbsp;&nbsp;BCN · NYC&nbsp;&nbsp;/&nbsp;&nbsp;EST. 2017
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1
            className="font-black leading-[0.95] mb-6 sm:mb-8"
            style={{
              color: "#CCCCCC",
              fontSize: "clamp(42px, 10vw, 100px)",
              letterSpacing: "-0.045em",
              fontWeight: 800,
            }}
          >
            We don&apos;t sell<br />technology.<br />We solve<br className="sm:hidden" /> problems.
          </h1>
        </FadeUp>

        <FadeUp delay={0.14}>
          <p
            className="text-[15px] sm:text-[18px] leading-relaxed mb-8 sm:mb-10 max-w-md"
            style={{ color: "#888888" }}
          >
            We identify the real problem in your business and build the exact solution — AI, software, or whatever it takes.
          </p>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#footer"
              className="text-[14px] font-semibold px-6 py-3 rounded-full transition-colors duration-150 cursor-pointer text-center"
              style={{ backgroundColor: "#FFFFFF", color: "#000000" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#E0E0E0")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
            >
              Let&apos;s talk →
            </a>
            <a
              href="#services"
              className="text-[14px] font-medium px-6 py-3 rounded-full transition-all duration-150 cursor-pointer text-center"
              style={{ border: "1px solid #1A1A1A", color: "#888888" }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#CCCCCC";
                (e.currentTarget as HTMLElement).style.borderColor = "#444444";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "#888888";
                (e.currentTarget as HTMLElement).style.borderColor = "#1A1A1A";
              }}
            >
              What we do ↓
            </a>
          </div>
        </FadeUp>
      </div>

      <div className="max-w-7xl mx-auto w-full flex items-center justify-between pt-6">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: "#444444" }}>
          Scroll ———————
        </p>
        <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: "#444444" }}>
          01 / 05
        </p>
      </div>
    </section>
  );
}

/* ─── Services ────────────────────────────────────────────────── */
const services = [
  {
    num: "01",
    title: "AI & Automation",
    desc: "We build intelligent systems that work — not demos that impress, but agents that ship.",
    caps: ["Custom LLM agents","Workflow automation","RAG & retrieval","Internal copilots","Fine-tuned models"],
  },
  {
    num: "02",
    title: "Software Development",
    desc: "From zero to production. Full-stack, fast, clean. No bloat, no hand-holding required.",
    caps: ["Web & mobile apps","API design","Internal dashboards","Data pipelines","Legacy modernization"],
  },
  {
    num: "03",
    title: "Digital Strategy",
    desc: "The right answer before the wrong build. We think before we code.",
    caps: ["Problem discovery","Solution architecture","Build vs. buy","Roadmapping","Technical due diligence"],
  },
];

function Services() {
  return (
    <section id="services" className="px-5 sm:px-8 py-20 sm:py-28 lg:py-32" style={{ borderBottom: "1px solid #1A1A1A" }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase mb-12 sm:mb-16" style={{ color: "#444444" }}>
            (02) Services
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <FadeUp>
            <h2
              className="font-black leading-tight"
              style={{ color: "#CCCCCC", fontWeight: 800, fontSize: "clamp(22px, 5vw, 36px)", letterSpacing: "-0.03em" }}
            >
              Three disciplines.<br />One operating model.
            </h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "#888888" }}>
              We don&apos;t split into silos. Every engagement draws from AI, engineering, and strategy simultaneously. One team, one brief, one output.
            </p>
          </FadeUp>
        </div>

        {/* Cards — mobile: stack with bottom borders / desktop: 3 cols with right borders */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ border: "1px solid #1A1A1A" }}
        >
          {services.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.07}>
              <div
                className="p-6 sm:p-8 h-full flex flex-col transition-colors duration-200 cursor-default"
                style={{
                  borderBottom: i < 2 ? "1px solid #1A1A1A" : "none",
                }}
                /* On md+ override bottom border and add right border via JS — Tailwind can't do conditional inline */
                ref={el => {
                  if (!el) return;
                  const applyBorders = () => {
                    const isMd = window.innerWidth >= 768;
                    el.style.borderBottom = (!isMd && i < 2) ? "1px solid #1A1A1A" : "none";
                    el.style.borderRight = (isMd && i < 2) ? "1px solid #1A1A1A" : "none";
                  };
                  applyBorders();
                  window.addEventListener("resize", applyBorders);
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0A0A0A")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <p className="font-mono text-[11px] tracking-[0.18em] mb-5" style={{ color: "#444444" }}>{s.num}</p>
                <div className="h-px mb-5" style={{ backgroundColor: "#1A1A1A" }} />
                <h3 className="font-black text-[19px] sm:text-[20px] mb-3" style={{ color: "#CCCCCC", fontWeight: 800, letterSpacing: "-0.02em" }}>
                  {s.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-relaxed mb-5" style={{ color: "#888888" }}>
                  {s.desc}
                </p>
                <ul className="space-y-2 mb-7 flex-1">
                  {s.caps.map(c => (
                    <li key={c} className="text-[13px] flex items-center gap-2" style={{ color: "#444444" }}>
                      <span>·</span> {c}
                    </li>
                  ))}
                </ul>
                <a
                  href="#footer"
                  className="text-[13px] font-medium transition-colors duration-150 cursor-pointer"
                  style={{ color: "#444444" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#CCCCCC")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#444444")}
                >
                  Start here →
                </a>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How We Work ─────────────────────────────────────────────── */
const steps = [
  { num: "01", title: "We listen.", tag: "Discovery",   desc: "Before writing a single line of code, we spend time understanding the actual problem — not the one on the brief." },
  { num: "02", title: "We build.",  tag: "Engineering", desc: "Tight loops, direct communication, real deliverables every week. No overhead, no theatre." },
  { num: "03", title: "We deliver.",tag: "Handover",    desc: "Clean code, full docs, and a handover that actually works. You own it completely." },
];

function HowWeWork() {
  return (
    <section id="how" className="px-5 sm:px-8 py-20 sm:py-28 lg:py-32" style={{ borderBottom: "1px solid #1A1A1A" }}>
      <div className="max-w-7xl mx-auto">
        <FadeUp>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase mb-12 sm:mb-16" style={{ color: "#444444" }}>
            (03) How we work
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-20">
          <FadeUp>
            <h2
              className="font-black leading-tight"
              style={{ color: "#CCCCCC", fontWeight: 800, fontSize: "clamp(22px, 5vw, 36px)", letterSpacing: "-0.03em" }}
            >
              Three steps.<br />Nothing in between.
            </h2>
          </FadeUp>
          <FadeUp delay={0.06}>
            <p className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: "#888888" }}>
              Most agencies add complexity to justify the invoice. We remove it. Our process is built around speed, directness, and results that speak for themselves.
            </p>
          </FadeUp>
        </div>

        {/* Steps — mobile: stacked / desktop: 3 cols */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {steps.map((s, i) => (
            <FadeUp key={s.num} delay={i * 0.08}>
              <div
                className="py-8 sm:py-10 px-0"
                ref={el => {
                  if (!el) return;
                  const applyBorders = () => {
                    const isMd = window.innerWidth >= 768;
                    el.style.borderBottom = (!isMd && i < 2) ? "1px solid #1A1A1A" : "none";
                    el.style.borderRight  = (isMd && i < 2)  ? "1px solid #1A1A1A" : "none";
                    el.style.paddingLeft  = (isMd && i > 0)  ? "2.5rem" : "0";
                    el.style.paddingRight = isMd ? "2.5rem" : "0";
                  };
                  applyBorders();
                  window.addEventListener("resize", applyBorders);
                }}
              >
                <p
                  className="font-black leading-none mb-4"
                  style={{ color: "#CCCCCC", fontWeight: 800, fontSize: "clamp(48px,8vw,64px)", letterSpacing: "-0.04em" }}
                >
                  {s.num}
                </p>
                <p
                  className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 inline-block px-2 py-1"
                  style={{ color: "#444444", border: "1px solid #1A1A1A" }}
                >
                  {s.tag}
                </p>
                <h3
                  className="font-black text-[20px] sm:text-[22px] mb-3"
                  style={{ color: "#CCCCCC", fontWeight: 800, letterSpacing: "-0.03em" }}
                >
                  {s.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-relaxed" style={{ color: "#888888" }}>
                  {s.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>

        <FadeUp>
          <div
            className="py-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
            style={{ borderTop: "1px solid #1A1A1A" }}
          >
            {["Average engagement — 6 to 14 weeks", "Fixed scope", "One point of contact"].map((item, i) => (
              <p key={i} className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase sm:flex-1" style={{ color: "#444444" }}>
                {i > 0 && <span className="hidden sm:inline mr-4 ml-0" style={{ color: "#2a2a2a" }}>—</span>}
                {item}
              </p>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

/* ─── Footer ──────────────────────────────────────────────────── */
const footerCols = [
  {
    label: "Contact",
    items: [
      { text: "hola@solvr.com",    href: "mailto:hola@solvr.com" },
      { text: "+1 (212) 555-0180", href: "tel:+12125550180" },
    ],
  },
  {
    label: "Elsewhere",
    items: [
      { text: "LinkedIn →", href: "#" },
      { text: "Are.na →",   href: "#" },
    ],
  },
  {
    label: "Studio",
    items: [
      { text: "Barcelona / New York", href: null },
      { text: "Mon–Fri  9–18 CET",   href: null },
    ],
  },
  {
    label: "Brief",
    items: [
      { text: "Start a brief →", href: "mailto:hola@solvr.com" },
      { text: "Reply within 48h", href: null },
    ],
  },
];

function Footer() {
  return (
    <footer id="footer" className="px-5 sm:px-8 pt-16 sm:pt-24 pb-8 sm:pb-10">
      <div className="max-w-7xl mx-auto">

        {/* Wordmark */}
        <FadeUp>
          <p
            className="font-black leading-none"
            style={{
              color: "#CCCCCC",
              fontWeight: 800,
              fontSize: "clamp(64px, 18vw, 220px)",
              letterSpacing: "-0.055em",
              lineHeight: 1,
            }}
          >
            Solvr.
          </p>
        </FadeUp>

        {/* Grid */}
        <FadeUp delay={0.06}>
          <div
            className="mt-8 sm:mt-10 py-0"
            style={{ borderTop: "1px solid #1A1A1A", borderBottom: "1px solid #1A1A1A" }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4">
              {footerCols.map((col, i) => (
                <div
                  key={col.label}
                  className="py-7 sm:py-8"
                  ref={el => {
                    if (!el) return;
                    const applyBorders = () => {
                      const isMd = window.innerWidth >= 768;
                      // right border: col 0 always, col 2 always, col 1 only on desktop
                      if (isMd) {
                        el.style.borderRight = i < 3 ? "1px solid #1A1A1A" : "none";
                        el.style.paddingLeft = i > 0 ? "2rem" : "0";
                        el.style.paddingRight = i < 3 ? "2rem" : "0";
                        el.style.borderBottom = "none";
                      } else {
                        // 2-col mobile: right border on col 0,2; bottom border on row 1 (col 0,1)
                        el.style.borderRight  = (i % 2 === 0) ? "1px solid #1A1A1A" : "none";
                        el.style.borderBottom = i < 2 ? "1px solid #1A1A1A" : "none";
                        el.style.paddingLeft  = (i % 2 === 1) ? "1.25rem" : "0";
                        el.style.paddingRight = (i % 2 === 0) ? "1.25rem" : "0";
                      }
                    };
                    applyBorders();
                    window.addEventListener("resize", applyBorders);
                  }}
                >
                  <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-4 sm:mb-5" style={{ color: "#444444" }}>
                    {col.label}
                  </p>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item.text}>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-[13px] sm:text-[14px] transition-colors duration-150 cursor-pointer"
                            style={{ color: "#888888" }}
                            onMouseEnter={e => (e.currentTarget.style.color = "#CCCCCC")}
                            onMouseLeave={e => (e.currentTarget.style.color = "#888888")}
                          >
                            {item.text}
                          </a>
                        ) : (
                          <span className="text-[13px] sm:text-[14px]" style={{ color: "#888888" }}>{item.text}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Bottom bar */}
        <FadeUp delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 pt-5">
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em]" style={{ color: "#444444" }}>
              © 2026 Solvr Studio S.L. / All rights reserved.
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em]" style={{ color: "#444444" }}>
              Built in-house.
            </p>
          </div>
        </FadeUp>
      </div>
    </footer>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <Hero />
      <Services />
      <HowWeWork />
      <Footer />
    </div>
  );
}

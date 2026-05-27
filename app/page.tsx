"use client";

/*
 * Hallmark · genre: atmospheric · macrostructure: Bento Grid · theme: custom-dark + acid-green
 * nav: N5-floating-pill · footer: Ft5-statement
 * pre-emit critique: P5 H5 E5 S5 R5 V5
 * accent: oklch(93% 0.27 120) ≈ #CAFF00 · lang: es
 * fix: hero y-parallax removed (opacity-only, no bleed) · wave-acid on RESOLVEMOS
 */

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

// ── Tokens ────────────────────────────────────────────────────────────────
const C = {
  bg:       "#000000",
  paper2:   "#080808",
  headline: "#CCCCCC",
  body:     "#888888",
  muted:    "#444444",
  rule:     "#1A1A1A",
  accent:   "#CAFF00",
  accentDim:"#88BB00",
  accentFg: "#000000",
} as const;

// ── Primitives ────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.85, delay, ease: "easeOut" }}
    >{children}</motion.div>
  );
}

function SlideIn({ children, delay = 0, from = "left", className = "" }: {
  children: React.ReactNode; delay?: number; from?: "left" | "right"; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const x = from === "left" ? -68 : 68;
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >{children}</motion.div>
  );
}

function ScaleIn({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >{children}</motion.div>
  );
}

// WaveWord — color animado letra a letra con animationDelay inline
function WaveWord({ text }: { text: string }) {
  return (
    <span className="inline-block">
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="wave-letter"
          style={{ animationDelay: `${i * 0.09}s` }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}

// ── Nav — N5 floating pill ────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      className="fixed top-5 left-0 right-0 z-50 flex justify-center px-5"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
    >
      <div
        className="flex items-center gap-1 px-2 h-11 rounded-full transition-all duration-300"
        style={{
          border: `1px solid ${C.rule}`,
          backdropFilter: "blur(18px)",
          backgroundColor: scrolled ? "rgba(0,0,0,0.90)" : "rgba(0,0,0,0.48)",
        }}
      >
        <a href="#hero" className="text-[14px] shrink-0 px-3"
          style={{ color: C.headline, fontWeight: 800, letterSpacing: "-0.03em" }}>
          Solvr.
        </a>
        <div className="hidden sm:flex items-center gap-1">
          {[["Servicios","#servicios"],["Proceso","#proceso"],["Contacto","#footer"]].map(([l,h]) => (
            <a key={l} href={h}
              className="text-[12px] transition-colors duration-150 whitespace-nowrap px-3 py-1.5 rounded-full"
              style={{ color: C.muted }}
              onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
              onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
            >{l}</a>
          ))}
        </div>
        <a href="#footer"
          className="text-[12px] font-semibold px-4 py-1.5 rounded-full transition-all duration-150 cursor-pointer whitespace-nowrap shrink-0 ml-1"
          style={{ backgroundColor: C.accent, color: C.accentFg }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.accentDim)}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.accent)}
        >Hablemos</a>
      </div>
    </motion.nav>
  );
}

// ── Hero — centrado vertical, layout simple, opacity-only fade ────────────
//   Fix wave: inner <span className="wave-acid"> separado del motion.span,
//   evita que framer-motion will-change:transform rompa background-clip en Safari.

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col justify-between px-5 sm:px-8 pt-24 sm:pt-28 pb-8 overflow-hidden"
      style={{ borderBottom: `1px solid ${C.rule}`, backgroundColor: C.bg }}
    >
      <motion.div
        className="max-w-7xl mx-auto w-full flex flex-col flex-1 justify-center py-10"
        style={{ opacity }}
      >
        {/* Two-column grid: text left, video right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

          {/* ── Left: text content ─────────────────────────── */}
          <div className="min-w-0">
            {/* Meta strip */}
            <motion.p
              className="font-mono text-[10px] sm:text-[11px] tracking-[0.16em] uppercase mb-10 sm:mb-12"
              style={{ color: C.muted }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            >
              <span style={{ color: C.accent }}>◆</span>
              {" "}Estudio de Soluciones Digitales&nbsp;&nbsp;/&nbsp;&nbsp;BCN · NYC&nbsp;&nbsp;/&nbsp;&nbsp;EST. 2017
            </motion.p>

            {/* Headline */}
            <h1
              className="mb-9 sm:mb-10"
              style={{
                fontWeight: 800,
                letterSpacing: "-0.045em",
                lineHeight: 0.91,
                fontSize: "clamp(42px, 10.5vw, 112px)",
              }}
            >
              <span className="block overflow-hidden">
                {["NO","VENDEMOS"].map((w, i) => (
                  <motion.span key={w}
                    className="inline-block mr-[0.2em]"
                    style={{ color: C.headline }}
                    initial={{ y: "105%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.28 + i * 0.07, ease: "easeOut" }}
                  >{w}</motion.span>
                ))}
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  style={{ color: C.headline }}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.44, ease: "easeOut" }}
                >TECNOLOGÍA.</motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block mr-[0.2em]"
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
                >
                  <WaveWord text="RESOLVEMOS" />
                </motion.span>
                <motion.span
                  className="inline-block"
                  style={{ color: C.headline }}
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.63, ease: "easeOut" }}
                >PROBLEMAS.</motion.span>
              </span>
            </h1>

            {/* Subtext */}
            <motion.p
              className="text-[15px] sm:text-[17px] leading-relaxed mb-10"
              style={{ color: C.body, maxWidth: "480px" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
              Identificamos el problema real en tu negocio y construimos la solución exacta —
              IA, software, o lo que haga falta.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
            >
              <a href="#footer"
                className="text-[14px] font-semibold px-7 py-3.5 rounded-full transition-colors duration-150 cursor-pointer text-center w-full sm:w-auto"
                style={{ backgroundColor: C.accent, color: C.accentFg }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.accentDim)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.accent)}
              >Hablemos →</a>
              <a href="#servicios"
                className="text-[14px] font-medium px-7 py-3.5 rounded-full transition-all duration-150 cursor-pointer text-center w-full sm:w-auto"
                style={{ border: `1px solid ${C.rule}`, color: C.body }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = C.accent;
                  (e.currentTarget as HTMLElement).style.borderColor = C.accent;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = C.body;
                  (e.currentTarget as HTMLElement).style.borderColor = C.rule;
                }}
              >Qué hacemos ↓</a>
            </motion.div>
          </div>

          {/* ── Right: hero video — desktop only ───────────── */}
          <motion.div
            className="hidden lg:block shrink-0 lg:w-[380px] xl:w-[420px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
          >
            <video
              src="/hero.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-[4px] object-cover"
            />
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll strip — bottom */}
      <motion.div
        className="max-w-7xl mx-auto w-full flex items-center justify-between pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
      >
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: C.muted }}>
          Desplazar ———————
        </p>
        <p className="font-mono text-[10px] tracking-[0.15em]" style={{ color: C.muted }}>
          01 / 06
        </p>
      </motion.div>
    </section>
  );
}

// ── Beliefs — Bento tiles ─────────────────────────────────────────────────

const beliefs = [
  { dim: "La mayoría de las agencias venden horas.", bright: "Nosotros vendemos resultados." },
  { dim: "La herramienta no importa.", bright: "El problema sí." },
  { dim: "Seis semanas para producción.", bright: "No seis meses de planificación." },
];

function Beliefs() {
  return (
    <section
      className="relative"
      style={{ borderBottom: `1px solid ${C.rule}`, backgroundColor: C.bg }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Tile 1 — full width, biggest statement */}
        <FadeIn>
          <div
            className="py-16 sm:py-20 lg:py-24 overflow-hidden"
            style={{ borderBottom: `1px solid ${C.rule}` }}
          >
            <SlideIn delay={0.02}>
              <p className="font-black leading-[0.93]"
                style={{ color: C.muted, fontWeight: 800, fontSize: "clamp(26px, 5vw, 60px)", letterSpacing: "-0.04em" }}>
                {beliefs[0].dim}
              </p>
            </SlideIn>
            <SlideIn delay={0.1}>
              <p className="font-black leading-[0.93] mt-1"
                style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(26px, 5vw, 60px)", letterSpacing: "-0.04em" }}>
                {beliefs[0].bright}
              </p>
            </SlideIn>
          </div>
        </FadeIn>

        {/* Tiles 2 + 3 — half width bento */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {beliefs.slice(1).map((b, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div
                className="py-12 sm:py-16 overflow-hidden"
                ref={el => {
                  if (!el) return;
                  const apply = () => {
                    el.style.borderRight = (window.innerWidth >= 768 && i === 0)
                      ? `1px solid ${C.rule}` : "none";
                    el.style.paddingRight = (window.innerWidth >= 768 && i === 0) ? "3rem" : "0";
                    el.style.paddingLeft  = (window.innerWidth >= 768 && i === 1) ? "3rem" : "0";
                  };
                  apply();
                  window.addEventListener("resize", apply);
                }}
              >
                <SlideIn delay={0.04}>
                  <p className="font-black leading-[0.93]"
                    style={{ color: C.muted, fontWeight: 800, fontSize: "clamp(22px, 4vw, 44px)", letterSpacing: "-0.04em" }}>
                    {b.dim}
                  </p>
                </SlideIn>
                <SlideIn delay={0.12}>
                  <p className="font-black leading-[0.93] mt-1"
                    style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(22px, 4vw, 44px)", letterSpacing: "-0.04em" }}>
                    {b.bright}
                  </p>
                </SlideIn>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Servicios — Bento (01 full + 02/03 mitades) ───────────────────────────

const servicios = [
  {
    num: "01",
    title: "IA & Automatización",
    desc: "Construimos sistemas inteligentes que funcionan — no demos que impresionan, sino agentes que producen.",
    caps: ["Agentes LLM personalizados","Automatización de flujos","RAG & recuperación","Copilotos internos","Modelos fine-tuneados"],
  },
  {
    num: "02",
    title: "Desarrollo de Software",
    desc: "De cero a producción. Full-stack, rápido, limpio. Sin bloat, sin necesidad de guía constante.",
    caps: ["Apps web y móvil","Diseño de APIs","Dashboards internos","Pipelines de datos","Modernización de sistemas"],
  },
  {
    num: "03",
    title: "Estrategia Digital",
    desc: "La respuesta correcta antes de construir lo equivocado. Pensamos antes de codear.",
    caps: ["Descubrimiento del problema","Arquitectura de soluciones","Build vs. buy","Roadmapping","Due diligence técnico"],
  },
];

function Servicios() {
  return (
    <section
      id="servicios"
      className="relative"
      style={{ borderBottom: `1px solid ${C.rule}`, backgroundColor: C.bg }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28 lg:py-32">
        <FadeIn>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase mb-14"
            style={{ color: C.muted }}>
            (02) Servicios
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14 sm:mb-20">
          <SlideIn from="left">
            <h2 className="font-black leading-tight"
              style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(22px, 4.5vw, 42px)", letterSpacing: "-0.035em" }}>
              Tres disciplinas.<br />Un modelo operativo.
            </h2>
          </SlideIn>
          <FadeIn delay={0.1}>
            <p className="text-[15px] sm:text-[16px] leading-relaxed" style={{ color: C.body }}>
              No trabajamos en silos. Cada proyecto combina IA, ingeniería y estrategia
              simultáneamente. Un equipo, un brief, un resultado.
            </p>
          </FadeIn>
        </div>

        {/* Bento: 01 full width */}
        <SlideIn from="left">
          <div
            className="grid grid-cols-1 sm:grid-cols-[72px_1fr] sm:gap-8 p-5 sm:p-10 mb-4"
            style={{ border: `1px solid ${C.rule}`, backgroundColor: C.paper2 }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#333")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = C.rule)}
          >
            <ScaleIn delay={0.05}>
              <span className="block font-black leading-none mb-4 sm:mb-0"
                style={{ color: "#252525", fontWeight: 800, fontSize: "clamp(40px,6vw,68px)", letterSpacing: "-0.04em" }}>
                {servicios[0].num}
              </span>
            </ScaleIn>
            <div>
              <h3 className="font-black leading-tight mb-3"
                style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(18px,2.8vw,28px)", letterSpacing: "-0.03em" }}>
                {servicios[0].title}
              </h3>
              <p className="text-[14px] sm:text-[15px] leading-relaxed mb-5" style={{ color: C.body, maxWidth: "600px" }}>
                {servicios[0].desc}
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-5">
                {servicios[0].caps.map(c => (
                  <span key={c} className="text-[12px] sm:text-[13px]" style={{ color: C.muted }}>· {c}</span>
                ))}
              </div>
              <a href="#footer" className="text-[13px] font-medium transition-colors duration-150 cursor-pointer"
                style={{ color: C.muted }}
                onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
              >Empezar aquí →</a>
            </div>
          </div>
        </SlideIn>

        {/* Bento: 02 + 03 mitades */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {servicios.slice(1).map((s, i) => (
            <SlideIn key={s.num} from={i === 0 ? "left" : "right"} delay={0.06}>
              <div
                className="p-5 sm:p-8 h-full flex flex-col"
                style={{ border: `1px solid ${C.rule}`, backgroundColor: C.paper2 }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "#333")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = C.rule)}
              >
                <ScaleIn delay={0.08}>
                  <span className="block font-black leading-none mb-5"
                    style={{ color: "#252525", fontWeight: 800, fontSize: "clamp(36px,5vw,60px)", letterSpacing: "-0.04em" }}>
                    {s.num}
                  </span>
                </ScaleIn>
                <h3 className="font-black leading-tight mb-3"
                  style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(17px,2.5vw,24px)", letterSpacing: "-0.03em" }}>
                  {s.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-relaxed mb-5 flex-1" style={{ color: C.body }}>
                  {s.desc}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-5">
                  {s.caps.map(c => (
                    <span key={c} className="text-[11px] sm:text-[12px]" style={{ color: C.muted }}>· {c}</span>
                  ))}
                </div>
                <a href="#footer" className="text-[13px] font-medium transition-colors duration-150 cursor-pointer"
                  style={{ color: C.muted }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
                >Empezar aquí →</a>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Proceso ───────────────────────────────────────────────────────────────

const pasos = [
  { num: "01", title: "Escuchamos.",   tag: "Descubrimiento", desc: "Antes de escribir una sola línea de código, entendemos el problema real — no el que figura en el brief." },
  { num: "02", title: "Construimos.",  tag: "Ingeniería",     desc: "Ciclos cortos, comunicación directa, entregables reales cada semana. Sin overhead, sin teatro." },
  { num: "03", title: "Entregamos.",   tag: "Handover",       desc: "Código limpio, documentación completa y una entrega que funciona de verdad. Es tuyo completamente." },
];

function Proceso() {
  return (
    <section
      id="proceso"
      className="relative px-5 sm:px-8 py-20 sm:py-28 lg:py-32"
      style={{ borderBottom: `1px solid ${C.rule}`, backgroundColor: C.bg }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase mb-14"
            style={{ color: C.muted }}>
            (03) Cómo trabajamos
          </p>
        </FadeIn>

        <SlideIn from="left">
          <h2 className="font-black leading-tight mb-16 sm:mb-20 lg:mb-24 max-w-2xl"
            style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(24px, 5vw, 50px)", letterSpacing: "-0.035em" }}>
            Tres pasos.<br />Sin intermediarios.
          </h2>
        </SlideIn>

        <div className="grid grid-cols-1 md:grid-cols-3">
          {pasos.map((p, i) => (
            <FadeIn key={p.num} delay={i * 0.1}>
              <div
                className="py-8 sm:py-10"
                ref={el => {
                  if (!el) return;
                  const apply = () => {
                    const md = window.innerWidth >= 768;
                    el.style.borderBottom = (!md && i < 2) ? `1px solid ${C.rule}` : "none";
                    el.style.borderRight  = (md && i < 2)  ? `1px solid ${C.rule}` : "none";
                    el.style.paddingLeft  = (md && i > 0)  ? "2.5rem" : "0";
                    el.style.paddingRight = md ? "2.5rem" : "0";
                  };
                  apply();
                  window.addEventListener("resize", apply);
                }}
              >
                <ScaleIn delay={i * 0.1 + 0.06}>
                  <p className="font-black leading-none mb-6"
                    style={{ color: "#161616", fontWeight: 800, fontSize: "clamp(56px, 12vw, 120px)", letterSpacing: "-0.04em" }}>
                    {p.num}
                  </p>
                </ScaleIn>
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase mb-4 inline-block px-2 py-1"
                  style={{ color: C.muted, border: `1px solid ${C.rule}` }}>
                  {p.tag}
                </p>
                <h3 className="font-black text-[20px] sm:text-[22px] mb-3"
                  style={{ color: C.headline, fontWeight: 800, letterSpacing: "-0.03em" }}>
                  {p.title}
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-relaxed" style={{ color: C.body }}>
                  {p.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.2}>
          <div className="py-5 mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0"
            style={{ borderTop: `1px solid ${C.rule}` }}>
            {["Duración promedio — 6 a 14 semanas","Alcance fijo","Un solo punto de contacto"].map((item, i) => (
              <p key={i} className="font-mono text-[10px] sm:text-[11px] tracking-[0.12em] uppercase sm:flex-1"
                style={{ color: C.muted }}>
                {i > 0 && <span className="hidden sm:inline mr-4" style={{ color: "#222" }}>—</span>}
                {item}
              </p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── CTA Band ──────────────────────────────────────────────────────────────

function CTABand() {
  return (
    <section
      className="relative px-5 sm:px-8 py-24 sm:py-32 lg:py-40"
      style={{ borderBottom: `1px solid ${C.rule}`, backgroundColor: C.bg }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <FadeIn>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase mb-8"
            style={{ color: C.muted }}>
            (04) Iniciar un proyecto
          </p>
        </FadeIn>
        <SlideIn from="left">
          <h2 className="font-black leading-tight mb-8"
            style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(30px, 7vw, 76px)", letterSpacing: "-0.04em" }}>
            Cuéntanos el problema.<br />Nosotros hacemos el resto.
          </h2>
        </SlideIn>
        <FadeIn delay={0.18}>
          <p className="text-[15px] sm:text-[17px] leading-relaxed mb-10"
            style={{ color: C.body, maxWidth: "500px" }}>
            Sin retainers, sin boilerplate. Una llamada de descubrimiento, un alcance definido, y movemos rápido.
          </p>
        </FadeIn>
        <FadeIn delay={0.28}>
          <a href="mailto:hola@solvr.com"
            className="inline-block text-[14px] sm:text-[15px] font-semibold px-9 py-4 rounded-full transition-colors duration-150 cursor-pointer"
            style={{ backgroundColor: C.accent, color: C.accentFg }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.accentDim)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.accent)}
          >Iniciar un brief →</a>
        </FadeIn>
      </div>
    </section>
  );
}

// ── Footer — Ft5 statement ────────────────────────────────────────────────

const footerCols = [
  { label: "Contacto",
    items: [{ text: "hola@solvr.com", href: "mailto:hola@solvr.com" }, { text: "+1 (212) 555-0180", href: "tel:+12125550180" }] },
  { label: "Redes",
    items: [{ text: "LinkedIn →", href: "#" }, { text: "Are.na →", href: "#" }] },
  { label: "Estudio",
    items: [{ text: "Barcelona / New York", href: null }, { text: "Lun–Vie  9–18 CET", href: null }] },
  { label: "Brief",
    items: [{ text: "Iniciar un brief →", href: "mailto:hola@solvr.com" }, { text: "Respuesta en 48h", href: null }] },
];

function Footer() {
  return (
    <footer
      id="footer"
      className="relative px-5 sm:px-8 pt-14 sm:pt-20 pb-8 sm:pb-10"
      style={{ backgroundColor: C.bg }}
    >
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <p className="text-[13px] sm:text-[14px] leading-relaxed mb-10 sm:mb-14"
            style={{ color: C.muted, maxWidth: "420px" }}>
            Un estudio para quienes saben que la solución no es otra reunión más.
          </p>
        </FadeIn>

        <SlideIn from="left">
          <p className="font-black leading-none"
            style={{ color: C.headline, fontWeight: 800, fontSize: "clamp(56px, 16vw, 220px)", letterSpacing: "-0.055em", lineHeight: 1 }}>
            Solvr.
          </p>
        </SlideIn>

        <FadeIn delay={0.08}>
          <div className="mt-8 sm:mt-10" style={{ borderTop: `1px solid ${C.rule}`, borderBottom: `1px solid ${C.rule}` }}>
            <div className="grid grid-cols-2 md:grid-cols-4">
              {footerCols.map((col, i) => (
                <div key={col.label} className="py-7 sm:py-8"
                  ref={el => {
                    if (!el) return;
                    const apply = () => {
                      const md = window.innerWidth >= 768;
                      if (md) {
                        el.style.borderRight  = i < 3 ? `1px solid ${C.rule}` : "none";
                        el.style.paddingLeft  = i > 0 ? "2rem" : "0";
                        el.style.paddingRight = i < 3 ? "2rem" : "0";
                        el.style.borderBottom = "none";
                      } else {
                        el.style.borderRight  = (i % 2 === 0) ? `1px solid ${C.rule}` : "none";
                        el.style.borderBottom = i < 2 ? `1px solid ${C.rule}` : "none";
                        el.style.paddingLeft  = (i % 2 === 1) ? "1.25rem" : "0";
                        el.style.paddingRight = (i % 2 === 0) ? "1.25rem" : "0";
                      }
                    };
                    apply();
                    window.addEventListener("resize", apply);
                  }}
                >
                  <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase mb-4 sm:mb-5"
                    style={{ color: C.muted }}>
                    {col.label}
                  </p>
                  <ul className="space-y-2">
                    {col.items.map(item => (
                      <li key={item.text}>
                        {item.href
                          ? <a href={item.href}
                              className="text-[13px] sm:text-[14px] transition-colors duration-150 cursor-pointer"
                              style={{ color: C.body }}
                              onMouseEnter={e => (e.currentTarget.style.color = C.accent)}
                              onMouseLeave={e => (e.currentTarget.style.color = C.body)}
                            >{item.text}</a>
                          : <span className="text-[13px] sm:text-[14px]" style={{ color: C.body }}>{item.text}</span>
                        }
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.12}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 pt-5">
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em]" style={{ color: C.muted }}>
              © 2026 Solvr Studio S.L. / Todos los derechos reservados.
            </p>
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em]" style={{ color: C.muted }}>
              Hecho en casa.
            </p>
          </div>
        </FadeIn>
      </div>
    </footer>
  );
}

// ── Página ────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div style={{ backgroundColor: C.bg }} className="min-h-screen">
      <Nav />
      <Hero />
      <Beliefs />
      <Servicios />
      <Proceso />
      <CTABand />
      <Footer />
    </div>
  );
}

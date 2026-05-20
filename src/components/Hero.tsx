import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Zap,
  ArrowRight,
  FileText,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { springConfig, viewportConfig } from "../constants";
import Typewriter from "./Typewriter";

const TerminalCard = () => {
  const [filter, setFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const projects = [
    {
      id: "SYS-01",
      name: "AI TRADING DASHBOARD",
      status: "DEPLOYED",
      tech: "React, Flask, SQLite",
      metric: "Gain",
      val: "+65%",
      description:
        "A high-frequency trading visualization suite with real-time neural processing of market sentiment.",
      achievements: [
        "99.9% Uptime",
        "Sub-50ms Latency",
        "Neural Pattern Recognition",
      ],
      link: "https://github.com",
    },
    {
      id: "SYS-02",
      name: "WORKFLOW AUTOMATION",
      status: "DEPLOYED",
      tech: "Python, Apps Script",
      metric: "Saved",
      val: "120h/mo",
      description:
        "Institutional-grade automation engine syncing disparate legacy systems into a unified neural workflow.",
      achievements: [
        "100% Data Integrity",
        "Zero Manual Intervention",
        "Daily Sync Audits",
      ],
      link: "https://github.com",
    },
    {
      id: "SYS-03",
      name: "ANALYTICS PORTAL",
      status: "IN DEVELOPMENT",
      tech: "React, Framer Motion",
      metric: "Status",
      val: "85%",
      description:
        "Advanced data visualization portal focusing on multi-dimensional performance metrics and predictive modeling.",
      achievements: [
        "Real-time Filtering",
        "Predictive Projection",
        "Custom Shader Visuals",
      ],
      link: "https://github.com",
    },
  ];

  const filteredProjects = projects.filter((p) => {
    if (filter === "ALL") return true;
    if (filter === "DEPLOYED") return p.status === "DEPLOYED";
    if (filter === "DEV") return p.status === "IN DEVELOPMENT";
    if (filter === "REACT") return p.tech.includes("React");
    if (filter === "PYTHON") return p.tech.includes("Python");
    return true;
  });

  return (
    /* MODUL A: TERMINAL CARD - Diubah Suai Kepada Kesan Pixel Spread In */
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.75,
        x: 0,
        filter: "blur(32px)",
      }}
      whileInView={{
        opacity: [0, 0.7, 1],
        scale: [0.75, 1.04, 1],
        filter: ["blur(32px)", "blur(12px)", "blur(0px)"],
        x: 0,
      }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective-1000 hidden lg:block w-full max-w-xl"
    >
      <div className="relative glass-card-crimson rounded-xl overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.15)] group">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-red-500/5 to-transparent -translate-x-[100%] group-hover:animate-shine pointer-events-none" />

        <div className="bg-white/5 border-b border-red-500/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <span className="text-[10px] font-mono text-white/40 tracking-wider uppercase whitespace-nowrap">
              TERMINAL_CORE // V1.0
            </span>
          </div>
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
          </div>
        </div>

        <div className="px-6 pt-4 flex flex-wrap gap-2">
          {["ALL", "DEPLOYED", "DEV", "REACT", "PYTHON"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[9px] font-mono px-2 py-0.5 rounded-sm border transition-all ${
                filter === f
                  ? "bg-red-500/20 border-red-500 text-red-400"
                  : "bg-white/5 border-white/10 text-white/40 hover:text-white/60"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="p-6 space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                onClick={() =>
                  setExpandedId(expandedId === project.id ? null : project.id)
                }
                className={`p-4 bg-black/40 border transition-all cursor-pointer group/card ${
                  expandedId === project.id
                    ? "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                    : "border-white/5 hover:border-red-500/30 hover:scale-[1.01]"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-[10px] text-red-500 font-mono mb-1">
                      {project.id}
                    </div>
                    <h3 className="text-sm font-bold font-display text-white tracking-wide uppercase">
                      {project.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-500 font-mono uppercase">
                      {project.metric}
                    </div>
                    <div className="text-xs font-bold text-red-400">
                      {project.val}
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedId === project.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-white/10 mt-4 space-y-3">
                        <p className="text-xs text-white/60 leading-relaxed font-sans">
                          {project.description}
                        </p>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 text-[10px] font-bold text-white bg-red-600/20 px-3 py-1.5 border border-red-500/30 hover:bg-red-600 transition-colors rounded-sm uppercase tracking-widest"
                        >
                          Access Repo <ArrowRight size={10} />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-between items-center text-[10px] font-mono mt-2">
                  <span className="text-slate-500 uppercase tracking-tighter">
                    TECH: {project.tech.split(",")[0]}
                  </span>
                  <span
                    className={
                      project.status === "DEPLOYED"
                        ? "text-green-500"
                        : "text-yellow-500 opacity-80"
                    }
                  >
                    {project.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: springConfig },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-40 pb-20 px-12 overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-20 items-center">
        {/* Left Section - Transformed Heading */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="z-10 space-y-12"
        >
          <motion.div variants={itemVariants}>
            {/* BADGE STATUS - Kesan Animasi Flip Stretch dari Atas */}
            <motion.div
              initial={{
                opacity: 0,
                y: -40,
                rotateX: -70,
                scaleY: 1.6,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scaleY: 1,
                transition: {
                  type: "spring",
                  stiffness: 140,
                  damping: 12,
                  duration: 0.8,
                },
              }}
              viewport={{ once: false, amount: 0.1 }}
              style={{ transformOrigin: "top center" }}
              className="mb-6 inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/10 border border-red-500/20 glass-card-crimson select-none"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
              <p className="text-red-500 font-mono text-[10px] tracking-[0.4em] font-bold uppercase">
                PORTFOLIO // READY
              </p>
            </motion.div>

            {/* KUMPULAN NAMA - Urutan Masuk Satu Demi Satu (Slimy Dust In dari Kanan) */}
            <div className="space-y-4 mb-10 select-none relative">
              {/* Baris 1: MUHAMMAD */}
              <motion.h1
                initial={{
                  opacity: 0,
                  x: 180,
                  filter: "blur(16px)",
                  scaleX: 2.2,
                  letterSpacing: "0.5em",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  scaleX: 1,
                  letterSpacing: "-0.06em",
                  transition: {
                    duration: 0.85,
                    delay: 0,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                viewport={{ once: false, amount: 0.1 }}
                className="font-display font-black text-6xl md:text-[5.5rem] tracking-[-0.06em] uppercase italic leading-[0.8] text-transparent bg-clip-text custom-shine-white animate-[shineRight_5s_ease-in-out_infinite]"
              >
                MUHAMMAD
              </motion.h1>

              {/* Baris 2: HAIRUL */}
              <motion.h1
                initial={{
                  opacity: 0,
                  x: 180,
                  filter: "blur(16px)",
                  scaleX: 2.2,
                  letterSpacing: "0.5em",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                  scaleX: 1,
                  letterSpacing: "-0.06em",
                  transition: {
                    duration: 0.85,
                    delay: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                viewport={{ once: false, amount: 0.1 }}
                className="font-display font-black text-6xl md:text-[5.5rem] tracking-[-0.06em] uppercase italic leading-[0.8] text-transparent bg-clip-text custom-shine-red drop-shadow-[0_0_15px_rgba(239,68,68,0.15)] mt-[-0.15em] animate-[shineLeft_5s_ease-in-out_infinite]"
              >
                HAIRUL
              </motion.h1>

              {/* Baris 3: IQWAN */}
              <div className="relative inline-block mt-[-0.15em]">
                <motion.h1
                  initial={{
                    opacity: 0,
                    x: 180,
                    filter: "blur(16px)",
                    scaleX: 2.2,
                    letterSpacing: "0.5em",
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    scaleX: 1,
                    letterSpacing: "-0.06em",
                    transition: {
                      duration: 0.85,
                      delay: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  }}
                  viewport={{ once: false, amount: 0.1 }}
                  className="font-display font-black text-6xl md:text-[5.5rem] tracking-[-0.06em] uppercase italic leading-[0.8] text-transparent bg-clip-text custom-shine-white pr-[0.3em] animate-[shineRight_5s_ease-in-out_infinite]"
                >
                  IQWAN
                </motion.h1>

                {/* GARISAN CYBER BERASINGAN - Mengembang dari Kiri */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{
                    scaleX: 1,
                    opacity: 1,
                    transition: { duration: 0.6, delay: 1.45, ease: "easeOut" },
                  }}
                  viewport={{ once: false }}
                  style={{ transformOrigin: "left center" }}
                  className="absolute bottom-[-8px] left-0 w-full h-[4px] bg-gradient-to-r from-[#ef4444] to-transparent shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                />
              </div>

              <style>{`
                .custom-shine-white {
                  background-image: linear-gradient(120deg, rgba(255,255,255,0.7) 30%, rgba(255,255,255,1) 40%, rgba(255,255,255,1) 45%, rgba(255,255,255,0.7) 55%);
                  background-size: 200% auto;
                }
                .custom-shine-red {
                  background-image: linear-gradient(120deg, #7f1d1d 35%, #ef4444 45%, #f43f5e 50%, #7f1d1d 60%);
                  background-size: 200% auto;
                }
                @keyframes shineRight {
                  0% { background-position: -100% center; }
                  100% { background-position: 100% center; }
                }
                @keyframes shineLeft {
                  0% { background-position: 100% center; }
                  100% { background-position: -100% center; }
                }
              `}</style>
            </div>

            {/* KONTAINER TYPEWRITER - Penjarakan Sempurna mt-12 */}
            <div className="min-h-[24px] mt-12">
              <Typewriter
                words={[
                  "> Full-Stack Developer",
                  "> Workflow Automation Architect",
                  "> UI/UX Designer",
                  "> Customer Operations Specialist",
                ]}
              />
            </div>

            {/* PERENGGAN PENERANGAN - Diubah Suai Kepada Opposing Split Reveal */}
            <motion.p
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.12,
                    delayChildren: 0.2,
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.1 }}
              className="text-lg text-white/40 font-light leading-relaxed italic space-y-2 select-none mt-6"
            >
              {/* BARIS 1 */}
              <span className="block overflow-hidden">
                <span className="flex flex-wrap items-center gap-x-1.5">
                  <motion.span
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.2, 1, 0.2, 1] },
                      },
                    }}
                    className="inline-block"
                  >
                    Deploying advanced
                  </motion.span>

                  {/* KEYWORD 1: TURUN DARI ATAS */}
                  <motion.span
                    variants={{
                      hidden: { y: "-100%", opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.2, 1, 0.2, 1] },
                      },
                    }}
                    className="inline-block text-white font-medium"
                  >
                    Fullstack Architectures
                  </motion.span>

                  <motion.span
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.2, 1, 0.2, 1] },
                      },
                    }}
                    className="inline-block"
                  >
                    and autonomous
                  </motion.span>
                </span>
              </span>

              {/* BARIS 2 */}
              <span className="block overflow-hidden">
                <span className="flex flex-wrap items-center gap-x-1.5">
                  {/* KEYWORD 2: TURUN DARI ATAS */}
                  <motion.span
                    variants={{
                      hidden: { y: "-100%", opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.2, 1, 0.2, 1] },
                      },
                    }}
                    className="inline-block text-white font-medium"
                  >
                    Neural Workflows
                  </motion.span>

                  <motion.span
                    variants={{
                      hidden: { y: "100%", opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: { duration: 0.8, ease: [0.2, 1, 0.2, 1] },
                      },
                    }}
                    className="inline-block"
                  >
                    to resolve high-stakes operational bottlenecks
                  </motion.span>
                </span>
              </span>

              {/* BARIS 3 */}
              <span className="block overflow-hidden">
                <motion.span
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.8, ease: [0.2, 1, 0.2, 1] },
                    },
                  }}
                  className="block"
                >
                  through engineered precision.
                </motion.span>
              </span>
            </motion.p>
          </motion.div>

          {/* MODUL B: KUMPULAN BUTANG TINDAKAN - Dibetulkan Daripada Ralat Jitter Menegak */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-wrap gap-4">
              {/* PRIMARY: PROJECTS - VIEW SHOWCASE */}
              <motion.button
                onClick={() =>
                  document
                    .getElementById("showcase")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: false }}
                animate={{
                  y: [0, -4, 4, -2, 0],
                }}
                transition={{
                  y: { type: "spring", stiffness: 100, damping: 15 },
                  opacity: { duration: 0.6 },
                  default: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="group relative px-10 py-5 bg-red-600 text-white font-black rounded-sm transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.3)] hover:shadow-[0_0_50px_rgba(239,68,68,0.5)] active:scale-95 cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 skew-x-[-20deg]" />
                <span className="relative flex items-center gap-3 tracking-[0.2em] text-xs font-bold">
                  <Zap size={16} className="text-white animate-pulse" />
                  VIEW SHOWCASE
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </span>
              </motion.button>

              {/* SECONDARY: RESUME & CONTACT - CONTACT.FEEDBACK */}
              <motion.button
                onClick={() =>
                  document
                    .getElementById("network")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                initial={{ opacity: 0, y: 40 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: false }}
                animate={{
                  y: [0, 4, -4, 2, 0],
                }}
                transition={{
                  y: {
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.1,
                  },
                  opacity: { duration: 0.6, delay: 0.1 },
                  default: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.2,
                  },
                }}
                className="group relative px-10 py-5 border border-white/10 text-white/60 font-bold rounded-sm transition-all duration-300 hover:bg-white/5 hover:text-white hover:border-red-500/50 active:scale-95 flex items-center gap-3 uppercase tracking-[0.2em] text-xs cursor-pointer"
              >
                <FileText size={16} />
                CONTACT.FEEDBACK
              </motion.button>
            </div>

            {/* MAGIC BUTTON: AI RECRUITMENT - Meluncur Semestinya dari Bawah */}
            <motion.a
              href="https://ai-recruitment-v2.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  delay: 0.25,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              viewport={{ once: false, amount: 0.1 }}
              className="inline-block group"
            >
              <button className="relative px-8 py-4 bg-black border border-red-500/30 rounded-sm overflow-hidden transition-all duration-500 hover:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-transparent to-red-600/5 opacity-50" />
                <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent,rgba(239,68,68,0.2),transparent)] animate-[spin_4s_linear_infinite]" />

                <span className="relative flex items-center gap-4 text-[11px] font-mono font-bold text-red-500 tracking-[0.3em] uppercase">
                  <Sparkles size={16} className="animate-pulse" />
                  Access AI Recruitment Hub
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </span>
              </button>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Section - Terminal Card View */}
        <div className="flex justify-center lg:justify-end">
          <TerminalCard />
        </div>
      </div>
    </section>
  );
};

export default Hero;

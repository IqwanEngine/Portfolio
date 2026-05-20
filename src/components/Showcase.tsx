import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheck,
  Cpu,
  Layout,
  Database,
  Code2,
  Monitor,
  Flame,
  Globe,
} from "lucide-react";
import { springConfig, viewportConfig } from "../constants";
import NeuralBar from "./NeuralBar";
import CredentialMarquee from "./CredentialMarquee";

// ==========================================
// CONFIGURATION: ANIMATION VARIANTS
// ==========================================

// 1. Bekas Kad Projek (Mengawal kesan stagger anak-anak kad)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// 2. Setiap Kad Projek (Meluncur naik dari bawah)
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

// 3. Bekas Lajur Kiri Kotak Kesihatan (Mengawal animasi tajuk & status)
const healthContentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.4, // Menunggu kotak induk selesai mendarat
      staggerChildren: 0.12, // Urutan kemasukan tulisan di dalam
    },
  },
};

const healthItemFadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: springConfig },
};

const Showcase = () => {
  const [activeTab, setActiveTab] = useState("Projects");

  // Array Tech Stack dengan tetapan animasi unik peranti taktikal
  const techStack = [
    {
      name: "React / Next.js",
      level: 95,
      icon: Layout,
      variants: {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
      },
    },
    {
      name: "Python / Automation",
      level: 90,
      icon: Database,
      variants: {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
      },
    },
    {
      name: "TypeScript",
      level: 92,
      icon: Code2,
      variants: {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      },
    },
    {
      name: "Tailwind CSS",
      level: 98,
      icon: Monitor,
      variants: {
        hidden: { opacity: 0, x: -30, y: -20, rotate: -5 },
        visible: { opacity: 1, x: 0, y: 0, rotate: 0 },
      },
    },
    {
      name: "Framer Motion",
      level: 85,
      icon: Flame,
      variants: {
        hidden: { opacity: 0, x: 50, y: -50 },
        visible: { opacity: 1, x: 0, y: 0 },
      },
    },
    {
      name: "Node.js / Express",
      level: 80,
      icon: Globe,
      variants: {
        hidden: { opacity: 0, x: -50, y: 50 },
        visible: { opacity: 1, x: 0, y: 0 },
      },
    },
  ];

  const projectsData = {
    Projects: [
      {
        id: "P1",
        name: "AI Trading Bot",
        desc: "Neuro-pattern recognition for crypto markets.",
        details:
          "An automated cryptocurrency execution system that integrates deep learning architectures with raw visual ledger feedback to detect high-probability market inefficiencies.",
        tech: "Python, PyTorch, WebSocket Streaming",
        link: "https://ai-recruitment-v2.vercel.app",
      },
      {
        id: "P2",
        name: "Workflow Engine",
        desc: "Automating 500+ daily operational tasks.",
        details:
          "A centralized command server acting as the nervous system for digital business processes, syncing Google Workspace API hooks to transactional databases.",
        tech: "Node.js, Express, PostgreSQL",
        link: "https://ai-recruitment-v2.vercel.app",
      },
      {
        id: "P3",
        name: "IqwanEngine Core",
        desc: "The underlying architecture for this portfolio.",
        details:
          "A modular React, TypeScript, and Framer Motion template customized for high-frequency user-interaction logging and ultra-vivid custom UI elements.",
        tech: "React, Framer Motion, TypeScript",
        link: "https://ai-recruitment-v2.vercel.app",
      },
    ],
    Design: [
      {
        id: "D1",
        name: "Cyberpunk UI Kit",
        desc: "Aggressive crimson design system.",
        details:
          "A specialized design pattern repo including dark tactile interfaces, interactive linear charts, neon-glowing CRT filters, and scanline CSS effects.",
        tech: "Figma, Tailwind, Tailwind Config",
        link: "https://ai-recruitment-v2.vercel.app",
      },
      {
        id: "D2",
        name: "Neural Dashboard",
        desc: "Bio-metric data visualization concept.",
        details:
          "A modular, tactical analytics dashboard interface built to stream simulated neural waveforms and multi-user telemetry into a virtual grid.",
        tech: "React, D3.js, Canvas API",
        link: "https://ai-recruitment-v2.vercel.app",
      },
    ],
    Editing: [
      {
        id: "L1",
        name: "Market Hub Live",
        desc: "Real-time trading terminal demo.",
        details:
          "An experimental high-throughput finance visualization screen displaying incoming bids, transactions ledger, and micro-second ticker updates.",
        tech: "WebSockets, React, RxJS",
        link: "https://ai-recruitment-v2.vercel.app",
      },
      {
        id: "L2",
        name: "Neural Chat",
        desc: "AI assistant interface prototype.",
        details:
          "A full-scale conversational AI overlay designed with modular typing latency buffers, text streaming, and deep security rules logic.",
        tech: "Next.js, Tailwind CSS, Vercel AI SDK",
        link: "https://ai-recruitment-v2.vercel.app",
      },
    ],
  };

  const certificates = [
    "AWS SOLUTIONS ARCHITECT",
    "GOOGLE DATA ANALYTICS",
    "META FRONTEND DEVELOPER",
    "SCRUM MASTER PRO",
    "CS50 COMPUTER SCIENCE",
    "REACT ADVANCED ARCHITECT",
    "PYTHON FOR DATABASE",
  ];

  return (
    <section
      id="showcase"
      className="py-24 px-12 border-t border-white/5 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto z-10 relative">
        {/* HEADER SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={springConfig}
          className="mb-16"
        >
          {/* Barisan Flex tunggal tanpa elemen div line merah */}
          <div className="flex items-center gap-4 mb-2">
            <span className="text-red-600 font-mono text-2xl tracking-tighter">
              .02
            </span>
            {/* 👇 TULISAN RAPAT DI SEBELAH NOMBOR SECARA BERSIH */}
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.5em]">
              System Capabilities
            </span>
          </div>

          <h2 className="text-5xl lg:text-7xl font-black text-white italic font-display uppercase">
            The Showcase
          </h2>
        </motion.div>

        {/* MAIN LAYOUT GRID */}
        <div className="grid lg:grid-cols-3 gap-16 items-start">
          {/* LEFT & CENTER COLUMNS: PROJECTS */}
          <div className="lg:col-span-2 space-y-12">
            {/* Tab Toggles */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={springConfig}
              className="flex bg-white/5 border border-white/10 p-1.5 rounded-sm w-fit glass-card-crimson"
            >
              {Object.keys(projectsData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-8 py-3 text-[11px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === tab
                      ? "text-red-500"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabGlow"
                      className="absolute inset-0 bg-red-600/10 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                    />
                  )}
                  <span className="relative z-10">{tab}</span>
                </button>
              ))}
            </motion.div>

            {/* Project Cards Display Grid */}
            <div className="min-h-[450px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  exit="hidden"
                  viewport={{ once: false, amount: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {(projectsData as any)[activeTab].map((p: any) => {
                    const techTag =
                      activeTab === "Projects"
                        ? "[SYS_BUILD]"
                        : activeTab === "Design"
                          ? "[UIX_DESIGN]"
                          : "[AV_STREAM]";

                    const chips = p.tech
                      ? p.tech.split(",").map((s: string) => s.trim())
                      : [];

                    return (
                      <motion.a
                        key={p.id}
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer external"
                        variants={cardVariants}
                        className="group block p-6 bg-[#030305] border border-red-500/10 hover:border-red-500/30 hover:bg-red-500/[0.01] rounded-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full min-h-[220px]"
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Decorative Corner Accents */}
                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-red-500/30 transition-all duration-300 group-hover:border-red-500" />
                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-red-500/30 transition-all duration-300 group-hover:border-red-500" />

                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-mono text-[9px] text-red-500/80 tracking-widest uppercase">
                              {techTag}
                            </span>
                            <span className="font-mono text-[8px] text-white/20 tracking-wider">
                              ID // {p.id}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-white mb-2 tracking-tight transition-colors duration-300 group-hover:text-red-500 font-sans uppercase font-medium">
                            {p.name}
                          </h3>
                          <p className="text-xs text-gray-400 leading-relaxed font-sans font-light mb-6">
                            {p.desc}
                          </p>
                        </div>

                        {/* Tech Chips */}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5 mt-auto">
                          {chips.map((chip: string) => (
                            <span
                              key={chip}
                              className="text-[9px] font-mono bg-white/5 text-gray-400 border border-white/5 px-2 py-0.5 uppercase tracking-wider rounded-sm"
                            >
                              {chip}
                            </span>
                          ))}
                        </div>
                      </motion.a>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Infinite Marquee Validation Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportConfig}
              transition={springConfig}
              className="pt-20 border-t border-white/5"
            >
              <div className="flex items-center gap-6 mb-12">
                <ShieldCheck size={20} className="text-red-500" />
                <h3 className="text-[13px] font-mono text-white tracking-[0.4em] uppercase">
                  Validated Credentials
                </h3>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-red-600/50 to-transparent" />
              </div>

              <CredentialMarquee items={certificates} />
            </motion.div>
          </div>

          {/* RIGHT COLUMN: TECH STACK & SYSTEM HEALTH */}
          <div className="space-y-16 lg:sticky lg:top-32">
            {/* Neural Capabilities Section */}
            <div className="bg-white/5 border border-white/10 p-8 relative">
              <h3 className="text-[13px] font-mono text-white uppercase tracking-[0.4em] mb-12">
                Neural Capabilities
              </h3>

              <div className="space-y-12">
                {techStack.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    variants={tech.variants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 12,
                      delay: index * 0.05,
                    }}
                  >
                    <NeuralBar
                      name={tech.name}
                      level={tech.level}
                      index={index}
                      icon={tech.icon}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* System Core Health Box (Staggered-In from Right-Bottom) */}
            <motion.div
              initial={{ opacity: 0, x: 60, y: 60 }}
              whileInView="visible"
              variants={{
                visible: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  transition: {
                    type: "spring",
                    stiffness: 70,
                    damping: 14,
                  },
                },
              }}
              viewport={{ once: false, amount: 0.2 }}
              className="p-6 bg-red-600/5 border border-red-500/20 rounded-sm space-y-6 relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Pembungkus Animasi Kandungan Dalaman Kotak */}
              <motion.div
                initial={{ opacity: 0, x: 60, y: 60 }}
                whileInView="visible"
                variants={{
                  visible: {
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      type: "spring",
                      stiffness: 70,
                      damping: 14,
                    },
                  },
                }}
                viewport={{ once: false, amount: 0.2 }}
                // SANGAT PENTING: Kelas 'group' dan 'overflow-hidden' memastikan kesan imbasan berfungsi dengan tepat
                className="p-8 bg-red-600/5 border border-red-500/20 rounded-sm space-y-6 relative group overflow-hidden cursor-pointer"
              >
                {/* 1. Kesan Pembiasan Kecerunan Merah Semasa Hover (Sedia Ada) */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* 2. LAPISAN IMBASAN KACA (GLASS SHINE PROTOCOL) */}
                <div className="absolute inset-0 w-[200%] h-full top-0 left-[-150%] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent -skew-x-12 transition-all duration-1000 ease-in-out group-hover:left-[100%] pointer-events-none z-20" />

                {/* Pembungkus Animasi Kandungan Dalaman Kotak */}
                <motion.div
                  variants={healthContentVariants}
                  initial="hidden"
                  whileInView="visible"
                  className="space-y-6"
                >
                  {/* Icon CPU */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, y: 15, scale: 0.8 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    transition={springConfig}
                  >
                    <Cpu size={28} className="text-red-600" />
                  </motion.div>

                  {/* Tajuk Card */}
                  <motion.h4
                    variants={{
                      hidden: { opacity: 0, x: 15 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={springConfig}
                    className="text-lg font-bold text-white uppercase font-display tracking-wider relative z-10"
                  >
                    System Core Health
                  </motion.h4>

                  {/* Deskripsi Teks */}
                  <motion.p
                    variants={healthItemFadeUp}
                    className="text-xs text-white/44 leading-relaxed font-mono relative z-10"
                  >
                    OPERATING AT PEAK EFFICIENCY, THE SYSTEM CORE COMBINES 100%
                    OPTIMIZED PRODUCTIVITY WITH ACTIVE CREATIVE PROTOCOLS TO
                    ENSURE STABLE, HIGH-OUTPUT PERFORMANCE AND SECURITY.
                  </motion.p>

                  {/* Status Bar */}
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={springConfig}
                    className="flex items-center gap-2 pt-2 relative z-10"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-green-500 uppercase tracking-widest">
                      Core Status: Overclocked
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;

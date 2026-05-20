import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Award, Globe, UserCheck, ArrowUpRight } from "lucide-react";
import { springConfig, viewportConfig } from "../constants";
import ResumeModal from "./Resume";

const DashboardCard = ({
  icon: Icon,
  title,
  description,
  value,
  progress,
  variants,
}: any) => (
  <motion.div
    variants={variants}
    whileHover={{
      y: -6,
      borderColor: "rgba(239, 68, 68, 0.4)",
      boxShadow: "0 10px 30px rgba(239, 68, 68, 0.1)",
    }}
    // Menambahkan fungsi kawalan stagger pada transisi induk bawaan
    transition={{
      ...variants?.visible?.transition,
      staggerChildren: 0.1,
      delayChildren: 0.15,
    }}
    className="relative p-6 lg:p-7 bg-black/60 backdrop-blur-2xl border border-red-500/15 rounded-xl overflow-hidden group h-full flex flex-col justify-between shadow-2xl transition-colors duration-300"
  >
    {/* Subtle Glow Effect */}
    <div className="absolute -top-12 -right-12 w-24 h-24 bg-red-600/5 blur-3xl rounded-full group-hover:bg-red-600/15 transition-all duration-700" />

    <div className="flex justify-between items-start relative z-10 w-full mb-6">
      <div className="flex flex-col gap-5">
        {/* Glowing circular icon */}
        <div className="w-11 h-11 rounded-full border border-red-500/30 flex items-center justify-center bg-red-500/5 shadow-[0_0_15px_rgba(239,68,68,0.1)] group-hover:border-red-500/50 transition-colors">
          <Icon className="w-5 h-5 text-red-500" />
        </div>
        <div>
          {/* 👇 ANIMASI: Title masuk dari KANAN */}
          <motion.h3
            variants={{
              hidden: { opacity: 0, x: 30 },
              visible: { opacity: 1, x: 0, transition: springConfig },
            }}
            className="text-white font-sans font-semibold text-[11px] tracking-[0.1em] uppercase mb-1"
          >
            {title}
          </motion.h3>

          {/* 👇 ANIMASI: Description masuk dari KIRI BAWAH */}
          <motion.p
            variants={{
              hidden: { opacity: 0, x: -30, y: 30 },
              visible: { opacity: 1, x: 0, y: 0, transition: springConfig },
            }}
            className="text-gray-500 text-[10px] leading-relaxed max-w-[150px] font-light"
          >
            {description}
          </motion.p>
        </div>
      </div>

      <div className="text-right flex flex-col items-end">
        {/* 👇 ANIMASI & RESPONSIVE: Value masuk dari KANAN ATAS & saiz dikecilkan pada mobile supaya tidak melimpah keluar */}
        <motion.span
          variants={{
            hidden: { opacity: 0, x: 30, y: -30 },
            visible: { opacity: 1, x: 0, y: 0, transition: springConfig },
          }}
          className="text-2xl xs:text-3xl sm:text-4xl font-extralight text-white leading-none tracking-tighter uppercase break-words"
        >
          {value}
        </motion.span>

        <div className="flex items-center gap-2 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444]" />
          <span className="text-[9px] font-mono text-red-500/70 uppercase tracking-widest font-bold font-sans">
            live
          </span>
        </div>
      </div>
    </div>

    {/* Bottom Section */}
    <div className="relative mt-auto pt-4">
      {/* Progress Bar Container */}
      <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-red-600 to-rose-500 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
        />
      </div>

      {/* Small diagonal arrow */}
      <ArrowUpRight className="absolute -bottom-1 -right-1 w-4 h-4 text-red-600 opacity-20 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 pointer-events-none" />
    </div>
  </motion.div>
);

const About = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section
      id="about"
      className="py-24 px-12 border-t border-red-500/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto z-30 relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={itemVariants}
          className="mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-black mb-4 flex items-center text-white italic font-display">
            <span className="text-red-600 mr-4 font-mono not-italic text-2xl tracking-tighter self-start mt-2">
              .01
            </span>{" "}
            THE LEGACY
          </h2>
          <div className="h-0.5 w-16 bg-red-600" />
        </motion.div>

        <div className="mt-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
          >
            {/* LEFT COLUMN: BIOGRAPHY & VALUE PROPOSITIONS */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-6 text-gray-300 text-sm md:text-base font-light leading-relaxed">
                <motion.p variants={itemVariants} className="text-gray-300">
                  For many years, my professional world revolved around one core
                  element: the{" "}
                  <span className="text-white font-semibold">
                    human experience
                  </span>
                  . Working in high-pressure CS environments taught me that
                  every piece of code must eventually serve a person.
                </motion.p>
                <motion.p variants={itemVariants} className="text-gray-300">
                  I spent a decade listening to users' frustrations, and I
                  realized that most problems weren't just about
                  communication—they were about inefficient, manual processes
                  that slowed everyone down. This realization sparked a fire in
                  me. I didn't just want to talk about the problems anymore; I
                  wanted to{" "}
                  <span className="text-red-500 font-semibold">
                    build the solutions
                  </span>
                  .
                </motion.p>
                <motion.p variants={itemVariants} className="text-gray-300">
                  I transitioned into development as a self-taught coder, driven
                  by a simple philosophy:{" "}
                  <span className="italic text-white">
                    Identify a bottleneck, and automate the solution.
                  </span>{" "}
                  My journey from solving customer issues to architecting
                  automation systems like{" "}
                  <span className="text-red-500 font-bold tracking-wide font-mono">
                    IqwanEngine
                  </span>{" "}
                  has given me a unique perspective. I build tools that make
                  work—and life—easier.
                </motion.p>
                <motion.p
                  variants={itemVariants}
                  className="text-gray-400 border-l-2 border-red-500/50 pl-4 py-1 italic text-xs md:text-sm leading-relaxed"
                >
                  I am now looking for my first official break in the tech
                  industry. I am entering this field with a high degree of
                  humility and a 'Junior' mindset, but with a 'Senior' level of
                  dedication. I am looking for the right team that values grit,
                  adaptability, and a relentless drive to solve real-world
                  problems.
                </motion.p>
              </div>

              {/* VALUE PROPOSITIONS */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                {/* 👇 SINKRONISASI: Diubah kepada motion.h4 untuk masuk dari atas */}
                <motion.h4
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={springConfig}
                  className="text-red-500 font-mono text-[10px] tracking-[0.2em] uppercase mb-4"
                >
                  // VALUE_PROPOSITION_RECON
                </motion.h4>

                <div className="space-y-4">
                  {[
                    {
                      title: "SELF-TAUGHT & ADAPTABLE",
                      description:
                        "Transitioned my career entirely through dedicated self-study. This journey built my resilience and a deep love for continuous growth. I embrace new technologies with genuine curiosity, adapting quickly to whatever tools best serve the team.",
                    },
                    {
                      title: "LOW EGO, HIGH DEDICATION",
                      description:
                        "I believe great work comes from collaboration, not ego. I am more than happy to start from the ground up, focusing my energy on delivering meaningful value while eagerly learning from the experience of my mentors and team members.",
                    },
                    {
                      title: "PROBLEM-FIRST MINDSET",
                      description:
                        "To me, technology is simply a tool to solve real-world challenges. I write code with a clear purpose: to remove daily friction, simplify complex workflows, and give measurable time back to your business operations.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="group border border-white/5 bg-[#030305]/60 hover:border-red-500/20 p-5 rounded-lg transition-all duration-300 shadow-lg"
                    >
                      <div className="flex items-start gap-4">
                        <div className="font-mono text-red-500 text-xs font-semibold select-none mt-0.5">
                          0{idx + 1}.
                        </div>
                        <div className="space-y-1.5">
                          <h5 className="text-white text-xs font-mono font-bold uppercase tracking-wider group-hover:text-red-400 transition-colors">
                            {item.title}
                          </h5>
                          <p className="text-gray-400 text-xs leading-relaxed font-light">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: PROTECTED STATS & ACTION BUTTON */}
            <div className="lg:col-span-5 space-y-8 relative self-stretch flex flex-col justify-between">
              {/* Background Grid Accent */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.03)_0%,transparent_70%)] pointer-events-none" />

              <div className="space-y-6">
                {/* 👇 SINKRONISASI: Diselaraskan y: -20 (bukan -40) supaya kejatuhan tajuk seiring dengan lajur kiri */}
                <motion.h4
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportConfig}
                  transition={springConfig}
                  className="text-red-500 font-mono text-[10px] tracking-[0.2em] uppercase"
                >
                  // SYSTEM_METRICS_DASHBOARD
                </motion.h4>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10"
                >
                  {[
                    {
                      icon: Globe,
                      title: "EXPERIENCE",
                      description:
                        "Professional fullstack & automation engineering journey.",
                      value: "2+",
                      progress: 85,
                    },
                    {
                      icon: Code2,
                      title: "OPS MASTERY",
                      description:
                        "500+ daily legacy & operations tasks auto-piloted.",
                      value: "100%",
                      progress: 95,
                    },
                    {
                      icon: UserCheck,
                      title: "STATUS",
                      description:
                        "Active system core link, optimized & secure.",
                      value: "ONLINE",
                      progress: 100,
                    },
                    {
                      icon: Award,
                      title: "EFFICIENCY",
                      description:
                        "Pre-screen bot and neural channels fully calibrated.",
                      value: "99%",
                      progress: 99,
                    },
                  ].map((stat, idx) => (
                    <div key={idx} className="h-full">
                      <DashboardCard {...stat} variants={itemVariants} />
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* HEARTBEAT ANIMATED RESUME TRIGGER BUTTON */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={viewportConfig}
                // 1. KAWALAN DENYUTAN (HEARTBEAT) MENGGUNAKAN FRAMER MOTION PADA INDUK
                animate={{
                  scale: [1, 1.03, 1, 1.02, 1],
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
                // 2. KAWALAN HOVER: Mengecil serentak (Skala hover akan mengatasi denyutan buat sementara)
                whileHover={{
                  scale: 0.96,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="w-full flex justify-center pt-6 lg:pt-0 relative group overflow-hidden"
              >
                {/* Bingkai Double Layer Luaran */}
                <div className="p-1 border border-red-500/20 bg-red-500/[0.02] rounded-sm w-full relative overflow-hidden">
                  {/* EFEK CAHAYA MEMANCAR SERENTAK DARI TENGAH (CENTER EXPANSION GLOW) */}
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-[300%] bg-gradient-to-r from-red-600/20 via-red-500/40 to-red-600/20 blur-xl opacity-0 group-hover:w-[150%] group-hover:opacity-100 transition-all duration-500 ease-out pointer-events-none z-0" />

                  {/* LAPISAN IMBASAN KACA (GLASS SHINE EFFECTS) */}
                  <div className="absolute inset-0 w-[200%] h-full top-0 left-[-150%] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent -skew-x-12 transition-all duration-1000 ease-in-out group-hover:left-[100%] pointer-events-none z-20" />

                  {/* KOTAK DALAM (INNER LAYER / BUTTON): Bersih tanpa 'animate-heartbeat' CSS */}
                  <button
                    onClick={() => setIsResumeOpen(true)}
                    className="relative w-full px-8 py-5 bg-black/80 border border-red-500/40 font-mono text-xs tracking-[0.3em] uppercase text-red-500 overflow-hidden transition-all duration-300 hover:text-white hover:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 cursor-pointer z-10"
                  >
                    {/* Background Glow Semasa Hover */}
                    <span className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Teks Butang */}
                    <span className="relative z-10">
                      ACCESS_RECON_FILE // RESUME
                    </span>
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <style>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); box-shadow: 0 0 15px rgba(239,68,68,0.1); }
          25% { transform: scale(1.05); box-shadow: 0 0 25px rgba(239,68,68,0.3); }
          40% { transform: scale(1); }
          55% { transform: scale(1.03); box-shadow: 0 0 20px rgba(239,68,68,0.25); }
        }
        .animate-heartbeat {
          animation: heartbeat 2s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default About;

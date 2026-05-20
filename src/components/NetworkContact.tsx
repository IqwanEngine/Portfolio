import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Instagram,
  MessageCircle,
  Music2,
  Send,
  User,
  Mail,
  MessageSquare,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { springConfig, viewportConfig } from "../constants";
import AIRecruiter from "./AIRecruiter";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/IqwanEngine",
    color: "hover:text-white",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/iqwanengine-automation/",
    color: "hover:text-blue-400",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    href: "https://wa.me/60172135172",
    color: "hover:text-green-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/hairul_iqwan",
    color: "hover:text-pink-500",
  },
  {
    name: "TikTok",
    icon: Music2,
    href: "https://tiktok.com/@hi_rhyno",
    color: "hover:text-cyan-400",
  },
];

const MOCK_COMMENTS = [
  {
    name: "Sarah Khadijah",
    message:
      "Uiish lawa gila UI design dia! Effect CRT tu terpaling win, nampak aesthetic sangat. 😍",
  },
  {
    name: "Hackerrrr",
    message: "Perhh nak inspect element pon tak boleh.",
  },
  {
    name: "Qistina",
    message: "Bang ajar saya boleh tak.",
  },
  {
    name: "Syafiq Rusli",
    message:
      "Hai, saya dari Indonesia. Sumpah puas hati tgk workflow dia, 10/10.",
  },
  {
    name: "Sr. Ridzuan",
    message:
      "Code kemas, design pun nampak high-end & mahal. Kerja memang kemas bro, terbaik!",
  },
  {
    name: "Elena Natasha",
    message: "Lawaaa nya! Nampak garang tapi still professional.",
  },
  {
    name: "Jep (Encik Jep)",
    message: "Lain macam. Workflow dia auto-pilot terus, jimat banyak masa!",
  },
];

const truncateWords = (text: string, count: number) => {
  const words = text.split(" ");
  if (words.length <= count) return text;
  return words.slice(0, count).join(" ") + "...";
};

const NetworkContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isEmailTouched = formData.email.trim() !== "";
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim());
  const isEmailInvalid = isEmailTouched && !isEmailValid;

  const isFormValid =
    formData.name.trim() !== "" && formData.email.trim() !== "" && isEmailValid;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Strict client-side check to block event and prevent network communication
    if (!isFormValid || isSubmitting || !isEmailValid) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "SUCCESS") {
        setIsSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error(data.message || "Endpoint rejected packet.");
      }
    } catch (error: any) {
      console.error("Feedback submission failed:", error);
      setSubmitError(
        error.message || "Transmission pipeline failed to respond.",
      );
      setTimeout(() => setSubmitError(""), 10000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="network"
      className="py-24 px-6 md:px-12 relative overflow-hidden bg-black/40"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          className="mb-16 text-center lg:text-left"
        >
          <div className="inline-flex flex-col items-center lg:items-start mb-6">
            <span className="text-red-500 font-mono text-xs tracking-[0.4em] uppercase mb-4">
              Network_Channel // SECURE
            </span>
            <div className="h-[1px] w-12 bg-red-600" />
          </div>
          <h2 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase font-display">
            COMMAND <span className="text-red-600 not-italic">&</span> CONNECT
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-8 h-full">
            {/* Social Media Box dengan Kotak Bergerak */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              className="p-8 bg-black/60 backdrop-blur-xl border border-red-500/20 rounded-2xl shadow-2xl relative overflow-hidden group"
            >
              {/* Lapisan background kotak-kotak bergerak */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen custom-grid-animate"
                style={{
                  backgroundImage: `
                      linear-gradient(to right, rgba(239, 68, 68, 0.25) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(239, 68, 68, 0.25) 1px, transparent 1px)
                    `,
                  backgroundSize: "24px 24px",
                }}
              />
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full pointer-events-none" />

              <div className="relative z-10 w-full flex flex-col items-center">
                <h3 className="text-white font-mono text-[10px] tracking-[0.3em] uppercase mb-8 opacity-60 text-center w-full">
                  System_Identity // Links
                </h3>
                <div className="flex flex-wrap gap-6 justify-center w-full">
                  {SOCIAL_LINKS.map((social, idx) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        x: [
                          0,
                          Math.random() * 10 - 5,
                          Math.random() * 10 - 5,
                          0,
                        ],
                        y: [
                          0,
                          Math.random() * 10 - 5,
                          Math.random() * 10 - 5,
                          0,
                        ],
                      }}
                      viewport={{ once: false }}
                      transition={{
                        delay: idx * 0.1,
                        x: {
                          duration: 3 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        y: {
                          duration: 4 + Math.random() * 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        default: springConfig,
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { duration: 0.2 },
                      }}
                      className={`p-4 bg-white/5 border border-white/10 rounded-xl transition-all duration-300 ${social.color} group/icon relative`}
                    >
                      <social.icon className="w-6 h-6 transition-transform group-hover/icon:rotate-12" />
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-mono opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap">
                        {social.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* AI Recruiter Scaled Box */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.2 }}
              className="flex-1 min-h-[400px] relative"
            >
              <div className="h-full overflow-y-auto custom-scrollbar p-1">
                <AIRecruiter isEmbedded={true} />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-8 h-full">
            {/* Feedback Form Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              className="p-8 bg-black/60 backdrop-blur-xl border border-red-500/20 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-600/5 blur-3xl rounded-full" />
              <h3 className="text-white font-mono text-[10px] tracking-[0.3em] uppercase mb-8 opacity-60">
                Comment // Feedback
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">
                      Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-red-500/40" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all"
                        placeholder="Operator Name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${isEmailInvalid ? "text-red-500" : "text-red-500/40"}`}
                      />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={`w-full bg-white/5 border rounded-lg py-4 pl-12 pr-4 text-white text-sm focus:outline-none transition-all duration-300 ${
                          isEmailInvalid
                            ? "border-red-600 focus:border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.25)] ring-1 ring-red-500"
                            : "border-white/10 focus:border-red-500/50"
                        }`}
                        placeholder="neural@link.io"
                      />
                    </div>
                    {isEmailInvalid && (
                      <div className="text-[9px] font-mono text-red-500 tracking-wider pt-1.5 pl-1 animate-pulse">
                        [ERROR: INVALID_EMAIL_FORMAT]
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest pl-1">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-red-500/40" />
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-red-500/50 transition-all resize-none"
                      placeholder="Leave your comments or feedback here..."
                    />
                  </div>
                </div>

                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 bg-red-950/25 border border-red-500/35 text-red-400 font-mono text-[10px] uppercase tracking-widest rounded-lg flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span>[SYSTEM_REJECT]: {submitError}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={!isFormValid || isSubmitting}
                  className={`w-full py-5 rounded-lg font-mono text-[11px] tracking-[0.3em] uppercase flex items-center justify-center gap-3 transition-all duration-500 relative overflow-hidden ${
                    isFormValid
                      ? "bg-red-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] hover:scale-[1.02] cursor-pointer"
                      : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isSubmitting ? (
                      <motion.div
                        key="submitting"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2"
                      >
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </motion.div>
                    ) : isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          filter: [
                            "drop-shadow(0 0 0px #ef4444)",
                            "drop-shadow(0 0 15px #ef4444)",
                            "drop-shadow(0 0 0px #ef4444)",
                          ],
                        }}
                        transition={{
                          opacity: { duration: 0.2 },
                          filter: { repeat: Infinity, duration: 2 },
                        }}
                        className="text-red-100 font-bold tracking-[0.4em] animate-pulse-slow"
                      >
                        TRANSMISSION_COMPLETE
                      </motion.div>
                    ) : (
                      <motion.div
                        key={isFormValid ? "valid" : "invalid"}
                        initial={
                          isFormValid ? { opacity: 0, y: 15 } : { opacity: 0 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="flex items-center gap-3"
                      >
                        POST_COMMENT <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </form>
            </motion.div>

            {/* Live Comments Marquee Box */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportConfig}
              transition={{ delay: 0.2 }}
              className="h-[250px] flex-shrink-0 p-8 bg-black/60 backdrop-blur-xl border border-red-500/20 rounded-2xl shadow-2xl relative overflow-hidden"
            >
              <h3 className="text-white font-mono text-[10px] tracking-[0.3em] uppercase mb-6 opacity-60">
                System_Bridge // Live_Feed
              </h3>

              <div className="h-[200px] overflow-hidden relative mask-fade-y">
                <div className="animate-marquee-vertical flex flex-col gap-4">
                  {[...MOCK_COMMENTS, ...MOCK_COMMENTS].map((comment, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-white/5 border border-white/5 rounded-lg"
                    >
                      <p className="text-[11px] font-mono text-red-500 mb-1">
                        {comment.name}:
                      </p>
                      <p className="text-xs text-gray-400 italic">
                        "{truncateWords(comment.message, 4)}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
              /* --- EFEK ANIMASI GRID ZOOM OUT --- */
              @keyframes gridZoomOut {
                0% {
                  background-size: 36px 36px;
                  opacity: 0.25;
                }
                50% {
                  opacity: 0.15;
                }
                100% {
                  background-size: 18px 18px;
                  opacity: 0.25;
                }
              }

              .custom-grid-animate {
                animation: gridZoomOut 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
              }

              .mask-fade-y {
                mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
              }

              @keyframes marquee-vertical {
                0% { transform: translateY(0); }
                100% { transform: translateY(-50%); }
              }

              @keyframes pulse-slow {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
              }

              .animate-pulse-slow {
                animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
              }

              .animate-marquee-vertical {
                animation: marquee-vertical 20s linear infinite;
              }

              .animate-marquee-vertical:hover {
                animation-play-state: paused;
              }

              .custom-scrollbar::-webkit-scrollbar {
                width: 3px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(0, 0, 0, 0.2);
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(239, 68, 68, 0.3);
                border-radius: 10px;
              }
            `}</style>
    </section>
  );
};

export default NetworkContact;

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, AlertCircle, Bot, Send } from "lucide-react";
import { springConfig, viewportConfig } from "../constants";

interface AIRecruiterProps {
  isEmbedded?: boolean;
}

const AIRecruiter: React.FC<AIRecruiterProps> = ({ isEmbedded = false }) => {
  const [step, setStep] = useState<string>("IDLE");
  const [messages, setMessages] = useState<
    { role: "ai" | "user"; text: string }[]
  >([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  {
    /* KAWALAN PEMOTONGAN: Ref untuk memanipulasi garis masa video .mp4 baharu */
  }
  const videoRef = useRef<HTMLVideoElement>(null);

  const startSession = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStep("START");
    setMessages([
      {
        role: "ai",
        text: "IqwanEngine Core Neural Link activated. System monitoring initialized. How may I assist you today?",
      },
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const addMessage = (role: "ai" | "user", text: string) => {
    setMessages((prev) => [...prev, { role, text }]);
  };

  const handleAction = async (
    actionText: string,
    nextStep: string,
    aiResponse?: string,
  ) => {
    addMessage("user", actionText);
    setStep(nextStep);

    if (aiResponse) {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      addMessage("ai", aiResponse);
      setIsLoading(false);
    }
  };

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const currentInput = inputValue;
    setInputValue("");
    addMessage("user", currentInput);

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (step === "HIRE_1") {
      setStep("HIRE_2");
      addMessage(
        "ai",
        "Thank you. Could you also provide your professional email address? Iqwan will review your profile and reach out within 24 hours.",
      );
    } else if (step === "HIRE_2") {
      setStep("ENDED");
      addMessage(
        "ai",
        "Your details have been securely logged. Thank you for your time and interest. Have a great day ahead! (Session Ended)",
      );
    } else if (step === "B1_1") {
      setStep("B1_2");
      addMessage(
        "ai",
        "Your details have been successfully recorded. Iqwan will be in touch within 24 hours. Is there anything else I can assist you with?",
      );
    } else if (step === "B1_2") {
      setStep("ENDED");
      addMessage(
        "ai",
        "Understood. Thank you for visiting, and have a wonderful day! (Session Ended)",
      );
    } else if (step === "B2_1") {
      setStep("B2_2");
      addMessage(
        "ai",
        "That sounds like a fantastic concept. Could you please provide your email address so we can send the preliminary quotation?",
      );
    } else if (step === "B2_2") {
      setStep("B2_3");
      addMessage(
        "ai",
        "Thank you for providing the details. Iqwan will review your request and contact you within 48 hours. Is there anything else I can help with?",
      );
    } else if (step === "B2_3") {
      setStep("ENDED");
      addMessage(
        "ai",
        "Noted. Thank you for your time, and have a great day! (Session Ended)",
      );
    }

    setIsLoading(false);
  };

  const renderOptions = () => {
    if (isLoading && step !== "IDLE") return null;

    if (step === "IDLE") {
      return (
        <button
          onClick={startSession}
          disabled={isLoading}
          className="w-full py-4 bg-red-600 text-white rounded-lg font-mono text-[11px] tracking-[0.4em] uppercase shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>Connecting...</span>
            </>
          ) : (
            <span>[ START_CONNECTION ]</span>
          )}
        </button>
      );
    }

    if (step === "START") {
      return (
        <div className="flex flex-col gap-2">
          <button
            onClick={() =>
              handleAction(
                "I am interested in hiring Iqwan.",
                "HIRE_1",
                "Excellent. May I please have the name of your organization?",
              )
            }
            className="w-full p-3 text-left bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 rounded-lg text-white text-[11px] font-mono transition-all"
          >
            [ OPTION_A ] I am interested in hiring Iqwan.
          </button>
          <button
            onClick={() =>
              handleAction(
                "I would like to request a custom portfolio build.",
                "PORTFOLIO_OPTIONS",
                "I see. How would you like to proceed?",
              )
            }
            className="w-full p-3 text-left bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-white/70 text-[11px] font-mono transition-all"
          >
            [ OPTION_B ] I would like to request a custom portfolio build.
          </button>
        </div>
      );
    }

    if (step === "PORTFOLIO_OPTIONS") {
      return (
        <div className="flex flex-col gap-2">
          <button
            onClick={() =>
              handleAction(
                "I prefer to contact Iqwan directly",
                "B1_1",
                "Certainly. You can reach Iqwan directly at +60172135172. Alternatively, please leave your email address below, and he will contact you.",
              )
            }
            className="w-full p-3 text-left bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 rounded-lg text-white text-[11px] font-mono transition-all"
          >
            [ SUB_A ] I prefer to contact Iqwan directly
          </button>
          <button
            onClick={() =>
              handleAction(
                "I would like to request a quotation first",
                "B2_1",
                "Great! To help us prepare an accurate quotation, could you briefly describe your preferred design style or technical requirements?",
              )
            }
            className="w-full p-3 text-left bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg text-white/70 text-[11px] font-mono transition-all"
          >
            [ SUB_B ] I would like to request a quotation first
          </button>
        </div>
      );
    }

    if (step === "ENDED") {
      return (
        <button
          onClick={() => {
            setStep("START");
            setMessages([
              {
                role: "ai",
                text: "Session reset. How may I assist you today?",
              },
            ]);
          }}
          className="w-full p-3 bg-red-600/20 border border-red-600/40 hover:bg-red-600/30 rounded-lg text-red-500 text-[10px] font-mono uppercase tracking-widest text-center transition-all"
        >
          RE-INITIALIZE SESSION
        </button>
      );
    }

    return (
      <form onSubmit={handleInputSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Terminal Input..."
          className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 transition-all pr-12 text-[11px] font-sans"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-red-600 hover:bg-red-500 text-white rounded-md transition-colors"
        >
          <Send className="w-3 h-3" />
        </button>
      </form>
    );
  };

  const content = (
    <div
      className={`${isEmbedded ? "w-full" : "max-w-4xl mx-auto"} z-10 relative bg-transparent border-none shadow-none`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportConfig}
        transition={springConfig}
        className={`text-center ${isEmbedded ? "mb-6" : "mb-12"}`}
      >
        <h2
          className={`${isEmbedded ? "text-3xl" : "text-5xl lg:text-7xl"} font-black mb-4 text-white italic tracking-tighter font-display uppercase text-center`}
        >
          CHATBOT{" "}
          <span className="inline-block text-3XL not-italic text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-red-400 to-red-600 bg-[length:200%_auto] animate-[shineRight_5s_ease-in-out_infinite]">
            PRE-SCREEN
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportConfig}
        transition={springConfig}
        className="glass-card-crimson rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.1)] border-white/5"
      >
        <div
          className={`p-4 bg-white/5 border-b border-red-500/10 flex items-center space-x-3`}
        >
          <div className="flex flex-row items-center justify-center gap-2 w-full">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            <div className="text-[10px] font-mono text-red-500/80 uppercase tracking-widest">
              IQWANENGINE_AI // CHAT_PROTOCOL_V2
            </div>
          </div>
        </div>

        {/* KAWASAN KUNING: KONTAINER KANDUNGAN UTAMA */}
        <div
          className={`${isEmbedded ? "p-4" : "p-6"} min-h-[350px] flex flex-col relative overflow-hidden`}
        >
          {/* Latar Belakang Fail Video MP4 Standard Web (Kebel & Smooth) */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            onLoadedMetadata={() => {
              if (videoRef.current) {
                // Melompat 1 saat intro awal secara dinamik
                videoRef.current.currentTime = 1.0;
              }
            }}
            onTimeUpdate={() => {
              if (videoRef.current && videoRef.current.currentTime < 1.0) {
                // Mengelakkan intro berulang semasa gelung (loop) video reset
                videoRef.current.currentTime = 1.0;
              }
            }}
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none z-0 mix-blend-screen"
          >
            <source src="assets/IE RED.MP4" type="video/mp4" />
          </video>

          {/* Tapis Lapisan Gelap untuk Keterbacaan Teks */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/50 z-5 pointer-events-none" />

          {/* Paparan Mesej / Aliran Chat (z-10) */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-thin scrollbar-thumb-white/10 max-h-[400px] pr-2 relative z-10"
          >
            <AnimatePresence mode="popLayout">
              {messages.length === 0 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full min-h-[220px] flex items-start justify-center text-center px-8 pt-6"
                >
                  <div className="p-6 rounded-xl border border-white/5 bg-black/50 backdrop-blur-sm max-w-xs shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                    <p className="text-[7px] font-mono uppercase tracking-[0.2em] text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                      [SYSTEM] TAP TO START_CONNECTION...
                    </p>
                  </div>
                </motion.div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "ai" ? -10 : 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === "ai" ? "justify-start" : "justify-end"}`}
                >
                  <div className={`flex items-start gap-3 max-w-[85%]`}>
                    {msg.role === "ai" && (
                      <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`p-3 rounded-xl text-[11px] leading-relaxed font-sans ${
                        msg.role === "ai"
                          ? "bg-white/5 border border-white/10 text-slate-300 rounded-tl-none shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
                          : "bg-red-600 text-white rounded-tr-none shadow-[0_4px_15px_rgba(239,68,68,0.2)]"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center gap-2"
                >
                  <div className="w-6 h-6 rounded bg-red-600/20 flex items-center justify-center">
                    <Loader2 className="w-3 h-3 text-red-500 animate-spin" />
                  </div>
                  <span className="text-[10px] font-mono text-red-500/50 animate-pulse uppercase tracking-widest">
                    Processing_Link...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bahagian Butang / Input Terminal (z-10) */}
          <div className="mt-auto relative z-10">{renderOptions()}</div>
        </div>
      </motion.div>
    </div>
  );

  if (isEmbedded) return content;

  return (
    <section
      id="recruiter"
      className="py-24 px-12 relative overflow-hidden bg-black/20"
    >
      {content}
    </section>
  );
};

export default AIRecruiter;

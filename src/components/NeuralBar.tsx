import React from "react";
import { motion } from "motion/react";
import { viewportConfig } from "../constants";

interface NeuralBarProps {
  name: string;
  level: number;
  index: number;
  icon: any;
}

const NeuralBar: React.FC<NeuralBarProps> = ({ name, level, index, icon: Icon }) => {
  // Dynamically vary speeds based on index so each bar feels unique
  const plasmaSpeed = 5 + index * 1.5;
  const streakSpeed = 1.8 + index * 0.4;

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Icon size={16} className="text-red-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="text-xs font-bold text-white uppercase tracking-widest">{name}</span>
        </div>
        <span className="text-[11px] font-mono text-red-500 font-black tracking-wider">{level}%</span>
      </div>
      
      <div className="h-3 w-full bg-black/40 border border-white/5 rounded-none relative overflow-hidden p-[1px]">
        {/* Fill wrapper that scales on view */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={viewportConfig}
          transition={{ duration: 1.8, ease: "circOut" }}
          className="h-full bg-red-950/40 rounded-none relative overflow-hidden"
          style={{ width: `${level}%` }}
        >
          {/* Main filled bar with plasma background shift */}
          <div 
            className="absolute inset-0 select-none"
            style={{
              background: "linear-gradient(90deg, #7f1d1d, #ef4444, #b91c1c, #ec4899, #7f1d1d)",
              backgroundSize: "300% 100%",
              animation: `plasmaShift ${plasmaSpeed}s ease-in-out infinite`,
              boxShadow: "0 0 10px rgba(239,68,68,0.3)"
            }}
          />

          {/* Rapid Laser Streak Effect */}
          <div 
            className="absolute top-0 bottom-0 w-24 opacity-85 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(95deg, transparent, rgba(255,255,255,0) 20%, #ef4444 50%, rgba(255,255,255,0.8) 55%, #ef4444 60%, transparent 80%)",
              animation: `laserStreak ${streakSpeed}s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
            }}
          />

          {/* Spark at absolute leading edge */}
          <div 
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-full bg-white flex items-center justify-center pointer-events-none"
            style={{ zIndex: 10 }}
          >
            {/* Pulsing Core */}
            <div className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_12px_#fff,0_0_24px_#ef4444] animate-ping" />
            <div className="absolute w-[4px] h-[4px] bg-white rounded-full shadow-[0_0_6px_#fff,0_0_12px_#ef4444]" />
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes plasmaShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes laserStreak {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(350%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

export default NeuralBar;

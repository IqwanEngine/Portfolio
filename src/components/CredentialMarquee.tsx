import React from "react";
import { motion } from "motion/react";

interface CredentialMarqueeProps {
  items: string[];
}

const CredentialMarquee = ({ items }: CredentialMarqueeProps) => {
  return (
    <div 
      className="relative overflow-hidden py-4"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
      }}
    >
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-8 w-fit whitespace-nowrap"
      >
        {[...items, ...items].map((cert, index) => (
          <div 
            key={index}
            className="px-8 py-4 bg-white/5 border border-white/10 text-[12px] font-mono text-white/60 uppercase tracking-widest hover:border-red-500/30 hover:text-white transition-all cursor-default"
          >
            <span className="text-red-500 mr-4 font-black">#</span>
            {cert}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default CredentialMarquee;

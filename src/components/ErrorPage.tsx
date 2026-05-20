import React from "react";
import { motion } from "motion/react";
import { ShieldAlert, RefreshCw } from "lucide-react";

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#030305] flex items-center justify-center p-6 selection:bg-red-500/30 selection:text-white">
      {/* Background Grids */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      
      <div className="relative z-10 max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glowing Icon */}
          <div className="relative flex justify-center mb-8">
            <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20 animate-pulse" />
            <div className="w-16 h-16 rounded-full border border-red-500/30 bg-black flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.1)]">
              <ShieldAlert className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-white font-mono text-[10px] tracking-[0.5em] uppercase mb-4 opacity-50">
            Critical_System_Interrupt // 500
          </h1>
          
          <p className="text-xl md:text-2xl text-white font-display italic tracking-tighter uppercase mb-8 leading-relaxed max-w-md mx-auto">
            IqwanEngine is recalibrating its neural network. Please try again later.
          </p>

          <div className="h-[1px] w-12 bg-red-600 mx-auto mb-10" />

          {/* Action */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            whileInView={{
              x: [0, 1, -1, 0.5, 0],
              y: [0, -1, 1, -0.5, 0]
            }}
            viewport={{ once: false }}
            transition={{
              x: { duration: 3, repeat: Infinity, ease: "easeInOut" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              default: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
            }}
            onClick={() => window.location.reload()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white tracking-[0.3em] uppercase hover:bg-white/10 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <RefreshCw className="w-3 h-3 text-red-500 group-hover:rotate-180 transition-transform duration-700" />
            Restart_Session
          </motion.button>
        </motion.div>

        {/* Footer info */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1 }}
          className="mt-20 font-mono text-[8px] text-white/50 tracking-widest uppercase"
        >
          Neural_Core: Crimson_Recon_V4 // Status: Offline
        </motion.div>
      </div>
    </div>
  );
};

export default ErrorPage;

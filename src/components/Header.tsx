import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Code2, Layout, User, Layers, Smile } from "lucide-react";
import { springConfig } from "../constants";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "System", icon: Layout, href: "#hero" },
    { name: "Legacy", icon: User, href: "#about" },
    { name: "Showcase", icon: Layers, href: "#showcase" },
    { name: "It's Me", icon: Smile, href: "#network" },
  ];

  const containerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ...springConfig,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: springConfig },
  };

  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/10 py-4" : "py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-12 flex items-center justify-between">
        {/* Logo - Far Left */}
        <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center rounded-sm rotate-45 group-hover:rotate-0 transition-transform duration-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <Code2 className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white">
            IQWAN<span className="text-red-500 font-black">ENGINE</span>
          </span>
        </div>

        {/* Nav Items - Far Right */}
        <div className="flex items-center space-x-12">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              variants={itemVariants}
              className="relative group flex items-center space-x-2 text-[10px] font-mono font-bold tracking-[0.3em] text-white/50 hover:text-white transition-all uppercase cursor-pointer py-1"
            >
              <span>{item.name}</span>
              <motion.div 
                className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-600 group-hover:w-full transition-all duration-500 ease-in-out" 
                layout
              />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Header;

import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Showcase from "./components/Showcase";
import NetworkContact from "./components/NetworkContact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen selection:bg-red-500/30 selection:text-white bg-[#050005]">
      {/* Background Layer */}
      <div className="editorial-bg" />
      <div className="scanline-overlay" />
      
      {/* Modular Components */}
      <Header />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Showcase />
        <NetworkContact />
      </main>
      
      <Footer />
    </div>
  );
}

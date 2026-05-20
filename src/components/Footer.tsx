import React, { useState, useEffect } from "react";

const Footer = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [ipAddress, setIpAddress] = useState("FETCHING_CORE_IP...");

  useEffect(() => {
    // 1. Live Clock Timer
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);

    // 2. Fetch Live IP Address (Menggunakan API Percuma)
    const fetchUserIP = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        // Memastikan data IP wujud sebelum set state
        if (data.ip) {
          setIpAddress(`IP: ${data.ip}`);
        } else {
          setIpAddress("IP: ENDPOINT_OFFLINE");
        }
      } catch (error) {
        console.error("Gagal mendapatkan Live IP:", error);
        setIpAddress("IP: SECURE_LOCAL_NODE");
      }
    };

    fetchUserIP();

    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="h-12 px-12 flex items-center justify-between border-t border-white/5 text-[9px] font-mono text-white/30 uppercase tracking-[0.2em] bg-[#050005] relative z-20">
      <div className="flex gap-4">
        <span>Cyberjaya, Malaysia // UTC +8</span>
        <span className="text-red-500/50">{time}</span>
      </div>
      <div className="hidden md:flex gap-8">
        {/* Bahagian ini sekarang dinamik memaparkan IP Address pelawat secara Live */}
        <span className="text-red-500/40 animate-pulse">{ipAddress}</span>
      </div>
    </footer>
  );
};

export default Footer;
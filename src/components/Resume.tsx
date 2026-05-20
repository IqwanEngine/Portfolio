import React, { useState } from "react";
import { X, Terminal, Cpu, Zap, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import BlockchainCanvas from "./BlockchainCanvas";

interface Job {
  company: string;
  role: string;
  period: string;
  skills: string[];
  scope: string[];
  system: string;
}

const experienceData: Job[] = [
  {
    company: "Concentrix CX Malaysia",
    role: "Lead Workflow Architect & Customer Operations Specialist",
    period: "2023 – PRESENT",
    skills: [
      "Advanced Google Apps Script",
      "Automation System Design",
      "Real-Time Data Analytics",
      "UI/UX Engineering",
      "Technical Mentorship",
    ],
    scope: [
      "Engineered a full-suite Automation Web App that automates ticket lifecycle: auto-word conversion, email generation, and case categorization (Symptom/Root Cause/Ops).",
      "Revolutionized information accessibility by building a centralized Knowledge Base (KB) portal, reducing information retrieval time by 80%.",
      "Architected automated RTA and Team Leader (TL) oversight tools for real-time backlog clearance and automated performance calculation via Google Apps Script.",
      "Deployed dynamic CSAT/DSAT dashboards for agent-level tracking, providing monthly trend analysis and specific recovery targets to maintain service quality.",
      "Developed real-time DSAT detection tools, slashing ticket processing efficiency from minutes to seconds through automated email solutions.",
      "Spearheaded technical onboarding for new recruits, accelerating proficiency and tool mastery through proprietary training modules and automation assets.",
    ],
    system:
      "Google Workspace Ecosystem (GAS), Looker Studio, CX Operational Tools",
  },
  {
    company: "Alpha Engineering (Independent Sub-contractor)",
    role: "Managing Director & Operations Principal",
    period: "2022 – 2023",
    skills: [
      "Fiber Optic Splicing & Infrastructure",
      "Strategic Team Leadership (8 Pax)",
      "Financial & Payroll Management",
      "Blueprint & Roadmap Analysis",
      "Stakeholder Scaling & Liaison",
    ],
    scope: [
      "Established and spearheaded an independent sub-contracting firm, managing end-to-end telecommunications infrastructure projects for TM.",
      "Orchestrated high-level technical meetings and scaling strategies, interpreting complex blueprints and roadmaps for fiber deployment.",
      "Directed and mentored a team of 8 technical personnel, including specialized training for interns in fiber internet splicing and site operations.",
      "Overlooked comprehensive business finances, including payroll administration, capital management, and operational resource allocation.",
    ],
    system:
      "TM Infrastructure Blueprints, Splicing Equipment, Enterprise Financial Tools",
  },
  {
    company: "Reka Advisory (Global Capital Market Asia)",
    role: "Strategic Account Manager & Trading Performance Coach",
    period: "2019 – 2022",
    skills: [
      "Trading Systems & Risk Mgmt",
      "Marketing Automation",
      "WhatsApp/Social Media Blasting",
      "Trading Psychology",
      "CRM Strategy",
    ],
    scope: [
      "Mentored and coached clients on professional trading systems, emphasizing rigorous risk management and psychological discipline to ensure consistent profitability.",
      "Engineered automated sales funnels using WhatsApp blasting and social media automation, integrating creative content editing for scalable lead generation.",
      "Provided high-intensity coaching and 24-hour market monitoring synchronized with the US Market to optimize trade execution and client account growth.",
      "Utilized CRM systems and automated blasting tools to convert market analysis into actionable sales opportunities and long-term account retention.",
    ],
    system: "CRM, WhatsApp Automation Suite, Meta Business Suite, MT4/MT5",
  },
  {
    company: "Maxis Consumer",
    role: "Retention Specialist & Consumer Sales Consultant",
    period: "2018 – 2019",
    skills: [
      "Customer Retention (Win-Back)",
      "Telemarketing Excellence",
      "Fiber Solution Sales",
      "Needs-Analysis & Sales Strategy",
      "Objection Handling",
    ],
    scope: [
      "Operated within a dual-function role covering Customer Service and Telemarketing to drive high-impact consumer engagement.",
      "Specialized in the Retention Department, executing strategic 'counter-back' maneuvers to successfully recover and retain customers planning to churn.",
      "Spearheaded sales for Maxis Fiber products by identifying consumer pain points and matching them with high-speed connectivity solutions.",
      "Mastered high-volume inquiry handling and sales conversion through targeted needs-analysis and persuasive communication techniques.",
    ],
    system:
      "CRM Platforms, Telemarketing Analytics, Maxis Internal Provisioning Tools",
  },
  {
    company: "Touch Me Travel & Tour Sdn Bhd",
    role: "Lead Operations, Sales & Finance Associate",
    period: "2017 – 2018",
    skills: [
      "GDS (Galileo)",
      "Financial Calculation & Invoicing",
      "Umrah & Group Logistics",
      "Digital Presentation & Editing",
      "Account Management",
    ],
    scope: [
      "Orchestrated end-to-end reservations for specialized Umrah and large-scale group packages using Galileo GDS.",
      "Managed departmental accounts, including precise sales calculations, financial reporting, and invoice generation for corporate clients.",
      "Designed high-impact marketing presentations and promotional materials using Microsoft Suite and editing software to drive package sales.",
      "Collaborated across Tour, Ticketing, and Sales departments to ensure seamless operational flow and financial reconciliation.",
    ],
    system:
      "Galileo, Microsoft Office (Excel/PPT), Editing Software, Master System (Accounting)",
  },
  {
    company: "Smart World Travel & Tours Sdn Bhd",
    role: "GDS Operations & Digital Content Strategist",
    period: "2016 – 2017",
    skills: [
      "Government Ticketing Liaison",
      "GDS (Amadeus)",
      "Digital Marketing & Copywriting",
      "Hotel Procurement",
      "Website Administration",
    ],
    scope: [
      "Executed high-precision international flight ticketing and reservations specifically for government sectors using Amadeus GDS.",
      "Managed end-to-end hotel procurement and holistic tour package development to ensure competitive market positioning.",
      "Spearheaded the company's digital presence through strategic website management and high-conversion copywriting for promotional campaigns.",
      "Optimized internal booking workflows to ensure operational excellence and seamless coordination of international travel logistics.",
    ],
    system: "Amadeus, CMS Platforms, Marketing Analytics Tools",
  },
  {
    company: "Via Vacation And Travel Sdn Bhd",
    role: "Lead Travel Consultant & Digital Operations (Startup Pioneer)",
    period: "2015 – 2016",
    skills: [
      "Full-Stack Operations",
      "Web Management",
      "Social Media Marketing",
      "Multi-channel CRM",
      "GDS (Galileo)",
    ],
    scope: [
      "Acted as the sole pioneer agent, managing the end-to-end lifecycle of travel packages and tourism operations for a startup environment.",
      "Orchestrated the company's entire digital presence, including website administration and Facebook page growth strategies.",
      "Managed high-volume customer inquiries across multiple channels (WhatsApp, Social Media, and Web) to maximize lead conversion.",
      "Formulated data-driven marketing strategies that significantly expanded the company's market reach from the ground up.",
    ],
    system: "Galileo, Facebook Business Suite, CMS, WhatsApp Business API",
  },
];

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-6 lg:p-12">
      {/* Backdrop Blur Closes Modal */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
      ></div>

      {/* Modal Container */}
      <div className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#030305] border border-red-500/50 shadow-[0_0_40px_rgba(239,68,68,0.15)] flex flex-col overflow-hidden animate-[fadeIn_0.4s_ease-out_forwards]">
        {/* Background Blockchain Network with Moving Signals - LOCKED & FIXED */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <BlockchainCanvas />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030305]/95 via-[#030305]/75 to-[#030305]/95 backdrop-blur-[1px]"></div>
        </div>

        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b border-red-500/20 backdrop-blur-xl bg-black/60 z-20 relative">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-red-500 flex items-center justify-center bg-black/40 p-1 overflow-hidden relative group">
              <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                src="/assets/favicon-IE-red.svg"
                alt="IqwanEngine Logo"
                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_5px_#ef4444]"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "/HI-Portfolio/assets/favicon-IE-red.svg";
                }}
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="space-y-0.5">
              <span className="font-mono text-[9px] text-red-500 uppercase tracking-[0.4em] drop-shadow-md">
                HAIRULIQWAN-RESUME
              </span>
              <h4 className="font-display font-black italic text-white text-lg tracking-tighter uppercase leading-none">
                IQWANENGINE_FILE
              </h4>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-red-600 hover:text-red-400 hover:scale-110 transition-all"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>

        {/* Content Area */}
        <div className="relative flex-grow overflow-y-auto p-6 md:p-10 z-10 custom-scrollbar bg-transparent">
          {/* Main Information Grid Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Career Timeline */}
            <div className="lg:col-span-2 space-y-6">
              <h5 className="font-mono text-xs text-red-500 tracking-[0.4em] uppercase border-b border-red-500/20 pb-4 mb-8 flex items-center gap-3">
                <span className="w-2 h-2 bg-red-500 inline-block animate-pulse"></span>
                CAREER_TIMELINE
              </h5>
              <div className="relative border-l border-red-500/20 ml-2 md:ml-4 space-y-8 pb-4 pl-4 md:pl-8">
                {experienceData.map((job, idx) => (
                  <div key={idx} className="relative group">
                    {/* Bullet indicator directly on the Crimson vertical tracking line */}
                    <div className="absolute -left-[21px] md:-left-[37px] top-6 w-2 h-2 rounded-full bg-[#030305] border border-red-500 group-hover:bg-red-500 group-hover:scale-125 transition-all duration-300 z-10 shadow-[0_0_8px_#ef4444]" />

                    {/* Clean standalone card against Space Black foundation */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 20,
                      }}
                      className="p-6 bg-black/40 border border-white/5 hover:border-red-500/20 transition-all duration-300 rounded-lg space-y-4 shadow-xl"
                    >
                      {/* Header Row: Company Name, Role, & Period (Perfect Alignment) */}
                      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 pb-3 border-b border-white/5">
                        <div className="space-y-1">
                          <h4 className="text-white text-base font-bold tracking-wide font-display uppercase group-hover:text-red-400 transition-colors">
                            {job.role}
                          </h4>
                          <p className="text-red-500 font-mono text-xs uppercase tracking-wider">
                            {job.company}
                          </p>
                        </div>
                        <span className="font-mono text-[10px] text-gray-500 whitespace-nowrap uppercase tracking-widest bg-white/5 px-2.5 py-1 border border-white/5 rounded block shrink-0 select-none">
                          {job.period}
                        </span>
                      </div>

                      {/* Skills Chips Container */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {job.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] uppercase font-mono px-2 py-0.5 border border-red-500/20 text-red-400 bg-red-950/10 rounded-sm select-none"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Scope Dots: minimal dash pointers with relaxed line heights */}
                      <ul className="space-y-2 mt-3 pl-1">
                        {job.scope.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2.5 text-gray-400 text-xs leading-relaxed"
                          >
                            <span className="text-red-500/60 select-none font-mono mt-0.5 text-[10px] shrink-0">
                              —
                            </span>
                            <span className="flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* System Badge */}
                      <div className="pt-3 border-t border-white/5 mt-4 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-red-500/70 inline-block shrink-0 select-none">
                          [SYSTEM_ENVIRONMENT]
                        </span>
                        <span className="font-mono text-[10px] text-gray-500 uppercase tracking-tight">
                          {job.system}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Visual Identity & Logs */}
            <div className="space-y-8">
              {/* Visual Identity Video Frame */}
              <div>
                <h5 className="font-mono text-xs text-red-500 tracking-[0.4em] uppercase border-b border-red-500/20 pb-4 mb-6">
                  VISUAL_MY.IDENTITY
                </h5>
                <div className="relative w-full aspect-[3/4] md:aspect-[2/3] bg-black/60 border border-red-500/30 overflow-hidden group">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                  >
                    <source src="/assets/me.123.mp4" type="video/mp4" />
                    <source src="/assets/me.123.mp4" type="video/mp4" />
                    <source src="/assets/me.123.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 border-[4px] border-black/40 pointer-events-none"></div>
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="font-mono text-[8px] text-red-500 uppercase tracking-widest opacity-80">
                      Live
                    </span>
                    <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full shadow-[0_0_8px_#ef4444]"></div>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2 py-1 font-mono text-[8px] text-red-500 border border-red-900/50 backdrop-blur-sm">
                    SUBJECT_ID: Hairul Iqwan
                  </div>
                </div>
              </div>

              {/* Operator Context Log Section */}
              <div>
                <h5 className="font-mono text-xs text-red-500 tracking-[0.4em] uppercase border-b border-red-500/20 pb-4 mb-6">
                  OPERATOR_CONTEXT
                </h5>
                <div className="space-y-4">
                  {/* Family Node */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/5 p-5 hover:border-red-500/20 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                      <p className="font-mono text-[9px] text-gray-500 uppercase tracking-[0.3em]">
                        Personnel_Dependents
                      </p>
                      <div className="h-[1px] flex-grow bg-white/5 ml-4 mt-2"></div>
                    </div>
                    <div className="mb-4">
                      <p className="font-mono text-[8px] text-red-600 uppercase tracking-widest mb-1">
                        Spouse_Unit
                      </p>
                      <p className="text-gray-300 text-[10px] font-medium tracking-wide flex items-center gap-2">
                        Adilah Zamhari{" "}
                        <span className="text-gray-600 text-[8px] font-mono italic font-light">
                          //Dilla
                        </span>
                      </p>
                    </div>
                    <div className="relative pl-3 border-l border-red-500/20">
                      <p className="font-mono text-[8px] text-red-600 uppercase tracking-widest mb-1">
                        Next_Gen_Assets
                      </p>
                      <ul className="space-y-1.5">
                        <li className="flex items-center gap-2 text-gray-400 text-[10px] font-light">
                          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                          Muhammad Aisy Adryan
                        </li>
                        <li className="flex items-center gap-2 text-gray-400 text-[10px] font-light">
                          <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                          Nur Raisya Ayleen
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Core Tech Grid Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-black/40 backdrop-blur-md border border-white/5 p-4 hover:border-red-500/40 transition-all duration-300 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-2xl rounded-full"></div>
                      <p className="font-mono text-[10px] text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="truncate">Core_Tech_Stack</span>
                      </p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-white font-mono text-[11px] leading-none mb-1">
                            DEVELOPMENT
                          </p>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light border-l border-red-500/30 pl-2">
                            Python, React, Google Apps Script, AI/LLM API
                            Integration
                          </p>
                        </div>
                        <div>
                          <p className="text-white font-mono text-[11px] leading-none mb-1">
                            SYSTEMS
                          </p>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light border-l border-red-500/30 pl-2">
                            Algorithmic Trading, Workflow Architecture,
                            Infrastructure Blueprints
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 backdrop-blur-md border border-white/5 p-4 hover:border-red-500/40 transition-all duration-300 group relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-red-500/5 blur-2xl rounded-full"></div>
                      <p className="font-mono text-[10px] text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <span className="truncate">Strategic_Comm</span>
                      </p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-white font-mono text-[11px] leading-none mb-1">
                            ENGAGEMENT
                          </p>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light border-l border-red-500/30 pl-2">
                            High-Conversion Copywriting, CRM Strategy, Marketing
                            Automation
                          </p>
                        </div>
                        <div>
                          <p className="text-white font-mono text-[11px] leading-none mb-1">
                            LEADERSHIP
                          </p>
                          <p className="text-gray-400 text-[10px] leading-relaxed font-light border-l border-red-500/30 pl-2">
                            Conflict Resolution, Stakeholder Management,
                            Technical Mentoring
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Security & Community Meta Node */}
                  <div className="bg-black/40 backdrop-blur-md border border-white/5 p-5 hover:border-red-500/20 transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-500/30 to-transparent"></div>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h5 className="text-zinc-100 text-xs font-bold tracking-[0.2em] uppercase">
                            Tech Security & Innovation
                          </h5>
                          <p className="text-zinc-500 text-[8px] font-mono">
                            Archive Ref: NODE_7K_SEC
                          </p>
                        </div>
                        <div className="flex items-center gap-2 px-2 py-1 bg-zinc-900 border border-zinc-800">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-red-500/20 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-600/50"></span>
                          </span>
                          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-tighter">
                            Status: Offline
                          </span>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-[9px] leading-relaxed max-w-md font-light italic">
                        Previously spearheaded a{" "}
                        <span className="text-zinc-200 font-medium">
                          7,000+ member
                        </span>{" "}
                        digital collective. Engineered a "Learning-by-Doing"
                        ecosystem through technical blogging and system security
                        experimentation.
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-900/50 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {[
                          "HTML5",
                          "CSS3",
                          "JavaScript",
                          "SQL",
                          "Web Dev",
                          "Net-Safety",
                        ].map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[8px] border border-zinc-800 bg-zinc-900/50 text-zinc-500 px-2 py-0.5 uppercase tracking-tighter"
                          >
                            [{tag}]
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education Log Segment */}
              <div className="mt-8">
                <h5 className="font-mono text-xs text-red-500 tracking-[0.4em] uppercase border-b border-red-500/20 pb-4 mb-6">
                  EDUCATION_LOG
                </h5>
                <div className="bg-red-950/20 backdrop-blur-md border border-red-500/20 p-6 border-l-2 border-l-red-500 group hover:bg-red-950/30 transition-all duration-300">
                  <div className="flex justify-between items-start mb-1">
                    <h6 className="text-white text-xs font-bold uppercase tracking-wider">
                      Diploma in Hospitality Management
                    </h6>
                    <span className="font-mono text-[8px] bg-red-500/10 text-red-500 px-2 py-0.5 border border-red-500/20">
                      COMPLETED
                    </span>
                  </div>
                  <p className="font-mono text-[9px] text-red-500 uppercase mb-4">
                    Malaysian Academic and Skill Advancement (MASA) • Class of
                    2016
                  </p>
                  <p className="text-gray-400 text-[10px] font-light leading-relaxed border-l border-zinc-800 pl-3 mb-4">
                    An intensive 2.5-year multidisciplinary program focused on{" "}
                    <span className="text-zinc-300">
                      operational excellence
                    </span>{" "}
                    and{" "}
                    <span className="text-zinc-300">
                      strategic service management
                    </span>
                    .
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-2 text-[8px] text-gray-500 border-t border-red-500/10">
                    <div>
                      <p className="font-mono text-[7.5px] text-red-500/70 uppercase tracking-widest mb-1 underline underline-offset-4">
                        01_Operational_Systems
                      </p>
                      <p>• Front Office Logistics</p>
                      <p>• F&B Banquet Ops</p>
                    </div>
                    <div>
                      <p className="font-mono text-[7.5px] text-red-500/70 uppercase tracking-widest mb-1 underline underline-offset-4">
                        02_Business_Logic
                      </p>
                      <p>• Hospitality Law</p>
                      <p>• Manpower Scheduling</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Control Bar Panel */}
        <div className="w-full border-t border-red-500/20 backdrop-blur-xl bg-black/80 px-8 py-5 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 relative shrink-0">
          {/* Left Side: System Status Indicator */}
          <div className="flex items-center gap-3">
            <div className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#10b981]/25 opacity-75 animate-ping"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
            </div>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest">
              SYSTEM_STATUS:{" "}
              <span className="text-white font-medium">
                HAIRUL_IQWAN_CV.v2026
              </span>
            </span>
          </div>

          {/* Right Side: Download Button Interaction */}
          <a
            href="/assets/Muhammad_Hairul_Iqwan_CV.pdf"
            download="Muhammad_Hairul_Iqwan_CV.pdf"
            className="relative border border-red-500/40 text-red-500 hover:text-white hover:border-red-500 hover:bg-red-500/10 px-6 py-2.5 font-mono text-xs tracking-widest uppercase transition-all duration-300 active:scale-95 shadow-[0_0_10px_rgba(239,68,68,0.05)] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center justify-center gap-2 select-none"
          >
            DOWNLOAD_RESUME
          </a>
        </div>
      </div>

      {/* Global CSS Inject Injection for Custom Keyframe Animations and Scrollbar */}
      <style stroke="anonymous">{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(239, 68, 68, 0.3);
          border-radius: 10px;
          border: 1px solid rgba(239, 68, 68, 0.1);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(239, 68, 68, 0.5);
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
        }

        /* Firefox Support */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(239, 68, 68, 0.3) rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}

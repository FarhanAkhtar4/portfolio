"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, Download, Cpu, Github, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { siteConfig, heroTaglines } from "@/lib/data";

const resumeOptions = [
  {
    label: "General Resume",
    description: "Agentic AI + ML focused",
    file: "/resume.pdf",
    accent: false,
  },
  { label: "separator", file: "" },
  {
    label: "ML Engineer",
    description: "Deep Learning, PyTorch, Transformers",
    file: "/resumes/Farhan_Akhtar_ML_Engineer.pdf",
    accent: false,
  },
  {
    label: "Agentic AI Engineer",
    description: "RAG, LLMs, Vector DBs, LangChain",
    file: "/resumes/Farhan_Akhtar_Agentic_AI_Engineer.pdf",
    accent: true,
  },
  {
    label: "Generative AI Engineer",
    description: "GenAI, Fine-Tuning, Prompt Engineering",
    file: "/resumes/Farhan_Akhtar_GenAI_Engineer.pdf",
    accent: false,
  },
  {
    label: "AI Engineer",
    description: "Full-stack AI/ML coverage",
    file: "/resumes/Farhan_Akhtar_AI_Engineer.pdf",
    accent: false,
  },
];

function useTypewriter(
  strings: string[],
  typingSpeed = 50,
  deletingSpeed = 25,
  pauseTime = 2500
) {
  const [text, setText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = strings[stringIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(current.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === current.length) {
            setTimeout(() => setIsDeleting(true), pauseTime);
          }
        } else {
          setText(current.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setStringIndex((prev) => (prev + 1) % strings.length);
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

export default function HeroSection() {
  const typedText = useTypewriter(heroTaglines);

  const scrollToProjects = () => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 hero-grid" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/[0.07] rounded-full blur-[120px] orb-purple" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/[0.06] rounded-full blur-[120px] orb-cyan" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/[0.03] rounded-full blur-[150px]" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        {/* Availability badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-border text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open to opportunities
          </span>
        </motion.div>

        {/* Role tag — recruiter sees this FIRST */}
        <motion.div variants={itemVariants} className="mb-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-sm text-purple-300 font-medium">
            <Cpu className="h-3.5 w-3.5" />
            {siteConfig.role}
          </span>
        </motion.div>

        {/* Name — massive, immediate */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-5 leading-[0.95]"
        >
          <span className="text-white">{siteConfig.firstName}</span>
          <br />
          <span className="gradient-text">{siteConfig.lastName}</span>
        </motion.h1>

        {/* One-liner positioning */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-400 font-medium mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {siteConfig.roleShort}
        </motion.p>

        {/* Typewriter — proof of capability */}
        <motion.div
          variants={itemVariants}
          className="h-8 mb-10 flex items-center justify-center"
        >
          <span className="text-sm sm:text-base text-gray-500 font-mono">
            &gt; {typedText}
            <span className="inline-block w-0.5 h-5 bg-purple-500 ml-0.5 animate-pulse" />
          </span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button
            size="lg"
            onClick={scrollToProjects}
            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold px-8 py-6 text-base shadow-lg shadow-purple-500/25 transition-all hover:shadow-purple-500/40 hover:scale-[1.02]"
          >
            View My Work
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Resume dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="lg"
                className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-purple-500/50 px-8 py-6 text-base transition-all hover:scale-[1.02]"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
                <ChevronDown className="ml-2 h-3.5 w-3.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-72 bg-[#12121a] border-white/[0.08] backdrop-blur-xl"
            >
              {resumeOptions.map((opt) => {
                if (opt.label === "separator") {
                  return <DropdownMenuSeparator key="sep" className="bg-white/[0.06]" />;
                }
                return (
                  <DropdownMenuItem
                    key={opt.label}
                    onClick={() => window.open(opt.file, "_blank")}
                    className="flex items-start gap-3 px-3 py-2.5 text-gray-300 hover:text-white hover:bg-white/[0.06] focus:bg-white/[0.06] cursor-pointer"
                  >
                    <FileText className={`h-4 w-4 mt-0.5 flex-shrink-0 ${opt.accent ? "text-yellow-400" : "text-gray-500"}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium flex items-center gap-2">
                        {opt.label}
                        {opt.accent && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-yellow-500/15 text-yellow-300 font-semibold">
                            In Demand
                          </span>
                        )}
                      </div>
                      {opt.description && (
                        <div className="text-[11px] text-gray-500 mt-0.5">{opt.description}</div>
                      )}
                    </div>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

        {/* Proof stats — scannable in 2 seconds */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-8 sm:gap-12"
        >
          {[
            { value: "22%", label: "Model Improvement", sublabel: "over XGBoost" },
            { value: "4", label: "Production Projects", sublabel: "ML + AI systems" },
            { value: "11", label: "Certifications", sublabel: "AWS \u00b7 NVIDIA \u00b7 IBM" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400 font-medium mt-0.5">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-xs text-gray-600 mt-0.5">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg glass-card text-gray-500 hover:text-white hover:bg-white/[0.08] transition-all hover:scale-110"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={siteConfig.huggingface}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg glass-card text-gray-500 hover:text-yellow-400 hover:bg-white/[0.08] transition-all hover:scale-110"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59c-.23.34-.53.12-.93.38-.41-.5.86-1.54 1.17-2.47 1.15-.7-.02-1.23-.26-1.23-.92v-3.15c0-2.09-1.72-3.4-3.59-3.4-1.57 0-2.58 1.04-2.58 2.6 0 .55.24 1.04.61 1.34l2.41 1.77c.7.51 1.57.34 2.49-.42 3.47z" />
            </svg>
          </a>
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
      >
        <button
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-gray-600 hover:text-gray-400 transition-colors"
        >
          <span className="text-[10px] uppercase tracking-[0.2em]">Scroll to Projects</span>
          <ChevronDown className="h-4 w-4" />
        </button>
      </motion.div>
    </section>
  );
}

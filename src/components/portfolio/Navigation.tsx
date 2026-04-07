"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, Github, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { navLinks, siteConfig } from "@/lib/data";

const resumeOptions = [
  { label: "General Resume", description: "Agentic AI + ML focused", file: "/resume.pdf", accent: false },
  { label: "separator", file: "" },
  { label: "ML Engineer", description: "Deep Learning, PyTorch, Transformers", file: "/resumes/Farhan_Akhtar_ML_Engineer.pdf", accent: false },
  { label: "Agentic AI Engineer", description: "RAG, LLMs, Vector DBs, LangChain", file: "/resumes/Farhan_Akhtar_Agentic_AI_Engineer.pdf", accent: true },
  { label: "Generative AI Engineer", description: "GenAI, Fine-Tuning, Prompt Engineering", file: "/resumes/Farhan_Akhtar_GenAI_Engineer.pdf", accent: false },
  { label: "AI Engineer", description: "Full-stack AI/ML coverage", file: "/resumes/Farhan_Akhtar_AI_Engineer.pdf", accent: false },
];

function HuggingFaceIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59c-.23.34-.53.12-.93.38-.41-.5.86-1.54 1.17-2.47 1.15-.7-.02-1.23-.26-1.23-.92v-3.15c0-2.09-1.72-3.4-3.59-3.4-1.57 0-2.58 1.04-2.58 2.6 0 .55.24 1.04.61 1.34l2.41 1.77c.7.51 1.57.34 2.49-.42 3.47z" />
    </svg>
  );
}

function ResumeDropdownContent({ onSelect }: { onSelect?: () => void }) {
  return (
    <DropdownMenuContent
      align="end"
      className="w-64 bg-[#12121a] border-white/[0.08] backdrop-blur-xl"
    >
      {resumeOptions.map((opt) => {
        if (opt.label === "separator") {
          return <DropdownMenuSeparator key="sep" className="bg-white/[0.06]" />;
        }
        return (
          <DropdownMenuItem
            key={opt.label}
            onClick={() => {
              window.open(opt.file, "_blank");
              onSelect?.();
            }}
            className="flex items-start gap-2.5 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/[0.06] focus:bg-white/[0.06] cursor-pointer"
          >
            <FileText className={`h-3.5 w-3.5 mt-0.5 flex-shrink-0 ${opt.accent ? "text-yellow-400" : "text-gray-500"}`} />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium flex items-center gap-1.5">
                {opt.label}
                {opt.accent && (
                  <span className="text-[8px] px-1 py-0.5 rounded bg-yellow-500/15 text-yellow-300 font-semibold">
                    Hot
                  </span>
                )}
              </div>
              {opt.description && (
                <div className="text-[10px] text-gray-500 mt-0.5">{opt.description}</div>
              )}
            </div>
          </DropdownMenuItem>
        );
      })}
    </DropdownMenuContent>
  );
}

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav shadow-lg shadow-black/20" : ""
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollToSection("#home")}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 text-white font-bold text-lg"
        >
          <span className="gradient-text text-xl font-extrabold tracking-tight">
            {siteConfig.name.split(" ").map((n) => n[0]).join("")}
          </span>
        </motion.button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-md bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.huggingface}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <HuggingFaceIcon className="h-4 w-4" />
          </a>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-purple-500/50 text-xs"
              >
                <Download className="mr-1.5 h-3 w-3" />
                Resumes
              </Button>
            </DropdownMenuTrigger>
            <ResumeDropdownContent />
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0a0a0f] border-white/[0.06] w-72"
            >
              <SheetTitle className="text-white sr-only">Navigation Menu</SheetTitle>
              <div className="flex flex-col gap-2 mt-8">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.replace("#", "");
                  return (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollToSection(link.href)}
                      className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive
                          ? "text-white bg-white/[0.06]"
                          : "text-gray-400 hover:text-white hover:bg-white/[0.03]"
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
                <div className="mt-4 px-4 space-y-2">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/[0.03] text-sm"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href={siteConfig.huggingface}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-white/[0.03] text-sm"
                  >
                    <HuggingFaceIcon className="h-4 w-4" />
                    Hugging Face
                  </a>
                  {/* Mobile resume links */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-white/10 text-gray-300 hover:text-white hover:bg-white/5 text-sm"
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download Resume
                      </Button>
                    </DropdownMenuTrigger>
                    <ResumeDropdownContent onSelect={() => setOpen(false)} />
                  </DropdownMenu>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}

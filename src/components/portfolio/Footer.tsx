"use client";

import { motion } from "framer-motion";
import { Heart, Github } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

/* Floating particle positions (pre-computed for consistency) */
const particles = [
  { x: "10%", y: "25%", size: 2, delay: 0, duration: 6 },
  { x: "25%", y: "60%", size: 1.5, delay: 1.2, duration: 8 },
  { x: "40%", y: "20%", size: 2.5, delay: 0.6, duration: 7 },
  { x: "55%", y: "70%", size: 1.8, delay: 2, duration: 9 },
  { x: "70%", y: "30%", size: 2, delay: 0.3, duration: 6.5 },
  { x: "85%", y: "55%", size: 1.5, delay: 1.8, duration: 7.5 },
  { x: "15%", y: "80%", size: 2.2, delay: 2.5, duration: 8 },
  { x: "60%", y: "15%", size: 1.8, delay: 0.9, duration: 7 },
  { x: "80%", y: "75%", size: 2, delay: 1.5, duration: 6 },
  { x: "35%", y: "45%", size: 1.5, delay: 2.2, duration: 8.5 },
  { x: "92%", y: "40%", size: 2.3, delay: 0.4, duration: 7 },
  { x: "5%", y: "50%", size: 1.7, delay: 1.1, duration: 9 },
];

export default function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative pb-10 pt-0">
      {/* Animated wave/gradient divider at the top */}
      <div className="relative h-[60px] overflow-hidden w-full">
        <svg
          viewBox="0 0 1440 60"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="footerWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.15)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.12)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.15)" />
            </linearGradient>
            <linearGradient id="footerWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(168,85,247,0.06)" />
              <stop offset="50%" stopColor="rgba(6,182,212,0.04)" />
              <stop offset="100%" stopColor="rgba(168,85,247,0.06)" />
            </linearGradient>
          </defs>
          <motion.path
            d="M0,25 C240,50 480,0 720,25 C960,50 1200,0 1440,25 L1440,60 L0,60 Z"
            fill="url(#footerWaveGrad)"
            animate={{
              d: [
                "M0,25 C240,50 480,0 720,25 C960,50 1200,0 1440,25 L1440,60 L0,60 Z",
                "M0,30 C240,10 480,45 720,20 C960,45 1200,10 1440,30 L1440,60 L0,60 Z",
                "M0,25 C240,50 480,0 720,25 C960,50 1200,0 1440,25 L1440,60 L0,60 Z",
              ],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.path
            d="M0,35 C360,15 720,50 1080,20 C1260,10 1380,30 1440,25 L1440,60 L0,60 Z"
            fill="url(#footerWaveGrad2)"
            animate={{
              d: [
                "M0,35 C360,15 720,50 1080,20 C1260,10 1380,30 1440,25 L1440,60 L0,60 Z",
                "M0,20 C360,45 720,15 1080,40 C1260,30 1380,15 1440,35 L1440,60 L0,60 Z",
                "M0,35 C360,15 720,50 1080,20 C1260,10 1380,30 1440,25 L1440,60 L0,60 Z",
              ],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </div>

      {/* Glassmorphism footer background */}
      <div className="relative border-t border-white/[0.04] bg-white/[0.01] backdrop-blur-sm">
        {/* Floating particles in background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-400/20"
              style={{
                left: p.x,
                top: p.y,
                width: p.size,
                height: p.size,
              }}
              animate={{
                y: [-8, 8, -8],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Left: Logo/name with gradient text */}
            <div className="flex flex-col items-center md:items-start gap-1.5">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                © 2025{" "}
                <span className="bg-gradient-to-r from-purple-300 via-cyan-300 to-purple-300 bg-clip-text text-transparent font-medium">
                  Farhan Akhtar Makandar
                </span>
              </span>
              <span className="text-xs text-gray-600 flex items-center gap-1.5">
                Built with Next.js, React Three Fiber & Framer Motion
                <Heart className="h-3 w-3 text-purple-500/60" />
              </span>
            </div>

            {/* Right: Social + Nav */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-white transition-all duration-300 hover:shadow-[0_0_12px_rgba(255,255,255,0.15)] rounded-lg p-1"
                >
                  <Github className="h-4 w-4" />
                </a>
                <a
                  href={siteConfig.huggingface}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-yellow-400 transition-all duration-300 hover:shadow-[0_0_12px_rgba(234,179,8,0.2)] rounded-lg p-1"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59c-.23.34-.53.12-.93.38-.41-.5.86-1.54 1.17-2.47 1.15-.7-.02-1.23-.26-1.23-.92v-3.15c0-2.09-1.72-3.4-3.59-3.4-1.57 0-2.58 1.04-2.58 2.6 0 .55.24 1.04.61 1.34l2.41 1.77c.7.51 1.57.34 2.49-.42 3.47z" />
                  </svg>
                </a>
              </div>
              <div className="flex items-center gap-4">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="text-xs text-gray-600 hover:text-gray-400 transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-cyan-400 group-hover:w-full transition-all duration-300 ease-out" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

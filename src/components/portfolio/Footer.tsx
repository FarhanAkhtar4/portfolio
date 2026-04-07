"use client";

import { motion } from "framer-motion";
import { Heart, Github } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/data";

export default function Footer() {
  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="py-10 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <span>© 2025 Farhan Akhtar Makandar</span>
            <span className="text-gray-700">·</span>
            <span>Built with Next.js & Framer Motion</span>
            <Heart className="h-3 w-3 text-purple-500/60 inline ml-0.5" />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-white transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={siteConfig.huggingface}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-yellow-400 transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 14.59c-.23.34-.53.12-.93.38-.41-.5.86-1.54 1.17-2.47 1.15-.7-.02-1.23-.26-1.23-.92v-3.15c0-2.09-1.72-3.4-3.59-3.4-1.57 0-2.58 1.04-2.58 2.6 0 .55.24 1.04.61 1.34l2.41 1.77c.7.51 1.57.34 2.49-.42 3.47z" />
                </svg>
              </a>
            </div>
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

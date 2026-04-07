"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionHeading from "./SectionHeading";
import {
  certifications,
  certCategories,
  categoryDots,
  type Certification,
} from "@/lib/data";

function CertCard({ cert }: { cert: Certification }) {
  const handleClick = () => {
    if (cert.certFile) {
      window.open(cert.certFile, "_blank");
    } else if (cert.verifyUrl) {
      window.open(cert.verifyUrl, "_blank");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="glass-card p-4 glow-hover card-hover-gradient group flex flex-col"
    >
      <div className="flex gap-3">
        <div
          className={`w-1 rounded-full flex-shrink-0 ${
            cert.category === "AI & ML"
              ? "bg-purple-500"
              : cert.category === "GenAI & Agentic AI"
              ? "bg-yellow-500"
              : cert.category === "Cloud & Data"
              ? "bg-cyan-500"
              : "bg-emerald-500"
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${categoryDots[cert.category]}`}
            />
            <span className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">
              {cert.category}
            </span>
          </div>

          <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors leading-snug">
            {cert.title}
          </h3>

          <p className="text-xs text-gray-500 mt-0.5">{cert.issuer}</p>

          <div className="mt-2.5 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-gray-500 hover:text-purple-400 hover:bg-purple-500/5 text-[11px]"
              onClick={handleClick}
            >
              {cert.certFile ? (
                <>
                  <FileText className="mr-1 h-2.5 w-2.5" />
                  View Certificate
                </>
              ) : cert.verifyUrl ? (
                <>
                  <ExternalLink className="mr-1 h-2.5 w-2.5" />
                  Verify
                </>
              ) : null}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CertificationsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredCerts =
    activeCategory === "All"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  return (
    <section id="certifications" className="py-20 md:py-28 relative">
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Certifications"
          subtitle="Verified credentials from Oracle, AWS, NVIDIA, IBM, and Coursera"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {certCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/10 text-purple-300 border border-purple-500/30"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <AnimatePresence mode="popLayout">
            {filteredCerts.map((cert) => (
              <CertCard key={cert.title} cert={cert} />
            ))}
          </AnimatePresence>
        </div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-border text-sm text-gray-400">
            <Award className="h-4 w-4 text-purple-400" />
            {certifications.length} certifications across {certCategories.length - 1} domains
          </span>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Bot, BarChart3, Wrench, Sparkles, Database } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/lib/data";

const categoryMeta: Record<string, { icon: React.ElementType; colorClass: string }> = {
  Languages: {
    icon: Code2,
    colorClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  "ML & Deep Learning": {
    icon: Brain,
    colorClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  "LLM & Agentic AI": {
    icon: Bot,
    colorClass: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  },
  "Data Science": {
    icon: Database,
    colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  "Cloud & Tools": {
    icon: Wrench,
    colorClass: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  },
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Skills"
          subtitle="Technical stack across ML systems, LLMs, data science, and cloud tools"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {skillCategories.map((category, catIdx) => {
            const meta = categoryMeta[category.name] || {
              icon: Code2,
              colorClass: "text-gray-400 bg-gray-500/10 border-gray-500/20",
            };
            const Icon = meta.icon;

            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: catIdx * 0.06 }}
                className={`glass-card p-4 glow-hover card-hover-gradient relative ${
                  category.highlight ? "ring-1 ring-yellow-500/20" : ""
                }`}
              >
                {/* Highlight badge for LLM & Agentic AI */}
                {category.highlight && (
                  <div className="absolute -top-2.5 left-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/15 border border-yellow-500/30 text-[10px] font-semibold text-yellow-300">
                      <Sparkles className="h-2.5 w-2.5" />
                      In Demand
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="flex items-center gap-2.5 mb-3 mt-1">
                  <div className={`p-1.5 rounded-md border ${meta.colorClass}`}>
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-xs font-semibold text-white">
                    {category.name}
                  </h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: catIdx * 0.06 + i * 0.02,
                        duration: 0.3,
                      }}
                      whileHover={{
                        scale: 1.05,
                        y: -1,
                      }}
                      className="px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-gray-300 cursor-default hover:bg-white/[0.08] hover:border-white/[0.12] transition-all"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

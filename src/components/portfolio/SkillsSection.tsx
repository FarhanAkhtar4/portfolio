"use client";

import { motion } from "framer-motion";
import { Code2, Brain, Bot, BarChart3, Wrench, Sparkles, Database } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillCategories } from "@/lib/data";
import TiltCard from "./TiltCard";

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

// Reorder: hero card first, then ML (wide), then the rest
const orderedCategories = [
  skillCategories.find((c) => c.name === "LLM & Agentic AI")!,
  skillCategories.find((c) => c.name === "ML & Deep Learning")!,
  ...skillCategories.filter(
    (c) => c.name !== "LLM & Agentic AI" && c.name !== "ML & Deep Learning"
  ),
];

// Spring physics config for entrance animations
const springEntrance = (delay: number) => ({
  type: "spring" as const,
  stiffness: 200,
  damping: 24,
  mass: 0.8,
  delay,
});

// Staggered card entrance variant
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springEntrance(i * 0.08),
  }),
};

// Skill tag pop animation
const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 22,
      delay: i * 0.03,
    },
  }),
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-28 relative">
      {/* Ambient background elements */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-purple-500/[0.025] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[200px] h-[200px] morph-blob opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Skills"
          subtitle="Technical stack across ML systems, LLMs, data science, and cloud tools"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-auto">
          {orderedCategories.map((category, catIdx) => {
            const meta = categoryMeta[category.name] || {
              icon: Code2,
              colorClass: "text-gray-400 bg-gray-500/10 border-gray-500/20",
            };
            const Icon = meta.icon;
            const isHero = category.name === "LLM & Agentic AI";
            const isWide = category.name === "ML & Deep Learning";

            // Grid span classes for bento layout
            const gridSpans = isHero
              ? "col-span-2 md:col-span-2 md:row-span-2"
              : isWide
                ? "col-span-2"
                : "col-span-1";

            // Shared skill tags rendering
            const renderSkills = (tagSize: "sm" | "lg") =>
              category.skills.map((skill, i) => (
                <motion.span
                  key={skill}
                  custom={i}
                  variants={tagVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className={`
                    cursor-default transition-colors duration-200
                    ${
                      tagSize === "lg"
                        ? "px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs text-gray-200 hover:bg-white/[0.1] hover:border-purple-400/30"
                        : "px-2 py-1 rounded-md bg-white/[0.04] border border-white/[0.06] text-[11px] text-gray-300 hover:bg-white/[0.08] hover:border-white/[0.15]"
                    }
                  `}
                >
                  {skill}
                </motion.span>
              ));

            if (isHero) {
              // ─── Hero Card: LLM & Agentic AI ───
              return (
                <motion.div
                  key={category.name}
                  custom={catIdx}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-60px" }}
                  className={`${gridSpans} relative group`}
                >
                  {/* Animated gradient border wrapper */}
                  <div className="absolute -inset-[1px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br from-purple-500/40 via-cyan-400/30 to-purple-500/20 blur-[0.5px]" />

                  {/* Card body */}
                  <div className="relative rounded-2xl overflow-hidden">
                    {/* Gradient mesh background */}
                    <div
                      className="absolute inset-0 opacity-80"
                      style={{
                        background:
                          "radial-gradient(ellipse at 20% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(6, 182, 212, 0.12) 0%, transparent 50%), radial-gradient(ellipse at 60% 30%, rgba(168, 85, 247, 0.08) 0%, transparent 40%)",
                      }}
                    />
                    <div className="absolute inset-0 glass-card" style={{ borderRadius: "inherit" }} />

                    {/* Content */}
                    <div className="relative p-6 md:p-8 h-full flex flex-col">
                      {/* In Demand badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/25 text-[11px] font-semibold text-yellow-300 tracking-wide">
                          <Sparkles className="h-3.5 w-3.5" />
                          In Demand
                        </span>
                      </div>

                      {/* Header */}
                      <div className="flex items-center gap-3 mb-5">
                        <div
                          className={`p-2.5 rounded-xl border ${meta.colorClass} shadow-lg shadow-yellow-500/5`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-base md:text-lg font-bold text-white tracking-tight">
                          {category.name}
                        </h3>
                      </div>

                      {/* Skills - flowing wrap with larger tags */}
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {renderSkills("lg")}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            }

            // ─── Regular Cards ───
            return (
              <motion.div
                key={category.name}
                custom={catIdx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className={gridSpans}
              >
                <TiltCard className="h-full" tiltAmount={8}>
                  <div className="glass-card glow-hover card-hover-gradient p-4 md:p-5 h-full flex flex-col group relative overflow-hidden">
                    {/* Subtle inner gradient on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "radial-gradient(circle at 50% 0%, rgba(139, 92, 246, 0.06) 0%, transparent 60%)",
                        }}
                      />
                    </div>

                    {/* Header */}
                    <div className="relative flex items-center gap-2.5 mb-3 mt-0.5">
                      <div className={`p-1.5 rounded-lg border ${meta.colorClass}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-xs font-semibold text-white tracking-tight">
                        {category.name}
                      </h3>
                    </div>

                    {/* Skills */}
                    <div className="relative flex flex-wrap gap-1.5 mt-auto">
                      {renderSkills("sm")}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

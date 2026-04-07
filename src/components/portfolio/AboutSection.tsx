"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Cpu, GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteConfig, experience, education } from "@/lib/data";
import TiltCard from "./TiltCard";

const springSlideLeft = {
  initial: { opacity: 0, x: -40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { type: "spring", stiffness: 100, damping: 18 },
};

const springSlideRight = {
  initial: { opacity: 0, x: 40 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" } as const,
  transition: { type: "spring", stiffness: 100, damping: 18, delay: 0.1 },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background: purple gradient orb on left */}
      <div
        className="pointer-events-none absolute -top-32 -left-48 w-[500px] h-[500px] rounded-full opacity-[0.07] blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.6) 0%, rgba(34,211,238,0.2) 60%, transparent 100%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          title="About"
          subtitle="Research-driven engineer building ML systems and AI pipelines"
        />

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* ── Bio (left) ── */}
          <motion.div
            initial={springSlideLeft.initial}
            whileInView={springSlideLeft.whileInView}
            viewport={springSlideLeft.viewport}
            transition={springSlideLeft.transition}
            className="md:col-span-3 space-y-6"
          >
            {/* Decorative gradient line + bio text */}
            <div className="relative pl-5 border-l-2 border-transparent">
              {/* Gradient left border */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(168,85,247,0.8), rgba(34,211,238,0.8), transparent)",
                }}
              />
              <div className="space-y-5">
                <p className="text-gray-300 text-lg leading-relaxed">
                  I&apos;m an{" "}
                  <span className="text-white font-semibold">ML Systems Engineer</span> and{" "}
                  <span className="text-white font-semibold">
                    LLM &amp; Agentic AI Developer
                  </span>{" "}
                  focused on building production-grade AI systems — from transformer-based
                  predictive models to retrieval-augmented generation pipelines.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  At{" "}
                  <span className="text-purple-400 font-medium">NIT Calicut</span>, I developed
                  deep learning applications for engineering problems — specifically building a
                  Temporal Fusion Transformer that achieved{" "}
                  <span className="text-white font-medium">22% improvement</span> over XGBoost
                  and KNN baselines for seismic response prediction. My work spans PyTorch model
                  development, systematic hyperparameter tuning, and rigorous validation.
                </p>
                <p className="text-gray-400 text-lg leading-relaxed">
                  I design agentic AI workflows that combine LLM reasoning with retrieval systems,
                  and build attention-based architectures for both time-series and tabular data.
                  Every project follows a disciplined approach: define the problem, validate against
                  baselines, and deliver measurable results.
                </p>
              </div>
            </div>

            {/* ── Education ── */}
            <div className="pt-2">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      delay: i * 0.15,
                    }}
                  >
                    <TiltCard tiltAmount={6} glareOpacity={0.08}>
                      <div className="relative overflow-hidden rounded-xl glass-card p-5">
                        {/* Subtle gradient top border */}
                        <div
                          className="absolute top-0 left-0 right-0 h-[2px]"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(168,85,247,0.7), rgba(34,211,238,0.5), transparent)",
                          }}
                        />
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <span className="text-sm font-semibold text-white">
                            {edu.degree}
                          </span>
                          <span className="text-xs text-purple-400 font-medium whitespace-nowrap">
                            {edu.period}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">{edu.institution}</p>
                        {edu.details && (
                          <p className="text-[11px] text-gray-500 mt-1.5 leading-relaxed">
                            {edu.details}
                          </p>
                        )}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Quick info pills ── */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                {
                  icon: <MapPin className="h-3.5 w-3.5 text-purple-400" />,
                  label: siteConfig.location,
                },
                {
                  icon: <Cpu className="h-3.5 w-3.5 text-cyan-400" />,
                  label: "ML Systems Engineer",
                },
                {
                  icon: <Briefcase className="h-3.5 w-3.5 text-purple-400" />,
                  label: "Research @ NIT Calicut",
                },
              ].map((pill, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 20,
                    delay: i * 0.1,
                  }}
                  whileHover={{
                    y: -3,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 cursor-default"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 2px rgba(0,0,0,0.2)",
                  }}
                >
                  {pill.icon}
                  {pill.label}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* ── Experience Card (right) ── */}
          <motion.div
            initial={springSlideRight.initial}
            whileInView={springSlideRight.whileInView}
            viewport={springSlideRight.viewport}
            transition={springSlideRight.transition}
            className="md:col-span-2"
          >
            <div className="sticky top-24">
              <TiltCard tiltAmount={8} glareOpacity={0.1}>
                <div className="relative overflow-hidden rounded-xl glass-card glow-hover sticky top-24">
                  {/* Animated background mesh pattern */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <svg
                      className="absolute inset-0 w-full h-full opacity-[0.03]"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <defs>
                        <pattern
                          id="about-mesh"
                          x="0"
                          y="0"
                          width="40"
                          height="40"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M 40 0 L 0 0 0 40"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                          />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill="url(#about-mesh)" />
                    </svg>
                    <motion.div
                      className="absolute -top-24 -right-24 w-48 h-48 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)",
                      }}
                      animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)",
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                      }}
                    />
                  </div>

                  {/* Gradient left border (purple to cyan) */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl"
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(168,85,247,0.9), rgba(34,211,238,0.9))",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-1 flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-purple-400" />
                      Experience
                    </h3>
                    <div className="heading-gradient-line w-12 mb-6" />

                    {experience.map((exp) => (
                      <div key={exp.id}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-white">
                            {exp.role}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-sm text-purple-400 font-medium">
                            {exp.company}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                            <Calendar className="h-3 w-3" />
                            {exp.period}
                          </span>
                        </div>
                        <ul className="space-y-2.5">
                          {exp.responsibilities.map((item, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.08 }}
                              className="flex items-start gap-2.5 text-sm text-gray-400"
                            >
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500/60 flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </TiltCard>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

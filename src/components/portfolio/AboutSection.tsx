"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, Cpu, GraduationCap } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { siteConfig, experience, education } from "@/lib/data";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="About"
          subtitle="Research-driven engineer building ML systems and AI pipelines"
        />

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-3 space-y-5"
          >
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              I&apos;m an <span className="text-white font-semibold">ML Systems Engineer</span>{" "}
              and <span className="text-white font-semibold">LLM &amp; Agentic AI Developer</span>{" "}
              focused on building production-grade AI systems — from transformer-based predictive
              models to retrieval-augmented generation pipelines.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              At <span className="text-purple-400 font-medium">NIT Calicut</span>, I developed
              deep learning applications for engineering problems — specifically building a
              Temporal Fusion Transformer that achieved{" "}
              <span className="text-white font-medium">22% improvement</span> over XGBoost and
              KNN baselines for seismic response prediction. My work spans PyTorch model
              development, systematic hyperparameter tuning, and rigorous validation.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              I design agentic AI workflows that combine LLM reasoning with retrieval systems,
              and build attention-based architectures for both time-series and tabular data.
              Every project follows a disciplined approach: define the problem, validate against
              baselines, and deliver measurable results.
            </p>

            {/* Education */}
            <div className="pt-3">
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                Education
              </h3>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card p-4"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-sm font-semibold text-white">
                        {edu.degree}
                      </span>
                      <span className="text-xs text-purple-400 font-medium whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400">{edu.institution}</p>
                    {edu.details && (
                      <p className="text-[11px] text-gray-500 mt-1">{edu.details}</p>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick info pills */}
            <div className="flex flex-wrap gap-3 pt-1">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-border text-sm text-gray-400">
                <MapPin className="h-3.5 w-3.5 text-purple-400" />
                {siteConfig.location}
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-border text-sm text-gray-400">
                <Cpu className="h-3.5 w-3.5 text-cyan-400" />
                ML Systems Engineer
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg glass-border text-sm text-gray-400">
                <Briefcase className="h-3.5 w-3.5 text-purple-400" />
                Research @ NIT Calicut
              </span>
            </div>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <div className="glass-card p-6 glow-hover card-hover-gradient sticky top-24">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}

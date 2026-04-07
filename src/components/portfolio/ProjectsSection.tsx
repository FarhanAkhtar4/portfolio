"use client";

import { useState, useRef, useCallback, type MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Sparkles,
  Layers,
  Zap,
  TrendingUp,
  Brain,
  Database,
  MessageSquare,
  BarChart3,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import SectionHeading from "./SectionHeading";
import { projects, projectCategories, type Project } from "@/lib/data";
import TiltCard from "./TiltCard";

const comparisonData = [
  { name: "TFT (Ours)", accuracy: 92, fill: "#8b5cf6" },
  { name: "XGBoost", accuracy: 75, fill: "#4b5563" },
  { name: "KNN", accuracy: 70, fill: "#4b5563" },
];

const iconMap: Record<string, React.ElementType> = {
  Layers,
  Zap,
  TrendingUp,
  MessageSquare,
  Database,
  Brain,
  Sparkles,
};

/* ────────────────────────────── spotlight hook ────────────────────────────── */

function useSpotlight() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const onEnter = useCallback(() => setHovering(true), []);
  const onLeave = useCallback(() => setHovering(false), []);

  return { cardRef, pos, hovering, onMove, onEnter, onLeave };
}

/* ────────────────────────── ArchitectureDiagram ───────────────────────────── */

function ArchitectureDiagram({
  layers,
  title,
}: {
  layers: { label: string; sublabel: string; icon: string }[];
  title: string;
}) {
  return (
    <div className="rounded-xl bg-[#0a0a0f] border border-white/[0.06] p-4 overflow-x-auto">
      <div className="flex items-center gap-3 min-w-[360px]">
        {layers.map((layer, i) => {
          const Icon = iconMap[layer.icon] || Cpu;
          return (
            <div key={i} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gradient-to-br from-purple-600/20 to-cyan-600/10 border border-white/[0.08] flex items-center justify-center">
                  <Icon className="h-5 w-5 text-purple-400" />
                </div>
                <span className="text-[10px] text-gray-400 mt-1.5 font-medium">
                  {layer.label}
                </span>
                <span className="text-[9px] text-gray-600">{layer.sublabel}</span>
              </div>
              {i < layers.length - 1 && (
                <div className="flex-shrink-0">
                  <div className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-purple-500/40 to-cyan-500/40" />
                  <div className="w-6 sm:w-8 flex justify-center -mt-[1px]">
                    <ChevronRight className="h-3 w-3 text-gray-600" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <p className="text-[10px] text-gray-600 mt-3 text-center">{title}</p>
    </div>
  );
}

/* ──────────────────────── Metric shimmer wrapper ──────────────────────────── */

function MetricCard({
  metric,
  index,
}: {
  metric: { value: string; label: string; accent?: boolean };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
      className="relative glass-card p-3 text-center overflow-hidden"
    >
      {/* shimmer overlay */}
      <motion.span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: "easeInOut" }}
      />
      {metric.accent && (
        <span className="absolute inset-0 rounded-[inherit] ring-1 ring-purple-500/30" />
      )}
      <div
        className={`relative text-lg md:text-xl font-bold ${
          metric.accent ? "gradient-text" : "text-white"
        }`}
      >
        {metric.value}
      </div>
      <div className="relative text-xs text-gray-500 mt-0.5">{metric.label}</div>
    </motion.div>
  );
}

/* ─────────────────────── FlagshipProjectCard ──────────────────────────────── */

function FlagshipProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="col-span-full"
    >
      <TiltCard tiltAmount={6} glareOpacity={0.08}>
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="relative glass-card p-6 md:p-8 glow-hover overflow-hidden group/card">
            {/* ── animated gradient border on hover ── */}
            <span className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
              <span className="absolute inset-[-1px] rounded-[inherit] bg-gradient-to-r from-purple-500/30 via-cyan-500/20 to-purple-500/30 animate-[gradient-shift_4s_ease_infinite]" />
            </span>

            {/* Featured badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-xs font-semibold text-purple-300 shadow-[0_0_16px_rgba(139,92,246,0.15)]">
                <Sparkles className="h-3 w-3" />
                Flagship Project
              </span>
            </div>

            {/* Gradient top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-purple-400 to-cyan-500" />

            <div className="pt-4 relative z-[1]">
              {/* Title block */}
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2.5 rounded-lg bg-gradient-to-br from-purple-600/20 to-cyan-600/10 border border-purple-500/20 flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-cyan-400/80 font-medium mt-0.5">
                    {project.oneLiner}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5 ml-[3.25rem]">
                {project.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {project.metrics?.map((metric, i) => (
                  <MetricCard key={i} metric={metric} index={i} />
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-white/[0.06] text-gray-300 border-white/[0.08] hover:bg-white/[0.1] text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Architecture */}
              {project.architecture && (
                <div className="mb-5">
                  <ArchitectureDiagram
                    layers={project.architecture.layers}
                    title={project.architecture.title}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-purple-500/50"
                  onClick={() =>
                    window.open(project.github, "_blank", "noopener,noreferrer")
                  }
                >
                  <Github className="mr-2 h-3.5 w-3.5" />
                  View Code
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-gray-300 hover:text-white hover:bg-white/5 hover:border-cyan-500/50"
                  onClick={() => window.open(project.huggingface || 'https://huggingface.co/spaces/FarhanAkhtar11/SEISMIC_PREDICTOR', '_blank')}
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5" />
                  Live Demo
                </Button>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-white/5"
                  >
                    {open ? (
                      <>
                        Less Details <ChevronUp className="ml-1 h-3.5 w-3.5" />
                      </>
                    ) : (
                      <>
                        More Details <ChevronDown className="ml-1 h-3.5 w-3.5" />
                      </>
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
            </div>

            {/* Expandable */}
            <CollapsibleContent>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 26 }}
                className="mt-6 pt-6 border-t border-white/[0.06] relative z-[1]"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                        Problem
                      </h4>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        Predicting seismic structural responses is critical for
                        earthquake engineering. Traditional ML models like XGBoost
                        and KNN cannot capture complex temporal dependencies in
                        time-series seismic data, leading to suboptimal predictions.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-2 uppercase tracking-wider">
                        Approach
                      </h4>
                      <ul className="space-y-1.5">
                        {project.highlights?.map((h, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-gray-400"
                          >
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wider">
                      Model Comparison
                    </h4>
                    <div className="bg-[#0a0a0f] rounded-lg border border-white/[0.06] p-4 h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          layout="vertical"
                          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                          <XAxis
                            type="number"
                            domain={[0, 100]}
                            tick={{ fill: "#6b7280", fontSize: 11 }}
                            axisLine={{ stroke: "rgba(255,255,255,0.06)" }}
                            tickLine={false}
                          />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fill: "#9ca3af", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                            width={85}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#1a1a24",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              color: "#f0f0f5",
                              fontSize: "12px",
                            }}
                            formatter={(value: number) => [`${value}%`, "Accuracy"]}
                          />
                          <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={22}>
                            {comparisonData.map((entry, index) => (
                              <Cell key={index} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CollapsibleContent>
          </div>
        </Collapsible>
      </TiltCard>
    </motion.div>
  );
}

/* ──────────────────────── ProjectCard ─────────────────────────────────────── */

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const { cardRef, pos, hovering, onMove, onEnter, onLeave } = useSpotlight();

  const categoryIcon: Record<string, React.ElementType> = {
    "Agentic AI": Brain,
    "Deep Learning": Layers,
    Analytics: BarChart3,
  };
  const Icon = categoryIcon[project.category] || Cpu;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <TiltCard tiltAmount={8} glareOpacity={0.12}>
        <Collapsible open={open} onOpenChange={setOpen}>
          <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
            className="relative glass-card p-5 h-full flex flex-col glow-hover group cursor-pointer overflow-hidden"
          >
            {/* ── spotlight radial gradient following cursor ── */}
            <span
              className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300 z-0"
              style={{
                opacity: hovering ? 1 : 0,
                background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.06), transparent 60%)`,
              }}
            />

            {/* ── subtle glow shadow on hover ── */}
            <span className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_-12px_rgba(139,92,246,0.35)] z-[-1]" />

            {/* Content */}
            <div className="relative z-[1] flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
                    <Icon className="h-3.5 w-3.5 text-purple-400" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] bg-white/[0.04] text-gray-500 border-white/[0.06]"
                  >
                    {project.category}
                  </Badge>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                {project.title}
              </h3>

              {/* One-liner */}
              {project.oneLiner && (
                <p className="text-xs text-cyan-400/70 font-medium mb-2">
                  {project.oneLiner}
                </p>
              )}

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                {project.description}
              </p>

              {/* Architecture diagram (if available) */}
              {project.architecture && (
                <div className="mb-4">
                  <ArchitectureDiagram
                    layers={project.architecture.layers}
                    title={project.architecture.title}
                  />
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] bg-white/[0.04] text-gray-500 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 hover:border-purple-500/50 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.github, "_blank", "noopener,noreferrer");
                  }}
                >
                  <Github className="mr-1.5 h-3 w-3" />
                  Code
                </Button>
                {project.highlights && project.highlights.length > 0 && (
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-gray-500 hover:text-white hover:bg-white/5 text-xs"
                    >
                      {open ? "Less" : "Details"}
                      {open ? (
                        <ChevronUp className="ml-1 h-3 w-3" />
                      ) : (
                        <ChevronDown className="ml-1 h-3 w-3" />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>

              {/* Expandable */}
              <CollapsibleContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-white/[0.06] space-y-2"
                >
                  {project.highlights?.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-xs text-gray-400"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-purple-400/60 flex-shrink-0" />
                      {h}
                    </div>
                  ))}
                </motion.div>
              </CollapsibleContent>
            </div>
          </div>
        </Collapsible>
      </TiltCard>
    </motion.div>
  );
}

/* ─────────────────────── ProjectsSection ──────────────────────────────────── */

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      {/* Ambient gradient orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Projects"
          subtitle="ML systems, agentic AI workflows, and data-driven solutions"
        />

        {/* Category Filter – premium pill design */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          <AnimatePresence mode="popLayout">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <motion.button
                  key={cat}
                  layout
                  onClick={() => setActiveCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 outline-none ${
                    isActive
                      ? "text-purple-200"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {/* active gradient background */}
                  {isActive && (
                    <motion.span
                      layoutId="category-bg"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/25 to-cyan-600/15 border border-purple-500/30 shadow-[0_0_18px_-4px_rgba(139,92,246,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 28,
                      }}
                    />
                  )}
                  {/* glow ring on active */}
                  {isActive && (
                    <motion.span
                      layoutId="category-ring"
                      className="absolute inset-[-3px] rounded-full ring-1 ring-purple-400/20 pointer-events-none"
                      transition={{
                        type: "spring",
                        stiffness: 340,
                        damping: 28,
                      }}
                    />
                  )}
                  <span className="relative z-[1]">{cat}</span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) =>
              project.isFlagship ? (
                <FlagshipProjectCard key={project.id} project={project} />
              ) : (
                <ProjectCard key={project.id} project={project} />
              )
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
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

function FlagshipProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="col-span-full"
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="relative glass-card p-6 md:p-8 glow-hover card-hover-gradient overflow-hidden">
          {/* Featured badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <Sparkles className="h-3 w-3" />
              Flagship Project
            </span>
          </div>

          {/* Gradient top line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-purple-400 to-cyan-500" />

          <div className="pt-4">
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
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`glass-card p-3 text-center ${metric.accent ? "ring-1 ring-purple-500/30" : ""}`}
                >
                  <div className={`text-lg md:text-xl font-bold ${metric.accent ? "gradient-text" : "text-white"}`}>
                    {metric.value}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{metric.label}</div>
                </motion.div>
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
              className="mt-6 pt-6 border-t border-white/[0.06]"
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
    </motion.div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);

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
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
    >
      <Collapsible open={open} onOpenChange={setOpen}>
        <div className="glass-card p-5 h-full flex flex-col glow-hover card-hover-gradient group cursor-pointer">
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
      </Collapsible>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-600/[0.03] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <SectionHeading
          title="Projects"
          subtitle="ML systems, agentic AI workflows, and data-driven solutions"
        />

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-purple-600/20 to-cyan-600/10 text-purple-300 border border-purple-500/30"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.03] border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
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

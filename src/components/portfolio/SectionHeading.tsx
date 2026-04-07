"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="heading-gradient-line w-24 mx-auto mt-4" />
    </motion.div>
  );
}

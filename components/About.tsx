"use client";

import { useTranslations } from "next-intl";
import { projects } from "@/constants/projects";
import { motion } from "framer-motion";

export default function About() {
  const t = useTranslations("about");
  const projectsCount = projects.length;

  return (
    <section id="about" className="py-20 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Logo Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 group">
              {/* Decorative border */}
              <div className="absolute inset-0 border-4 border-accent/50 rounded-lg translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              {/* Glow effect behind */}
              <div className="absolute inset-0 bg-accent/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              
              {/* Logo */}
              <div className="absolute inset-0 rounded-lg flex items-center justify-center overflow-hidden glass-card z-10 border border-transparent group-hover:border-accent/30 transition-colors">
                <img
                  src="/images/donato-logo.png"
                  alt="Donato Carpentiere Logo"
                  className="w-48 h-48 md:w-56 md:h-56 object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-text-secondary text-lg leading-relaxed">
              {t("paragraph1")}
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              {t("paragraph2")}
            </p>
            <p className="text-text-secondary text-lg leading-relaxed">
              {t("paragraph3")}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              {[
                { value: projectsCount > 0 ? `${projectsCount}+` : "0", label: t("stats.projects") },
                { value: "2+", label: t("stats.yearsExperience") },
                { value: "15+", label: t("stats.technologies") },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 rounded-xl glass-card border border-transparent hover:border-accent/30 transition-colors"
                >
                  <div className="text-2xl md:text-3xl font-bold text-accent">
                    {stat.value}
                  </div>
                  <div className="text-text-muted text-sm mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

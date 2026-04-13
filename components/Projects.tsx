"use client";

import { useTranslations } from "next-intl";
import { Project, projects } from "@/constants/projects";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { useState, useEffect } from "react";

interface ProjectCardProps {
  project: Project;
  featuredLabel: string;
}

function ProjectCard({ project, featuredLabel }: ProjectCardProps) {
  return (
    <article className="group rounded-xl overflow-hidden transition-all duration-300 flex flex-col glass-card border border-transparent hover:border-accent/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] relative">
      {/* Decorative Glow */}
      <div className="absolute -inset-x-20 -top-20 h-40 bg-accent/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Project Visual Placeholder */}
      <div className="h-48 bg-gradient-to-br from-accent/10 via-background to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-accent/30 group-hover:text-accent/60 transition-colors duration-500 transform group-hover:scale-110">
              {project.title.charAt(0)}
            </div>
          </div>
        </div>
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-accent text-background rounded-full hover:bg-accent-hover transition-transform hover:scale-110"
              aria-label={`View ${project.title} source code`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border-2 border-accent text-accent rounded-full hover:bg-accent hover:text-background transition-transform hover:scale-110"
              aria-label={`View ${project.title} live demo`}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Project Info */}
      <div className="p-6 flex flex-col flex-1 relative z-10">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full font-medium whitespace-nowrap">
              {featuredLabel}
            </span>
          )}
        </div>
        <p className="text-text-muted text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={`${project.id}-tech-${i}`}
              className="text-xs px-3 py-1 bg-background border border-card-border rounded-full text-text-secondary font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  if (!mounted) return null;

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
          <p className="text-text-muted mt-6 max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Fallback when empty */}
        {featuredProjects.length === 0 && otherProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="py-24 px-6 rounded-3xl border border-accent/20 bg-accent/5 backdrop-blur-md text-center max-w-3xl mx-auto relative overflow-hidden group"
          >
            {/* Animated background glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-8 relative"
            >
              <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-75" />
              <Rocket className="w-10 h-10 relative z-10" />
            </motion.div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Work In Progress
            </h3>
            <p className="text-lg text-text-secondary max-w-lg mx-auto">
              {t("inProgress")}
            </p>
          </motion.div>
        )}

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-accent mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-accent rounded-full" />
              {t("featuredTitle")}
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-2 gap-8"
            >
              {featuredProjects.map((project) => (
                <motion.div key={`featured-${project.id}`} variants={itemVariants}>
                  <ProjectCard project={project} featuredLabel={t("featured")} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              {t("otherTitle")}
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {otherProjects.map((project) => (
                <motion.div key={`other-${project.id}`} variants={itemVariants}>
                  <ProjectCard project={project} featuredLabel={t("featured")} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* View More CTA */}
        {(featuredProjects.length > 0 || otherProjects.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12 pt-8 border-t border-card-border"
          >
            <p className="text-text-muted mb-4">{t("viewMore")}</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/donatocarpentiere"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-accent text-accent rounded-lg hover:bg-accent hover:text-background transition-colors duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {t("viewGithub")}
            </motion.a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

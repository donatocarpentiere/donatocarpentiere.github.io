"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { MonitorSmartphone, Server, Wrench } from "lucide-react";
import { useState, useEffect } from "react";

// Skill category type definition
interface SkillCategory {
  nameKey: string;
  icon: React.ReactNode;
  skills: { name: string; level: number }[];
}

const skillCategories: SkillCategory[] = [
  {
    nameKey: "frontend",
    icon: <MonitorSmartphone className="w-5 h-5" />,
    skills: [
      { name: "Angular 17", level: 85 },
      { name: "React / Next.js", level: 80 },
      { name: "TypeScript", level: 82 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "Tailwind CSS", level: 85 },
    ],
  },
  {
    nameKey: "backend",
    icon: <Server className="w-5 h-5" />,
    skills: [
      { name: "Java 17 / Spring Boot", level: 85 },
      { name: "Python", level: 80 },
      { name: "PHP / MySQL", level: 70 },
      { name: "SQL Server", level: 78 },
      { name: "Rust", level: 55 },
    ],
  },
  {
    nameKey: "tools",
    icon: <Wrench className="w-5 h-5" />,
    skills: [
      { name: "Git / GitHub", level: 85 },
      { name: "Jenkins (CI/CD)", level: 75 },
      { name: "Linux (Advanced)", level: 72 },
      { name: "Postman", level: 80 },
      { name: "SAP BTP Cloud", level: 65 },
    ],
  },
];

interface SkillBarProps {
  name: string;
  level: number;
}

function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-foreground font-medium">{name}</span>
        <span className="text-accent font-mono text-sm">{level}%</span>
      </div>
      <div className="h-2 bg-background rounded-full overflow-hidden border border-card-border">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-accent-hover rounded-full"
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const t = useTranslations("skills");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const certifications = [
    "CPA: Programming Essentials in C++ (CISCO)",
    "PCAP: Programming Essentials in Python (CISCO)",
    "Scientific Computing with Python",
    "Introduction to Cybersecurity (CISCO)",
    "SQL Fundamentals (MySQL & SQL Server)",
    "MOS Microsoft Excel",
    "Advanced Linux Commands",
    "Python Essentials 2",
  ];

  const languages = [
    { name: "Italian", level: "Native" },
    { name: "English", level: "B2" },
  ];

  const moreTechs = [
    "JavaScript",
    "C++",
    "MySQL",
    "JasperReports",
    "SSMS",
    "ERP Systems",
    "SAPU15",
    "Office 365",
  ];

  // If not mounted, render a static version or nothing to avoid mismatch
  if (!mounted) {
    return (
      <section id="skills" className="py-20 md:py-32 opacity-0">
        <div className="max-w-7xl mx-auto px-4" />
      </section>
    );
  }

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
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

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={`category-${category.nameKey}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-xl transition-all duration-300 glass-card border border-transparent hover:border-accent/30 hover:shadow-[0_0_30px_rgba(250,204,21,0.1)] relative overflow-hidden group"
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-colors duration-500" />
              
              <h3 className="text-xl font-semibold text-accent mb-6 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10 text-accent">
                  {category.icon}
                </div>
                {t(`categories.${category.nameKey}`)}
              </h3>
              <div className="space-y-5">
                {category.skills.map((skill, skillIdx) => (
                  <SkillBar
                    key={`skill-${category.nameKey}-${skillIdx}`}
                    name={skill.name}
                    level={skill.level}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mt-16 pt-12 border-t border-card-border"
        >
          <h3 className="text-center text-xl font-semibold text-foreground mb-8">
            {t("certifications")}
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={`cert-${i}`}
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-xl text-center transition-all duration-300 glass-card flex items-center justify-center border border-transparent hover:border-accent/20"
              >
                <span className="text-sm text-text-secondary font-medium">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages & More Technologies Row */}
        <div className="grid lg:grid-cols-2 gap-12 mt-12 pt-12 border-t border-card-border">
          {/* Languages */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-lg text-text-muted mb-6">{t("languages")}</h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {languages.map((lang, i) => (
                <div
                  key={`lang-${i}`}
                  className="px-6 py-3 rounded-full text-text-secondary font-medium glass-card border border-accent/10"
                >
                  {lang.name}{" "}
                  <span className="text-accent font-mono ml-2">
                    ({lang.level})
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* More Technologies */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h3 className="text-lg text-text-muted mb-6">
              {t("moreTechnologies")}
            </h3>
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {moreTechs.map((tech, i) => (
                <span
                  key={`more-tech-${i}`}
                  className="px-4 py-2 rounded-full text-text-secondary text-sm font-medium glass-card border border-transparent hover:border-accent/30 hover:text-accent transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

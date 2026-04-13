"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// Experience/Timeline data type
interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  detailedDescription?: string;
  technologies: string[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    role: "Full-Stack Developer",
    company: "Sabanet",
    period: "Jan 2025 - Present",
    description:
      "Full-stack web application development using Angular 17 and Java 17 with Spring Boot. Building scalable APIs, designing relational databases on SQL Server, deploying production environments via Jenkins pipelines, and creating high-performance custom scripts in Rust.",
    detailedDescription: "In my current role at Sabanet, I am responsible for the end-to-end development of enterprise-level applications. This includes architecting scalable RESTful APIs with Spring Boot, building interactive frontends with Angular 17, and ensuring smooth deployments through automated Jenkins pipelines. I also specialize in writing performance-critical scripts in Rust to optimize data processing tasks.",
    technologies: ["Angular 17", "Java 17", "Spring Boot", "SQL Server", "Jenkins", "Rust"],
    current: true,
  },
  {
    id: 2,
    role: "Operational Technician",
    company: "Vestas",
    period: "Jul 2024 - Jan 2025",
    description:
      "User login management and production activity planning through the Apriso system. Handling production workflows and ensuring operational efficiency in a manufacturing environment.",
    detailedDescription: "At Vestas, I focused on the operational side of manufacturing systems. I managed user access and production schedules using the Apriso system, which involved coordinating complex workflows to maintain high efficiency on the production floor. This role required strong problem-solving skills and a deep understanding of manufacturing execution systems (MES).",
    technologies: ["Apriso", "Production Management"],
  },
  {
    id: 3,
    role: "Software Developer / SAP Consultant",
    company: "Nearcons",
    period: "Dec 2023 - Jun 2024",
    description:
      "Development and maintenance of SAP applications for key clients. Migration from SAP to SAP BTP Cloud, building apps with the SAPU15 framework, and integrating ERP systems to optimize production workflows with Apriso configuration.",
    detailedDescription: "As a consultant at Nearcons, I played a key role in digital transformation projects for enterprise clients. I specialized in migrating legacy SAP systems to the SAP BTP Cloud platform, developing custom applications using the SAPU15 framework, and ensuring seamless integration between ERP systems and production tools like Apriso.",
    technologies: ["SAP BTP Cloud", "SAPU15", "ERP", "Apriso"],
  },
  {
    id: 4,
    role: "Web Developer",
    company: "I.I.S.S. Pacinotti",
    period: "2022",
    description:
      "Frontend development using JavaScript, HTML, and CSS. Backend development with PHP and MySQL for school projects and web applications.",
    detailedDescription: "During my time at I.I.S.S. Pacinotti, I developed several web applications as part of my academic curriculum. This included building responsive frontends with vanilla JavaScript and CSS, and implementing database-driven backends with PHP and MySQL. These projects laid the foundation for my passion for full-stack development.",
    technologies: ["JavaScript", "HTML", "CSS", "PHP", "MySQL"],
  },
];

interface TimelineItemProps {
  experience: Experience;
  isLast: boolean;
  currentLabel: string;
  onClick: (exp: Experience) => void;
}

function TimelineItem({ experience, isLast, currentLabel, onClick }: TimelineItemProps) {
  return (
    <div className={`relative pl-8 md:pl-12 ${!isLast ? "pb-12" : ""}`}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-[11px] md:left-[15px] top-10 bottom-0 w-0.5 bg-card-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-1.5">
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
            experience.current
              ? "border-accent bg-accent"
              : "border-card-border bg-background"
          }`}
        >
          {experience.current && (
            <div className="w-2 h-2 bg-background rounded-full" />
          )}
        </div>
      </div>

      {/* Content Card */}
      <button 
        onClick={() => onClick(experience)}
        className="w-full text-left rounded-xl p-6 transition-all duration-300 glass-card hover:scale-[1.02] cursor-pointer group relative overflow-hidden"
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2 group-hover:text-accent transition-colors">
              {experience.role}
              {experience.current && (
                <span className="text-xs px-2 py-1 bg-accent/20 text-accent rounded-full font-medium">
                  {currentLabel}
                </span>
              )}
            </h3>
            <p className="text-accent font-medium">{experience.company}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-text-muted font-mono text-sm whitespace-nowrap">
              {experience.period}
            </span>
          </div>
        </div>
        <p className="text-text-secondary leading-relaxed mb-4">
          {experience.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((tech, i) => (
            <span
              key={`exp-${experience.id}-tech-${i}`}
              className="text-xs px-3 py-1 bg-background/50 border border-card-border rounded-full text-text-secondary font-mono"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Click Indicator */}
        <div className="absolute bottom-2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[10px] text-accent font-mono uppercase tracking-widest">
            Click to view details
          </span>
        </div>
      </button>
    </div>
  );
}

export default function Experience() {
  const t = useTranslations("experience");
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedExp(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Prevent scroll when modal is open
  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedExp]);

  if (!mounted) return null;

  return (
    <section id="experience" className="py-20 md:py-32 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t("title")}
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
          <p className="text-text-muted mt-6 max-w-2xl mx-auto text-lg">
            {t("subtitle")}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <TimelineItem
              key={`experience-${exp.id}`}
              experience={exp}
              isLast={index === experiences.length - 1}
              currentLabel={t("current")}
              onClick={setSelectedExp}
            />
          ))}
        </div>

        {/* Education Section */}
        <div className="mt-16 pt-12 border-t border-card-border text-center">
          <h3 className="text-xl font-semibold text-foreground mb-6">
            {t("continuousLearning")}
          </h3>
          <div className="max-w-2xl mx-auto space-y-4 text-text-secondary">
            <div className="p-4 rounded-xl glass-card">
              <p className="font-medium text-foreground">
                B.Sc. Computer Engineering — Artificial Intelligence
              </p>
              <p className="text-sm">
                Università degli Studi &quot;Guglielmo Marconi&quot; | 2022 – Present
              </p>
            </div>
            <div className="p-4 rounded-xl glass-card">
              <p className="font-medium text-foreground">
                Technical Diploma in Computer Science — 90/100
              </p>
              <p className="text-sm">
                I.I.S.S. &quot;A. Pacinotti&quot; (Taranto) | 2017 – 2022
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedExp && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300"
          onClick={() => setSelectedExp(null)}
        >
          <div 
            className="w-full max-w-2xl p-8 rounded-2xl glass-card border-accent/20 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 p-2 text-text-muted hover:text-accent transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {selectedExp.role}
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xl text-accent font-medium">
                  {selectedExp.company}
                </p>
                <span className="text-text-muted">•</span>
                <p className="text-text-muted font-mono text-sm">
                  {selectedExp.period}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-3">
                  Description
                </h4>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {selectedExp.detailedDescription || selectedExp.description}
                </p>
              </div>
              
              <div className="pt-6 border-t border-card-border">
                <h4 className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.technologies.map((tech, i) => (
                    <span
                      key={`modal-tech-${i}`}
                      className="px-4 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent font-mono text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

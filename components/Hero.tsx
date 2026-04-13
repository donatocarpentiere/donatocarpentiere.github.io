"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function Hero() {
  const t = useTranslations("hero");
  const [currentRole, setCurrentRole] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const roles = t.raw("roles") as string[];
  const typingSpeed = isDeleting ? 50 : 100;
  const pauseDuration = 2000;

  useEffect(() => {
    if (!roles || roles.length === 0) return;

    const currentFullText = roles[currentRole];

    const timeout = setTimeout(
      () => {
        if (!isDeleting && text === currentFullText) {
          setIsDeleting(true);
        } else if (isDeleting && text === "") {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        } else {
          setText((prev) =>
            isDeleting
              ? prev.slice(0, -1)
              : currentFullText.slice(0, prev.length + 1)
          );
        }
      },
      !isDeleting && text === currentFullText
        ? pauseDuration
        : isDeleting && text === ""
          ? 500
          : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentRole, typingSpeed, roles, pauseDuration]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 pointer-events-none" />

      {/* Decorative Glows */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 -right-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 items-center gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.p
              variants={itemVariants}
              className="text-accent font-mono text-sm md:text-base mb-4 tracking-wider"
            >
              {t("greeting")}
            </motion.p>

            <motion.h1
              variants={itemVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
            >
              <span className="text-foreground">{t("firstName")}</span>
              <br />
              <span className="text-accent">{t("lastName")}</span>
            </motion.h1>

            <motion.div
              variants={itemVariants}
              className="h-12 md:h-16 flex items-center justify-center lg:justify-start mb-8"
            >
              <span className="text-xl md:text-3xl lg:text-4xl text-text-secondary font-light">
                {text}
              </span>
              <span className="text-accent text-2xl md:text-3xl lg:text-4xl ml-1 animate-pulse">
                |
              </span>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-text-muted text-base md:text-lg max-w-2xl mx-auto lg:mx-0 mb-12 leading-relaxed"
            >
              {t("tagline")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] min-w-[180px]"
              >
                {t("ctaViewWork")}
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 border-2 border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-background transition-all duration-300 min-w-[180px]"
              >
                {t("ctaGetInTouch")}
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="w-full min-h-[300px] flex items-center justify-center">
            {/* 3D Model will render behind this, keeping space empty for alignment */}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10"
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault();
            document
              .querySelector("#about")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-text-muted hover:text-accent transition-colors"
          aria-label="Scroll to about section"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}

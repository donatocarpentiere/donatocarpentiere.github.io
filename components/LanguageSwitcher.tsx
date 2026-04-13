"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Replace the locale in the path
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => switchLocale("en")}
        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
          locale === "en"
            ? "bg-accent text-background"
            : "text-text-muted hover:text-accent"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <span className="text-card-border">|</span>
      <button
        onClick={() => switchLocale("it")}
        className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
          locale === "it"
            ? "bg-accent text-background"
            : "text-text-muted hover:text-accent"
        }`}
        aria-label="Passa all'italiano"
      >
        IT
      </button>
    </div>
  );
}

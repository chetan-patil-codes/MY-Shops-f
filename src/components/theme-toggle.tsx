"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("myshops-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldUseDark = savedTheme === "dark" || (!savedTheme && prefersDark);

    document.documentElement.classList.toggle("dark", shouldUseDark);
    setIsDark(shouldUseDark);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    window.localStorage.setItem("myshops-theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-sm font-semibold text-slate-700 shadow-[0_10px_30px_rgba(32,79,166,0.12)] transition dark:bg-slate-800 dark:text-slate-100"
      aria-label="Toggle dark mode"
    >
      <span className="inline-flex h-6 w-11 items-center rounded-full bg-[linear-gradient(135deg,#7caeff,#1d4dff)] p-[2px]">
        <span
          className={`h-5 w-5 rounded-full bg-white transition-transform duration-300 ${
            mounted && isDark ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
      <span>{mounted && isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

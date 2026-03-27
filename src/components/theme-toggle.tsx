"use client";

import { useEffect, useState } from "react";

import type { ThemeMode } from "@/lib/portfolio-types";

type ThemeToggleProps = {
  defaultMode: ThemeMode;
  enabled: boolean;
  darkLabel?: string;
  lightLabel?: string;
};

export function ThemeToggle({
  defaultMode,
  enabled,
  darkLabel = "Mode sombre",
  lightLabel = "Mode clair",
}: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    window.localStorage.setItem("portfolio-theme", mode);
  }, [mode]);

  if (!enabled) {
    return null;
  }

  function toggleTheme() {
    const nextMode: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(nextMode);
  }

  return (
    <button className="themeToggle" onClick={toggleTheme} type="button">
      <span>{mode === "light" ? darkLabel : lightLabel}</span>
    </button>
  );
}

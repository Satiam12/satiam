import type { PortfolioConfig } from "@/lib/portfolio-types";

export function getThemeStyles(config: PortfolioConfig): Record<string, string> {
  return {
    "--color-primary": config.theme.primary,
    "--color-secondary": config.theme.secondary,
    "--color-accent": config.theme.accent,
    "--color-background": config.theme.background,
    "--color-surface": config.theme.surface,
    "--color-text": config.theme.text,
    "--color-muted": config.theme.muted,
    "--color-dark-background": config.theme.darkBackground,
    "--color-dark-surface": config.theme.darkSurface,
    "--color-dark-text": config.theme.darkText,
    "--color-dark-muted": config.theme.darkMuted,
  };
}

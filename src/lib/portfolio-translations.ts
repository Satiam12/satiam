import type {
  ManualTranslationLanguage,
  PortfolioConfig,
  PortfolioLanguage,
} from "@/lib/portfolio-types";

export type TranslationField = {
  label: string;
  source: string;
};

function shouldTranslate(text: string) {
  const trimmed = text.trim();
  if (!trimmed) {
    return false;
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return false;
  }
  if (/^\S+@\S+\.\S+$/i.test(trimmed)) {
    return false;
  }
  if (/^[\d\s+().-]+$/.test(trimmed)) {
    return false;
  }
  if (/^[A-Z]{2,3}$/.test(trimmed)) {
    return false;
  }
  if (/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(trimmed)) {
    return false;
  }
  if (/^(light|dark|inherit|editorial|modern|classic)$/i.test(trimmed)) {
    return false;
  }

  return true;
}

function addField(
  output: TranslationField[],
  seen: Set<string>,
  label: string,
  source: string,
) {
  if (!shouldTranslate(source)) {
    return;
  }

  const key = source.trim();
  if (seen.has(key)) {
    return;
  }

  seen.add(key);
  output.push({ label, source });
}

export function getTranslationFields(config: PortfolioConfig) {
  const output: TranslationField[] = [];
  const seen = new Set<string>();

  addField(output, seen, "Navigation - titre", config.site.navTitle);
  addField(output, seen, "Navigation - localisation", config.site.location);
  addField(output, seen, "UI - mode sombre", config.ui.themeToggle.darkLabel);
  addField(output, seen, "UI - mode clair", config.ui.themeToggle.lightLabel);

  addField(output, seen, "Hero - badge", config.hero.badge);
  addField(output, seen, "Hero - sous-titre", config.hero.subtitle);
  addField(output, seen, "Hero - titre", config.hero.title);
  addField(output, seen, "Hero - description", config.hero.description);
  addField(
    output,
    seen,
    "Hero - bouton principal",
    config.hero.primaryButton.label,
  );
  addField(
    output,
    seen,
    "Hero - bouton secondaire",
    config.hero.secondaryButton.label,
  );
  config.hero.stats.forEach((item, index) => {
    addField(
      output,
      seen,
      `Hero - statistique ${index + 1} - label`,
      item.label,
    );
  });

  addField(output, seen, "A propos - heading", config.about.heading);
  addField(output, seen, "A propos - titre", config.about.title);
  addField(output, seen, "A propos - texte", config.about.body);

  addField(output, seen, "Services - heading", config.services.heading);
  addField(output, seen, "Services - titre", config.services.title);
  config.services.items.forEach((item, index) => {
    addField(
      output,
      seen,
      `Services - item ${index + 1} - titre`,
      item.title,
    );
    addField(
      output,
      seen,
      `Services - item ${index + 1} - description`,
      item.description,
    );
  });

  addField(output, seen, "Cursus - label", config.cursus.label);
  addField(output, seen, "Cursus - heading", config.cursus.heading);
  config.cursus.items.forEach((item, index) => {
    addField(
      output,
      seen,
      `Cursus - item ${index + 1} - periode`,
      item.period,
    );
    addField(
      output,
      seen,
      `Cursus - item ${index + 1} - diplome`,
      item.diploma,
    );
    addField(
      output,
      seen,
      `Cursus - item ${index + 1} - institution`,
      item.institution,
    );
    addField(
      output,
      seen,
      `Cursus - item ${index + 1} - details`,
      item.details,
    );
  });

  addField(output, seen, "Experience - label", config.experience.label);
  addField(output, seen, "Experience - heading", config.experience.heading);
  config.experience.items.forEach((item, index) => {
    addField(
      output,
      seen,
      `Experience - item ${index + 1} - periode`,
      item.period,
    );
    addField(
      output,
      seen,
      `Experience - item ${index + 1} - role`,
      item.role,
    );
    addField(
      output,
      seen,
      `Experience - item ${index + 1} - entreprise`,
      item.company,
    );
    addField(
      output,
      seen,
      `Experience - item ${index + 1} - details`,
      item.details,
    );
  });

  addField(output, seen, "Projets - heading", config.projects.heading);
  addField(output, seen, "Projets - titre", config.projects.title);
  addField(output, seen, "Projets - bouton ouvrir", config.projects.openLabel);
  config.projects.items.forEach((item, index) => {
    addField(
      output,
      seen,
      `Projets - item ${index + 1} - nom`,
      item.name,
    );
    addField(
      output,
      seen,
      `Projets - item ${index + 1} - resume`,
      item.summary,
    );
  });

  addField(output, seen, "Contact - heading", config.contact.heading);
  addField(output, seen, "Contact - message", config.contact.callToAction);

  config.socialLinks.forEach((item, index) => {
    addField(
      output,
      seen,
      `Reseaux - item ${index + 1} - label`,
      item.label,
    );
  });

  return output;
}

function isManualTranslationLanguage(
  language: PortfolioLanguage,
): language is ManualTranslationLanguage {
  return language === "mg" || language === "en";
}

export function translateText(
  config: PortfolioConfig,
  language: PortfolioLanguage,
  source: string,
) {
  if (!isManualTranslationLanguage(language)) {
    return source;
  }

  if (!shouldTranslate(source)) {
    return source;
  }

  const translated = config.translations[language][source];
  return typeof translated === "string" && translated.trim().length > 0
    ? translated
    : source;
}

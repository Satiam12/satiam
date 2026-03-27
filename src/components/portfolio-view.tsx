"use client";

import { useState } from "react";
import type { CSSProperties } from "react";

import { getThemeStyles } from "@/lib/portfolio-theme";
import type { PortfolioConfig } from "@/lib/portfolio-types";

import { ThemeToggle } from "./theme-toggle";

type PortfolioViewProps = {
  config: PortfolioConfig;
};

type PortfolioLanguage = "fr" | "mg" | "en";

const translations: Record<
  PortfolioLanguage,
  {
    langLabel: string;
    sections: { about: string; services: string; projects: string; contact: string };
    theme: { dark: string; light: string };
    styleActive: string;
    styleText: string;
    aboutTitle: string;
    servicesTitle: string;
    projectsTitle: string;
    openProject: string;
  }
> = {
  fr: {
    langLabel: "FR",
    sections: {
      about: "A propos",
      services: "Services",
      projects: "Projets",
      contact: "Contact",
    },
    theme: { dark: "Mode sombre", light: "Mode clair" },
    styleActive: "Style actif",
    styleText:
      "Modifie les textes, les couleurs, le mode clair ou sombre et la police directement depuis l'interface privee.",
    aboutTitle: "Une presence digitale qui reste simple a faire evoluer.",
    servicesTitle: "Un portfolio qui suit ton rythme.",
    projectsTitle: "Selection recente",
    openProject: "Ouvrir",
  },
  mg: {
    langLabel: "MG",
    sections: {
      about: "Momba ahy",
      services: "Tolotra",
      projects: "Tetikasa",
      contact: "Fifandraisana",
    },
    theme: { dark: "Mody maizina", light: "Mody mazava" },
    styleActive: "Endrika ampiasaina",
    styleText:
      "Ovay ny lahatsoratra, ny loko, ny maody mazava na maizina ary ny polisy avy hatrany amin'ny pejy fitantanana miafina.",
    aboutTitle: "Fisiana an-tserasera mora ovaina hatrany.",
    servicesTitle: "Portfolio afaka manaraka ny filanao.",
    projectsTitle: "Safidy vao haingana",
    openProject: "Sokafy",
  },
  en: {
    langLabel: "EN",
    sections: {
      about: "About",
      services: "Services",
      projects: "Projects",
      contact: "Contact",
    },
    theme: { dark: "Dark mode", light: "Light mode" },
    styleActive: "Active style",
    styleText:
      "Edit text, colors, light or dark mode, and typography directly from the private control space.",
    aboutTitle: "A digital presence that stays easy to evolve.",
    servicesTitle: "A portfolio that moves at your pace.",
    projectsTitle: "Recent selection",
    openProject: "Open",
  },
};

export function PortfolioView({ config }: PortfolioViewProps) {
  const [language, setLanguage] = useState<PortfolioLanguage>(() => {
    if (typeof window === "undefined") {
      return "fr";
    }

    const stored = window.localStorage.getItem("portfolio-language");
    return stored === "fr" || stored === "mg" || stored === "en" ? stored : "fr";
  });
  const themeStyles = getThemeStyles(config) as CSSProperties;
  const copy = translations[language];
  const sectionLinks = [
    config.about.enabled ? { id: "about", label: copy.sections.about } : null,
    config.services.enabled ? { id: "services", label: copy.sections.services } : null,
    config.projects.enabled ? { id: "projects", label: copy.sections.projects } : null,
    config.contact.enabled ? { id: "contact", label: copy.sections.contact } : null,
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  function changeLanguage(nextLanguage: PortfolioLanguage) {
    setLanguage(nextLanguage);
    window.localStorage.setItem("portfolio-language", nextLanguage);
  }

  return (
    <div
      className="portfolioShell"
      data-font-preset={config.preferences.fontPreset}
      style={themeStyles}
    >
      <header className="topbar">
        <a className="brand" href="#home">
          <span className="brandMark">{config.site.ownerName.slice(0, 2)}</span>
          <span>
            <strong>{config.site.navTitle}</strong>
            <small>{config.site.location}</small>
          </span>
        </a>
        <nav className="nav">
          {sectionLinks.map((link) => (
            <a href={`#${link.id}`} key={link.id}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="toolbarGroup">
          <div className="languageToggle" role="group" aria-label="Language">
            {(["mg", "fr", "en"] as const).map((lang) => (
              <button
                className={language === lang ? "languageButton active" : "languageButton"}
                key={lang}
                onClick={() => changeLanguage(lang)}
                type="button"
              >
                {translations[lang].langLabel}
              </button>
            ))}
          </div>
        <ThemeToggle
          defaultMode={config.preferences.defaultMode}
          darkLabel={copy.theme.dark}
          enabled={config.preferences.showDarkModeToggle}
          lightLabel={copy.theme.light}
        />
        </div>
      </header>

      <main id="home">
        <section className="heroPanel heroPanelTextOnly">
          <div className="heroCopy">
            <span className="eyebrow">{config.hero.badge}</span>
            <p className="subtitle">{config.hero.subtitle}</p>
            <h1>{config.hero.title}</h1>
            <p className="lead">{config.hero.description}</p>
            <div className="heroActions">
              {config.hero.primaryButton.enabled ? (
                <a className="buttonPrimary" href={config.hero.primaryButton.href}>
                  {config.hero.primaryButton.label}
                </a>
              ) : null}
              {config.hero.secondaryButton.enabled ? (
                <a className="buttonGhost" href={config.hero.secondaryButton.href}>
                  {config.hero.secondaryButton.label}
                </a>
              ) : null}
            </div>
            <div className="statsGrid">
              {config.hero.stats.map((stat) => (
                <article className="statCard" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="heroTextBlock">
            <p className="sectionTag">{copy.styleActive}</p>
            <h2>{config.preferences.fontPreset}</h2>
            <p>{copy.styleText}</p>
          </div>
        </section>

        {config.about.enabled ? (
          <section className="contentSection aboutCard" id="about">
            <p className="sectionTag">{copy.sections.about}</p>
            <div className="splitHeading">
              <h2>{copy.aboutTitle}</h2>
              <p>{config.about.body}</p>
            </div>
          </section>
        ) : null}

        {config.services.enabled ? (
          <section className="contentSection" id="services">
            <div className="sectionHeader">
              <p className="sectionTag">{copy.sections.services}</p>
              <h2>{copy.servicesTitle}</h2>
            </div>
            <div className="cardGrid">
              {config.services.items.map((item) => (
                <article className="infoCard" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {config.projects.enabled ? (
          <section className="contentSection" id="projects">
            <div className="sectionHeader">
              <p className="sectionTag">{copy.sections.projects}</p>
              <h2>{copy.projectsTitle}</h2>
            </div>
            <div className="projectList">
              {config.projects.items.map((project) => (
                <article className="projectCard projectCardSimple" key={project.name}>
                  <div>
                    <h3>{project.name}</h3>
                    <p>{project.summary}</p>
                  </div>
                  <a href={project.url} rel="noreferrer" target="_blank">
                    {copy.openProject}
                  </a>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {config.contact.enabled ? (
          <section className="contentSection contactCard" id="contact">
            <div>
              <p className="sectionTag">{copy.sections.contact}</p>
              <h2>{config.contact.callToAction}</h2>
            </div>
            <div className="contactDetails">
              <a href={`mailto:${config.contact.email}`}>{config.contact.email}</a>
              <a href={`tel:${config.contact.phone.replace(/\s+/g, "")}`}>
                {config.contact.phone}
              </a>
              <div className="socialRow">
                {config.socialLinks.map((link) => (
                  <a href={link.href} key={link.label} rel="noreferrer" target="_blank">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}

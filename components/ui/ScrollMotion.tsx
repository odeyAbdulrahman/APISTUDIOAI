"use client";

import { useEffect } from "react";

const revealSelectors = [
  ".integration-rail",
  ".guided-demo-experience",
  "section:not(.hero):not(.generation-section) .section-heading",
  ".workflow-experience",
  ".implementation-plan",
  ".mapping-workspace",
  ".guardrails-experience",
  ".validation-experience",
  ".use-cases-experience",
  ".faq-experience",
  ".cta-card",
];

const staggerGroups = [
  ".comparison-stories > *",
  ".intelligence-sources > *",
  ".generation-layout > *",
  ".differentiator-grid > *",
  ".developer-card > *",
];

export function ScrollMotion() {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) return;

    const revealItems = new Set<HTMLElement>();

    revealSelectors.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        element.classList.add("site-reveal");
        revealItems.add(element);
      });
    });

    staggerGroups.forEach((selector) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("site-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 80}ms`);
        revealItems.add(element);
      });
    });

    document.documentElement.classList.add("site-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          (entry.target as HTMLElement).classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -9% 0px", threshold: 0.08 },
    );

    revealItems.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("site-motion-ready");
      revealItems.forEach((element) => {
        element.classList.remove("site-reveal", "is-revealed");
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, []);

  return null;
}

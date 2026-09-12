"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/apistudio/hero-integration-workspace.png",
    alt: "Developer workstation showing repository-aware API integration flows",
    eyebrow: "01 · Understand both sides",
    title: "Repository-aware integration",
    detail: "Architecture, API contracts, and code patterns in one workspace.",
  },
  {
    image: "/images/apistudio/hero-api-playground.png",
    alt: "Developer workstation showing an API endpoint testing workspace",
    eyebrow: "02 · Test before generation",
    title: "Explore real API behavior",
    detail: "Inspect requests, responses, status, latency, and errors.",
  },
  {
    image: "/images/apistudio/hero-pull-request.png",
    alt: "Developer workstation showing validated code changes and pull request checks",
    eyebrow: "03 · Validate before review",
    title: "Finish with a Pull Request",
    detail: "Builds, tests, constraints, and diffs stay visible to your team.",
  },
];

export function HeroShowcase() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + slides.length) % slides.length);
    setPaused(true);
  };

  return (
    <div className="hero-showcase" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="hero-slides">
        {slides.map((slide, index) => (
          <figure className={index === active ? "is-active" : ""} aria-hidden={index !== active} key={slide.image}>
            <Image src={slide.image} alt={index === active ? slide.alt : ""} fill priority={index === 0} sizes="(max-width: 1024px) 100vw, 58vw" unoptimized />
            <div className="hero-image-wash" />
            <figcaption><small>{slide.eyebrow}</small><strong>{slide.title}</strong><span>{slide.detail}</span></figcaption>
          </figure>
        ))}
      </div>
      <div className="hero-carousel-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous product view">←</button>
        <div role="tablist" aria-label="Choose a product view">
          {slides.map((slide, index) => <button type="button" role="tab" aria-selected={active === index} onClick={() => { setActive(index); setPaused(true); }} key={slide.title}><span className="sr-only">{slide.title}</span></button>)}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next product view">→</button>
      </div>
      <button className="hero-pause" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume automatic product views" : "Pause automatic product views"}>{paused ? "Play" : "Pause"}</button>
    </div>
  );
}

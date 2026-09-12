"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const manualSteps = ["Read documentation", "Create DTOs and clients", "Configure authentication", "Map external data", "Add logging and errors", "Write tests", "Debug the build", "Prepare a Pull Request"];
const studioSteps = ["Connect repository", "Import API", "Test endpoints", "Map data", "Generate", "Validate", "Review", "Pull Request"];

function StoryCard({ kind, label, title, copy, image, steps, active }: { kind: string; label: string; title: string; copy: string; image: string; steps: string[]; active: number }) {
  return (
    <article className={`comparison-story ${kind}`}>
      <Image src={image} alt="" fill sizes="(max-width: 800px) 100vw, 50vw" unoptimized />
      <div className="comparison-story-wash" />
      <div className="comparison-story-content">
        <span>{label}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
        <div className="story-steps">
          {steps.map((step, index) => <div className={index === active ? "active" : index < active ? "passed" : ""} key={step}><i>{index < active ? "✓" : String(index + 1).padStart(2, "0")}</i><b>{step}</b></div>)}
        </div>
        <div className="story-progress" aria-label={`Step ${active + 1} of ${steps.length}`}><i style={{ width: `${((active + 1) / steps.length) * 100}%` }} /></div>
      </div>
    </article>
  );
}

export function ComparisonExperience() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % manualSteps.length), 1350);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="comparison-stories">
      <StoryCard kind="manual" label="Traditional API integration" title="Manual adaptation after generation" copy="A fragmented path across documentation, code, debugging, and review." image="/images/apistudio/comparison-manual-integration.png" steps={manualSteps} active={active} />
      <StoryCard kind="controlled" label="With APISTUDIOAI" title="One controlled integration workflow" copy="Both sides understood, tested, generated, and validated in one guided flow." image="/images/apistudio/comparison-controlled-workflow.png" steps={studioSteps} active={active} />
    </div>
  );
}

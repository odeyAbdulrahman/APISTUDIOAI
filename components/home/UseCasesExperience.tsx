"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "../ui/Icon";

const scenarios: { title: string; body: string; eyebrow: string; icon: IconName; examples: string[]; result: string }[] = [
  { title: "Government & enterprise", eyebrow: "Protected service connections", icon: "building", body: "Connect authority and enterprise services while preserving permission boundaries, audit requirements, and internal architecture.", examples: ["Identity authority", "Licensing service", "Secure records"], result: "5 endpoints · 3 protected mappings" },
  { title: "HR & employee systems", eyebrow: "Workforce data workflows", icon: "users", body: "Integrate identity, payroll, access, and employee data with the models and validation rules your organization already uses.", examples: ["Employee profiles", "Payroll status", "Access records"], result: "8 endpoints · 12 model mappings" },
  { title: "Payments & finance", eyebrow: "Verified financial operations", icon: "bank", body: "Implement payments, invoicing, billing, and financial verification with controlled authentication and explicit failure handling.", examples: ["Payment gateway", "Invoice service", "Account verification"], result: "6 endpoints · 9 validation rules" },
  { title: "Internal platforms", eyebrow: "One governed service layer", icon: "boxes", body: "Connect internal services without introducing a different client, error model, or integration pattern in every repository.", examples: ["Business services", "Shared data", "Internal events"], result: "4 services · 1 architecture pattern" },
  { title: "Legacy applications", eyebrow: "Modern APIs, established core", icon: "contactless", body: "Add modern API integrations to established software while keeping the stable core, existing conventions, and deployment model intact.", examples: ["Core application", "Adapter layer", "Modern API"], result: "Zero core redesign required" },
  { title: "SaaS integrations", eyebrow: "Third-party services, controlled", icon: "globe", body: "Bring cloud platforms into existing backend workflows through typed clients, deliberate mappings, tests, and reviewable changes.", examples: ["CRM platform", "Cloud storage", "Identity provider"], result: "3 providers · 1 reviewable Pull Request" },
];

export function UseCasesExperience() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % scenarios.length), 4800);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const scenario = scenarios[active];

  return (
    <div className="use-cases-experience">
      <div className={`scenario-visual scenario-${active + 1}`} aria-live="polite">
        <header><span><i /> LIVE SCENARIO</span><button aria-label={playing ? "Pause use-case rotation" : "Resume use-case rotation"} onClick={() => setPlaying(value => !value)} type="button"><Icon name={playing ? "pause" : "play"} size={15} />{playing ? "Pause" : "Resume"}</button></header>
        <div className="scenario-content">
          <span className="scenario-icon"><Icon name={scenario.icon} size={23} /></span>
          <small>{scenario.eyebrow}</small>
          <h3>{scenario.title}</h3>
          <p>{scenario.body}</p>
          <div className="scenario-examples">{scenario.examples.map(item => <span key={item}><Icon name="check" size={13} />{item}</span>)}</div>
        </div>
        <footer><span><Icon name="sparkles" size={16} /> Generated implementation</span><b>{scenario.result}</b></footer>
      </div>

      <div className="scenario-selector" aria-label="Integration scenarios">
        <header><span>Explore scenarios</span><small>0{active + 1} / 0{scenarios.length}</small></header>
        <div className="scenario-selector-list">
          {scenarios.map((item, index) => (
            <button className={index === active ? "is-active" : ""} key={item.title} onClick={() => setActive(index)} type="button">
              <span>0{index + 1}</span><i><Icon name={item.icon} size={18} /></i><b>{item.title}</b><Icon name="chevron-right" size={16} />
              {index === active && <em><i className={playing ? "is-playing" : ""} key={`${active}-${playing}`} /></em>}
            </button>
          ))}
        </div>
        <footer><Icon name="git-pull-request" size={18} /><span><b>Same controlled workflow</b><small>Analyze · Map · Generate · Validate · Review</small></span></footer>
      </div>
    </div>
  );
}

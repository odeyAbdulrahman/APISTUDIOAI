"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "../ui/Icon";

const steps: {
  number: string;
  title: string;
  body: string;
  icon: IconName;
  status: string;
  result: string;
  checks: string[];
  metric: string;
}[] = [
  {
    number: "01",
    title: "Understand",
    body: "Read the repository before deciding where integration code belongs.",
    icon: "search",
    status: "Repository understood",
    result: "commerce-platform",
    checks: [".NET 8 and Clean Architecture detected", "Existing API client pattern matched", "Protected modules indexed"],
    metric: "12 conventions found",
  },
  {
    number: "02",
    title: "Connect",
    body: "Import the contract, configure authentication, and test real endpoints.",
    icon: "globe",
    status: "API contract connected",
    result: "Ministry Employee API",
    checks: ["OpenAPI schema parsed", "Authentication isolated", "18 endpoints available"],
    metric: "184 ms response",
  },
  {
    number: "03",
    title: "Integrate",
    body: "Map external fields and generate code using the repository’s patterns.",
    icon: "boxes",
    status: "Integration generated",
    result: "Employee verification flow",
    checks: ["DTO and command created", "Field mappings applied", "Dependency injection registered"],
    metric: "12 files changed",
  },
  {
    number: "04",
    title: "Validate",
    body: "Restore, build, test, and verify every architectural constraint.",
    icon: "cloud-check",
    status: "Validation complete",
    result: "All quality gates passed",
    checks: ["Build completed successfully", "38 automated tests passed", "No architecture violations"],
    metric: "0 rule violations",
  },
  {
    number: "05",
    title: "Ship",
    body: "Review the complete diff and prepare a Pull Request for team approval.",
    icon: "git-pull-request",
    status: "Ready for review",
    result: "Pull Request #184",
    checks: ["Dedicated branch created", "Validation report attached", "Nothing merged automatically"],
    metric: "Review-ready",
  },
];

export function WorkflowExperience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const step = steps[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % steps.length), 3800);
    return () => window.clearInterval(timer);
  }, [paused]);

  function selectStep(index: number) {
    setActive(index);
    setPaused(true);
  }

  return (
    <div className="workflow-experience">
      <div className="workflow-steps" role="tablist" aria-label="Integration workflow steps">
        {steps.map((item, index) => (
          <button
            aria-controls="workflow-panel"
            aria-selected={index === active}
            className={index === active ? "is-active" : index < active ? "is-complete" : ""}
            key={item.number}
            onClick={() => selectStep(index)}
            role="tab"
            type="button"
          >
            <span className="workflow-step-number">{index < active ? <Icon name="check" size={16} /> : item.number}</span>
            <span><strong>{item.title}</strong><small>{item.body}</small></span>
            <Icon className="workflow-step-arrow" name="chevron-right" size={17} />
          </button>
        ))}
      </div>

      <div className="workflow-preview" id="workflow-panel" role="tabpanel" aria-live="polite">
        <div className="workflow-preview-topbar"><span><i /><i /><i /></span><b>integration-run</b><small>Live workflow</small></div>
        <div className="workflow-runner" aria-hidden="true">
          {steps.map((item, index) => <span className={index <= active ? "is-filled" : ""} key={item.number} />)}
        </div>
        <div className="workflow-preview-content" key={step.number}>
          <div className="workflow-preview-icon"><Icon name={step.icon} size={24} /></div>
          <small>Step {step.number} of 05 · {step.status}</small>
          <h3>{step.result}</h3>
          <p>{step.body}</p>
          <div className="workflow-checks">
            {step.checks.map(check => <span key={check}><Icon name="check" size={15} />{check}</span>)}
          </div>
        </div>
        <div className="workflow-preview-footer">
          <span><i /> Controlled execution</span>
          <strong>{step.metric}</strong>
          <button aria-label={paused ? "Resume automatic workflow" : "Pause automatic workflow"} onClick={() => setPaused(value => !value)} type="button">
            <Icon name={paused ? "play" : "pause"} size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

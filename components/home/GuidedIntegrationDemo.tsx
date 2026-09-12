"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "../ui/Icon";

const apiOptions = [
  { name: "Employee Verification API", meta: "OpenAPI · 18 endpoints", icon: "building" as IconName },
  { name: "Payments Ledger API", meta: "Swagger · 24 endpoints", icon: "bank" as IconName },
  { name: "Logistics Tracking API", meta: "Postman · 16 endpoints", icon: "globe" as IconName },
];

const repositoryOptions = [
  { name: "commerce-platform", meta: ".NET 8 · Clean Architecture" },
  { name: "operations-portal", meta: "Node.js · Hexagonal" },
  { name: "partner-services", meta: "Java · Spring Boot" },
];

const phases = [
  { label: "Repository", detail: "12 conventions detected", icon: "search" as IconName },
  { label: "API contract", detail: "Schemas and auth resolved", icon: "globe" as IconName },
  { label: "Implementation", detail: "Mappings and files planned", icon: "boxes" as IconName },
  { label: "Validation", detail: "Build and tests configured", icon: "cloud-check" as IconName },
];

type DemoStatus = "idle" | "running" | "complete";

export function GuidedIntegrationDemo() {
  const [apiIndex, setApiIndex] = useState(0);
  const [repositoryIndex, setRepositoryIndex] = useState(0);
  const [phase, setPhase] = useState(0);
  const [status, setStatus] = useState<DemoStatus>("idle");

  const api = apiOptions[apiIndex];
  const repository = repositoryOptions[repositoryIndex];

  useEffect(() => {
    if (status !== "running") return;

    const timer = window.setTimeout(() => {
      if (phase === phases.length - 1) setStatus("complete");
      else setPhase((current) => current + 1);
    }, 720);

    return () => window.clearTimeout(timer);
  }, [phase, status]);

  function configure(type: "api" | "repository", index: number) {
    if (type === "api") setApiIndex(index);
    else setRepositoryIndex(index);
    setPhase(0);
    setStatus("idle");
  }

  function runDemo() {
    setPhase(0);
    setStatus("running");
  }

  return (
    <div className="guided-demo-experience">
      <header className="guided-demo-toolbar">
        <div><i aria-hidden="true" /><span><small>GUIDED SAMPLE</small><b>integration-workspace</b></span></div>
        <strong className={`guided-demo-status is-${status}`}>
          {status === "complete" ? <><Icon name="check" size={14} /> Plan ready</> : status === "running" ? "Analyzing both systems" : "Ready to analyze"}
        </strong>
      </header>

      <div className="guided-demo-grid">
        <aside className="guided-demo-config" aria-label="Sample integration configuration">
          <fieldset>
            <legend><span>01</span>Select an API</legend>
            {apiOptions.map((option, index) => (
              <button aria-pressed={apiIndex === index} className={apiIndex === index ? "is-selected" : ""} key={option.name} onClick={() => configure("api", index)} type="button">
                <i><Icon name={option.icon} size={17} /></i><span><b>{option.name}</b><small>{option.meta}</small></span><em>{apiIndex === index ? "Selected" : "+"}</em>
              </button>
            ))}
          </fieldset>

          <fieldset>
            <legend><span>02</span>Select a repository</legend>
            {repositoryOptions.map((option, index) => (
              <button aria-pressed={repositoryIndex === index} className={repositoryIndex === index ? "is-selected" : ""} key={option.name} onClick={() => configure("repository", index)} type="button">
                <i><Icon name="git-pull-request" size={17} /></i><span><b>{option.name}</b><small>{option.meta}</small></span><em>{repositoryIndex === index ? "Selected" : "+"}</em>
              </button>
            ))}
          </fieldset>
        </aside>

        <div aria-label="Generated implementation plan" aria-live="polite" className="guided-demo-result" role="region">
          <header>
            <div><small>IMPLEMENTATION TARGET</small><b>{api.name}</b><span>into {repository.name}</span></div>
            <Icon name="sparkles" size={23} />
          </header>

          <div className="guided-demo-phases">
            {phases.map((item, index) => {
              const isComplete = status === "complete" || (status === "running" && index < phase);
              const isActive = status === "running" && index === phase;
              return (
                <div className={isComplete ? "is-complete" : isActive ? "is-active" : ""} key={item.label}>
                  <i>{isComplete ? <Icon name="check" size={16} /> : <Icon name={item.icon} size={16} />}</i>
                  <span><b>{item.label}</b><small>{item.detail}</small></span>
                  <em>{isComplete ? "Done" : isActive ? "Running" : "Queued"}</em>
                </div>
              );
            })}
          </div>

          <div className={`guided-demo-plan ${status === "complete" ? "is-ready" : ""}`}>
            <div><small>Target</small><b>Infrastructure/ApiClients</b></div>
            <div><small>Pattern</small><b>{repositoryIndex === 0 ? "CQRS + MediatR" : repositoryIndex === 1 ? "Ports + adapters" : "Service + gateway"}</b></div>
            <div><small>Contract</small><b>{apiIndex === 0 ? "Employee → EmployeeDto" : apiIndex === 1 ? "Ledger → PaymentRecord" : "Shipment → TrackingEvent"}</b></div>
            <div><small>Delivery</small><b>Reviewable Pull Request</b></div>
          </div>

          <footer>
            <p><Icon name="check" size={15} /><span><b>Developer-controlled</b><small>Nothing is merged automatically</small></span></p>
            <button disabled={status === "running"} onClick={runDemo} type="button">
              <Icon name={status === "complete" ? "play" : "sparkles"} size={16} />
              {status === "complete" ? "Run again" : status === "running" ? "Building plan…" : "Generate implementation plan"}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

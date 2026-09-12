"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "../ui/Icon";

const policies: {
  title: string;
  label: string;
  icon: IconName;
  tone: string;
  request: string;
  file: string;
  decision: string;
  explanation: string;
  items: string[];
  badge: string;
}[] = [
  {
    title: "Allowed scope",
    label: "Safe to modify",
    icon: "check",
    tone: "allow",
    request: "Create MinistryEmployeeClient",
    file: "src/Infrastructure/ApiClients/MinistryEmployeeClient.cs",
    decision: "Change allowed",
    explanation: "The file belongs to an approved integration boundary and follows the existing HTTP client pattern.",
    items: ["Application/Integrations", "Infrastructure/ApiClients", "Tests/Integration"],
    badge: "Within approved scope",
  },
  {
    title: "Protected modules",
    label: "Change prevented",
    icon: "cloud-check",
    tone: "protect",
    request: "Update employee identity entity",
    file: "src/Domain/Employees/Employee.cs",
    decision: "Change blocked",
    explanation: "Domain is protected. APISTUDIOAI keeps the integration outside the core model and reports the constraint.",
    items: ["Domain", "Authentication", "Database migrations"],
    badge: "Protected boundary",
  },
  {
    title: "Repository rules",
    label: "Convention enforced",
    icon: "file-chart",
    tone: "rules",
    request: "Add JSON serialization package",
    file: "src/Infrastructure/Infrastructure.csproj",
    decision: "Existing library selected",
    explanation: "New packages are not permitted, so generation reuses the serializer already approved by the repository.",
    items: ["Use existing libraries", "Do not add packages", "Follow naming conventions"],
    badge: "Rule applied",
  },
];

export function GuardrailsExperience() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const policy = policies[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % policies.length), 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  function selectPolicy(index: number) {
    setActive(index);
    setPaused(true);
  }

  return (
    <div className="guardrails-experience">
      <div className="guardrail-tabs" role="tablist" aria-label="Repository guardrail policies">
        {policies.map((item, index) => (
          <button aria-controls="guardrail-inspector" aria-selected={index === active} className={index === active ? `is-active ${item.tone}` : item.tone} key={item.title} onClick={() => selectPolicy(index)} role="tab" type="button">
            <span><Icon name={item.icon} size={19} /></span>
            <span><strong>{item.title}</strong><small>{item.label}</small></span>
            <Icon name="chevron-right" size={16} />
          </button>
        ))}
      </div>

      <div className={`guardrail-inspector ${policy.tone}`} id="guardrail-inspector" role="tabpanel" aria-live="polite">
        <header>
          <div><i /><i /><i /><span>repository-policy.yaml</span></div>
          <div><b>Guardrails active</b><button aria-label={paused ? "Resume automatic guardrail preview" : "Pause automatic guardrail preview"} onClick={() => setPaused(value => !value)} type="button"><Icon name={paused ? "play" : "pause"} size={14} />{paused ? "Resume" : "Auto"}</button></div>
        </header>
        <div className="guardrail-cycle"><span className={paused ? "is-paused" : ""} key={`${active}-${paused}`} /></div>

        <div className="guardrail-inspector-body" key={policy.title}>
          <div className="guardrail-request">
            <small>Proposed change</small>
            <h3>{policy.request}</h3>
            <code>{policy.file}</code>
            <div>{policy.items.map(item => <span key={item}><Icon name="check" size={14} />{item}</span>)}</div>
          </div>
          <div className="guardrail-decision">
            <span><Icon name={policy.icon} size={27} /></span>
            <small>Policy decision</small>
            <h3>{policy.decision}</h3>
            <p>{policy.explanation}</p>
            <b>{policy.badge}</b>
          </div>
        </div>

        <footer>
          <span><Icon name="cloud-check" size={18} /><span><strong>Your repository stays in control</strong><small>Every proposed change is evaluated before generation.</small></span></span>
          <div><span>Encrypted secrets</span><span>Branch-based changes</span><span>No automatic merge</span></div>
        </footer>
      </div>
    </div>
  );
}

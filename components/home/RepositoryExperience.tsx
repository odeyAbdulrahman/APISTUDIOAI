"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "../ui/Icon";

const findings: { label: string; value: string; detail: string; path: string; icon: IconName }[] = [
  { label: "Runtime", value: ".NET 8", detail: "Target framework inherited from the existing solution.", path: "commerce-platform.sln", icon: "boxes" },
  { label: "Architecture", value: "Clean Architecture", detail: "Domain stays protected while integrations enter through approved boundaries.", path: "src/Application", icon: "file-chart" },
  { label: "Request pattern", value: "CQRS + MediatR", detail: "New operations follow the repository's command and handler conventions.", path: "src/Application/Features", icon: "contactless" },
  { label: "Validation", value: "FluentValidation", detail: "Generated requests reuse the validation library already registered by the app.", path: "src/Application/Validation", icon: "check" },
  { label: "HTTP clients", value: "IHttpClientFactory", detail: "Typed clients and authentication handlers belong in Infrastructure.", path: "src/Infrastructure/ApiClients", icon: "globe" },
  { label: "Observability", value: "Serilog", detail: "Logging follows existing structured event and error-handling conventions.", path: "src/Infrastructure/Logging", icon: "chart" },
];

export function RepositoryExperience() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive(value => (value + 1) % findings.length), 1900);
    return () => window.clearTimeout(timer);
  }, [active, playing]);

  const finding = findings[active];

  return (
    <div className="repository-experience">
      <header className="repository-toolbar">
        <div><span className="repository-scan-dot" /><p><b>commerce-platform</b><small>Repository connected</small></p></div>
        <button aria-label={playing ? "Pause repository scan" : "Resume repository scan"} onClick={() => setPlaying(value => !value)} type="button"><Icon name={playing ? "pause" : "play"} size={14} />{playing ? "Scanning" : "Paused"}</button>
      </header>

      <div className="repository-progress"><i style={{ width: `${((active + 1) / findings.length) * 100}%` }} /></div>

      <div className="repository-body">
        <div className="repository-tree" aria-label="Repository structure">
          <span className="repository-tree-title">EXPLORER</span>
          <p><b>⌄</b> commerce-platform</p>
          <p className="level-1"><b>⌄</b> src</p>
          <p className="level-2"><span>◆</span> Domain <small>protected</small></p>
          <p className={`level-2 ${active >= 1 && active <= 3 ? "is-active" : ""}`}><b>⌄</b> Application <small>allowed</small></p>
          <p className={`level-3 ${active === 2 ? "is-active" : ""}`}>Features</p>
          <p className={`level-3 ${active === 3 ? "is-active" : ""}`}>Validation</p>
          <p className={`level-2 ${active >= 4 ? "is-active" : ""}`}><b>⌄</b> Infrastructure <small>allowed</small></p>
          <p className={`level-3 ${active === 4 ? "is-active" : ""}`}>ApiClients</p>
          <p className={`level-3 ${active === 5 ? "is-active" : ""}`}>Logging</p>
          <p className={`level-1 ${active === 0 ? "is-active" : ""}`}><span>◇</span> commerce-platform.sln</p>
        </div>

        <aside className="repository-insight" aria-live="polite">
          <span className="repository-insight-icon"><Icon name={finding.icon} size={20} /></span>
          <small>{finding.label} detected</small>
          <h3>{finding.value}</h3>
          <p>{finding.detail}</p>
          <div><span>Applied from</span><code>{finding.path}</code></div>
        </aside>
      </div>

      <div className="repository-findings">
        <span>Implementation specification</span>
        <div>{findings.map((item, index) => <button className={index === active ? "is-active" : ""} key={item.value} onClick={() => setActive(index)} type="button"><Icon name={item.icon} size={13} />{item.value}</button>)}</div>
      </div>
    </div>
  );
}

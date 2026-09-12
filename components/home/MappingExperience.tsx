"use client";

import { useEffect, useState } from "react";
import { Icon } from "../ui/Icon";

const mappings = [
  { source: "employeeId", sourceType: "string", sample: "784-1992-3819201-4", target: "EmiratesId", targetType: "ValueObject", transform: "Create value object", output: "EmiratesId(784-1992-3819201-4)" },
  { source: "companyLicense", sourceType: "string", sample: "CN-284901", target: "LicenseNumber", targetType: "string", transform: "Direct mapping", output: '"CN-284901"' },
  { source: "joined_at", sourceType: "date-time", sample: "2026-09-12T08:30:00Z", target: "JoinedOn", targetType: "DateOnly", transform: "Convert to DateOnly", output: "2026-09-12" },
  { source: "status", sourceType: "string", sample: "active", target: "EmploymentStatus", targetType: "enum", transform: "Match enum value", output: "EmploymentStatus.Active" },
];

const transformOptions = ["Direct mapping", "Create value object", "Convert to DateOnly", "Match enum value"];

export function MappingExperience() {
  const [active, setActive] = useState(0);
  const [transform, setTransform] = useState(mappings[0].transform);
  const [paused, setPaused] = useState(false);
  const mapping = mappings[active];

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActive(current => {
        const next = (current + 1) % mappings.length;
        setTransform(mappings[next].transform);
        return next;
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [paused]);

  function selectMapping(index: number) {
    setActive(index);
    setTransform(mappings[index].transform);
    setPaused(true);
  }

  return (
    <div className="mapping-workspace">
      <header className="mapping-toolbar">
        <div><span><i /><i /><i /></span><strong>employee-api.mapping</strong></div>
        <div>
          <span className="mapping-health"><i /> Schema compatible</span>
          <b>{active + 1} / {mappings.length} preview</b>
          <button className="mapping-auto-control" onClick={() => setPaused(value => !value)} type="button" aria-label={paused ? "Resume automatic mapping preview" : "Pause automatic mapping preview"}>
            <Icon name={paused ? "play" : "pause"} size={14} />{paused ? "Resume" : "Auto"}
          </button>
        </div>
      </header>

      <div className="mapping-progress" aria-label={paused ? "Automatic preview paused" : "Automatic field preview running"}><span className={paused ? "is-paused" : ""} key={`${active}-${paused}`} /></div>

      <div className="mapping-workspace-body">
        <div className="mapping-field-list" role="tablist" aria-label="Mapped fields">
          <small>Field relationships</small>
          {mappings.map((item, index) => (
            <button
              aria-controls="mapping-detail"
              aria-selected={index === active}
              className={index === active ? "is-active" : ""}
              key={item.source}
              onClick={() => selectMapping(index)}
              role="tab"
              type="button"
            >
              <span><Icon name="check" size={14} /></span>
              <span><strong>{item.source}</strong><small>{item.sourceType}</small></span>
              <Icon name="chevron-right" size={15} />
            </button>
          ))}
        </div>

        <div className="mapping-detail" id="mapping-detail" role="tabpanel" aria-live="polite">
          <div className="mapping-canvas" key={mapping.source}>
            <article>
              <small>External API · source</small>
              <div><span>{mapping.sourceType}</span><strong>{mapping.source}</strong></div>
              <code>{mapping.sample}</code>
            </article>

            <div className="mapping-connection" aria-hidden="true"><span /><b><Icon name="sparkles" size={15} /></b><span /></div>

            <article className="mapping-target-card">
              <small>Application · target</small>
              <div><strong>{mapping.target}</strong><span>{mapping.targetType}</span></div>
              <code>{mapping.output}</code>
            </article>
          </div>

          <div className="mapping-config">
            <div>
              <small>Transformation</small>
              <strong>{transform}</strong>
            </div>
            <div className="mapping-transform-options" aria-label="Choose transformation">
              {transformOptions.map(option => <button className={option === transform ? "is-active" : ""} key={option} onClick={() => { setTransform(option); setPaused(true); }} type="button">{option}</button>)}
            </div>
          </div>

          <footer className="mapping-result">
            <span><Icon name="cloud-check" size={18} /><span><strong>Mapping validated</strong><small>Types and repository conventions match</small></span></span>
            <b>Ready to generate <Icon name="chevron-right" size={15} /></b>
          </footer>
        </div>
      </div>
    </div>
  );
}

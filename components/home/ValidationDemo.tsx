"use client";

import { useEffect, useState } from "react";
import { Icon, type IconName } from "../ui/Icon";

const checks: { title: string; detail: string; duration: string; icon: IconName; output: string[] }[] = [
  { title: "Generate code", detail: "12 files prepared", duration: "1.8s", icon: "sparkles", output: ["Generated typed API client", "Added DTOs, handlers, and mappings", "Prepared 12 reviewable files"] },
  { title: "Restore", detail: "Dependencies resolved", duration: "0.9s", icon: "boxes", output: ["Restoring solution dependencies", "All packages match repository policy", "Restore completed successfully"] },
  { title: "Build", detail: "0 warnings · 0 errors", duration: "3.2s", icon: "play", output: ["Building Ministry.Integration.sln", "0 warnings", "0 errors — build succeeded"] },
  { title: "Run tests", detail: "38 tests passed", duration: "4.6s", icon: "check", output: ["Running integration test suite", "38 passed · 0 failed · 0 skipped", "Contract and mapping tests passed"] },
  { title: "Architecture check", detail: "Boundaries respected", duration: "1.4s", icon: "file-chart", output: ["Checking dependency direction", "Application layer remains isolated", "0 architecture rule violations"] },
  { title: "Review changes", detail: "Pull Request prepared", duration: "0.7s", icon: "git-pull-request", output: ["Summarizing implementation diff", "Attaching validation report", "Pull Request #184 is ready for review"] },
];

export function ValidationDemo() {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(true);
  const complete = progress === checks.length;

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (complete) {
        setProgress(0);
        setSelected(0);
        return;
      }
      const next = progress + 1;
      setProgress(next);
      setSelected(Math.min(next, checks.length - 1));
    }, complete ? 3800 : 1150);
    return () => window.clearTimeout(timer);
  }, [complete, playing, progress]);

  const restart = () => {
    setProgress(0);
    setSelected(0);
    setPlaying(true);
  };

  const selectedState = selected < progress || complete ? "passed" : selected === progress ? "running" : "queued";
  const visibleOutput = selectedState === "queued" ? ["Waiting for previous checks to complete…"] : checks[selected].output;

  return (
    <div className="validation-experience">
      <header className="validation-experience-toolbar">
        <div><span className={`validation-live-dot ${complete ? "is-complete" : ""}`} /><p><small>RELEASE GATE</small><b>feature/ministry-employee-api</b></p></div>
        <div className="validation-controls">
          <span className={complete ? "is-ready" : ""}>{complete ? "Ready for review" : `Validating ${progress + 1} of ${checks.length}`}</span>
          <button aria-label={playing ? "Pause automatic validation" : "Resume automatic validation"} onClick={() => setPlaying(value => !value)} type="button"><Icon name={playing ? "pause" : "play"} size={15} />{playing ? "Pause" : "Resume"}</button>
          <button className="validation-restart" onClick={restart} type="button">Run again</button>
        </div>
      </header>

      <div className="validation-workspace">
        <div className="validation-checks" aria-label="Validation checks">
          <div className="validation-checks-heading"><span>Automated checks</span><small>{progress}/{checks.length} passed</small></div>
          {checks.map((check, index) => {
            const state = index < progress || complete ? "passed" : index === progress ? "running" : "queued";
            return (
              <button className={`${state} ${selected === index ? "is-selected" : ""}`} key={check.title} onClick={() => setSelected(index)} type="button">
                <span className="validation-check-icon">{state === "passed" ? <Icon name="check" size={16} /> : <Icon name={check.icon} size={16} />}</span>
                <span><b>{check.title}</b><small>{state === "queued" ? "Waiting" : check.detail}</small></span>
                <em>{state === "running" ? "Running" : state === "passed" ? check.duration : "Queued"}</em>
              </button>
            );
          })}
        </div>

        <aside className="validation-console" aria-live="polite">
          <header><span><i /><i /><i /></span><b>validation-output</b><small>{selectedState}</small></header>
          <div className="validation-console-body">
            <p><span>$</span> apistudio validate --check {selected + 1}</p>
            {visibleOutput.map((line, index) => <p className={index === visibleOutput.length - 1 && selectedState !== "queued" ? "is-result" : ""} key={line}><span>{selectedState === "passed" ? "✓" : selectedState === "running" ? "›" : "·"}</span> {line}</p>)}
            {selectedState === "running" && <span className="validation-cursor" />}
          </div>
          <div className="validation-summary">
            <span><b>12</b><small>files changed</small></span>
            <span><b>{progress >= 4 ? "38" : "—"}</b><small>tests passed</small></span>
            <span><b>{progress >= 5 ? "0" : "—"}</b><small>rule violations</small></span>
          </div>
        </aside>
      </div>

      <footer className={`validation-pr ${complete ? "is-ready" : ""}`}>
        <span className="validation-pr-icon"><Icon name="git-pull-request" size={23} /></span>
        <p><small>PULL REQUEST #184</small><b>Add Ministry employee integration</b><span>feature/ministry-employee-api → main</span></p>
        <div className="validation-pr-state"><Icon name={complete ? "cloud-check" : "play"} size={18} /><span><b>{complete ? "Ready for team review" : "Validation in progress"}</b><small>{complete ? "All required checks passed" : "Pull Request updates automatically"}</small></span></div>
      </footer>

      <p className="validation-approval"><Icon name="user" size={17} /><span><b>Nothing is merged automatically.</b> APISTUDIOAI prepares and validates the implementation. Your team approves it.</span></p>
    </div>
  );
}

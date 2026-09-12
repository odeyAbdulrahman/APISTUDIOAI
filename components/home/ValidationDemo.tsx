"use client";

import { useEffect, useRef, useState } from "react";

const steps = ["Generate code", "Restore", "Build", "Run tests", "Architecture check", "Review changes"];

export function ValidationDemo() {
  const [completed, setCompleted] = useState(steps.length);
  const [running, setRunning] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);

  const run = () => {
    if (timer.current) window.clearInterval(timer.current);
    setCompleted(0);
    setRunning(true);
    timer.current = window.setInterval(() => {
      setCompleted((value) => {
        if (value >= steps.length - 1) {
          if (timer.current) window.clearInterval(timer.current);
          setRunning(false);
          return steps.length;
        }
        return value + 1;
      });
    }, 620);
  };

  return (
    <div className="validation-demo">
      <div className="validation-toolbar"><span><i /> Pipeline ready</span><button type="button" onClick={run} disabled={running}>{running ? "Validation running…" : "Run validation again"}</button></div>
      <div className="validation-track" aria-live="polite">
        {steps.map((item, index) => {
          const state = index < completed ? "passed" : index === completed && running ? "running" : "waiting";
          return <div className={state} key={item}><span>{state === "passed" ? "✓" : index + 1}</span><b>{item}</b><small>{state === "passed" ? "Passed" : state === "running" ? "Running" : "Waiting"}</small></div>;
        })}
      </div>
    </div>
  );
}

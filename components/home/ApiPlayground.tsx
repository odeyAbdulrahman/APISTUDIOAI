"use client";

import { useState } from "react";

const endpoints = [
  { method: "GET", path: "/v2/employees/{id}", id: "784-1992-3819201-4", latency: 184, body: '{\n  "employeeId": "784-1992-3819201-4",\n  "companyLicense": "CN-284901",\n  "status": "active"\n}' },
  { method: "POST", path: "/v2/licenses/verify", id: "CN-284901", latency: 241, body: '{\n  "licenseNumber": "CN-284901",\n  "valid": true,\n  "expiresOn": "2027-06-30"\n}' },
  { method: "GET", path: "/v2/companies/{id}", id: "COMP-1048", latency: 137, body: '{\n  "companyId": "COMP-1048",\n  "name": "Northstar Services",\n  "employees": 248\n}' },
];

export function ApiPlayground() {
  const [selected, setSelected] = useState(0);
  const [identifier, setIdentifier] = useState(endpoints[0].id);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(endpoints[0]);

  const choose = (index: number) => {
    setSelected(index);
    setIdentifier(endpoints[index].id);
    setResult(endpoints[index]);
  };

  const send = () => {
    setLoading(true);
    window.setTimeout(() => {
      setResult({ ...endpoints[selected], id: identifier || endpoints[selected].id });
      setLoading(false);
    }, 850);
  };

  return (
    <div className="playground-shell">
      <aside aria-label="API endpoints">
        <small>ENDPOINTS</small>
        {endpoints.map((endpoint, index) => <button className={selected === index ? "active" : ""} type="button" onClick={() => choose(index)} key={endpoint.path}><span className={endpoint.method === "POST" ? "post" : ""}>{endpoint.method}</span><b>{endpoint.path}</b></button>)}
      </aside>
      <div className="playground-main">
        <header><span className={result.method === "POST" ? "post" : ""}>{result.method}</span><b>{result.path}</b><button type="button" onClick={send} disabled={loading}>{loading ? "Sending…" : "Send request"}</button></header>
        <div className="request-row"><label>Path value<input value={identifier} onChange={(event) => setIdentifier(event.target.value)} /></label><label>Environment<select defaultValue="staging"><option value="staging">Staging</option><option value="production">Production</option></select></label></div>
        <div className="response-head"><b>Response</b><div><span className={loading ? "loading" : ""}>{loading ? "Running" : "200 OK"}</span><small>{loading ? "—" : result.latency + " ms"}</small></div></div>
        <pre aria-live="polite"><code>{loading ? "// Contacting endpoint…\n// Authentication header applied\n// Waiting for response" : result.body}</code></pre>
        <footer><span><i /> Credentials isolated from AI context</span><b>{loading ? "Testing connection" : "Schema matched"}</b></footer>
      </div>
    </div>
  );
}

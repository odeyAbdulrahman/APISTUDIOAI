"use client";

import { useMemo, useState } from "react";
import { Icon, type IconName } from "../ui/Icon";

type Category = "Product" | "Workflow" | "Security" | "Code ownership";

const categories: Category[] = ["Product", "Workflow", "Security", "Code ownership"];

const questions: { category: Category; question: string; answer: string; short: string; evidence: string[]; icon: IconName }[] = [
  { category: "Product", question: "Does APISTUDIOAI replace developers?", answer: "No. It automates repetitive integration implementation while developers define mappings and guardrails, inspect the generated diff, and approve the Pull Request.", short: "Developers remain responsible for every production change.", evidence: ["Human review", "Visible diff", "Manual approval"], icon: "users" },
  { category: "Workflow", question: "Does it modify the main branch?", answer: "No. Changes are created on a dedicated feature branch and presented through a Pull Request. APISTUDIOAI never merges generated changes automatically.", short: "The main branch stays behind your existing review process.", evidence: ["Dedicated branch", "Pull Request", "No auto-merge"], icon: "git-pull-request" },
  { category: "Code ownership", question: "Can it understand an existing architecture?", answer: "Yes. Repository analysis identifies frameworks, folder structure, dependency injection, naming, logging, validation, mappings, tests, and patterns from similar integrations.", short: "Your repository becomes the implementation specification.", evidence: ["Architecture scan", "Pattern detection", "Existing conventions"], icon: "file-chart" },
  { category: "Product", question: "Which API documentation formats are supported?", answer: "The initial product focuses on OpenAPI, Swagger, and Postman Collections, including endpoints, schemas, authentication requirements, and error contracts.", short: "Structured API contracts become an inspectable implementation source.", evidence: ["OpenAPI", "Swagger", "Postman"], icon: "globe" },
  { category: "Security", question: "Are API credentials sent to the AI model?", answer: "No. Credentials remain isolated from the AI and code-understanding context. Secrets are encrypted and used only for authorized connection tests.", short: "Secrets stay outside the model context.", evidence: ["Encrypted secrets", "Isolated context", "Authorized tests only"], icon: "cloud-check" },
  { category: "Workflow", question: "What happens if generated code does not build?", answer: "The validation loop uses build errors and repository context to revise the implementation, then restores, builds, and runs the required tests again before review.", short: "Generated code is revised until the required checks pass.", evidence: ["Restore", "Build", "Test loop"], icon: "play" },
  { category: "Code ownership", question: "Can I control which repository areas are modified?", answer: "Yes. Guardrails define allowed and protected files, modules, package restrictions, dependency direction, naming rules, and other repository constraints.", short: "Explicit repository boundaries govern generation.", evidence: ["Protected paths", "Package policy", "Architecture rules"], icon: "boxes" },
  { category: "Product", question: "Which programming languages are supported?", answer: "The initial release focuses on modern .NET applications. Additional stacks will expand without diluting architecture-aware generation and validation.", short: "The initial experience is purpose-built for modern .NET teams.", evidence: [".NET 8", "Clean Architecture", "Git-native"], icon: "sparkles" },
];

export function FaqExperience() {
  const [category, setCategory] = useState<Category>("Product");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(questions[0].question);

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return questions.filter(item => item.category === category && (!search || `${item.question} ${item.answer} ${item.evidence.join(" ")}`.toLowerCase().includes(search)));
  }, [category, query]);

  const active = visible.find(item => item.question === selected) ?? visible[0];

  const chooseCategory = (next: Category) => {
    setCategory(next);
    setSelected(questions.find(item => item.category === next)?.question ?? "");
  };

  return (
    <div className="faq-experience">
      <div className="faq-toolbar">
        <div className="faq-categories" aria-label="FAQ categories">{categories.map(item => <button className={item === category ? "is-active" : ""} key={item} onClick={() => chooseCategory(item)} type="button">{item}</button>)}</div>
        <label><Icon name="search" size={17} /><input aria-label="Search engineering questions" onChange={event => setQuery(event.target.value)} placeholder="Search engineering questions" type="search" value={query} /></label>
      </div>

      <div className="faq-workspace">
        <div className="faq-questions">
          <header><span>{category} questions</span><small>{visible.length} answers</small></header>
          {visible.length ? visible.map((item, index) => {
            const open = active?.question === item.question;
            return (
              <article className={open ? "is-open" : ""} key={item.question}>
                <button aria-expanded={open} onClick={() => setSelected(item.question)} type="button"><span>0{index + 1}</span><b>{item.question}</b><i>+</i></button>
                <div><p>{item.answer}</p><aside>{item.evidence.map(evidence => <span key={evidence}><Icon name="check" size={12} />{evidence}</span>)}</aside></div>
              </article>
            );
          }) : <div className="faq-empty"><Icon name="search" size={24} /><b>No matching questions</b><p>Try another search term or choose a different category.</p></div>}
        </div>

        <aside className="faq-short-answer">
          {active ? <>
            <header><span><Icon name={active.icon} size={21} /></span><small>THE SHORT ANSWER</small></header>
            <h3>{active.short}</h3>
            <p>{active.answer}</p>
            <div>{active.evidence.map(item => <span key={item}><Icon name="check" size={13} />{item}</span>)}</div>
          </> : <><header><span><Icon name="search" size={21} /></span><small>NO RESULT SELECTED</small></header><h3>Search another engineering topic.</h3></>}
          <footer><p><b>Still evaluating APISTUDIOAI?</b><small>Bring your repository and integration questions.</small></p><a href="#start">Talk to engineering <Icon name="chevron-right" size={15} /></a></footer>
        </aside>
      </div>
    </div>
  );
}

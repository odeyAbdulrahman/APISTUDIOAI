import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { ApiPlayground } from "./ApiPlayground";
import { ComparisonExperience } from "./ComparisonExperience";
import { HeroShowcase } from "./HeroShowcase";
import { ValidationDemo } from "./ValidationDemo";

const workflow = [
  ["01", "Understand", "Connect your repository. APISTUDIOAI identifies the stack, architecture, conventions, dependencies, and existing integration patterns."],
  ["02", "Connect", "Import OpenAPI, Swagger, or Postman documentation. Configure the environment, authentication, and headers, then test endpoints."],
  ["03", "Integrate", "Map external fields to your models, DTOs, commands, services, or entities. Generate code that belongs in your application."],
  ["04", "Validate", "Restore dependencies, compile the implementation, run tests, check architecture, and verify repository constraints."],
  ["05", "Ship", "Review every generated and modified file, then open a dedicated branch and Pull Request for your team to approve."],
];

const differentiators: { icon: IconName; title: string; body: string }[] = [
  { icon: "search", title: "Understands your codebase", body: "Analyzes the architecture and existing patterns before it writes a line of integration code." },
  { icon: "file-chart", title: "Understands the API", body: "Reads structured API documentation to resolve endpoints, schemas, authentication, and errors." },
  { icon: "play", title: "Tests before generation", body: "Confirms endpoint behavior, payloads, status codes, latency, and failures before implementation." },
  { icon: "boxes", title: "Fits your architecture", body: "Uses the patterns, libraries, naming, and boundaries your application already follows." },
  { icon: "cloud-check", title: "Validates the result", body: "Builds and tests the generated integration, using real errors to improve the implementation." },
  { icon: "git-pull-request", title: "Stays developer-controlled", body: "Moves changes through a branch, visible diff, validation report, and Pull Request." },
];

const useCases = [
  ["Government & enterprise", "Connect authority and enterprise services while preserving internal architecture and permission boundaries."],
  ["HR & employee systems", "Integrate workforce, identity, payroll, and employee data with the models your systems already use."],
  ["Payments & finance", "Implement payment, invoicing, billing, and financial APIs with controlled authentication and validation."],
  ["Internal platforms", "Connect services without introducing a different integration pattern in every repository."],
  ["Legacy applications", "Add modern API integrations to established software without redesigning the entire application."],
  ["SaaS integrations", "Bring third-party platforms into existing backend workflows through reviewable, tested changes."],
];

const apiSources = ["OpenAPI", "Swagger", "Postman"];
const deliveryStack = [".NET 8", "Clean Architecture", "Git-native"];

const faqs = [
  ["Does APISTUDIOAI replace developers?", "No. It automates repetitive integration implementation. Developers still define mappings and guardrails, review the code, and approve the Pull Request."],
  ["Does it modify the main branch?", "No. Changes are created on a dedicated branch and presented through a Pull Request. Nothing is merged automatically."],
  ["Can it understand an existing architecture?", "Yes. Repository analysis identifies frameworks, folder structure, dependency injection, naming, logging, validation, mapping, testing, and similar integrations."],
  ["Which API documentation formats are supported?", "The initial product is focused on OpenAPI, Swagger, and Postman Collections."],
  ["Are API credentials sent to the AI model?", "Credentials remain separate from the AI and code-understanding context. Secrets are encrypted and used only for authorized connection tests."],
  ["What happens if generated code does not build?", "The validation loop uses build errors and repository context to revise the implementation, then builds and tests it again."],
  ["Can I control which parts of the repository are modified?", "Yes. Guardrails define allowed and protected areas, package restrictions, naming rules, and other repository constraints."],
  ["Which programming languages are supported?", "The initial release is focused on modern .NET applications. Support for additional stacks will expand without diluting architecture-aware generation."],
];

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{title}</h2><p>{body}</p></div>;
}

export function Hero() {
  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-grid-bg" aria-hidden="true" />
        <Container className="hero-layout">
          <div className="hero-content">
            <h1 id="hero-title">Integrate APIs without breaking your architecture.</h1>
            <p>APISTUDIOAI understands the external API and your existing codebase—then tests, maps, generates, validates, and prepares a production-ready Pull Request.</p>
            <div className="hero-actions" id="start">
              <Button href="#workflow">Start integration <Icon name="chevron-right" size={17} /></Button>
              <Button href="#product" variant="secondary">Explore the product</Button>
            </div>
            <div className="hero-proof"><span><Icon name="check" size={15} /> Your repository defines the pattern</span><span><Icon name="check" size={15} /> Nothing merges automatically</span></div>
          </div>

          <HeroShowcase />
        </Container>
      </section>

      <section className="integration-rail-section" aria-label="Integration compatibility">
        <Container>
          <div className="integration-rail" aria-label="Supported API sources and delivery stack">
            <div className="integration-rail-heading">
              <div><i aria-hidden="true" /><span><small>Integration compatibility</small><strong>One flow, from contract to codebase</strong></span></div>
              <span className="integration-rail-status">Context-aware</span>
            </div>
            <div className="integration-rail-flow">
              <div className="integration-rail-group">
                <small>API contract</small>
                <div>{apiSources.map(source => <span key={source}>{source}</span>)}</div>
              </div>
              <div className="integration-rail-bridge" aria-hidden="true">
                <span />
                <div><Icon name="boxes" size={17} /><b>APISTUDIOAI</b></div>
                <span />
              </div>
              <div className="integration-rail-group integration-rail-group--target">
                <small>Your delivery stack</small>
                <div>{deliveryStack.map(item => <span key={item}>{item}</span>)}</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="contrast-section" id="product">
        <Container>
          <SectionHeading eyebrow="The integration gap" title="A generated client is not an integration." body="Traditional generators understand the API contract. They do not understand the application where the code must live." />
          <ComparisonExperience />
        </Container>
      </section>

      <section className="workflow-section" id="workflow">
        <Container>
          <SectionHeading eyebrow="How it works" title="From API documentation to a reviewable Pull Request." body="A complete path from understanding both systems to shipping validated code through the workflow your team already trusts." />
          <div className="workflow-list">{workflow.map(([num, title, body]) => <article key={num}><b>{num}</b><div><span>{title}</span><p>{body}</p></div></article>)}</div>
        </Container>
      </section>

      <section className="intelligence-section" id="features">
        <Container>
          <div className="split-feature repository-feature">
            <div>
              <SectionHeading eyebrow="Repository intelligence" title="Your repository becomes the implementation specification." body="Before generation, APISTUDIOAI learns how your application is already built. That context determines where new code belongs and how it should behave." />
              <div className="tag-cloud">{["Framework", "Architecture", "Folder structure", "Naming", "API clients", "Dependency injection", "Logging", "Validation", "Mapping", "Error handling", "Tests", "Packages"].map(tag => <span key={tag}>{tag}</span>)}</div>
            </div>
            <div className="repo-browser">
              <header><span><i /> commerce-platform</span><b>Analysis complete</b></header>
              <div className="repo-tree"><p>src</p><p className="indent">├── Domain <small>protected</small></p><p className="indent">├── Application <b>allowed</b></p><p className="indent2">│   ├── Features</p><p className="indent2">│   └── Integrations</p><p className="indent">└── Infrastructure <b>allowed</b></p><p className="indent2">    └── ApiClients</p></div>
              <div className="repo-findings"><span>Detected</span><div><b>.NET 8</b><b>Clean Architecture</b><b>CQRS</b><b>MediatR</b><b>FluentValidation</b><b>Serilog</b></div></div>
            </div>
          </div>

          <div className="split-feature api-feature">
            <ApiPlayground />
            <div>
              <SectionHeading eyebrow="API intelligence + playground" title="Import the API. Understand it before you implement it." body="Read endpoints, authentication, parameters, request and response schemas, error models, and relationships. Then test real behavior before any code is generated." />
              <ul className="check-list"><li><Icon name="check" size={16} /> Select and test endpoints</li><li><Icon name="check" size={16} /> Configure headers and request bodies</li><li><Icon name="check" size={16} /> Inspect status, latency, responses, and errors</li></ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="mapping-section">
        <Container>
          <SectionHeading eyebrow="Controlled data mapping" title="Map external data to the models your application already understands." body="Define field relationships and transformations explicitly. APISTUDIOAI keeps developers in control of how external contracts enter the application." />
          <div className="mapping-board">
            <div className="mapping-column"><span>External API</span><article><small>string</small><b>employeeId</b></article><article><small>string</small><b>companyLicense</b></article><article><small>date</small><b>joined_at</b></article></div>
            <div className="mapping-lines"><span>mapped</span><i /><i /><i /></div>
            <div className="mapping-column"><span>Application</span><article><b>EmiratesId</b><small>ValueObject</small></article><article><b>LicenseNumber</b><small>string</small></article><article><b>JoinedOn</b><small>DateOnly</small></article></div>
          </div>
        </Container>
      </section>

      <section className="generation-section" id="developers">
        <Container>
          <div className="generation-layout">
            <div>
              <SectionHeading eyebrow="Codebase-compatible generation" title="Code generation that understands where the code is going." body="If your project uses .NET 8, Clean Architecture, CQRS, MediatR, IHttpClientFactory, FluentValidation, AutoMapper, Serilog, and a Result pattern—APISTUDIOAI follows those choices instead of introducing its own." />
              <blockquote>Generated for your codebase.<br /><strong>Not for a generic project.</strong></blockquote>
            </div>
            <div className="architecture-stack">
              <div><span>Application</span><b>Commands · DTOs · Validators · Mappings</b></div>
              <div><span>Infrastructure</span><b>HTTP clients · Auth handlers · Logging</b></div>
              <div><span>Existing conventions</span><b>Names · Results · Errors · Tests · DI</b></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="guardrails-section" id="security">
        <Container>
          <SectionHeading eyebrow="Repository guardrails" title="Automate the repetitive work without giving up architectural control." body="Define the files, modules, and dependencies the integration may touch. Guardrails are checked during generation and again during validation." />
          <div className="guardrail-grid">
            <article className="allow"><header><Icon name="check" size={18} /><span>Allowed to modify</span></header><b>Application</b><b>Infrastructure</b><p>Follow existing integration patterns</p></article>
            <article className="protect"><header><Icon name="cloud-check" size={18} /><span>Protected modules</span></header><b>Domain</b><b>Authentication</b><b>Database</b><p>No changes outside approved boundaries</p></article>
            <article className="rules"><header><Icon name="file-chart" size={18} /><span>Repository rules</span></header><b>Use existing libraries only</b><b>Do not add packages</b><b>Follow naming conventions</b></article>
          </div>
          <div className="security-callout"><div><Icon name="cloud-check" size={26} /><span><b>Your code. Your credentials. Your control.</b><small>Credentials stay separate from AI context. Secrets are encrypted, repository permissions are bounded, and every change requires developer approval before merge.</small></span></div><div className="security-points"><span>Encrypted secrets</span><span>Branch-based changes</span><span>No automatic deployment</span></div></div>
        </Container>
      </section>

      <section className="validation-section">
        <Container>
          <SectionHeading eyebrow="Generate & validate" title="Generated does not mean finished. Validated does." body="Code is only ready for review after it passes the same practical checks your team expects from any implementation." />
          <ValidationDemo />
          <div className="pr-card">
            <div><span className="pr-icon"><Icon name="cloud-check" size={26} /></span><p><small>PULL REQUEST #184</small><b>Add Ministry employee integration</b><span>feature/ministry-employee-api → main</span></p></div>
            <div className="pr-stats"><span><b>12</b> files changed</span><span><b>38</b> tests passed</span><span><b>0</b> rule violations</span></div>
            <strong>Ready for team review</strong>
          </div>
          <p className="merge-note"><b>Nothing is merged automatically.</b> APISTUDIOAI prepares the implementation. Your team approves it.</p>
        </Container>
      </section>

      <section className="why-section">
        <Container>
          <SectionHeading eyebrow="Why APISTUDIOAI" title="Both sides of the integration, understood together." body="A developer workflow for turning external API contracts into compatible, validated changes inside real applications." />
          <div className="differentiator-grid">{differentiators.map(item => <article key={item.title}><span><Icon name={item.icon} size={21} /></span><h3>{item.title}</h3><p>{item.body}</p></article>)}</div>
        </Container>
      </section>

      <section className="use-cases">
        <Container>
          <SectionHeading eyebrow="Built for real integration work" title="From modern platforms to established applications." body="Use APISTUDIOAI wherever an external contract must fit a codebase with its own architecture, constraints, and review process." />
          <div className="use-case-grid">{useCases.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="developer-section">
        <Container>
          <div className="developer-card">
            <div><span>Developer experience</span><h2>Keep your engineering workflow. Remove the repetitive integration work.</h2><p>Repositories, branches, current packages, builds, tests, diffs, and code review stay in place. APISTUDIOAI works through them—not around them.</p></div>
            <div className="dev-terminal"><header><i /><i /><i /><span>integration-checks</span></header><pre><code><span>$</span> apistudio validate<br /><em>✓</em> Repository rules<br /><em>✓</em> dotnet restore<br /><em>✓</em> dotnet build<br /><em>✓</em> 38 tests passed<br /><b>→ Pull Request ready</b></code></pre></div>
          </div>
        </Container>
      </section>

      <section className="faq-section">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Clear answers for engineering teams." body="What to expect from the initial APISTUDIOAI product and workflow." />
          <div className="faq-list">{faqs.map(([q, a], i) => <details open={i === 0} key={q}><summary>{q}<span>+</span></summary><p>{a}</p></details>)}</div>
        </Container>
      </section>

      <section className="final-cta">
        <Container>
          <div className="cta-card">
            <div className="cta-path"><span>API documentation</span><i>→</i><span>Existing codebase</span><i>→</i><span>Validated integration</span><i>→</i><span>Pull Request</span></div>
            <h2>Your next API integration starts with the codebase you already have.</h2>
            <p>Understand both sides. Generate compatible code. Validate the implementation. Review every change.</p>
            <div><Button href="#start">Start integration <Icon name="chevron-right" size={17} /></Button><Button href="#workflow" variant="secondary">See how it works</Button></div>
          </div>
        </Container>
      </section>
    </main>
  );
}

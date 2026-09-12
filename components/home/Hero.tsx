import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { ScrollMotion } from "../ui/ScrollMotion";
import { ApiPlayground } from "./ApiPlayground";
import { ComparisonExperience } from "./ComparisonExperience";
import { FaqExperience } from "./FaqExperience";
import { GuardrailsExperience } from "./GuardrailsExperience";
import { GuidedIntegrationDemo } from "./GuidedIntegrationDemo";
import { HeroShowcase } from "./HeroShowcase";
import { MappingExperience } from "./MappingExperience";
import { RepositoryExperience } from "./RepositoryExperience";
import { UseCasesExperience } from "./UseCasesExperience";
import { ValidationDemo } from "./ValidationDemo";
import { WorkflowExperience } from "./WorkflowExperience";

const differentiators: { icon: IconName; title: string; body: string }[] = [
  { icon: "search", title: "Understands your codebase", body: "Analyzes the architecture and existing patterns before it writes a line of integration code." },
  { icon: "file-chart", title: "Understands the API", body: "Reads structured API documentation to resolve endpoints, schemas, authentication, and errors." },
  { icon: "play", title: "Tests before generation", body: "Confirms endpoint behavior, payloads, status codes, latency, and failures before implementation." },
  { icon: "boxes", title: "Fits your architecture", body: "Uses the patterns, libraries, naming, and boundaries your application already follows." },
  { icon: "cloud-check", title: "Validates the result", body: "Builds and tests the generated integration, using real errors to improve the implementation." },
  { icon: "git-pull-request", title: "Stays developer-controlled", body: "Moves changes through a branch, visible diff, validation report, and Pull Request." },
];

const apiSources = ["OpenAPI", "Swagger", "Postman"];
const deliveryStack = [".NET 8", "Clean Architecture", "Git-native"];

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return <div className="section-heading"><span>{eyebrow}</span><h2>{title}</h2><p>{body}</p></div>;
}

export function Hero() {
  return (
    <main id="top">
      <ScrollMotion />
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

      <section className="guided-demo-section" id="demo">
        <Container>
          <SectionHeading eyebrow="Interactive product tour" title="See both systems become one implementation plan." body="Choose a sample API and repository, then watch APISTUDIOAI turn both sources of context into a codebase-compatible, review-ready plan." />
          <GuidedIntegrationDemo />
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
          <WorkflowExperience />
        </Container>
      </section>

      <section className="intelligence-section" id="features">
        <Container>
          <SectionHeading eyebrow="Two-sided intelligence" title="Understand both sides before generating a line of code." body="Your repository defines how the integration should be built. The external API defines what it must do. APISTUDIOAI combines both into one controlled implementation plan." />

          <div className="intelligence-sources">
            <article className="intelligence-source">
              <header><span>01</span><div><small>Repository intelligence</small><h3>Your repository becomes the implementation specification.</h3><p>Architecture, patterns, packages, and boundaries determine where new code belongs.</p></div></header>
              <RepositoryExperience />
            </article>

            <div className="intelligence-plus" aria-hidden="true"><span>+</span><small>Understood<br />together</small></div>

            <article className="intelligence-source intelligence-source-api">
              <header><span>02</span><div><small>API intelligence + playground</small><h3>Import the API. Understand it before you implement it.</h3><p>Endpoints, schemas, authentication, responses, and errors define the external contract.</p></div></header>
              <ApiPlayground />
            </article>
          </div>

          <div className="intelligence-convergence" aria-hidden="true"><i /><span><Icon name="sparkles" size={17} /></span><i /></div>

          <div className="implementation-plan">
            <header><div><span className="implementation-plan-icon"><Icon name="file-chart" size={22} /></span><p><small>COMPATIBLE IMPLEMENTATION PLAN</small><b>Ministry employee integration</b></p></div><strong><Icon name="check" size={14} /> Ready to generate</strong></header>
            <div className="implementation-plan-grid">
              <div><span>01</span><small>Target location</small><b>Infrastructure/ApiClients</b><p>Typed client + auth handler</p></div>
              <div><span>02</span><small>Application pattern</small><b>CQRS + MediatR</b><p>Query, handler, and result</p></div>
              <div><span>03</span><small>Contract mapping</small><b>Employee → EmployeeDto</b><p>3 explicit field transforms</p></div>
              <div><span>04</span><small>Validation plan</small><b>Build + 38 tests</b><p>Architecture rules included</p></div>
            </div>
            <footer><span><Icon name="boxes" size={16} /> Repository context</span><i /><span><Icon name="globe" size={16} /> API contract</span><b>One codebase-compatible result</b></footer>
          </div>
        </Container>
      </section>

      <section className="mapping-section">
        <Container>
          <SectionHeading eyebrow="Controlled data mapping" title="Map external data to the models your application already understands." body="Define field relationships and transformations explicitly. APISTUDIOAI keeps developers in control of how external contracts enter the application." />
          <MappingExperience />
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
          <GuardrailsExperience />
        </Container>
      </section>

      <section className="validation-section">
        <Container>
          <SectionHeading eyebrow="Generate & validate" title="Generated does not mean finished. Validated does." body="Code is only ready for review after it passes the same practical checks your team expects from any implementation." />
          <ValidationDemo />
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
          <SectionHeading eyebrow="Built for real integration work" title="Built for the integrations your business actually depends on." body="Explore how APISTUDIOAI turns external contracts into architecture-compatible implementations across modern platforms and established applications." />
          <UseCasesExperience />
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
          <SectionHeading eyebrow="Engineering FAQ" title="Technical questions deserve specific answers." body="Explore how APISTUDIOAI handles repositories, credentials, generated code, validation, and developer control." />
          <FaqExperience />
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

import Image from "next/image";
import { Container } from "./Container";

const footerColumns = [
  { title: "Product", links: ["How It Works", "Features", "Security", "Integrations"] },
  { title: "Developers", links: ["Documentation", "API Reference", "GitHub", "Changelog"] },
  { title: "Resources", links: ["Guides", "Blog", "Support", "Status"] },
  { title: "Company", links: ["About", "Contact", "Privacy", "Terms"] },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-top">
          <section className="footer-brand" aria-label="About APISTUDIOAI">
            <a className="footer-wordmark" href="#top" aria-label="APISTUDIOAI home"><Image src="/images/apistudio/apistudio-logo.png" alt="APISTUDIO" width={2290} height={620} unoptimized /></a>
            <p>APISTUDIOAI helps development teams understand external APIs, generate code that fits their architecture, validate the implementation, and ship through standard Git workflows.</p>
          </section>
          <nav className="footer-navigation" aria-label="Footer navigation">
            {footerColumns.map((column) => <div className="footer-column" key={column.title}><h2>{column.title}</h2><ul>{column.links.map((link) => <li key={link}><a href="#">{link}</a></li>)}</ul></div>)}
          </nav>
        </div>
        <div className="footer-bottom"><p>© 2026 APISTUDIOAI. All rights reserved.</p><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#security">Security</a></div></div>
      </Container>
    </footer>
  );
}

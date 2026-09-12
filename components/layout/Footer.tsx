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
        <div className="footer-bottom"><p>© 2026 APISTUDIOAI. All rights reserved.</p><div><a href="#privacy">Privacy</a><a href="#terms">Terms</a><a href="#security">Security</a><a className="footer-github" href="https://github.com/OfinTech/APISTUDIO.git" target="_blank" rel="noreferrer" aria-label="APISTUDIO on GitHub"><svg aria-hidden="true" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.9-2.78.62-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.36-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.97a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.59.69.49A10.23 10.23 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" /></svg><span>GitHub</span></a></div></div>
      </Container>
    </footer>
  );
}

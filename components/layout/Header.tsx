import Image from "next/image";
import { Button } from "../ui/Button";
import { Container } from "./Container";

const navigation = [
  { label: "Product", href: "#product" },
  { label: "How it works", href: "#workflow" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "Developers", href: "#developers" },
];

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <a className="wordmark" href="#top" aria-label="APISTUDIOAI home">
          <Image className="wordmark-image" src="/images/apistudio/apistudio-logo.png" alt="APISTUDIO" width={2290} height={620} priority />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="login-link" href="#signin">Sign in</a>
          <Button href="#start" className="header-cta">Start integration</Button>
        </div>
        <details className="mobile-menu">
          <summary aria-label="Open navigation menu"><span /><span /><span /></summary>
          <nav aria-label="Mobile navigation">
            {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
            <a href="#signin">Sign in</a>
            <Button href="#start">Start integration</Button>
          </nav>
        </details>
      </Container>
    </header>
  );
}

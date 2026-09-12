import Image from "next/image";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Container } from "./Container";

const navigation = [
  { label: "تواصل معنا", href: "#contact" },
  { label: "التكاملات", href: "#integrations", dropdown: true },
  { label: "الموارد", href: "#resources", dropdown: true },
  { label: "القطاعات", href: "#industries", dropdown: true },
  { label: "المنتجات", href: "#products", dropdown: true },
];

export function Header() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <a className="wordmark" href="#top" aria-label="Skilltax - الصفحة الرئيسية">
          <Image
            className="wordmark-image"
            src="/images/skilltax/brand/skilltax-logo.png"
            alt="Skilltax"
            width={640}
            height={111}
            priority
            unoptimized
          />
        </a>

        <nav className="desktop-nav" aria-label="التنقل الرئيسي">
          {navigation.map((item) => (
            <a className={item.dropdown ? "nav-dropdown" : undefined} href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="login-link" href="#login">تسجيل الدخول</a>
          <Button href="#start" className="header-cta">
            ابدأ مجاناً <Icon name="arrow-left" size={17} />
          </Button>
          <a className="language-link" href="/en">
            عربي <Icon className="globe-icon" name="globe" size={17} />
          </a>
        </div>

        <details className="mobile-menu">
          <summary aria-label="فتح قائمة التنقل">
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </summary>
          <nav aria-label="التنقل على الهاتف">
            {navigation.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
            <a href="/en">الإنجليزية</a>
            <a href="#login">تسجيل الدخول</a>
            <Button href="#start">ابدأ مجاناً</Button>
          </nav>
        </details>
      </Container>
    </header>
  );
}

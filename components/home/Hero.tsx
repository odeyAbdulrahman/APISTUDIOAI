import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { AnalyticsSection } from "./AnalyticsSection";
import { BusinessFeatures } from "./BusinessFeatures";
import { HeroCarousel } from "./HeroCarousel";
import { MobileAppSection } from "./MobileAppSection";
import { SolutionsSection } from "./SolutionsSection";

const trustPoints = [
  { icon: "☁", label: "سحابي وآمن" },
  { icon: "▥", label: "تقارير فورية" },
  { icon: "⌘", label: "متعدد الفروع" },
];

const businessLogos = [
  { kind: "burger", name: "BURGER\nHOUSE" },
  { kind: "coffee", name: "Coffee\nSpot" },
  { kind: "dokan", name: "DOKAN" },
  { kind: "market", name: "Fresh Mart" },
  { kind: "dining", name: "مطاعم النخبة" },
  { kind: "retail", name: "Smart Retail" },
];

export function Hero() {
  return (
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-shape hero-shape--one" aria-hidden="true" />
        <div className="hero-shape hero-shape--two" aria-hidden="true" />
        <Container className="hero-grid">
          <div className="hero-content">
            <h1 id="hero-title">
              كل أعمالك.
              <span>في نظام واحد.</span>
            </h1>
            <p className="hero-description">
              نظام نقاط بيع وإدارة متكامل يساعدك على إدارة المبيعات، المخزون،
              العملاء، الموظفين والفروع من أي مكان.
            </p>

            <div className="hero-actions" id="start">
              <Button href="#signup">
                ابدأ مجاناً <span aria-hidden="true">←</span>
              </Button>
              <Button href="#demo" variant="secondary">
                احجز عرضاً تجريبياً
              </Button>
            </div>

            <ul className="trust-list" aria-label="مزايا Skilltax">
              {trustPoints.map((point) => (
                <li key={point.label}>
                  <span aria-hidden="true">{point.icon}</span>
                  {point.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual" aria-label="لوحة تحكم Skilltax مع جهاز نقاط البيع">
            <HeroCarousel />
            <div className="metric-card metric-card--growth" aria-label="نمو المبيعات الشهري">
              <span className="metric-icon" aria-hidden="true">↑</span>
              <span><strong>+12.4%</strong> نمو المبيعات هذا الشهر</span>
            </div>
            <div className="metric-card metric-card--orders" aria-label="ملخص طلبات اليوم">
              <span className="metric-icon metric-icon--purple" aria-hidden="true">▣</span>
              <span><strong>248</strong> طلبات اليوم</span>
            </div>
          </div>
        </Container>

      </section>

      <section className="business-proof" aria-labelledby="business-proof-title">
        <Container>
          <h2 id="business-proof-title">يخدم Skilltax العديد من الأنشطة التجارية</h2>
          <div className="business-logo-marquee" role="list" aria-label="عملاء Skilltax">
            <div className="business-logo-track">
              {[false, true].map((duplicate) => (
                <div className="business-logo-group" aria-hidden={duplicate} key={String(duplicate)}>
                  {businessLogos.map((logo) => (
                    <div className="business-logo" role="listitem" key={`${duplicate}-${logo.name}`}>
                      <span className={`business-logo-mark business-logo-mark--${logo.kind}`} aria-hidden="true" />
                      <span className="business-logo-name">{logo.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <BusinessFeatures />
      <AnalyticsSection />
      <SolutionsSection />
      <MobileAppSection />
    </main>
  );
}

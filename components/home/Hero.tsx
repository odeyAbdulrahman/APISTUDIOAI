import { Container } from "../layout/Container";
import { Button } from "../ui/Button";
import { Icon, type IconName } from "../ui/Icon";
import { AnalyticsSection } from "./AnalyticsSection";
import { BusinessFeatures } from "./BusinessFeatures";
import { HeroCarousel } from "./HeroCarousel";
import { MobileAppSection } from "./MobileAppSection";
import { RestaurantIntelligenceSection } from "./RestaurantIntelligenceSection";
import { SolutionsSection } from "./SolutionsSection";
import { BusinessLogoMark, type BusinessLogoKind } from "./BusinessLogoMark";

const trustPoints: { icon: IconName; label: string }[] = [
  { icon: "cloud-check", label: "سحابي وآمن" },
  { icon: "chart", label: "تقارير فورية" },
  { icon: "building", label: "متعدد الفروع" },
];

const businessLogos: { kind: BusinessLogoKind; name: string }[] = [
  { kind: "burger", name: "بيت البرجر" },
  { kind: "coffee", name: "ركن القهوة" },
  { kind: "dokan", name: "دكان" },
  { kind: "market", name: "السوق الطازج" },
  { kind: "dining", name: "مطاعم النخبة" },
  { kind: "retail", name: "التجزئة الذكية" },
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
                ابدأ مجاناً <Icon name="arrow-left" size={18} />
              </Button>
              <Button href="#demo" variant="secondary">
                احجز عرضاً تجريبياً
              </Button>
            </div>

            <ul className="trust-list" aria-label="مزايا Skilltax">
              {trustPoints.map((point) => (
                <li key={point.label}>
                  <span><Icon name={point.icon} size={16} /></span>
                  {point.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="hero-visual" aria-label="عرض تفاعلي لمنصة Skilltax">
            <HeroCarousel />
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
                      <BusinessLogoMark kind={logo.kind} />
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
      <RestaurantIntelligenceSection />
      <MobileAppSection />
    </main>
  );
}

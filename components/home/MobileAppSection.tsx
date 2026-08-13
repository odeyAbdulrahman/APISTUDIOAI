import { Container } from "../layout/Container";
import { Testimonials } from "./Testimonials";

const mobileFeatures = [
  { icon: "sales", title: "متابعة المبيعات", detail: "والطلبات" },
  { icon: "team", title: "إدارة الفروع", detail: "والموظفين" },
  { icon: "reports", title: "تقارير فورية", detail: "ومفصلة" },
  { icon: "alerts", title: "إشعارات لحظية", detail: "ذكية" },
];

function MobileFeatureIcon({ name }: { name: string }) {
  if (name === "sales") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 9h20v27H13z" /><path d="M18 5h10v8H18zM18 20h10M18 26h7" /><path d="M31 27h8v13H27v-9z" /></svg>;
  }

  if (name === "team") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="16" r="8" /><path d="M10 40c1-9 6-14 14-14s13 5 14 14" /></svg>;
  }

  if (name === "reports") {
    return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 40h32M12 36V24h7v12M21 36V17h7v19M30 36V9h7v27" /></svg>;
  }

  return <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 34h20l-3-5V18a7 7 0 0 0-14 0v11zM21 39c1.5 2 4.5 2 6 0" /></svg>;
}

export function MobileAppSection() {
  return (
    <section className="mobile-app-section" aria-labelledby="mobile-app-title">
      <Container>
        <div className="mobile-app-shell">
          <div className="mobile-app-content">
            <h2 id="mobile-app-title">أعمالك معك أينما كنت</h2>
            <p>تطبيق Skilltax يمنحك التحكم الكامل بأعمالك من هاتفك<br />في أي وقت ومن أي مكان.</p>

            <div className="mobile-app-features">
              {mobileFeatures.map((feature) => (
                <article key={feature.title}>
                  <span><MobileFeatureIcon name={feature.icon} /></span>
                  <h3>{feature.title}</h3>
                  <p>{feature.detail}</p>
                </article>
              ))}
            </div>

            <div className="app-store-buttons" aria-label="تحميل تطبيق Skilltax">
              <a className="app-store-badge" href="#google-play" aria-label="تنزيل التطبيق من Google Play">
                <img
                  className="store-badge-image store-badge-image--google"
                  src="/images/skilltax/store-badges/google-play.png"
                  alt="متوفر على Google Play"
                />
              </a>
              <a className="app-store-badge" href="#app-store" aria-label="تنزيل التطبيق من App Store">
                <img
                  className="store-badge-image store-badge-image--apple"
                  src="/images/skilltax/store-badges/app-store.svg"
                  alt="تنزيل من App Store"
                />
              </a>
            </div>
          </div>

          <Testimonials />
        </div>
      </Container>
    </section>
  );
}

import { Container } from "../layout/Container";
import { Icon, type IconName } from "../ui/Icon";
import { SkilltaxProductMotion } from "./SkilltaxProductMotion";

const features: { icon: IconName; title: string; description: string }[] = [
  { icon: "building", title: "إدارة الفروع", description: "مراقبة أداء كل فرع" },
  { icon: "boxes", title: "إدارة المخزون", description: "تحكم كامل في المنتجات" },
  { icon: "store", title: "نقاط بيع سريعة", description: "تجربة بيع سهلة" },
  { icon: "chart", title: "التقارير والتحليلات", description: "قرارات أذكى ونمو أسرع" },
  { icon: "users", title: "الموظفين", description: "إدارة الصلاحيات والأداء" },
  { icon: "user", title: "العملاء", description: "علاقات أقوى مع عملائك" },
];

export function BusinessFeatures() {
  return (
    <section className="business-features" aria-labelledby="business-features-title">
      <Container>
        <header className="business-features-heading">
          <h2 id="business-features-title">كل ما تحتاجه لإدارة أعمالك</h2>
          <p>من نقطة البيع إلى التقارير والتحليلات، في منصة واحدة</p>
        </header>

        <div className="business-features-layout">
          <div className="business-features-image">
            <SkilltaxProductMotion />
          </div>

          <div className="business-features-grid">
            {features.map((feature) => (
              <article className="business-feature-card" key={feature.title}>
                <span className="business-feature-icon"><Icon name={feature.icon} size={34} /></span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

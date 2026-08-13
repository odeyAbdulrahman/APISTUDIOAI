import Image from "next/image";
import { Container } from "../layout/Container";

const features = [
  { icon: "⌘", title: "إدارة الفروع", description: "مراقبة أداء كل فرع" },
  { icon: "▤", title: "إدارة المخزون", description: "تحكم كامل في المنتجات" },
  { icon: "▣", title: "نقاط بيع سريعة", description: "تجربة بيع سهلة" },
  { icon: "▦", title: "التقارير والتحليلات", description: "قرارات أذكى ونمو أسرع" },
  { icon: "♙", title: "الموظفين", description: "إدارة الصلاحيات والأداء" },
  { icon: "♧", title: "العملاء", description: "علاقات أقوى مع عملائك" },
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
            <Image
              src="/images/skilltax/features/skilltax-business-suite.png"
              alt="نظام Skilltax لنقاط البيع مع شاشة الإدارة والطابعة وجهاز الدفع"
              width={1536}
              height={1024}
              unoptimized
              sizes="(max-width: 900px) 100vw, 42vw"
            />
          </div>

          <div className="business-features-grid">
            {features.map((feature) => (
              <article className="business-feature-card" key={feature.title}>
                <span className="business-feature-icon" aria-hidden="true">{feature.icon}</span>
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

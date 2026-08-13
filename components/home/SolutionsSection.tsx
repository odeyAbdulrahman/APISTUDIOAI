import Image from "next/image";
import { Container } from "../layout/Container";

const solutions = [
  {
    title: "محلات متعددة الفروع",
    description: "لوحة تحكم مركزية لكل فروعك",
    image: "/images/skilltax/solutions/multi-branch.png",
    alt: "خريطة وفروع متعددة",
  },
  {
    title: "سوبر ماركت وبقالة",
    description: "إدارة مخزون وتوريد ذكي",
    image: "/images/skilltax/solutions/grocery.png",
    alt: "سلة مشتريات تحتوي على منتجات البقالة",
  },
  {
    title: "تجارة التجزئة",
    description: "مخزون دقيق ومبيعات أعلى",
    image: "/images/skilltax/solutions/retail.png",
    alt: "أكياس تسوق وعربة مشتريات",
  },
  {
    title: "مطاعم ومقاهي",
    description: "نقاط بيع سريعة وإدارة الطلبات",
    image: "/images/skilltax/solutions/restaurants.png",
    alt: "وجبة برجر وبطاطس وقهوة",
  },
];

export function SolutionsSection() {
  return (
    <section className="solutions-section" aria-labelledby="solutions-title">
      <Container>
        <h2 id="solutions-title">حلول مصممة لكل نشاط تجاري</h2>

        <div className="solutions-grid">
          <a className="solutions-cta-card" href="#all-solutions">
            <span>اكتشف<br />جميع الحلول</span>
            <strong aria-hidden="true">←</strong>
          </a>

          {solutions.map((solution) => (
            <article className="solution-card" key={solution.title}>
              <h3>{solution.title}</h3>
              <div className="solution-card-image">
                <Image
                  src={solution.image}
                  alt={solution.alt}
                  width={1536}
                  height={1024}
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1160px) 33vw, 20vw"
                />
              </div>
              <p>{solution.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

import Image from "next/image";
import { Container } from "../layout/Container";

const solutions = [
  {
    title: "محلات متعددة الفروع",
    description: "لوحة تحكم مركزية لكل فروعك",
    image: "/images/skilltax/solutions/multi-branch.png",
    reelImage: "/images/skilltax/solutions/multi-branch-reel-v2.png",
    alt: "خريطة وفروع متعددة",
  },
  {
    title: "سوبر ماركت وبقالة",
    description: "إدارة مخزون وتوريد ذكي",
    image: "/images/skilltax/solutions/grocery.png",
    reelImage: "/images/skilltax/solutions/grocery-reel-v2.png",
    alt: "سلة مشتريات تحتوي على منتجات البقالة",
  },
  {
    title: "تجارة التجزئة",
    description: "مخزون دقيق ومبيعات أعلى",
    image: "/images/skilltax/solutions/retail.png",
    reelImage: "/images/skilltax/solutions/retail-reel-v2.png",
    alt: "أكياس تسوق وعربة مشتريات",
  },
  {
    title: "مطاعم ومقاهي",
    description: "نقاط بيع سريعة وإدارة الطلبات",
    image: "/images/skilltax/solutions/restaurants.png",
    reelImage: "/images/skilltax/solutions/restaurants-reel-v2.png",
    alt: "وجبة برجر وبطاطس وقهوة",
  },
];

export function SolutionsSection() {
  return (
    <section className="solutions-section" aria-labelledby="solutions-title">
      <Container>
        <h2 id="solutions-title">حلول مصممة لكل نشاط تجاري</h2>

        <div className="solutions-grid">
          <figure className="solutions-reel" aria-label="عرض سريع لحلول Skilltax للأنشطة التجارية">
            <div className="solutions-reel-badge">
              <span aria-hidden="true"><i /></span>
              الحلول في 12 ثانية
            </div>

            <div className="solutions-reel-scenes" aria-hidden="true">
              {solutions.map((solution, index) => (
                <div className="solutions-reel-scene" key={`reel-${solution.title}`}>
                  <Image
                    src={solution.reelImage}
                    alt=""
                    width={1024}
                    height={1536}
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 230px"
                  />
                  <div>
                    <small>{String(index + 1).padStart(2, "0")}</small>
                    <strong>{solution.title}</strong>
                    <span>{solution.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <figcaption>
              <span><i /> عرض تلقائي</span>
              <div className="solutions-reel-progress" aria-hidden="true"><i /></div>
            </figcaption>
          </figure>

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

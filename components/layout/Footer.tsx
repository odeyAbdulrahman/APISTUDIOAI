import { Container } from "./Container";

const footerColumns = [
  {
    title: "الشركة",
    links: ["من نحن", "عملاؤنا", "الشركاء", "تواصل معنا"],
  },
  {
    title: "الموارد",
    links: ["المدونة", "مركز المساعدة", "دليل الاستخدام", "API Docs"],
  },
  {
    title: "القطاعات",
    links: ["مطاعم ومقاهي", "تجارة التجزئة", "سوبر ماركت", "خدمات", "جميع القطاعات"],
  },
  {
    title: "المنتجات",
    links: ["نقاط البيع", "المخزون", "العملاء", "التقارير"],
  },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-accent" aria-hidden="true" />
      <Container>
        <div className="footer-main">
          <section className="footer-newsletter" aria-labelledby="newsletter-title">
            <h2 id="newsletter-title">اشترك في نشرتنا البريدية</h2>
            <p>استلم آخر التحديثات والنصائح والعروض</p>
            <form className="newsletter-form">
              <label className="sr-only" htmlFor="newsletter-email">بريدك الإلكتروني</label>
              <input id="newsletter-email" type="email" placeholder="بريدك الإلكتروني" required />
              <button type="submit">اشترك</button>
            </form>
          </section>

          <nav className="footer-navigation" aria-label="روابط تذييل الموقع">
            {footerColumns.map((column) => (
              <div className="footer-column" key={column.title}>
                <h2>{column.title}</h2>
                <ul>
                  {column.links.map((link) => (
                    <li key={link}><a href="#">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <section className="footer-brand" aria-label="عن Skilltax">
            <a className="footer-wordmark" href="#top" aria-label="Skilltax الرئيسية">Skilltax</a>
            <p>منصة متكاملة لإدارة أعمالك ونقاط البيع لتنمية عملك بكفاءة ومرونة.</p>
            <div className="footer-social" aria-label="حسابات التواصل الاجتماعي">
              <a href="#facebook" aria-label="Facebook">f</a>
              <a href="#x" aria-label="X">𝕏</a>
              <a href="#linkedin" aria-label="LinkedIn">in</a>
              <a href="#instagram" aria-label="Instagram">◎</a>
              <a href="#youtube" aria-label="YouTube">▶</a>
            </div>
          </section>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">
            <a href="#privacy">سياسة الخصوصية</a>
            <a href="#terms">الشروط والأحكام</a>
          </div>
          <p>© 2026 Skilltax. جميع الحقوق محفوظة.</p>
        </div>
      </Container>
    </footer>
  );
}

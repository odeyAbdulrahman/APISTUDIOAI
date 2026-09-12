"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";

type ProductKind = "latte" | "croissant" | "cake" | "cold-drink";

function ProductVisual({ kind }: { kind: ProductKind }) {
  return (
    <svg className={`hero-product-visual hero-product-visual--${kind}`} viewBox="0 0 64 54" aria-hidden="true">
      {kind === "latte" && (
        <>
          <path d="M17 18h28v17a10 10 0 0 1-10 10h-8a10 10 0 0 1-10-10V18Z" />
          <path d="M45 23h3a7 7 0 0 1 0 14h-4" />
          <path d="M24 13c-2-3 2-4 1-7M34 13c-2-3 2-4 1-7M14 46h38" />
        </>
      )}
      {kind === "croissant" && (
        <>
          <path d="M11 36c3-14 12-22 21-22s18 8 21 22c-6-5-11-7-15-8-1 6-3 10-6 10s-5-4-6-10c-4 1-9 3-15 8Z" />
          <path d="M26 28c1-6 3-10 6-10s5 4 6 10M18 23l8 5M46 23l-8 5" />
        </>
      )}
      {kind === "cake" && (
        <>
          <path d="M14 27h36l-4 18H18l-4-18Z" />
          <path d="M18 27c2-8 8-13 14-13s12 5 14 13M24 18c2 3 4 4 8 4s6-1 8-4" />
          <circle cx="33" cy="10" r="3" />
        </>
      )}
      {kind === "cold-drink" && (
        <>
          <path d="M20 17h26l-3 29H23l-3-29Z" />
          <path d="M18 17h30M25 11h17M39 11l4-7M25 25c5-4 11 4 18 0" />
        </>
      )}
    </svg>
  );
}

export function HeroProductMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`hero-motion${paused || !visible ? " is-paused" : ""}`} role="img" aria-label="رحلة طلب عبر منصة Skilltax من نقطة البيع إلى تحديث المبيعات والمخزون والفروع">
      <div className="hero-motion-orbit hero-motion-orbit--one" aria-hidden="true" />
      <div className="hero-motion-orbit hero-motion-orbit--two" aria-hidden="true" />
      <div className="hero-motion-live" aria-hidden="true"><i /> متصل <span>آخر مزامنة الآن</span></div>

      <div className="hero-pos-window">
        <header>
          <span className="hero-pos-brand"><b>‹K</b> Skilltax</span>
          <span className="hero-pos-location"><Icon name="store" size={10} /> فرع دبي مول</span>
          <span className="hero-pos-shift"><i /> الوردية الصباحية</span>
          <span className="hero-pos-user"><b>م</b> محمد</span>
        </header>
        <div className="hero-pos-body">
          <nav>
            <strong>‹K</strong>
            <span><Icon name="chart" size={11} /> الرئيسية</span>
            <b><Icon name="store" size={11} /> نقاط البيع</b>
            <span><Icon name="boxes" size={11} /> الطلبات</span>
            <span><Icon name="building" size={11} /> المخزون</span>
            <span><Icon name="users" size={11} /> العملاء</span>
          </nav>
          <main>
            <div className="hero-pos-main-heading">
              <span><strong>نقطة البيع</strong><small>الأحد، 14 أغسطس</small></span>
              <button type="button" tabIndex={-1}>طلب جديد <b>+</b></button>
            </div>
            <div className="hero-pos-search"><Icon name="search" size={11} /> ابحث باسم المنتج أو امسح الباركود</div>
            <div className="hero-pos-categories"><b>الكل</b><span>المشروبات</span><span>المخبوزات</span><span>الحلويات</span></div>
            <div className="hero-pos-products">
              <article><em>2</em><span><ProductVisual kind="latte" /></span><b>قهوة لاتيه</b><small>16.00 د.إ</small></article>
              <article><em>1</em><span><ProductVisual kind="croissant" /></span><b>كرواسون بالزبدة</b><small>12.00 د.إ</small></article>
              <article><span><ProductVisual kind="cake" /></span><b>تشيز كيك</b><small>18.00 د.إ</small></article>
              <article><span><ProductVisual kind="cold-drink" /></span><b>قهوة باردة</b><small>14.00 د.إ</small></article>
            </div>
          </main>
          <aside>
            <div className="hero-order-heading"><span><strong>الطلب الحالي</strong><small>رقم 1024</small></span><button type="button" tabIndex={-1}>•••</button></div>
            <div className="hero-order-customer"><Icon name="user" size={11} /><span><strong>عميل نقدي</strong><small>إضافة بيانات العميل</small></span></div>
            <div className="hero-order-items">
              <div className="hero-order-item"><span><strong>قهوة لاتيه</strong><small>حجم متوسط</small></span><span><i>−</i><b>2</b><i>+</i></span><strong>32.00</strong></div>
              <div className="hero-order-item"><span><strong>كرواسون بالزبدة</strong><small>قطعة واحدة</small></span><span><i>−</i><b>1</b><i>+</i></span><strong>12.00</strong></div>
            </div>
            <div className="hero-order-summary"><span>المجموع الفرعي <b>44.00 د.إ</b></span><span>الضريبة 5% <b>2.20 د.إ</b></span></div>
            <div className="hero-order-total"><span>الإجمالي<small>شامل الضريبة</small></span><strong>46.20 د.إ</strong></div>
            <button type="button" tabIndex={-1}><span>الدفع الآن</span><strong>46.20 د.إ</strong></button>
          </aside>
        </div>
        <div className="hero-pos-success">
          <i><Icon name="check" size={23} /></i>
          <strong>اكتملت عملية الدفع</strong>
          <span>46.20 د.إ</span>
          <small>تم إنشاء الفاتورة رقم 1024 وإرسالها للعميل</small>
          <div><b><Icon name="check" size={10} /> تحديث المخزون</b><b><Icon name="check" size={10} /> تسجيل المبيعات</b></div>
        </div>
      </div>

      <div className="hero-motion-cursor" aria-hidden="true"><i>+</i></div>

      <article className="hero-motion-card hero-motion-card--sale"><span>إجمالي مبيعات اليوم</span><strong>24,580 د.إ</strong><small>↑ 12.4% عن الأمس</small><div className="hero-sale-bars" aria-hidden="true"><i /><i /><i /><i /><i /></div></article>
      <article className="hero-motion-card hero-motion-card--stock"><span>تحديث المخزون</span><strong>تم خصم 3 وحدات</strong><small><i /> تمت المزامنة مع الفروع</small></article>
      <article className="hero-motion-card hero-motion-card--branch"><span>حالة الفروع</span><div><i><b />دبي</i><i><b />أبوظبي</i><i><b />الشارقة</i></div><small>جميع الفروع تعمل بشكل طبيعي</small></article>

      <div className="hero-motion-finale"><span>‹K</span><strong>بيع أسرع. قرار أذكى.</strong><small>كل أعمالك في Skilltax</small></div>

      <button type="button" className="hero-motion-control" onClick={() => setPaused((value) => !value)} aria-label={paused ? "تشغيل عرض Skilltax" : "إيقاف عرض Skilltax مؤقتاً"}><Icon name={paused ? "play" : "pause"} size={16} /></button>
      <div className="hero-motion-progress" aria-hidden="true"><i /></div>
    </div>
  );
}

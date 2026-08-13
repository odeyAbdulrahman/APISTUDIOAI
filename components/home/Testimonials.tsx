"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "أحمد الشامسي",
    role: "مالك مطعم واحة دبي",
    quote:
      "منذ اعتماد Skilltax أصبحت متابعة المبيعات والمخزون أسهل بكثير. التقارير واضحة ودقيقة، وفريق الدعم يستجيب بسرعة كلما احتجنا إلى المساعدة.",
  },
  {
    name: "نورة المنصوري",
    role: "مديرة سلسلة متاجر روز",
    quote:
      "جمع Skilltax إدارة فروعنا في مكان واحد، ومنحنا رؤية لحظية للأداء. اليوم نتخذ قراراتنا بثقة ونوفّر وقتًا كبيرًا في إعداد التقارير اليومية.",
  },
  {
    name: "خالد السويدي",
    role: "مؤسس مقهى دوز",
    quote:
      "واجهة سهلة ونتائج ملموسة من الأسبوع الأول. تمكّنا من تنظيم الطلبات وتقليل الأخطاء، وأصبح الفريق أكثر سرعة وانسجامًا خلال ساعات العمل.",
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimonial = testimonials[activeIndex];

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <div
      className="mobile-testimonial"
      aria-label="آراء عملاء Skilltax"
      aria-live="polite"
    >
      <button
        className="testimonial-arrow testimonial-arrow--previous"
        type="button"
        aria-label="عرض رأي العميل السابق"
        onClick={showPrevious}
      >
        ‹
      </button>

      <div className="testimonial-portrait" aria-hidden="true">
        <img src="/images/skilltax/mobile/testimonial-customer.png" alt="" />
      </div>

      <div className="testimonial-quote" key={`quote-${activeIndex}`}>
        <div className="testimonial-stars" aria-label="تقييم خمسة من خمسة نجوم">
          ★★★★★
        </div>
        <blockquote>“{activeTestimonial.quote}”</blockquote>
        <div className="testimonial-dots" aria-label="اختيار مراجعة عميل">
          {testimonials.map((testimonial, index) => (
            <button
              className={index === activeIndex ? "is-active" : ""}
              type="button"
              aria-label={`عرض مراجعة ${testimonial.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              key={testimonial.name}
            />
          ))}
        </div>
      </div>

      <div className="testimonial-author" key={`author-${activeIndex}`}>
        <strong>{activeTestimonial.name}</strong>
        <span>{activeTestimonial.role}</span>
      </div>

      <button
        className="testimonial-arrow testimonial-arrow--next"
        type="button"
        aria-label="عرض رأي العميل التالي"
        onClick={showNext}
      >
        ›
      </button>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Container } from "../layout/Container";
import { SalesLineChart } from "./AnalyticsCharts";

const questions = [
  {
    id: "today",
    question: "كيف تسير مبيعاتي اليوم؟",
    short: "مبيعات اليوم",
    eyebrow: "أداء اليوم ممتاز",
    answer: "مبيعاتك تتقدم بثبات",
    value: "AED 24,580",
    change: "+12.4%",
    insight: "الفترة الأقوى بين 6 و9 مساءً",
    action: "جهّز فريقاً إضافياً قبل الساعة 6",
  },
  {
    id: "branch",
    question: "أي فرع يحقق أفضل أداء؟",
    short: "أفضل فرع",
    eyebrow: "فرع دبي في الصدارة",
    answer: "دبي يتفوق على بقية الفروع",
    value: "AED 9,840",
    change: "+18.2%",
    insight: "يمثل 40% من إجمالي مبيعات اليوم",
    action: "طبّق عرض دبي الناجح في فرع الشارقة",
  },
  {
    id: "product",
    question: "ما المنتج الأكثر طلباً؟",
    short: "المنتج الرابح",
    eyebrow: "منتج يستحق الانتباه",
    answer: "القهوة المختصة هي الأكثر مبيعاً",
    value: "426 طلب",
    change: "+24.8%",
    insight: "تباع غالباً مع الحلوى بعد الظهر",
    action: "أنشئ عرضاً مشتركاً لرفع قيمة الطلب",
  },
  {
    id: "stock",
    question: "ما الذي يحتاج انتباهي الآن؟",
    short: "تنبيه ذكي",
    eyebrow: "تدخل صغير يمنع خسارة",
    answer: "مخزون منتجين سينفد قريباً",
    value: "2 تنبيه",
    change: "48 ساعة",
    insight: "الحليب والعبوات أقل من حد الأمان",
    action: "أنشئ طلب توريد الآن بضغطة واحدة",
  },
];

export function AnalyticsSection() {
  const [activeId, setActiveId] = useState(questions[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const active = questions.find((item) => item.id === activeId) ?? questions[0];

  useEffect(() => {
    if (isPaused) return;

    const timer = window.setInterval(() => {
      setActiveId((currentId) => {
        const currentIndex = questions.findIndex((item) => item.id === currentId);
        return questions[(currentIndex + 1) % questions.length].id;
      });
    }, 4500);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const selectQuestion = (id: string) => {
    setActiveId(id);
    setIsPaused(true);
    window.setTimeout(() => setIsPaused(false), 8000);
  };

  return (
    <section className="analytics-section analytics-experience" aria-labelledby="analytics-title">
      <Container>
        <div
          className="analytics-story-shell"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          <div className="analytics-story-glow" aria-hidden="true" />

          <header className="analytics-story-heading">
            <span><i aria-hidden="true">✦</i> Skilltax Intelligence</span>
            <h2 id="analytics-title">اسأل عملك… <strong>وسنحوّل الأرقام إلى قرار</strong></h2>
            <p>لا جداول معقدة. اختر ما تريد معرفته وشاهد الإجابة فوراً.</p>
          </header>

          <div className="analytics-question-rail" role="tablist" aria-label="أسئلة سريعة عن أداء العمل">
            {questions.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={active.id === item.id}
                className={active.id === item.id ? "is-active" : ""}
                onClick={() => selectQuestion(item.id)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="analytics-question-text">{item.question}</span>
                {active.id === item.id && <i className="analytics-tab-progress" aria-hidden="true" />}
              </button>
            ))}
          </div>

          <div className="analytics-answer-stage" aria-live="polite">
            <div className="analytics-answer-main" key={active.id}>
              <div className="analytics-answer-topline">
                <span><i aria-hidden="true" /> تحليل مباشر</span>
                <small>آخر تحديث الآن</small>
              </div>

              <div className="analytics-answer-copy">
                <span>{active.eyebrow}</span>
                <h3>{active.answer}</h3>
                <div className="analytics-answer-number">
                  <strong>{active.value}</strong>
                  <b>{active.change} ↗</b>
                </div>
                <p>{active.insight}</p>
              </div>

              <div className="analytics-mini-chart">
                <div className="analytics-mini-chart-label"><span>حركة الأداء</span><strong>هذا الأسبوع</strong></div>
                <SalesLineChart />
              </div>
            </div>

            <aside className="analytics-decision-card" key={`${active.id}-decision`}>
              <span className="analytics-decision-icon" aria-hidden="true">✦</span>
              <small>خطوتك التالية</small>
              <h3>{active.action}</h3>
              <p>اقتراح ذكي مبني على بياناتك الحالية.</p>
              <a href="#reports">نفّذ الاقتراح <span aria-hidden="true">←</span></a>
              <div className="analytics-impact">
                <span>الأثر المتوقع</span>
                <strong>قرار أسرع · ربح أوضح</strong>
              </div>
            </aside>
          </div>

          <div className="analytics-story-footer">
            <span><i aria-hidden="true">✓</i> مبيعات</span>
            <span><i aria-hidden="true">✓</i> فروع</span>
            <span><i aria-hidden="true">✓</i> مخزون</span>
            <span><i aria-hidden="true">✓</i> عملاء</span>
            <strong>كل أعمالك تتحدث لغة واحدة</strong>
          </div>
        </div>
      </Container>
    </section>
  );
}

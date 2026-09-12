"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "../layout/Container";
import { Icon } from "../ui/Icon";
import { SalesLineChart } from "./AnalyticsCharts";

const questions = [
  {
    id: "today",
    question: "كيف تسير مبيعاتي اليوم؟",
    short: "مبيعات اليوم",
    eyebrow: "أداء اليوم ممتاز",
    answer: "مبيعاتك تتقدم بثبات",
    value: "24,580 د.إ",
    change: "+12.4%",
    insight: "الفترة الأقوى بين 6 و9 مساءً",
    action: "جهّز فريقاً إضافياً قبل الساعة 6",
    actionDetail: "الطلب يرتفع بسرعة قبل فترة الذروة المسائية.",
    impact: "+8% سرعة خدمة متوقعة",
    chart: "trend",
    chartTitle: "المبيعات حسب الساعة",
    chartPeriod: "اليوم",
  },
  {
    id: "branch",
    question: "أي فرع يحقق أفضل أداء؟",
    short: "أفضل فرع",
    eyebrow: "فرع دبي في الصدارة",
    answer: "دبي يتفوق على بقية الفروع",
    value: "9,840 د.إ",
    change: "+18.2%",
    insight: "يمثل 40% من إجمالي مبيعات اليوم",
    action: "طبّق عرض دبي الناجح في فرع الشارقة",
    actionDetail: "عرض القهوة مع الحلوى هو الفارق الأوضح بين الفرعين.",
    impact: "+2,100 د.إ فرصة يومية",
    chart: "branches",
    chartTitle: "مقارنة أداء الفروع",
    chartPeriod: "اليوم",
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
    actionDetail: "68% من مشتري القهوة يضيفون منتجاً ثانياً.",
    impact: "+14 د.إ لكل طلب",
    chart: "products",
    chartTitle: "ترتيب المنتجات",
    chartPeriod: "هذا الأسبوع",
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
    actionDetail: "الطلب المقترح يغطي 14 يوماً وفق سرعة البيع الحالية.",
    impact: "تجنّب 3,600 د.إ من المبيعات المفقودة",
    chart: "stock",
    chartTitle: "صحة المخزون",
    chartPeriod: "توقع 7 أيام",
  },
];

function ReportVisual({ type }: { type: string }) {
  if (type === "branches") {
    return (
      <div className="report-bars" role="img" aria-label="مقارنة الفروع: دبي 9840، أبوظبي 7210، الشارقة 5130 درهم">
        {[
          ["دبي", "9,840 د.إ", 100],
          ["أبوظبي", "7,210 د.إ", 73],
          ["الشارقة", "5,130 د.إ", 52],
        ].map(([label, value, width], index) => (
          <div className={index === 0 ? "is-leading" : ""} key={String(label)}>
            <span>{label}</span><i><b style={{ width: `${width}%` }} /></i><strong>{value}</strong>
          </div>
        ))}
      </div>
    );
  }

  if (type === "products") {
    return (
      <div className="report-ranking" role="img" aria-label="أكثر المنتجات طلباً: القهوة المختصة 426، الكرواسون 318، التشيز كيك 244 طلباً">
        {[
          ["القهوة المختصة", "426", "+24%"],
          ["الكرواسون", "318", "+11%"],
          ["التشيز كيك", "244", "+8%"],
        ].map(([label, orders, growth], index) => (
          <div key={String(label)}>
            <b>{index + 1}</b><span><strong>{label}</strong><small>{orders} طلب</small></span><i>{growth}</i>
          </div>
        ))}
      </div>
    );
  }

  if (type === "stock") {
    return (
      <div className="report-stock" role="img" aria-label="صحة المخزون: الحليب 18%، العبوات 24%، حبوب القهوة 76%">
        {[
          ["الحليب", "18%", 18, true],
          ["العبوات", "24%", 24, true],
          ["حبوب القهوة", "76%", 76, false],
        ].map(([label, value, level, warning]) => (
          <div className={warning ? "is-warning" : ""} key={String(label)}>
            <span><strong>{label}</strong><small>{warning ? "يحتاج طلباً" : "مستوى آمن"}</small></span>
            <i><b style={{ width: `${level}%` }} /></i><em>{value}</em>
          </div>
        ))}
      </div>
    );
  }

  return <SalesLineChart />;
}

export function AnalyticsSection() {
  const [activeId, setActiveId] = useState(questions[0].id);
  const [isPaused, setIsPaused] = useState(false);
  const resumeTimer = useRef<number | null>(null);
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

  useEffect(() => () => {
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
  }, []);

  const selectQuestion = (id: string) => {
    setActiveId(id);
    setIsPaused(true);
    if (resumeTimer.current) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setIsPaused(false), 8000);
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
                <div className="analytics-mini-chart-label"><span>{active.chartTitle}</span><strong>{active.chartPeriod}</strong></div>
                <ReportVisual type={active.chart} />
              </div>
            </div>

            <aside className="analytics-decision-card" key={`${active.id}-decision`}>
              <small>خطوتك التالية</small>
              <h3>{active.action}</h3>
              <p>{active.actionDetail}</p>
              <a href="#reports">نفّذ الاقتراح <Icon name="arrow-left" size={17} /></a>
              <div className="analytics-impact">
                <span>الأثر المتوقع</span>
                <strong>{active.impact}</strong>
              </div>
            </aside>
          </div>

          <div className="analytics-story-footer">
            <span><i><Icon name="check" size={11} /></i> مبيعات</span>
            <span><i><Icon name="check" size={11} /></i> فروع</span>
            <span><i><Icon name="check" size={11} /></i> مخزون</span>
            <span><i><Icon name="check" size={11} /></i> عملاء</span>
            <strong>كل أعمالك تتحدث لغة واحدة</strong>
          </div>
        </div>
      </Container>
    </section>
  );
}

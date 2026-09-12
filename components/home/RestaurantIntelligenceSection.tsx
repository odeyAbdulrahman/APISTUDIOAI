"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import { Container } from "../layout/Container";
import { Icon, type IconName } from "../ui/Icon";

type AnalyticsViewId = "profit" | "cost" | "waste" | "demand" | "products" | "ai";

const analyticsFeatures: { id: AnalyticsViewId; icon: IconName; title: string }[] = [
  { id: "profit", icon: "trending-up", title: "تحليل هامش الربح" },
  { id: "cost", icon: "file-chart", title: "متابعة تكلفة المنتجات" },
  { id: "waste", icon: "boxes", title: "تقليل الهدر من اتجاهات الاستهلاك" },
  { id: "demand", icon: "chart", title: "توقع الطلب ومواسم الذروة" },
  { id: "products", icon: "store", title: "قياس ربحية كل منتج" },
  { id: "ai", icon: "sparkles", title: "توصيات ذكية للشراء والتحضير" },
];

const profitabilityTrend = [
  { label: "السبت", revenue: 68, cost: 31 },
  { label: "الأحد", revenue: 78, cost: 34 },
  { label: "الاثنين", revenue: 74, cost: 32 },
  { label: "الثلاثاء", revenue: 86, cost: 37 },
  { label: "الأربعاء", revenue: 82, cost: 35 },
  { label: "الخميس", revenue: 94, cost: 39 },
  { label: "الجمعة", revenue: 98, cost: 41 },
];

type DashboardView = {
  id: AnalyticsViewId;
  title: string;
  period: string;
  metrics: { label: string; value: string; unit?: string; trend: string; tone?: "neutral" | "attention" }[];
  chartTitle: string;
  legends: [string, string];
  chartData: { label: string; revenue: number; cost: number }[];
  rankingTitle: string;
  rankingMeta: string;
  ranking: { name: string; detail: string; value: string; tone?: "attention" }[];
  insightLabel: string;
  insight: string;
  impact: string;
};

const dashboardViews: Record<AnalyticsViewId, DashboardView> = {
  profit: {
    id: "profit", title: "ملخص الربحية", period: "آخر 30 يومًا",
    metrics: [
      { label: "صافي المبيعات", value: "184,620", unit: "د.إ", trend: "12.4% عن الفترة السابقة" },
      { label: "إجمالي الربح", value: "62,840", unit: "د.إ", trend: "8.7% نمو" },
      { label: "تكلفة المواد", value: "28.6%", trend: "تحسّن 1.8 نقطة" },
    ],
    chartTitle: "المبيعات وتكلفة المواد يوميًا", legends: ["المبيعات", "تكلفة المواد"], chartData: profitabilityTrend,
    rankingTitle: "أفضل المنتجات أداءً", rankingMeta: "المبيعات · الهامش",
    ranking: [
      { name: "قهوة مختصة", detail: "32,460 د.إ مبيعات", value: "61%" },
      { name: "برجر كلاسيك", detail: "26,180 د.إ مبيعات", value: "47%" },
      { name: "وجبة الغداء", detail: "18,940 د.إ مبيعات", value: "38%" },
    ],
    insightLabel: "توصية لرفع الربحية", insight: "زد توفر القهوة المختصة صباحًا لارتفاع هامشها والطلب عليها", impact: "+2,650 د.إ ربح متوقع",
  },
  cost: {
    id: "cost", title: "تحليل تكلفة المنتجات", period: "مقارنة شهرية",
    metrics: [
      { label: "إجمالي تكلفة المواد", value: "52,740", unit: "د.إ", trend: "انخفاض 3.2%" },
      { label: "متوسط تكلفة الطبق", value: "11.80", unit: "د.إ", trend: "أقل بـ 0.65 د.إ" },
      { label: "تغيّر أسعار الموردين", value: "4.6%", trend: "يحتاج متابعة", tone: "attention" },
    ],
    chartTitle: "تكلفة المواد حسب الفئة", legends: ["التكلفة الحالية", "الشهر السابق"],
    chartData: [
      { label: "لحوم", revenue: 88, cost: 82 }, { label: "ألبان", revenue: 55, cost: 61 }, { label: "خضار", revenue: 43, cost: 48 },
      { label: "مخبوزات", revenue: 38, cost: 46 }, { label: "مشروبات", revenue: 51, cost: 49 }, { label: "تعبئة", revenue: 30, cost: 36 }, { label: "أخرى", revenue: 25, cost: 29 },
    ],
    rankingTitle: "أعلى المنتجات تكلفة", rankingMeta: "تكلفة الطبق · التغيّر",
    ranking: [
      { name: "برجر اللحم", detail: "14.80 د.إ للطبق", value: "+4.1%", tone: "attention" },
      { name: "طبق الدجاج", detail: "12.40 د.إ للطبق", value: "+1.8%", tone: "attention" },
      { name: "سلطة الموسم", detail: "8.20 د.إ للطبق", value: "-2.3%" },
    ],
    insightLabel: "فرصة تفاوض مع المورد", insight: "سعر اللحوم أعلى 6% من متوسط عروض الموردين المعتمدين", impact: "وفر حتى 3,200 د.إ",
  },
  waste: {
    id: "waste", title: "مراقبة الهدر", period: "هذا الشهر",
    metrics: [
      { label: "معدل الهدر", value: "2.8%", trend: "تحسّن 14%" },
      { label: "قيمة المواد المهدرة", value: "6,320", unit: "د.إ", trend: "أقل بـ 980 د.إ" },
      { label: "وجبات تم إنقاذها", value: "426", trend: "82 وجبة إضافية" },
    ],
    chartTitle: "الهدر اليومي مقابل الحد المستهدف", legends: ["الهدر الفعلي", "الحد المستهدف"],
    chartData: [
      { label: "السبت", revenue: 48, cost: 42 }, { label: "الأحد", revenue: 40, cost: 42 }, { label: "الاثنين", revenue: 58, cost: 42 },
      { label: "الثلاثاء", revenue: 36, cost: 42 }, { label: "الأربعاء", revenue: 32, cost: 42 }, { label: "الخميس", revenue: 44, cost: 42 }, { label: "الجمعة", revenue: 39, cost: 42 },
    ],
    rankingTitle: "أكثر المواد هدرًا", rankingMeta: "القيمة · النسبة",
    ranking: [
      { name: "خبز البرجر", detail: "1,240 د.إ هذا الشهر", value: "5.8%", tone: "attention" },
      { name: "الخضار الطازجة", detail: "920 د.إ هذا الشهر", value: "4.2%", tone: "attention" },
      { name: "صلصات التحضير", detail: "610 د.إ هذا الشهر", value: "2.9%" },
    ],
    insightLabel: "توصية لتقليل الهدر", insight: "خفّض تحضير الخبز 12% من الاثنين إلى الأربعاء", impact: "توفير شهري 1,850 د.إ",
  },
  demand: {
    id: "demand", title: "توقع الطلب", period: "توقعات الغد",
    metrics: [
      { label: "الطلبات المتوقعة", value: "612", trend: "ثقة التوقع 92%" },
      { label: "ساعة الذروة", value: "18:30", trend: "حتى 21:00", tone: "neutral" },
      { label: "زيادة الطلب", value: "16.8%", trend: "عن الأسبوع الماضي" },
    ],
    chartTitle: "الطلب المتوقع حسب الساعة", legends: ["الطلبات المتوقعة", "المعدل المعتاد"],
    chartData: [
      { label: "12م", revenue: 42, cost: 38 }, { label: "2م", revenue: 55, cost: 48 }, { label: "4م", revenue: 48, cost: 44 },
      { label: "6م", revenue: 82, cost: 61 }, { label: "8م", revenue: 98, cost: 72 }, { label: "10م", revenue: 76, cost: 59 }, { label: "12ص", revenue: 35, cost: 31 },
    ],
    rankingTitle: "الطلب حسب الفرع", rankingMeta: "طلبات الغد · التغيّر",
    ranking: [
      { name: "فرع دبي", detail: "248 طلبًا متوقعًا", value: "+19%" },
      { name: "فرع أبوظبي", detail: "206 طلبات متوقعة", value: "+14%" },
      { name: "فرع الشارقة", detail: "158 طلبًا متوقعًا", value: "+11%" },
    ],
    insightLabel: "خطة تجهيز تلقائية", insight: "جهّز 28 وجبة برجر إضافية قبل السادسة مساءً", impact: "تقليل الانتظار 18%",
  },
  products: {
    id: "products", title: "ربحية المنتجات", period: "القائمة الحالية",
    metrics: [
      { label: "متوسط هامش المساهمة", value: "46.8%", trend: "تحسّن 3.4 نقاط" },
      { label: "منتجات مربحة", value: "31", unit: "من 38", trend: "81% من القائمة" },
      { label: "تحتاج مراجعة", value: "7", trend: "فرص تحسين فورية", tone: "attention" },
    ],
    chartTitle: "هامش المنتجات مقابل الهدف", legends: ["الهامش الفعلي", "الهامش المستهدف"],
    chartData: [
      { label: "قهوة", revenue: 92, cost: 65 }, { label: "برجر", revenue: 72, cost: 62 }, { label: "دجاج", revenue: 64, cost: 60 },
      { label: "سلطة", revenue: 58, cost: 56 }, { label: "حلويات", revenue: 75, cost: 61 }, { label: "عصائر", revenue: 81, cost: 63 }, { label: "وجبات", revenue: 54, cost: 58 },
    ],
    rankingTitle: "ترتيب ربحية المنتجات", rankingMeta: "المبيعات · الهامش",
    ranking: [
      { name: "قهوة مختصة", detail: "32,460 د.إ مبيعات", value: "61%" },
      { name: "عصير طازج", detail: "15,780 د.إ مبيعات", value: "54%" },
      { name: "وجبة الغداء", detail: "18,940 د.إ مبيعات", value: "38%", tone: "attention" },
    ],
    insightLabel: "فرصة تحسين القائمة", insight: "ارفع سعر وجبة الغداء 2 د.إ لبلوغ الهامش المستهدف", impact: "+4,100 د.إ شهريًا",
  },
  ai: {
    id: "ai", title: "مركز التوصيات الذكية", period: "محدّث الآن",
    metrics: [
      { label: "التوفير المحتمل", value: "12,480", unit: "د.إ", trend: "شهريًا" },
      { label: "توصيات نشطة", value: "8", trend: "3 عالية الأولوية" },
      { label: "دقة التوصيات", value: "94%", trend: "بناءً على 90 يومًا" },
    ],
    chartTitle: "التوفير المتوقع حسب المجال", legends: ["التوفير المتوقع", "المحقق سابقًا"],
    chartData: [
      { label: "شراء", revenue: 91, cost: 68 }, { label: "تحضير", revenue: 84, cost: 66 }, { label: "عمالة", revenue: 65, cost: 51 },
      { label: "هدر", revenue: 76, cost: 59 }, { label: "تسعير", revenue: 70, cost: 48 }, { label: "مخزون", revenue: 81, cost: 62 }, { label: "عروض", revenue: 58, cost: 45 },
    ],
    rankingTitle: "أعلى التوصيات أولوية", rankingMeta: "الأثر · الثقة",
    ranking: [
      { name: "ضبط طلب اللحوم", detail: "وفر 3,200 د.إ شهريًا", value: "96%" },
      { name: "جدولة فريق المساء", detail: "وفر 2,450 د.إ شهريًا", value: "93%" },
      { name: "تقليل تحضير الخبز", detail: "وفر 1,850 د.إ شهريًا", value: "91%" },
    ],
    insightLabel: "أفضل إجراء تالٍ", insight: "اعتمد كمية طلب اللحوم المقترحة قبل إغلاق طلب المورد", impact: "تنفيذ بنقرة واحدة",
  },
};

function DashboardPreview({ view }: { view: DashboardView }) {
  return (
    <div className="restaurant-dashboard restaurant-dashboard--changing" data-view={view.id} role="tabpanel" id={`analytics-panel-${view.id}`} aria-labelledby={`analytics-tab-${view.id}`} tabIndex={0}>
      <div className="restaurant-dashboard-topbar">
        <div className="restaurant-dashboard-context"><b>كل الفروع</b><small>{view.period}</small></div>
        <span>{view.title}</span>
        <small><i /> مباشر</small>
      </div>

      <div className="restaurant-dashboard-kpis">
        {view.metrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.value} {metric.unit && <small>{metric.unit}</small>}</strong>
            <em className={metric.tone ? `is-${metric.tone}` : undefined}><Icon name="trending-up" size={13} /> {metric.trend}</em>
          </article>
        ))}
      </div>

      <div className="restaurant-dashboard-body">
        <article className="restaurant-profitability-chart">
          <header>
            <span>{view.chartTitle}</span>
            <small><i className="is-revenue" /> {view.legends[0]} <i /> {view.legends[1]}</small>
          </header>
          <div className="restaurant-margin-bars" aria-label={view.chartTitle}>
            {view.chartData.map((point) => (
              <div key={point.label}>
                <span><i style={{ height: `${point.revenue}%` }} /><b style={{ height: `${point.cost}%` }} /></span>
                <small>{point.label}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="restaurant-product-profitability">
          <header><span>{view.rankingTitle}</span><small>{view.rankingMeta}</small></header>
          <ol>
            {view.ranking.map((item, index) => (
              <li key={item.name}>
                <b>{String(index + 1).padStart(2, "0")}</b>
                <span><strong>{item.name}</strong><small>{item.detail}</small></span>
                <em className={item.tone ? `is-${item.tone}` : undefined}>{item.value}</em>
              </li>
            ))}
          </ol>
        </article>
      </div>

      <div className="restaurant-ai-insight">
        <span><Icon name="sparkles" size={19} /></span>
        <div><small>{view.insightLabel}</small><strong>{view.insight}</strong></div>
        <em>{view.impact}</em>
      </div>
    </div>
  );
}

function BranchNetworkVisual() {
  const branches = [
    { name: "دبي", location: "وسط المدينة", sales: "14,820", orders: "186" },
    { name: "أبوظبي", location: "جزيرة الريم", sales: "11,460", orders: "143" },
    { name: "الشارقة", location: "المجاز", sales: "9,420", orders: "121" },
  ];

  return (
    <div className="branch-network" aria-hidden="true">
      <svg className="branch-network-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <marker id="branch-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" />
          </marker>
        </defs>
        <line x1="76" y1="27" x2="65" y2="35" markerEnd="url(#branch-arrow)" />
        <line x1="74" y1="75" x2="65" y2="65" markerEnd="url(#branch-arrow)" />
        <line x1="26" y1="50" x2="35" y2="50" markerEnd="url(#branch-arrow)" />
      </svg>
      <div className="branch-hub">
        <header><span><Icon name="chart" size={17} /> الأداء اليوم</span><small><i /> مباشر</small></header>
        <strong>35,700 <small>د.إ</small></strong>
        <p>إجمالي مبيعات 3 فروع</p>
        <footer><span><b>450</b> طلب</span><em>+12.4%</em></footer>
      </div>
      {branches.map((branch, index) => (
        <div className={`branch-node branch-node--${index + 1}`} key={branch.name}>
          <header><span><Icon name="store" size={16} /><b>{branch.name}</b></span><small><i /> يعمل</small></header>
          <p>{branch.location}</p>
          <footer><strong>{branch.sales} <small>د.إ</small></strong><em>{branch.orders} طلب</em></footer>
        </div>
      ))}
    </div>
  );
}

function BankingVisual() {
  return (
    <div className="banking-visual" aria-hidden="true">
      <div className="banking-source"><Icon name="bank" size={27} /><span>حسابك البنكي</span><small><i /> متصل بأمان</small></div>
      <div className="banking-sync"><Icon name="cloud-check" size={20} /></div>
      <div className="banking-ledger">
        <header><span>آخر العمليات</span><b>محدّثة الآن</b></header>
        <div><i className="is-income"><Icon name="arrow-left" size={13} /></i><span><strong>إيداع مبيعات اليوم</strong><small>الفرع الرئيسي</small></span><em>+8,420 د.إ</em></div>
        <div><i><Icon name="arrow-left" size={13} /></i><span><strong>دفعة مورّد</strong><small>مخزون المطبخ</small></span><em>-1,240 د.إ</em></div>
      </div>
    </div>
  );
}

function NfcVisual() {
  return (
    <div className="nfc-visual" aria-hidden="true">
      <div className="nfc-rings"><i /><i /><i /></div>
      <div className="nfc-phone">
        <span />
        <Icon name="contactless" size={36} />
        <strong>جاهز للدفع</strong>
        <small>قرّب البطاقة أو الهاتف</small>
        <em><Icon name="check" size={14} /> تم الدفع بنجاح</em>
      </div>
      <div className="nfc-card"><small>Skilltax Pay</small><i /><strong>•••• 2048</strong></div>
    </div>
  );
}

export function RestaurantIntelligenceSection() {
  const [activeAnalytics, setActiveAnalytics] = useState<AnalyticsViewId>("profit");
  const [isAnalyticsPaused, setIsAnalyticsPaused] = useState(false);
  const activeView = dashboardViews[activeAnalytics];

  useEffect(() => {
    if (isAnalyticsPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setTimeout(() => {
      setActiveAnalytics((current) => {
        const currentIndex = analyticsFeatures.findIndex((feature) => feature.id === current);
        return analyticsFeatures[(currentIndex + 1) % analyticsFeatures.length].id;
      });
    }, 5500);

    return () => window.clearTimeout(timer);
  }, [activeAnalytics, isAnalyticsPaused]);

  const handleFeatureKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const navigationKeys = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"];
    if (!navigationKeys.includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;
    if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = analyticsFeatures.length - 1;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") nextIndex = (index + 1) % analyticsFeatures.length;
    else nextIndex = (index - 1 + analyticsFeatures.length) % analyticsFeatures.length;

    const nextFeature = analyticsFeatures[nextIndex];
    setActiveAnalytics(nextFeature.id);
    requestAnimationFrame(() => document.getElementById(`analytics-tab-${nextFeature.id}`)?.focus());
  };

  return (
    <section className="restaurant-intelligence" aria-labelledby="restaurant-analytics-title">
      <div className="restaurant-pattern-field" aria-hidden="true">
        <i className="restaurant-pattern restaurant-pattern--analytics" />
        <i className="restaurant-pattern restaurant-pattern--transition" />
        <i className="restaurant-pattern restaurant-pattern--branches" />
        <i className="restaurant-pattern restaurant-pattern--finance" />
      </div>
      <Container>
        <div className="restaurant-analytics-card">
          <header className="restaurant-section-heading">
            <h2 id="restaurant-analytics-title">تحليلات متقدمة</h2>
            <p>اكتشف أين تنمو أرباحك، وأين ترتفع تكاليفك، وكيف تقلّل الهدر قبل أن يؤثر في نتائجك.</p>
          </header>

          <div className="restaurant-analytics-layout">
            <div className="restaurant-analytics-copy">
              <div className="restaurant-feature-kicker"><Icon name="chart" size={22} /> رؤية واضحة للتكلفة والربحية</div>
              <h3>لوحة التحكم الذكية</h3>
              <p>تمتع بأقصى استفادة من بياناتك وحسّن الأداء الشامل لمطعمك مع ملخص الأداء التحليلي.</p>

              <div
                className={`restaurant-feature-grid${isAnalyticsPaused ? " is-auto-paused" : ""}`}
                role="tablist"
                aria-label="اختر نوع التحليل"
                onMouseEnter={() => setIsAnalyticsPaused(true)}
                onMouseLeave={() => setIsAnalyticsPaused(false)}
                onFocus={() => setIsAnalyticsPaused(true)}
                onBlur={(event) => {
                  if (!event.currentTarget.contains(event.relatedTarget)) setIsAnalyticsPaused(false);
                }}
              >
                {analyticsFeatures.map((feature, index) => (
                  <button
                    type="button"
                    role="tab"
                    id={`analytics-tab-${feature.id}`}
                    aria-controls={`analytics-panel-${feature.id}`}
                    aria-selected={activeAnalytics === feature.id}
                    tabIndex={activeAnalytics === feature.id ? 0 : -1}
                    className={`${feature.icon === "sparkles" ? "is-ai " : ""}${activeAnalytics === feature.id ? "is-active" : ""}`}
                    key={feature.id}
                    onClick={() => setActiveAnalytics(feature.id)}
                    onKeyDown={(event) => handleFeatureKeyDown(event, index)}
                  >
                    <span><Icon name={feature.icon} size={20} /></span>
                    <strong>{feature.title}</strong>
                    <i className="restaurant-feature-active-mark" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <DashboardPreview key={activeAnalytics} view={activeView} />
          </div>
        </div>

        <article className="branch-management-card">
          <div className="branch-management-copy">
            <span className="restaurant-feature-kicker"><Icon name="building" size={22} /> تشغيل متعدد الفروع</span>
            <h3>كل فروعك في لوحة تشغيل واحدة <strong>مع تحكم مستقل لكل موقع</strong></h3>
            <p>قارن المبيعات والطلبات لحظيًا، ثم أدر الأسعار والمخزون وصلاحيات الفريق لكل فرع دون التأثير في بقية المواقع.</p>
            <ul>
              <li><Icon name="check" size={14} /> مقارنة لحظية للأداء</li>
              <li><Icon name="check" size={14} /> قوائم وأسعار حسب الفرع</li>
              <li><Icon name="check" size={14} /> مخزون وصلاحيات مستقلة</li>
            </ul>
          </div>
          <BranchNetworkVisual />
        </article>

        <div className="financial-management" aria-labelledby="financial-management-title">
          <header className="financial-management-heading">
            <h2 id="financial-management-title">إدارة مالية متكاملة</h2>
            <p>حل ذكي يوفّر لك رؤية أوضح وإدارة أسرع لجميع عملياتك المالية، ويجعل تجربة المتابعة والدفع أكثر سلاسة.</p>
          </header>

          <div className="financial-feature-grid">
            <article className="financial-feature-card banking-card">
              <div className="financial-feature-copy">
                <span><Icon name="bank" size={25} /></span>
                <small>متابعة لحظية</small>
                <h3>الربط البنكي</h3>
                <p>ربط مباشر مع البنوك لمتابعة جميع العمليات المالية من لوحة التحكم.</p>
                <ul>
                  <li><Icon name="check" size={13} /> مزامنة تلقائية وآمنة</li>
                  <li><Icon name="check" size={13} /> رؤية مركزية للحركة المالية</li>
                </ul>
              </div>
              <BankingVisual />
            </article>

            <article className="financial-feature-card nfc-card-panel">
              <div className="financial-feature-copy">
                <span><Icon name="contactless" size={27} /></span>
                <small>تجربة دفع أسرع</small>
                <h3>الدفع عبر NFC</h3>
                <p>دفع سلس وسريع عبر خاصية NFC باستخدام البطاقة أو الهاتف.</p>
                <ul>
                  <li><Icon name="check" size={13} /> دفع لا تلامسي خلال ثوانٍ</li>
                  <li><Icon name="check" size={13} /> تجربة أبسط للعميل والفريق</li>
                </ul>
              </div>
              <NfcVisual />
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}

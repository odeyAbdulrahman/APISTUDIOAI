"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";

const scenes = ["المبيعات", "الفروع", "المخزون", "قرار ذكي"];

export function SkilltaxProductMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.25 });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const paused = isPaused || !isVisible;

  return (
    <div
      ref={rootRef}
      className={`product-motion${paused ? " is-paused" : ""}`}
      role="img"
      aria-label="عرض متحرك لمنصة Skilltax يوضح نمو المبيعات وربط الفروع وتنبيهات المخزون والقرارات الذكية"
    >
      <div className="product-motion-backdrop" aria-hidden="true" />

      <div className="product-motion-screen">
        <div className="product-motion-browserbar">
          <span className="product-motion-brand"><b>‹K</b> Skilltax</span>
          <i /><i /><i />
        </div>
        <Image
          src="/images/skilltax/features/skilltax-business-suite-v2.png"
          alt=""
          width={1536}
          height={1024}
          unoptimized
          sizes="(max-width: 900px) 92vw, 43vw"
        />
        <div className="product-motion-scan" aria-hidden="true" />
      </div>

      <article className="motion-card motion-card--sales">
        <span>إجمالي المبيعات</span>
        <strong>24,580 د.إ</strong>
        <small>↗ 12.4%</small>
        <div className="motion-sparkline"><i /><i /><i /><i /><i /></div>
      </article>

      <article className="motion-card motion-card--branches">
        <span>كل فروعك متصلة</span>
        <div className="motion-branch-map">
          <i>دبي</i><b /><i>أبوظبي</i><b /><i>الشارقة</i>
        </div>
        <small><em /> مباشر الآن</small>
      </article>

      <article className="motion-card motion-card--stock">
        <span>تنبيه المخزون</span>
        <strong>منتجان يحتاجان انتباهك</strong>
        <div className="motion-stock-line"><i /><b /></div>
        <small>48 ساعة قبل النفاد</small>
      </article>

      <article className="motion-card motion-card--decision">
        <span><Icon name="sparkles" size={14} /> اقتراح Skilltax</span>
        <strong>زد جاهزية فريق المساء</strong>
        <small>المبيعات أعلى بـ 18%</small>
      </article>

      <div className="motion-finale">
        <span>Skilltax</span>
        <strong>كل أعمالك. في نظام واحد.</strong>
      </div>

      <div className="product-motion-timeline" aria-hidden="true">
        {scenes.map((scene) => <span key={scene}>{scene}<i /></span>)}
      </div>

      <button
        type="button"
        className="product-motion-control"
        onClick={() => setIsPaused((value) => !value)}
        aria-label={isPaused ? "تشغيل العرض المتحرك" : "إيقاف العرض المتحرك مؤقتاً"}
      >
        <Icon name={isPaused ? "play" : "pause"} size={16} />
      </button>
    </div>
  );
}

"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "../ui/Icon";
import { HeroProductMotion } from "./HeroProductMotion";

const slides = [
  {
    type: "image" as const,
    src: "/images/skilltax/hero/skilltax-pos-hero.png",
    alt: "نظام نقاط بيع Skilltax مع شاشة الطلبات والطابعة وجهاز الدفع",
    kicker: "نقطة بيع متكاملة",
    title: "كل ما تحتاجه لإتمام البيع",
    duration: 5000,
  },
  {
    type: "motion" as const,
    alt: "عرض متحرك يوضح رحلة الطلب والمبيعات والمخزون والفروع في Skilltax",
    kicker: "تجربة مباشرة",
    title: "شاهد الطلب يتحول إلى قرار",
    duration: 9600,
  },
  {
    type: "image" as const,
    src: "/images/skilltax/hero/skilltax-pos-dashboard.png",
    alt: "لوحة تحكم Skilltax على حاسوب محمول بجانب جهاز دفع",
    kicker: "رؤية لحظية",
    title: "أرقام أعمالك أمامك دائماً",
    duration: 5000,
  },
];

export function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const pointerStart = useRef<number | null>(null);

  const showSlide = useCallback((index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (isPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, slides[activeSlide].duration);

    return () => window.clearTimeout(timer);
  }, [activeSlide, isPaused]);

  return (
    <div
      className="hero-carousel"
      style={{ "--slide-duration": `${slides[activeSlide].duration}ms` } as CSSProperties}
      role="region"
      aria-roledescription="carousel"
      aria-label="صور نظام Skilltax"
      tabIndex={0}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") showSlide(activeSlide + 1);
        if (event.key === "ArrowRight") showSlide(activeSlide - 1);
      }}
      onPointerDown={(event) => {
        pointerStart.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStart.current === null) return;
        const distance = event.clientX - pointerStart.current;
        if (Math.abs(distance) > 45) showSlide(activeSlide + (distance < 0 ? 1 : -1));
        pointerStart.current = null;
      }}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
    >
      <div className="hero-image-clip">
        {slides.map((slide, index) => (
          <div
            className={`hero-slide${index === activeSlide ? " hero-slide--active" : ""}`}
            key={slide.type === "motion" ? "skilltax-motion" : slide.src}
            aria-hidden={index !== activeSlide}
          >
            {slide.type === "motion" ? (
              index === activeSlide ? <HeroProductMotion /> : null
            ) : (
              <Image
                className="hero-product-image"
                src={slide.src}
                alt={index === activeSlide ? slide.alt : ""}
                width={1536}
                height={1024}
                priority={index === 0}
                unoptimized
                sizes="(max-width: 900px) 100vw, 58vw"
              />
            )}
          </div>
        ))}
      </div>

      <div className={`hero-slide-caption${slides[activeSlide].type === "motion" ? " is-live" : ""}`} key={`caption-${activeSlide}`} aria-live="polite">
        <span>{slides[activeSlide].kicker}</span>
        <strong>{slides[activeSlide].title}</strong>
      </div>

      <div className="hero-carousel-counter" aria-hidden="true">
        <strong>{String(activeSlide + 1).padStart(2, "0")}</strong>
        <i />
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      <button
        className="hero-carousel-arrow hero-carousel-arrow--previous"
        type="button"
        aria-label="الصورة السابقة"
        onClick={() => showSlide(activeSlide - 1)}
      >
        <Icon name="chevron-left" size={26} />
      </button>
      <button
        className="hero-carousel-arrow hero-carousel-arrow--next"
        type="button"
        aria-label="الصورة التالية"
        onClick={() => showSlide(activeSlide + 1)}
      >
        <Icon name="chevron-right" size={26} />
      </button>

      <div className="hero-carousel-dots" aria-label="اختيار صورة العرض">
        {slides.map((slide, index) => (
          <button
            className={index === activeSlide ? "is-active" : ""}
            type="button"
            key={slide.type === "motion" ? "skilltax-motion-dot" : slide.src}
            aria-label={`عرض الصورة ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
            onClick={() => showSlide(index)}
          ><span aria-hidden="true" /></button>
        ))}
      </div>
    </div>
  );
}

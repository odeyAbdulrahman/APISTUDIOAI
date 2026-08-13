"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const slides = [
  {
    src: "/images/skilltax/hero/skilltax-pos-hero.png",
    alt: "نظام نقاط بيع Skilltax مع شاشة الطلبات والطابعة وجهاز الدفع",
  },
  {
    src: "/images/skilltax/hero/skilltax-pos-dashboard.png",
    alt: "لوحة تحكم Skilltax على حاسوب محمول بجانب جهاز دفع",
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

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  return (
    <div
      className="hero-carousel"
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
            key={slide.src}
            aria-hidden={index !== activeSlide}
          >
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
          </div>
        ))}
      </div>

      <button
        className="hero-carousel-arrow hero-carousel-arrow--previous"
        type="button"
        aria-label="الصورة السابقة"
        onClick={() => showSlide(activeSlide - 1)}
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        className="hero-carousel-arrow hero-carousel-arrow--next"
        type="button"
        aria-label="الصورة التالية"
        onClick={() => showSlide(activeSlide + 1)}
      >
        <span aria-hidden="true">›</span>
      </button>

      <div className="hero-carousel-dots" aria-label="اختيار صورة العرض">
        {slides.map((slide, index) => (
          <button
            className={index === activeSlide ? "is-active" : ""}
            type="button"
            key={slide.src}
            aria-label={`عرض الصورة ${index + 1}`}
            aria-current={index === activeSlide ? "true" : undefined}
            onClick={() => showSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

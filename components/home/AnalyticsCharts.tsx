"use client";

import { useEffect, useRef } from "react";

const salesData = [
  { label: "السبت", value: 15800 },
  { label: "الأحد", value: 21400 },
  { label: "الاثنين", value: 17600 },
  { label: "الثلاثاء", value: 22300 },
  { label: "الأربعاء", value: 25900 },
  { label: "الخميس", value: 24100 },
  { label: "الجمعة", value: 28600 },
];

const distributionData = [
  { value: 60, color: "#8264ff" },
  { value: 25, color: "#513ae1" },
  { value: 15, color: "#28217f" },
];

export function SalesLineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const padding = { top: 12, right: 10, bottom: 28, left: 10 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;
      const minimum = 12000;
      const maximum = 32000;

      context.lineWidth = 1;
      context.strokeStyle = "rgba(143, 151, 187, 0.14)";
      for (let index = 0; index <= 4; index += 1) {
        const y = padding.top + (chartHeight / 4) * index;
        context.beginPath();
        context.moveTo(padding.left, y);
        context.lineTo(width - padding.right, y);
        context.stroke();
      }

      const points = salesData.map((item, index) => ({
        x: padding.left + (chartWidth / (salesData.length - 1)) * index,
        y: padding.top + chartHeight - ((item.value - minimum) / (maximum - minimum)) * chartHeight,
      }));

      const tracePath = () => {
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let index = 1; index < points.length; index += 1) {
          const previous = points[index - 1];
          const current = points[index];
          const midpoint = (previous.x + current.x) / 2;
          context.bezierCurveTo(midpoint, previous.y, midpoint, current.y, current.x, current.y);
        }
      };

      tracePath();
      context.lineTo(points.at(-1)!.x, padding.top + chartHeight);
      context.lineTo(points[0].x, padding.top + chartHeight);
      context.closePath();
      const fill = context.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
      fill.addColorStop(0, "rgba(129, 91, 255, 0.28)");
      fill.addColorStop(1, "rgba(129, 91, 255, 0)");
      context.fillStyle = fill;
      context.fill();

      tracePath();
      const stroke = context.createLinearGradient(padding.left, 0, width - padding.right, 0);
      stroke.addColorStop(0, "#6552e8");
      stroke.addColorStop(1, "#a56cff");
      context.strokeStyle = stroke;
      context.lineWidth = 3;
      context.lineCap = "round";
      context.lineJoin = "round";
      context.shadowColor = "rgba(137, 91, 255, 0.7)";
      context.shadowBlur = 9;
      context.stroke();
      context.shadowBlur = 0;

      points.forEach((point) => {
        context.beginPath();
        context.arc(point.x, point.y, 3, 0, Math.PI * 2);
        context.fillStyle = "#b49aff";
        context.fill();
      });

      context.fillStyle = "#8f97bb";
      context.font = '9px "Segoe UI", sans-serif';
      context.textAlign = "center";
      context.textBaseline = "bottom";
      salesData.forEach((item, index) => {
        context.fillText(item.label, points[index].x, height);
      });
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="analytics-line-canvas"
      role="img"
      aria-label="المبيعات اليومية: السبت 15,800، الأحد 21,400، الاثنين 17,600، الثلاثاء 22,300، الأربعاء 25,900، الخميس 24,100، الجمعة 28,600 درهم"
    />
  );
}

export function SalesDistributionChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);

      const context = canvas.getContext("2d");
      if (!context) return;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 7;
      let startAngle = -Math.PI / 2;

      distributionData.forEach((segment) => {
        const endAngle = startAngle + (segment.value / 100) * Math.PI * 2;
        context.beginPath();
        context.arc(centerX, centerY, radius, startAngle, endAngle);
        context.strokeStyle = segment.color;
        context.lineWidth = Math.max(18, radius * 0.42);
        context.lineCap = "butt";
        context.shadowColor = "rgba(111, 77, 236, 0.3)";
        context.shadowBlur = 8;
        context.stroke();
        startAngle = endAngle;
      });
      context.shadowBlur = 0;
    };

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="analytics-donut-canvas"
      role="img"
      aria-label="توزيع المبيعات: 60% في المتجر، 25% أونلاين، 15% التوصيل"
    />
  );
}

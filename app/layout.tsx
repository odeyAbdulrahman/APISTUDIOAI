import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skilltax | نظام نقاط البيع وإدارة الأعمال",
  description:
    "منصة Skilltax المتكاملة لإدارة المبيعات والمخزون والعملاء والموظفين والفروع.",
  icons: {
    icon: [{ url: "/favicon-skilltax.svg", type: "image/svg+xml" }],
    shortcut: "/favicon-skilltax.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

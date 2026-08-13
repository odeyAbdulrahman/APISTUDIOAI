import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const englishFont = Inter({
  variable: "--font-english",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skilltax | نظام نقاط البيع وإدارة الأعمال",
  description:
    "منصة Skilltax المتكاملة لإدارة المبيعات والمخزون والعملاء والموظفين والفروع.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={englishFont.variable}>
        {children}
      </body>
    </html>
  );
}

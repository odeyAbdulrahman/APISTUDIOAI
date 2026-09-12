import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "APISTUDIOAI | API integrations built for your codebase",
  description: "Understand the API. Understand your codebase. Build and validate an architecture-compatible integration, then ship it through a Pull Request.",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

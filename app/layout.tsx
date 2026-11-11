import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mika — AI Companion",
  description: "Temui Mika, teman virtual dengan ekspresi yang hidup.",
  applicationName: "Mika AI Companion",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090711",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
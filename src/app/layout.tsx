import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Ripun Sethia | Full-Stack & Systems Engineer (Car #27)",
  description:
    "F1 Race Telemetry Portfolio of Ripun Sethia — Full-Stack & IoT Systems Engineer, Patent Author, HackBattle '25 2nd Place, B.Tech IT @ VIT Vellore.",
  keywords: [
    "Ripun Sethia",
    "Portfolio",
    "Full-Stack Developer",
    "Software Engineer",
    "VIT Vellore",
    "SpineGuard",
    "IoT Engineer",
    "Next.js",
    "F1 Portfolio",
  ],
  authors: [{ name: "Ripun Sethia" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#08090C] text-slate-100 min-h-screen selection:bg-[#E10600] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}

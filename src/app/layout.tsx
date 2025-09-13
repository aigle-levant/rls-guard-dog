import type { Metadata } from "next";
import { Atkinson_Hyperlegible, Open_Sans } from "next/font/google";
import "./globals.css";

const body = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const heading = Open_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "RLS Guard Dog", template: "%s | RLS Guard Dog" },
  description: "Made by aigle",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} antialiased`}
    >
      <body className="antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
